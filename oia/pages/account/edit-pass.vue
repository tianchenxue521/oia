<template>
	<view class="main_hidden">
		<view class="rechrges_s">
			<u-navbar title="修改登录密码" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="transparent"
				:titleStyle="{color:'#fff'}"></u-navbar>
		</view>
		
		<view class="form_body">
			<view class="form_item">
				<text>原密码</text>
				<input placeholder="请输入原密码" v-model="pwdinfo.oldpassword" />
			</view>
			<view class="form_item">
				<text>新的密码</text>
				<input placeholder="请设置新的密码" v-model="pwdinfo.password" />
			</view>
			<view class="form_item">
				<text>确认密码</text>
				<input placeholder="请再次输入新的密码" v-model="pwdinfo.repassword" />
			</view>
		</view>
		<view class="btn_body">
			<view class="btn_shadows" @tap="edit">确 认</view>
		</view>
	</view>
</template>

<script>
	import auth from "../../utils/check.js"
	export default {
		data() {
			return {
				pwdinfo: {
					oldpassword: '',
					password: '',
					repassword: '',
					type: 1,
					userid: uni.getStorageSync('userId')
				},
			}
		},
		methods: {
	
			async edit() {
				if (this.pwdinfo.oldpassword === '') {
					this.$u.toast("请输入原密码");
					return
				}
				if (this.pwdinfo.password === '') {
					this.$u.toast("请输入新密码");
					return
				}
				if (this.pwdinfo.password.length < 6) {
					this.$u.toast("密码最少为6位");
					return
				}

				if (!auth.isPasswd(this.pwdinfo.password)) {
					this.$u.toast("只能输入6-12个字母和数字");
					return;
				}
				if (this.pwdinfo.repassword === '') {
					this.$u.toast("请再次确认新密码");
					return
				}
				if (this.pwdinfo.repassword !== this.pwdinfo.password) {
					this.$u.toast("两次输入密码不一致");
					return
				}
				uni.showLoading({
					title: '修改中'
				})
				let res = await this.$store.dispatch("imChangePassword", this.pwdinfo);
				if (res.code == 1) {
					uni.hideLoading();
					this.$u.toast("修改成功，即将跳转登录页面~");
					setTimeout(() => {
						uni.clearStorageSync()
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1500)
				}else{
					this.$u.toast(res.info);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main_hidden {
		background: #F3F3F3;
		height: 100vh;
		.rechrges_s{
			height: 88rpx;
			background: #222222;
			padding-top: env(safe-area-inset-top);
		}
		.form_body {
			background: #fff;
			border-radius: 16rpx;
			z-index: 2;
			.form_item {
				padding:34rpx 0;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F6F6F6;

				// &:last-child {
				// 	border: none;
				// }

				text {
					font-size: 30rpx;
					color: rgba(48, 49, 60, 1);
					padding: 0 24rpx;
					margin-right: 24rpx;
					width: 120rpx;
				}

				input {
					font-size: 30rpx;
					flex: 1;
				}
			}
		}



		// .btn_body {
		// 	flex: 1;
		// 	display: flex;
		// 	align-items: flex-end;
		// 	padding-bottom: 80rpx;
		// }
		
		.btn_shadows{
			background: #2B2825;
			height: 94rpx;
			font-size: 32rpx;
			border-radius: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			margin: 0 30rpx;
			margin-top: 120rpx;
		}
	}
</style>
