<template>
	<view class="main_hidden">
		<view class="rechrges_s">
			<u-navbar title="添加USDT地址" :placeholder="true" :autoBack="true"
			bgColor="#222" 
			title-style="color:#FFF;"
			leftIconColor="#FFF">
			</u-navbar>
		</view>
		
		<view class="form_body">
			<view class="form_item" style="height: 120rpx;">
				<view style="width: 30%;margin-top: 20rpx;">USDT地址</view>
				<textarea placeholder="目前仅支持TRC20链" v-model="address2" style="height: 100rpx;margin-top: 20rpx;" v-if="!address"/>
				<textarea v-model="address" style="height: 100rpx;margin-top: 20rpx;" disabled v-else/>
			</view>
		</view>
		<view v-if="address" style="text-align: center;margin-top: 40rpx;color: #AAA;">
			修改请联系客服修改
		</view>
		<view class="btn_body" v-else>
			<view class="btn_shadows" @tap="edit">确 认</view>
		</view>
	</view>
</template>

<script>
	import auth from "../../utils/check.js"
	export default {
		data() {
			return {
				address: '',
				address2: '',
				//userinfo:{},
			}
		},
		onLoad() {
			this.getuser();
		},
		methods: {
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.address = res.data.usdt;
				}
			},
			async edit() {
				if (!this.address2) {
					this.$u.toast("请输入USDT地址");
					return
				}
				uni.showLoading({
					title: ''
				})
				let params = {
					usdt:this.address2
				}
				let res = await this.$store.dispatch("addUsdtAddress", params);
				if (res.code == 1) {
					this.$u.toast("添加成功");
					setTimeout(() => {
						uni.navigateBack()
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
			padding-top: env(safe-area-inset-top);
			/* background: linear-gradient(92deg, #1E88FE 0%, #2C50DA 100%); */
		}

		.form_body {
			background: #fff;
			z-index: 2;
			.label {
				margin: 24rpx 0;
				font-size: 24rpx;
				color: #999;
			}

			.form_item {
				display: flex;
				padding: 0 30rpx;
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
					padding-left: 40rpx;
				}
			}
		}

		
		.btn_shadows{
			background: #222;
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
