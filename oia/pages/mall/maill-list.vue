<template>
	<view id="mailllist">
		<view class="maill_bg">
			<!-- <u-navbar title="积分商城" leftIconColor="#fff" @rightClick="mallorderList()" :placeholder="true" :autoBack="true" :bgColor="bgcolor" :titleStyle="{fontWeight: 'bold',color:'#fff'}">
				<view class="u-nav-slot" slot="right">
					<u-icon name="list" color="#fff" size="20"></u-icon>
				</view>
			</u-navbar> -->
			<u-navbar title="积分商城" :placeholder="true" :autoBack="true" @rightClick="mallorderList()"
			bgColor="#222" 
			title-style="color:#FFF;"
			leftIconColor="#FFF">
				<view class="u-nav-slot" slot="right">
					<u-icon name="list" color="#fff" size="20"></u-icon>
				</view>
			</u-navbar>
		</view>
		
		<view style="background: url('../../static/images/img/4-1_bg_integral.png') no-repeat;
		background-size: 100%;height: 320rpx;width: 95%;margin-left: 2.5%;margin-top: -80rpx;">
			<view class="mailllist_title" style="padding-top: 20px;">
				<view class="mailllist_title_lf">我的积分</view>
				<image class="mailllist_title_rg" @tap="moneyEyes=!moneyEyes" mode="widthFix" src="../../static/images/mall/eye2.png"/>
			</view>
			<view class="mailllist_money" v-if="!moneyEyes" style="font-size: 40rpx;">{{userinfo.mrp}}</view>
			<view class="mailllist_money"  v-if="moneyEyes" style="font-size: 40rpx;">****</view>
			<view class="mailllist_money" style="font-size: 28rpx;font-weight: 500;">积分获取规则：</view>
			<view class="mailllist_money" style="font-size: 28rpx;font-weight: 500;padding-top: 0rpx;">根据建仓金额1：1兑换</view>
		</view>
		
		<view class="body">
			<view class="body_left">
				<view class="left_item" v-if="iteml.data" :class="{'active':index===indexl}"
					v-for="(iteml,indexl) in list" :key="indexl" @tap="index=indexl">
					{{iteml.name}}
				</view>
			</view>
			<scroll-view class="scroll_y" :scroll-y="true" lower-threshold="30">
				<!-- <p-nodata v-if="list.length === 0"></p-nodata> -->
				<view class="body_right" v-if="list.length!==0" style="flex-direction: column;">
					<view class="item" @tap="goDetail(itemr.id)" v-for="(itemr,indexr) in list[index].data"
						:key="indexr + 's'" style="display: flex;">
						<view style="width: 40%;background-color: #FFF;border-radius: 16rpx;">
							<image class="top_image" :src="itemr.cover"></image>
						</view>
						<view class="bottom_body" style="width: 60%;">
							<view class="body_title" style="padding: 20rpx 0;">{{itemr.name}}</view>
							<view style="display: flex;margin-top: 60rpx;">
								<view class="jf" style="width: 60%;">
									<!-- <view class="jf_right" style="color: #CCCCCC;">已兑{{itemr.de_total}}件</view> -->
									<view class="jf_left" style="margin-top: 26rpx;">
										<!-- <image src="../../static/images/mall/jf-icon.png" mode="aspectFit"></image> -->
										<text style="color: #F54949;font-size: 34rpx;">{{itemr.amount}}</text>
										<text style="color: #F54949;">积分</text>
									</view>
								</view>
								<view style="width: 40%;background-color: #2B2825;
								border-radius: 50rpx;color: #FFF;margin-top: 50rpx;text-align: center;font-size: 24rpx;height: 60rpx;line-height: 60rpx;">
									立即兑换
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgcolor:"transparent",
				userinfo:{},
				moneyEyes: false,
				list: [],
				index: 0
			}
		},
		onLoad(option) {
			this.getList()
		},
		onShow() {
			this.getuser();
		},
		methods: {
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo = res.data;
				}
			},
			
			
			//获取商品列表
			async getList(){
				let that = this;
				let params = {}
				uni.showLoading({
					title: ''
				});
				let res = await this.$store.dispatch("newsMrp", params);
				if (res.code == 1) {
					let list = res.data;
					for (let key in list) {
						this.list.push(list[key])
					}
					uni.hideLoading();
				}
			},

		//兑换记录
		mallorderList(){
			uni.navigateTo({
				url: '/pages/mall/mall-orderlist'
			});
			
		},
		
		goDetail(id) {
			uni.navigateTo({
				url: '/pages/mall/mall-detail?id=' + id
			})
		}

		}
	}
