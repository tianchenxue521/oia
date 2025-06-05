<template>
	<view class="root">
		<view class="rechrges_s">
			<u-navbar title="账户设置" leftIconColor="#222" :placeholder="true" :autoBack="true" bgColor="#FFF"
				:titleStyle="{color:'#222'}"></u-navbar>
		</view>
		
		<view v-if="os_name == 'ios'" style="height: 110rpx;"></view>
		<view class="box">
			<view class="cell" @click="goAlter" style="border-bottom: 20rpx solid #F6F6F6;">
				<view class="left">修改密码</view>
				<u-icon name="arrow-right" color="#222" size="16"></u-icon>
			</view>
			<view class="cell" @click="goZjPsd">
				<view class="left">支付密码</view>
				<u-icon name="arrow-right" color="#222" size="16"></u-icon>
			</view>
		</view>
		<view class="btn_shadows" @tap="loginOut">退出登录</view>

		<u-modal :show="show" :showCancelButton="true" @confirm="confirm" title="温馨提示" confirmColor="#2D97EB"
			content="您确认退出登录吗？" @cancel="show=false"></u-modal>


		<!-- <view class="Lottery">
			<view class="Lottery_top_turntable">
				<view class="turntable_spin" :animation="animationData">
					<view class="turntable_spin_item" v-for="(item, index) in 6"
						:style="'transform: rotate(' + (index - 1) * 60 + 'deg) translateX(-50%) translateY(-50%) translate(100px)'">
						<view class="item_view">
							{{ index }}
						</view>
					</view>
				</view>
				<view class=" turntable_spin_active">
				</view>
				<view class="turntable_spin_btn" @click="drawClick">
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				os_name: '',
			}
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					if (res.osName == 'ios' || res.osName == 'android') {
						this.os_name = res.osName;
					}
				}
			});
			console.log('this.os_name ++++  ' + this.os_name)
		},
		methods: {
			loginOut() {
				this.show = true;
			},
			//退出登录
			confirm() {
				uni.setStorageSync('indexGg', 1);
				uni.removeStorageSync('token');
				uni.removeStorageSync('login_code');
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
			goZjPsd() {
				uni.navigateTo({
					url: '/pages/account/edit-payPass'
				})
			},
			goAlter() {
				uni.navigateTo({
					url: '/pages/account/edit-pass'
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.Lottery {
		width: 100vw;
		height: 100vh;
		padding-top: 200rpx;
		text-align: center;
		align-items: center;
		background-size: 100% 100%;
		background-image: url('https://www.ry1688.com/h5/images/Lottery/background.png');

		.Lottery_top_turntable {
			margin-top: 80rpx;
			position: relative;

			.turntable_spin {
				top: 117rpx;
				left: 126rpx;
				width: 450rpx;
				height: 450rpx;
				position: absolute;
				border-radius: 50%;
				border-radius: 50%;
				background-size: 100% 100%;
				background-image: url('https://www.ry1688.com/h5/images/Lottery/turntable_spin.png');

				.turntable_spin_item {
					top: 40%;
					left: 40%;
					width: 50px;
					height: 50px;
					z-index: 99999;
					position: absolute;

					.item_view {
						transform: rotate(60deg);
						transform-origin: center center;
					}
				}

			}

			.turntable_spin_btn {
				top: 230rpx;
				left: 260rpx;
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				background-size: 100%;
				background-repeat: no-repeat;
				background-image: url('https://www.ry1688.com/h5/images/Lottery/spin_btn.png');
			}

			.turntable_spin_active {
				top: 68rpx;
				left: 207rpx;
				width: 300rpx;
				height: 236rpx;
				position: absolute;
				background-size: 100%;
				background-repeat: no-repeat;
				background-image: url('https://www.ry1688.com/h5/images/Lottery/turntable_active.png');
			}
		}
	}

	.root {
		background: #F3F3F3;
		height: 100vh;

		.rechrges_s {
			height: 88rpx;
			background: #222;
		}

		.box {
			background: #fff;

			.cell {
				padding: 30rpx 30rpx;
				font-size: 32rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}


		.btn_shadows {
			color: #fff;
			background: #222;
			font-size: 32rpx;
			border-radius: 30px;
			margin: 0 30rpx;
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			justify-content: center;
			margin-top: 100rpx;
		}


	}
</style>
<style scoped>
	::v-deep .u-modal__content__text {
		text-align: center !important;
	}
</style>