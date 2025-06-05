<template>
	<view class="main_hidden">
		<view class="rechrges_s">
			<u-navbar title="修改支付密码" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="transparent"
				:titleStyle="{color:'#fff'}"></u-navbar>
		</view>
		<view class="form_body">
			<view class="form_item">
				<text>原密码</text>
				<input placeholder="请输入原密码" v-model="pwdinfo.old_passkey" maxlength="6" type="number" />
			</view>
			<view class="form_item">
				<text>新的密码</text>
				<input placeholder="请设置新的密码" v-model="pwdinfo.passkey" maxlength="6" type="number" />
			</view>
			<view class="form_item">
				<text>确认密码</text>
				<input placeholder="请再次输入新的密码" v-model="pwdinfo.repasskey" maxlength="6" type="number" />
			</view>

		</view>
		<view class="label">新用户默认支付密码<text style="color: red;">000000</text>，如您修改过支付密码则原密码为您修改之后的支付密码</view>
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
					old_passkey: '',
					passkey: '',
					repasskey: '',
				},
			}
		},
		methods: {

			// 提现时间
			async txFees() {
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("txFees", params);
				if (res.code == 1) {
					this.time = res.data;
				}
			},
			async edit() {
				if (this.pwdinfo.old_passkey.length < 6) {
					this.$u.toast("请输入六位旧支付密码");
					return
				}
				if (this.pwdinfo.old_passkey === '') {
					this.$u.toast("请输入原密码");
					return
				}
				if (this.pwdinfo.passkey.length === '') {
					this.$u.toast("请输入六位新支付密码");
					return
				}
				if (this.pwdinfo.repasskey === '') {
					this.$u.toast("请再次确认新密码");
					return
				}
				uni.showLoading({
					title: '修改中'
				})
				let res = await this.$store.dispatch("imChangePassKeys", this.pwdinfo);
				if (res.code == 1) {
					this.$u.toast("修改成功");
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} else {
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
		// padding: 0rpx 30rpx;
		// display: flex;
		// flex-direction: column;
		// position: relative;

		.rechrges_s {
			padding-top: env(safe-area-inset-top);
			height: 88rpx;
			background: #222222;
		}

		.header {
			position: absolute;
			top: 0;
			left: 0;
			background: linear-gradient(to bottom, #F55439, #FAFAFA);
			height: 400rpx;
			width: 100%;
		}

		.form_body {
			background: #fff;
			border-radius: 16rpx;
			z-index: 2;

			.form_item {
				height: 120rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F6F6F6;

				&:last-child {
					border: none;
				}

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

		.label {
			margin: 24rpx 0;
			font-size: 24rpx;
			color: #999;
			padding: 0 30rpx;
		}

		.btn_shadows {
			background: #222222;
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