<template>
	<view>
		<!-- <u-navbar title="商品详情":placeholder="true" :autoBack="true" bgColor="#fff"></u-navbar> -->
		<u-navbar title="商品详情" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<view id="poniDetail">
			<image class="" style="width: 100%;" mode="widthFix" :src="detailInfo.cover" />
			<view class="need">
				<view class="need_needNumber">
					<view class="need_needNumber_lf">
						<span class="need_needNumber_lf_s">原价￥{{detailInfo.yuan_amount}}</span>
						<span class="need_needNumber_lf_s_r">
							<span class="need_needNumber_lf_x">{{detailInfo.amount}}积分</span>
						</span>

					</view>
					<!-- <view class="need_needNumber_rg" v-if="detailInfo.de_total">已兑换{{detailInfo.de_total}}件</view>
					<view class="need_needNumber_rg" v-else>已兑换0件</view> -->
				</view>
				<view class="proNumber">
					<text class="num">{{detailInfo.name}}</text>
					<view class="totime dfa">
						服务<u-icon style="margin-left: 20rpx;" name="checkmark-circle-fill" color="#222"
							size="18"></u-icon>
						<text>当日兑换</text>
						<!-- <u-icon style="margin-left: 60rpx;" name="checkmark-circle-fill" color="#222"
							size="18"></u-icon>
						<text>15个工作日内</text> -->
					</view>
				</view>

			</view>

			<view class="jf_add" @tap="openadd">
				<u-icon name="map" color="#555" size="30"></u-icon>
				<view class="jf_add_ct">
					<view class="jf_add_ct_msg">
						<span>{{address.nickname}}</span>
						<span style="padding-left: 20rpx;">{{address.phone}}</span>
					</view>
					<view class="jf_add_ct_ad">{{address.add}}</view>
				</view>
				<u-icon name="arrow-right" color="#555" size="30"></u-icon>
			</view>

			<view class="pro_introduce">
				<view class="title">
					商品详情
				</view>
				<!-- 	<view class="compon">
						<text class="title">一、本商品由什么公司提供</text>
						<text class="tel">售后电话</text>
					</view> -->
				<view class="fanwei">
					<!-- <text class="title">二、配送范围及时限如下</text> -->
					<view class="desc" v-html="detailInfo.content"></view>
				</view>
			</view>
			<view class="btnss">
				<text v-if="address.nickname" @tap="toIntegralPor(detailInfo.id)">立即兑换</text>
				<text v-else @tap="openadd">立即兑换</text>

			</view>
		</view>
		<!-- 银行选择弹窗 -->
		<u-popup :show="addshow" zIndex="10075" @close="close1" mode="bottom" round='20' closeIconPos="top-right"
			closeOnClickOverlay>
			<view class="addpop" :style="address.nickname ? 'height: 40vh;':''">
				<view class="add_title">
					<view>收货地址</view>
				</view>
				<view class="add_cont">
					<view class="add_cont_lf">收货人</view>
					<view class="add_cont_rg">
						<input placeholder-class="addplaceholder" v-model="address.nickname" type="text"
							placeholder="请输入收货人姓名" disabled v-if="address.nickname"/>
						<input placeholder-class="addplaceholder" v-model="address2.nickname" type="text"
							placeholder="请输入收货人姓名" v-else/>
					</view>
				</view>
				<view class="add_cont">
					<view class="add_cont_lf">手机号</view>
					<view class="add_cont_rg">
						<input placeholder-class="addplaceholder" v-model="address.phone" type="number"
							placeholder="请输入收货人手机号" disabled v-if="address.nickname"/>
						<input placeholder-class="addplaceholder" v-model="address2.phone" type="number"
							placeholder="请输入收货人手机号" v-else/>
					</view>
				</view>
				<view class="add_cont">
					<view class="add_cont_lf">所在地区</view>
					<view class="add_cont_rg">
						<input placeholder-class="addplaceholder" v-model="address.add" type="text"
							placeholder="所在地区" disabled v-if="address.nickname"/>
						<input placeholder-class="addplaceholder" v-model="address2.add" type="text"
							placeholder="所在地区" v-else/>
					</view>
				</view>
				<view style="color: #666;text-align: center;margin-top: 60rpx;" v-if="address.nickname">修改请联系客服</view>
				<view class="add_btm" @tap="addAddress" v-else>保存</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import auth from "@/utils/check"
	export default {
		data() {
			return {
				current: 0,
				mode: 'round',
				id: "",
				detailInfo: {},
				addshow: false,
				addflg: true, //是否有地址
				address: {
					nickname: '',
					phone: '',
					add: '',
				},
				address2: {
					nickname: '',
					phone: '',
					add: '',
				},
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.mrpInfo();
			this.getAddress();
		},
		methods: {

			//积分商城详情
			async mrpInfo() {
				let params = {
					proid: this.id
				};
				let res = await this.$store.dispatch("newsMrpInfo", params);
				if (res.code == 1) {
					this.detailInfo = res.data;
				}
			},



			async toIntegralPor(id) {
				let that = this;
				let params = {
					proid: id,
					add: that.address.add,
					nickname: that.address.nickname,
					phone: that.address.phone,
				};
				uni.showLoading({
					title: ''
				});
				let res = await this.$store.dispatch("orderMrpOrder", params);
					if (res.code == 1) {
						uni.hideLoading();
						uni.$u.toast(res.info);
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);

					} else {
						uni.$u.toast(res.info);
						uni.hideLoading();
					}
			},



			//获取收货地址
			async getAddress() {
				let params = {};
				let res = await this.$store.dispatch("getAddress", params);
				if (res.code == 1) {
					if (res.data) {
						this.address = res.data;
						if (res.data) {
							this.addflg = true;
						} else {
							this.addflg = false;
						}
					} else {
						this.addflg = false;
					}
				}
			},

			//添加收货地址
			async addAddress() {
				var that = this;

				if (!that.address2.nickname) {
					uni.$u.toast("请输入收货人姓名");
					return
				}
				// if (!auth.validatePhone(that.address2.phone)) {
				// 	uni.$u.toast("请输入正确的手机号")
				// 	return
				// }
				if (!that.address2.add) {
					uni.$u.toast("收货地址不能为空");
					return
				}
				uni.showLoading({
					title: ''
				});

				let params = {
					address: that.address2
				};
				let res = await this.$store.dispatch("addAddress", params);
				if (res.code == 1) {
					uni.hideLoading();
					uni.$u.toast("保存地址成功");
					that.addshow = false;
					that.getAddress();

				} else {
					uni.hideLoading();
					uni.$u.toast(res.info);
				}

			},


			change(e) {
				this.current = e.detail.current;
			},

			openadd() {
				this.addshow = true;
			},

			close1() {
				this.addshow = false;
			},

		}
	}
