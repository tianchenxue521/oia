<template>
	<view class="root">
		<!-- <u-navbar title="充值记录" :placeholder="true" :autoBack="true" bgColor="#F3F3F3" :titleStyle="{color:'#333',fontWeight: 'bold'}"></u-navbar> -->
		<u-navbar title="充值记录" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
			<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false" :height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true" :show-loading-more-no-more-view="false">
				<view class="item ddds" v-for="(item,index) in dataList" :key="index">
					<view class=" dfb">
						<view class="left">
							<view class="left_cz_text">
								<text class="left_cz_text_s1">充值</text>
								<text v-if="item.paytype == 5 || item.paystatus == 2">
									<text class="left_cz_text_s2" v-if="item.usdt">(USDT: {{item.usdt}})</text>
									<text class="left_cz_text_s2" v-else>(USDT)</text>
								</text>
							</view>
							<view v-if="item.status==1 && item.amounts > 0" style="height: 30rpx;"></view>
							<text class="left_cz_text2">{{item.create_at}}</text>
						</view>
						<view class="right">
							<view v-if="item.status==0" style="color: #f1a532;">￥{{item.amount}}</view>
							
							<view v-if="item.status==1 && item.amounts > 0">￥{{item.amount + (item.amounts)*1}}</view>
							<view v-if="item.status==1 && item.amounts == 0">￥{{item.amount}}</view>
							<view v-if="item.status==1 && item.amounts > 0" style="font-size: 28rpx;">
								充值金额{{item.amount}} 赠送{{item.amounts}}
							</view>
							
							<view v-if="item.status==2" style="color: #F54949;">￥{{item.amount}}</view>
							
							<span v-if="item.status==0">审核中</span>
							<span v-if="item.status==1">充值成功</span>
							<span v-if="item.status==2">充值失败</span>
							
						</view>
					</view>
					<view style="font-size: 24rpx;color: #999;margin-top: 16rpx;" v-if="item.remarks!==''&&item.remarks!==null">
						{{item.remarks}}
					</view>
				</view>
			</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				topHeight:0,
				dataList: [],
			}
		},
		onLoad() {
			uni.getSystemInfo({ //获取滚动高度
				success: (res) => {
					// 可使用窗口高度，将px转换rpx
					// #ifdef H5
						this.topHeight = res.windowHeight - uni.upx2px(80)
					// #endif
					
					// #ifdef APP-PLUS
						this.topHeight = res.windowHeight - uni.upx2px(80);
					// #endif
					
				},
				
			})
		},
		methods: {
			async queryList(pageNo, pageSize) {
				let data = {
					page: pageNo,
					type:6,
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("teamAccountChange", data);
				if (res.code == 1) {
					uni.hideLoading();
					this.$refs.paging.complete(res.records);
				}
			},
		}
	}
</script>
<style scoped lang="scss">
	.root {
		width: 100%;
		background: #F3F3F3;
		.dfb{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.item {
			padding: 30rpx;
			background: #FFFFFF;
			border-top:20rpx solid #F6F6F6;
			&:nth-child(1) {
				/* margin-top: 40rpx; */
				border-top:none!important;
				/* border-radius: 20rpx 20rpx 0 0; */
			}
			&:last-child {
				/* border-radius: 0 0 20rpx 20rpx; */
			}

			.left {
				display: flex;
				flex-direction: column;
				
				.left_cz_text{
					.left_cz_text_s1{
						font-size: 30rpx;
						font-weight: bold;
						color: #333333;
						margin-bottom: 20rpx;
					}
					.left_cz_text_s2{
						color:red;
						margin-left: 15rpx;
					}
				}
				.left_cz_text2{
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
				}
				view {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					margin-bottom: 20rpx;
				}

				text {
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
				}
			}

			.right {
				font-size: 26rpx;
				text-align: right;

				view {
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #5AA91A;
					margin-bottom: 20rpx;
				}

				span {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
</style>
