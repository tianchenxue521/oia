<template>
	<view id="viplevel">
		<u-navbar title="会员等级" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="#171614"
			:titleStyle="{color:'#fff'}"></u-navbar>
		<view class="vipl_bg">
			<view class="vipl_bg_logo">
				<image src="../../static/images/login/touxiang.png" />
				<view class="vipl_bg_phone">
					<!-- <view class="vipl_bg_phone_1">
						<view class="vipl_bg_phone_1_lf">{{userinfo.phone|phoneFilter}}</view>
						<view class="vipl_bg_phone_1_rg">{{userinfo.vip_name}}</view>
					</view> -->
					<view style="margin-left: 20rpx;color: #FFF;">
						<view class="vipl_bg_phone_1_lf">{{userinfo.real_name}}</view>
						<view class="vipl_bg_phone_1_lf">{{userinfo.phone|phoneFilter}}</view>
					</view>
					<!-- <view class="vipl_bg_phone_dj">
						<view class="vipl_bg_phone_dj_lf">当前等级</view>
						<view class="vipl_bg_phone_dj_rg">vip{{userinfo.vip_name}}</view>
					</view> -->
				</view>
			</view>
			<view style="color: #FFF;text-align: center;">LV.{{userinfo.vip_name}}</view>
			<!-- <view class="menber_vipdj">
				<view class="mem_progress">
					<u-line-progress height="6"  inactiveColor="#fff" activeColor="#ECCDAE" percentage="40" :showText="false"></u-line-progress>	
				</view>
				<view class="menber_vipdj_text">
					<span>还需要 </span>
					<span class="menber_vipdj_text_sp2">{{userinfo.distance}}</span>
					<span>建仓金额升级</span>
				</view>
			</view> -->

			<!-- 	<view class="vipl_bg_vip">VIP{{userinfo.vip_name}}</view> -->
		</view>
		<view class="vipl_zt">
			<view class="menber_bian" style="justify-content: space-between;">
				<!-- <view class="menber_bian_lf"></view> -->
				<view class="menber_bian_zh">等级特权</view>
				<view class="menber_bian_zh" style="font-size: 28rpx;">距离下一等级还差{{cha_v}}积分</view>
				<!-- <view class="menber_bian_lf"></view> -->
			</view>
			<view class="member_list_text">
				<view class="member_list_text1" style="width: 20%;text-align: left;">等级名称</view>
				<view class="member_list_text1" style="width: 40%;text-align: center;">累积积分</view>
				<view class="member_list_text1" style="width: 20%;text-align: center;">签到奖励</view>
				<view class="member_list_text1" style="width: 20%;text-align: right;">加息率</view>
			</view>

			<view class="member_list" v-for="(item, index) in itemList" :key="index">
				<view class="member_list_lf" style="width: 20%;text-align: left;">
					<view>VIP</view>
					<view>{{item.number}}</view>
				</view>
				<view class="member_list_zh" style="width: 40%;text-align: center;">{{item.order_amount_number}}</view>
				<view class="member_list_zh" style="width: 20%;text-align: center;">{{item.sign_reward}}</view>
				<view class="member_list_rg" style="width: 20%;text-align: right;">{{item.percent}}%</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [],
				userinfo: {
					phone: "",
					vip_name: "",
					distance: "",
					real_name: "",
				},
				cha_v: 0,
			}
		},
		onLoad() {
			this.getuser();
		},
		filters: {
			phoneFilter(val) {
				let reg = /^(.{3}).*(.{4})$/;
				return val.replace(reg, '$1****$2');
			}
		},
		onShow() {

		},
		methods: {
			//用户信息
			async getuser() {
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo.phone = res.data.phone;
					this.userinfo.vip_name = res.data.vip_name;
					this.userinfo.distance = res.data.distance;
					this.userinfo.real_name = res.data.real_name;
					this.cha_v = res.data.order_mrp_total * 1;
					this.getVip();
				}
			},

			async getVip() {
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("baseVip", params);
				if (res.code == 1) {
					this.itemList = res.data
					this.cha_v = this.itemList[this.userinfo.vip_name*1+1].order_amount_number*1 - this.cha_v;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	#viplevel {
		width: 100%;
		background: #FFF;
		height: 100vh;
		overflow-y: scroll;

		.vipl_bg {
			background: url('../../static/images/img/1-3_bg_level3.png') no-repeat;
			background-size: 100%;
			background-position: center bottom 10rpx;
			background-color: #171614;
			height: 400rpx;

			.vipl_bg_logo {
				padding-top: 60rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 60rpx;

				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 100%;
				}

				.vipl_bg_phone {

					padding-left: 10rpx;
					display: flex;
					flex-direction: column;

					.vipl_bg_phone_1 {

						display: flex;
						align-items: center;

						.vipl_bg_phone_1_lf {
							font-size: 30rpx;
							color: #FFFFFF;
						}

						.vipl_bg_phone_1_rg {
							background: url('../../static/images/other/vip_dj_img.png') no-repeat;
							background-size: 100% 100%;
							height: 38rpx;
							width: 56rpx;
							padding-right: 10rpx;
							text-align: right;
							line-height: 36rpx;
							font-size: 22rpx;
							color: #8D5A0B;
							margin-left: 7rpx;
						}


					}

					.vipl_bg_phone_dj {
						font-size: 26rpx;
						padding-top: 16rpx;
						display: flex;
						align-items: center;

						.vipl_bg_phone_dj_lf {
							font-size: 24rpx;
							color: #9A9EA7;
						}

						.vipl_bg_phone_dj_rg {
							font-size: 24rpx;
							color: #F3CF9E;
							padding-left: 7rpx;
						}
					}

				}
			}

			.vipl_bg_vip {
				font-size: 32rpx;
				color: #ECCDAE;
				font-weight: bold;
				padding-top: 180rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.menber_vipdj {
				margin-top: 38rpx;
				padding-left: 60rpx;
				display: flex;
				align-items: center;

				.menber_vipdj_tile {
					font-size: 28rpx;
					color: #FFFFFF;

					.menber_vipdj_tile_sp2 {
						padding-left: 20rpx;
					}
				}

				.mem_progress {
					// padding-top: 10rpx;

				}

				.menber_vipdj_text {
					font-size: 28rpx;
					font-weight: 400;
					color: #B9B8B8;
					padding-left: 20rpx;

					.menber_vipdj_text_sp2 {
						padding: 0 6rpx;
					}
				}

			}



		}

		.vipl_zt {
			background: linear-gradient(-180deg, #FFECCD 0%, #FFFFFF 100%);
			margin-top: -140rpx;
			margin-bottom: 30rpx;

			.menber_bian {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 30rpx 0 26rpx 0;

				.menber_bian_lf {
					width: 147rpx;
					height: 4rpx;
					background: linear-gradient(-90deg, #F4D3A5 0%, rgba(255, 255, 255, 0) 100%);
				}

				.menber_bian_zh {
					font-size: 32rpx;
					padding: 0 30rpx;
					font-weight: bold;
					color: #222;
				}
			}

			.member_list_text {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #222;
				font-size: 28rpx;
				padding: 30rpx 60rpx;
				font-weight: bold;

			}

			.member_list {
				margin: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 40rpx;

				// border-bottom: 1rpx solid #F3E8E2;
				.member_list_lf {
					display: flex;
					align-items: center;

					view {
						font-size: 28rpx;
						font-weight: bold;
						color: #222;
						padding-left: 6rpx;
					}
				}

				.member_list_zh {
					font-size: 28rpx;
					color: #222;
				}

				.member_list_rg {
					font-size: 28rpx;
					color: #222;
				}

			}
		}
	}
</style>
<style scoped>
	::v-deep .u-line-progress {
		width: 160rpx !important;
	}
</style>