</script>

<style lang="scss" scoped>
	#poniDetail {
		background: #F5F5F5;
		// 
		min-height: 100vh;
		position: relative;
		margin-bottom: 200rpx;

		::v-deep .u-navbar {
			.u-icon {
				span {
					color: #ffffff;
				}

			}

			.u-navbar__content__title {
				color: #ffffff;
			}
		}

		.swiper {
			padding: 40rpx 146rpx;
			background-color: #fff;

			.swiperImg {
				width: 100%;
			}
		}

		.need {
			margin-top: 16rpx;
			padding: 32rpx 40rpx;
			background: #fff;

			.need_needNumber {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.need_needNumber_lf {
				// display: flex;
				// flex-direction: column;
			}

			.need_needNumber_lf_s_r {
				display: flex;
				align-items: baseline;

			}

			.need_needNumber_lf_s {
				color: #8D8B96;
				font-size: 28rpx;
				padding: 8rpx 8rpx;
				border-radius: 8rpx;
				text-decoration: line-through;
			}

			.need_needNumber_lf_x {
				color: #E97335;
				font-size: 40rpx;
				// display: flex;
				// align-items: center;
			}

			.need_needNumber_rg {
				color: #292929;
				font-size: 24rpx;
			}

			.proNumber {
				.num {
					display: block;
					margin: 24rpx 0;
					color: #292929;
					font-size: 36rpx;
					font-weight: bold;
				}

				.totime {
					color: #555;
					font-size: 24rpx;
					border-top: solid 1px #eee;
					padding-top: 30rpx;

					text {
						margin: 0 5rpx;
					}
				}
			}
		}

		.pro_introduce {
			margin-top: 20rpx;
			background-color: #fff;
			padding: 20rpx 28rpx 200rpx;
			
			.title {
				font-size: 28rpx;
				color: #000;
				font-weight: bold;
			}

			.compon {
				display: flex;
				flex-direction: column;
				margin-top: 40rpx;
				font-size: 24rpx;
				font-weight: bold;
				line-height: 60rpx;

				.tel {
					color: red;
				}
			}

			.fanwei {
				margin-top:20rpx;
				.desc {
					display: flex;
					flex-direction: column;
				}
			}
		}

		.btnss {
			color: #fff;
			position: fixed;
			background-color: #fff;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 150rpx;
			box-shadow: 0rpx -6rpx 12px 1rpx rgba(0, 0, 0, 0.16);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 99;

			text {
				background: #2B2825;
				border-radius: 30px;
				padding: 22rpx 174rpx;
			}
		}

	}

	.addpop {
		height: 65vh;
	}

	.add_title {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		padding-top: 32rpx;
		font-size: 32rpx;
		color: #292929;
		justify-content: center;
		padding-bottom: 40rpx;
	}

	.add_close {
		position: absolute;
		right: 42rpx;
		top: 42rpx;
		width: 24rpx;
	}


	.add_cont {
		display: flex;
		padding: 20 0rpx;
		margin: 0 24rpx;
	}

	.add_cont_lf {
		color: #000000;
		font-size: 28rpx;
		width: 150rpx;
		padding: 40rpx 0;
	}

	.add_cont_rg {
		padding: 40rpx 0;
		width: calc(100% - 70rpx);
		border-bottom: 2rpx solid #F3F3F3;
	}

	.add_cont_rg input {
		color: #000000;
		font-size: 28rpx;
		outline: none;
		border: none;
	}

	.add_btm {
		display: flex;
		position: fixed;
		bottom: 60rpx;
		margin: 0 38rpx;
		background:#222;
		background-size: 100%;
		height: 96rpx;
		color: #fff;
		border-radius: 30px;
		width: calc(100% - 76rpx);
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.jf_add {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 24rpx;
		background-color: #fff;
		margin-top: 22rpx;
	}

	.jf_add_img1 {
		width: 28rpx;
	}

	.jf_add_img2 {
		width: 28rpx;
	}

	.jf_add_ct {
		padding: 0 10rpx;
		width: calc(100% - 56rpx - 20rpx);
	}

	.jf_add_ct_msg {
		color: #292929;
		font-weight: bold;
		font-size: 28rpx;
	}

	.jf_add_ct_ad {
		color: #777;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		padding-top: 6rpx;
	}
	
	.dfa {
	    display: flex;
	    align-items: center;
	}

	// .info_carbg {
	// 	background: url('../../static/images/information/ID_frame_2@2x.png') no-repeat;
	// 	background-size: 100% 100%;
	// }
</style>