</script>
<style lang="scss" scoped>
	#mailllist {
		width: 100%;
		background: #F2F3F5;
		height: 100vh;
		.maill_bg{
			height: 200rpx;
			background: #222;
			border-radius: 0 0 20rpx 20rpx;
			padding-top: env(safe-area-inset-top);
		}
		
		.mailllist_title{
			display: flex;
			align-items: center;
			padding-top: 30rpx;
			padding-left: 60rpx;
			.mailllist_title_lf{
				font-size: 30rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
			.mailllist_title_rg{
				width: 30rpx;
				margin-left: 20rpx;
			}
		}
		.mailllist_money{
			font-size: 42rpx;
			font-weight: bold;
			color: #FFFFFF;
			padding-left: 60rpx;
			padding-top: 20rpx;
		}
		
		.scroll_y{
			padding-top: 10rpx;
			box-sizing: border-box;
			height: calc(100vh - 430rpx);
		}
		
		.body {
			flex: 1;
			border-radius: 30rpx 30rpx 0 0;
			overflow-y: auto;
			background-color: #F2F3F5;
			.body_left {
				width: 100%;
				overflow-x: auto;
				overflow-y: hidden;
				height: 100rpx;
				display: flex;
				.left_item {
					flex-shrink: 0;
					width: 240rpx;
					height: 100rpx;
					font-size: 36rpx;
					color: #333333;
					text-align: center;
					line-height: 100rpx;
					border-bottom: 1px solid #EEF0F6;
		
					&.active {
						font-weight: bold;
						color: #333333;
						position: relative;
						font-size: 36rpx;
		
						&::after {
							width: 60rpx;
							height: 10rpx;
							border-radius: 30px;
							background: linear-gradient(90deg, #4D4435 0%, #4D4435 100%);
							position: absolute;
							bottom: 0rpx;
							left: 50%;
							transform: translateX(-50%);
							content: '';
						}
					}
				}
			}
		
			.body_right {
				display: flex;
				flex-wrap: wrap;
				padding: 16rpx 16rpx;
				align-content: flex-start;
		
				.item {
					overflow: hidden;
					width: 100%;
					overflow: hidden;
					margin-bottom: 20rpx;
					&:nth-child(2n) {
						margin-right: 0 !important;
					}
		
					.top_image {
						width: 100%;
						height: 280rpx;
						border-radius: 10rpx;
					}
		
					.bottom_body {
						padding: 10rpx 10rpx;
						margin-top: -12rpx;
						border-radius: 0rpx 0rpx 10rpx 10rpx;
		
						.body_title {
							width: 100%;
							font-size: 28rpx;
							font-weight: bold;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
		
					.yj {
						// text-decoration: line-through;
						font-size: 24rpx;
						color: rgba(102, 102, 102, 1);
					}
		
					.jf {
						width: 100%;
						margin-top: 30rpx;
		
						.jf_right {
							font-size: 24rpx;
							color: #959595;
		
						}
		
						.jf_left {
							display: flex;
							align-items: center;
		
							image {
								width: 32rpx;
								height: 32rpx;
								margin-right: 10rpx;
							}
		
							text {
								font-size: 28rpx;
								color: #333333;
							}
						}
					}
		
					.ljdh {
						width: 160rpx;
						height: 60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0 auto;
						margin-top: 24rpx;
						background: rgba(255, 170, 70, 1);
						font-size: 26rpx;
						font-weight: bold;
						border-radius: 30rpx;
						color: #fff;
					}
				}
		
				.item+.item {
					// margin-right: 24rpx;
					margin-bottom: 24rpx;
				}
			}
		}
	}
</style>