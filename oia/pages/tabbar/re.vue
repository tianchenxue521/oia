<template>
	<view id="invest">
		<u-navbar title="热门产品" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<view style="margin: 30rpx;background-color: #FFF;">
			<view class="home_zt" style="width: 100%;">
				<view class="home_cplist" style="box-shadow: 0px 3px 15px 0px rgb(0 0 0 / 10%);margin-bottom: 40rpx;
				background: url('../../static/images/img/1_bg_products2.png') no-repeat;background-size: 100%;" 
				v-for="(item, index) in getlist" :key="index">
					<view class="home_cplist_title">
						<view class="home_cplist_title_lf">{{item.name}}</view>
					</view>
					<view class="home_cplist_cp">
						<view class="home_cplist_cplf">
							<view class="home_cplist_cplf_lf">
								<view class="home_cplist_cplf_lf_t" v-if="item.percents != -1 && item.tally_rate != 100 && item.type == 1">{{item.percents}}%</view>
								<view class="home_cplist_cplf_lf_t" v-else>{{item.percent}}%</view>
								<view class="home_cplist_cplf_lf_b" v-if="item.tally_rate != 100 && item.type == 1">预计收益</view>
								<view class="home_cplist_cplf_lf_b" v-else>日均收益率</view>
							</view>
						</view>
						<view @tap="goDetail(item.id,item.de_total,item.total,item.name,item.tname,item.status)" style="background-color: #2B2825;color: #FFF;height: 60rpx;width: 200rpx;border-radius: 60rpx;text-align: center;line-height: 60rpx;">
							去抢购
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				getlist: [],
			}
		},
		onLoad() {
			uni.getSystemInfo({ //获取滚动高度
				success: (res) => {
					// 可使用窗口高度，将px转换rpx
					// #ifdef H5
						//this.topHeight = res.windowHeight - uni.upx2px(260)
						this.topHeight = res.windowHeight
					// #endif
					
					// #ifdef APP-PLUS
						this.topHeight = res.windowHeight - uni.upx2px(260);
					// #endif
					
				},
				
			})
		},
		onShow(){
			this.newsGoodsTwo();
		},
		methods: {
			//热门产品
			async newsGoodsTwo(){
				var that = this;
				var params = {
					type: 4
				}
				let res = await this.$store.dispatch("coin_hot", params);
				if (res.code == 1) {
					this.getlist = res.data;
				}
			},
			
			// 去往产品详情页
			goDetail(id, detotal,total,name,tname,status) {
				if(status == 3 || status == 4){
					uni.$u.toast("已结束");
					return;
				}
				if (detotal >= total) {
					uni.$u.toast("已满仓");
					return
				}
				let title = tname+'：'+name;
				uni.navigateTo({
					url: '/pages/productDetail/productDetail?id=' + id+'&title='+title
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	#invest{
		background: #FFF;
		width: 100%;
		.invest_bg{
			background: #222;
			z-index: 9999;
		}
	}
	.home_zt{
		.select_login {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:34rpx 54rpx;
			.select_line{
				height: 26rpx;
				border-left: 2rpx solid #848484;
			}
			.select_i {
				color: #999999;
				font-size: 36rpx;
				color: #333333;
				&.active {
					position: relative;
					color: #333333;
					font-weight: bold;
					&::after {
						position: absolute;
						width: 60rpx;
						border-radius: 30px;
						height: 10rpx;
						content: '';
						background: linear-gradient(90deg, #015EEA 0%, #00C0FA 100%);
						left: 50%;
						bottom: -17rpx;
						transform: translateX(-50%);
					}
				}
			}
		}
		
		.home_cplist{
			background: linear-gradient(180deg, #FFECCD 0%, #fffaf1 100%);
			border-radius: 20rpx;
			padding: 39rpx 12rpx 33rpx 27rpx;
			.home_cplist_title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.home_cplist_title_lf{
					white-space:nowrap; 
					text-overflow:ellipsis; 
					-o-text-overflow:ellipsis; 
					overflow: hidden; 
					font-size: 36rpx;
					color: #000000;
					flex: 1;
					padding-right: 30rpx;
				}
				.home_cplist_title_rg{
					border: 1rpx solid #3069FB;
					border-radius: 6rpx;
					padding: 6rpx;
					font-size: 22rpx;
					color: #3069FB;
				}
			}
			.home_cplist_cp{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 18rpx;
				.home_cplist_cplf{
					display: flex;
					align-items: center;
					.home_cplist_cplf_lf{
						display: flex;
						align-items: center;
						flex-direction: column;
						.home_cplist_cplf_lf_t{
							font-size: 38rpx;
							font-weight: bold;
							color: #E50900;
							line-height: 1;
						}
						.home_cplist_cplf_lf_b{
							font-size: 24rpx;
							font-weight: 400;
							color: #696969;
							padding-top: 14rpx;
						}
					}
					.home_cplist_cplf_rg{
						display: flex;
						align-items: center;
						flex-direction: column;
						padding-left: 102rpx;
						.home_cplist_cplf_rg_t{
							display: flex;
							align-items: baseline;
							line-height: 1;
							.home_cplist_cplf_rg_ts{
								font-size: 38rpx;
								font-weight: bold;
								color: #333333;
							}
							.home_cplist_cplf_rg_tx{
								font-size: 24rpx;
								font-weight: bold;
								color: #333333;
							}
						}
						.home_cplist_cplf_rg_b{
							font-size: 24rpx;
							color: #696969;
							padding-top: 14rpx;
						}
					}
				}
				.home_cplist_cprg{
					width: 144rpx;
				}
			}
		}
	}
</style>
<style scoped>
	::v-deep .u-tabs__wrapper__nav__line{
		background: #222 !important;
	}
</style>