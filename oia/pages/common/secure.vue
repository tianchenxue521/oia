<template>
	<view id="secure">
		<!-- <u-navbar title="安全保障"  :placeholder="true" :autoBack="true" bgColor="#fff"></u-navbar> -->
		<view class="forg_return" @tap="goBack">
			<u-icon name="arrow-left" color="#333" size="23"></u-icon>
		</view>
		<view class="top">
			<image mode="widthFix" src="../../static/images/img/secure.png" />
		</view>

		<!-- <view class="secure_zt">
			<view class="secure_zt_title">—— 安全说明书 ——</view>
			<view class="secure_btn">
				<image mode="heightFix"  src="../../static/images/other/sm_btn.png"/>
			</view>
			<view class="sm_zq">
				<image mode="widthFix" @click="yulan('../../static/images/other/sm_zq.png')" src="../../static/images/other/sm_zq.png"/>
			</view>
			<view class="sm_c">
				<image mode="widthFix" @click="yulan2('../../static/images/other/sm_c_1.jpg')" src="../../static/images/other/sm_c_1.jpg"/>
				<image mode="widthFix" @click="yulan2('../../static/images/other/sm_c_2.jpg')" src="../../static/images/other/sm_c_2.jpg"/>
				<image mode="widthFix" @click="yulan2('../../static/images/other/sm_c_3.jpg')" src="../../static/images/other/sm_c_3.jpg"/>
			</view>
			
			<view class="sm_fx">
				<image mode="widthFix" src="../../static/images/other/sm_fx.png"/>
			</view>
		</view> -->

	</view>

</template>

<script>
	export default {

		data() {
			return {}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			yulan(url) {
				var arr = [url]
				uni.previewImage({
					urls: arr,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			yulan2(url) {
				var arr = [url]
				uni.previewImage({
					urls: arr,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},

			//返回
			goBack() {
				uni.navigateBack()
			},

		}
	}
</script>

<style scoped lang="scss">
	#secure {
		// background: url('../../static/images/other/sm_bg.png') no-repeat;
		background-size: 100%;
		height: 100vh;
		overflow-y: scroll;
		background: #222;
		overflow-y: scroll;

		.forg_return {
			display: flex;
			align-items: center;

			position: absolute;
			left: 40rpx;
			top: 70rpx;
			z-index: 99;
		}

		.top {
			position: relative;

			image {
				width: 100%;
			}

			.sm_zq_title {
				background: linear-gradient(180deg, #5ECEFF 0%, #2D97EB 100%);
				box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.2);
				border-radius: 30px;
				color: #fff;
				padding: 24rpx 0;
				margin: 0 140rpx;
				text-align: center;
				font-size: 51rpx;
				position: absolute;
				bottom: -44rpx;
				width: calc(100% - 280rpx);
			}
		}

		.secure_zt {
			margin: 0rpx 28rpx 0 28rpx;
			margin-top: -120rpx;
			position: relative;
			padding-bottom: 30rpx;

			.secure_zt_title {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 36rpx;
				color: #0D47FE;
				background-color: #fff;
				padding: 35rpx 0;
				font-weight: bold;
				border-radius: 30rpx 30rpx 0 0;
			}
		}

		.secure_btn {
			position: absolute;
			width: 100%;
			text-align: center;
			top: -45rpx;

			image {
				height: 90rpx;
			}
		}

		.sm_zq {
			display: flex;
			background-color: #fff;

			// padding-top: 40rpx;
			image {
				width: 100%;
			}
		}

		.sm_c {
			display: flex;
			flex-direction: column;

			image {
				width: 100%;
			}
		}

		.sm_fx {
			// margin: 0 30rpx;
			display: flex;

			image {
				width: 100%;
			}
		}
	}
</style>