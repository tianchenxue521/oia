<template>
	<view class="root">
		<!-- <u-navbar title="资金记录" :placeholder="true" :autoBack="true" bgColor="#F3F3F3" :titleStyle="{color:'#333',fontWeight: 'bold'}"></u-navbar> -->
		<u-navbar title="交易记录" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
			<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false" :height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true" :show-loading-more-no-more-view="false" >
				<view class="item dfb" v-for="(item,index) in dataList" :key="index">
					<view class="left">
						<view class="title">
							<text v-if="item.type==1">签到</text>
							<text v-if="item.type==2">活动奖励</text>
							<text v-if="item.type==3">{{item.name}}</text>
							<text v-if="item.type==4 && item.ri == 1">下{{item.from_user_lev}}级（{{item.from_user_real_name}}）每日共享收益</text>
							<text v-if="item.type==4 && item.ri != 1">下{{item.from_user_lev}}级（{{item.from_user_real_name}}）投资{{item.amount_total}}元奖励</text>
							<text v-if="item.type==5">{{item.name}}收回本金</text>
							<text v-if="item.type==6&&item.status==0">充值中</text>
							<text v-if="item.type==6&&item.status==1">充值成功</text>
							<text v-if="item.type==6&&item.status==2">充值失败</text>
							<text v-if="item.type==7">日益宝存入余额</text>
							<text v-if="item.type==8">注册奖励</text>
							<text v-if="item.type==10">日益宝收益</text>
							<!-- <text v-if="item.type==9"></text>
							<text v-if="item.type==10"></text> -->
							<text v-if="item.type==11&&item.status==0">提现中</text>
							<text v-if="item.type==11&&item.status==1">提现成功</text>
							<text v-if="item.type==11&&item.status==2">提现失败</text>
							<text v-if="item.type==12">购买{{item.name}}产品</text>
							<text v-if="item.type==13">手续费</text>
							<text v-if="item.type==14">扣除成功</text>
							<text v-if="item.type==15">余额取出到日益宝</text>
							<text v-if="item.type==16">实名认证奖励</text>
							<text v-if="item.type==17">完成任务奖励</text>
							<text v-if="item.type==88">投资{{item.name}}送额外红包奖励</text>
							<text v-if="item.type==99">投资{{item.name}}分红奖励</text>
							<text v-if="item.type==37">USDT充值奖励</text>
							<text v-if="item.type==100">{{item.name}}杠杆福利</text>
							<text v-if="item.type==55">{{item.name}}筹集失败</text>
							<text v-if="item.paytype == 5 || item.paystatus == 2" style="color:red;margin-left: 15rpx;">
								<text v-if="item.usdt" style="color:red;margin-left: 15rpx;">(USDT: {{item.usdt}})</text>
								<text v-else style="color:red;margin-left: 15rpx;">(USDT)</text>
							</text>
							<text v-if="item.type==31">购买{{item.name}}产品赠送额外单项总利息<text
									style="color: red; font-size: 26rpx; font-weight: 600; margin:0 8rpx;">{{item.amount/1}}元</text></text>
							<text style="color: red; font-size: 26rpx; font-weight: 600; margin:0 8rpx;" v-if="item.red_total/1>0"> (红包: +{{item.red_total}})</text>
							<text style="color: red; font-size: 26rpx; font-weight: 600;" v-if='item.dividend_total/1>0'> (分红: +{{item.dividend_total}}%)</text>
						</view>
						<view class="time">{{item.create_at}}</view>
						<view style="font-size: 27rpx; color:#979393;padding-top: 20rpx;" v-if="item.paytype == 5">  {{item.address ? '提现地址: '+item.address : '' }}</view>
						<view v-if="item.remarks" style="font-size: 28rpx;margin-top: 20rpx;color: #999;">
							{{item.remarks}}
						</view>
					</view>
					<view class="right dfa">
						<view style="text-align: right;">
							<text style="color: #E02020;" v-if="item.type==55">+{{item.amount}}</text>
							<text style="color: #E02020;" v-else-if="item.type==100">+{{item.amount}}</text>
							<text style="color: #888;" v-else-if="(item.type==6||item.type==11)&&item.status==2">{{item.amount}}</text>
							<text style="color: #E02020;" v-else-if="item.type==16 || item.type==88|| item.type==99|| item.type==17">
								+{{item.amount}}</text>
							<text v-else-if="item.type == 12 && item.chou_money > 0">
								-{{item.amount - item.chou_money}}
							</text>
							<text v-else-if="item.type>10||item.type==11&&item.status>=2">
								-{{item.amount}}
							</text>
							<text v-else-if="item.type==6&&item.status==1&&item.amounts > 0" style="color: #FF5B5B;">+{{item.amount + (item.amounts * 1)}}</text>
							<text v-else style="color: #FF5B5B;">+{{item.amount}}</text>
						</view>
						
						<view v-if="item.type==6&&item.status==1&&item.amounts > 0" style="font-size: 28rpx;margin-top: 20rpx;color: #999;">
							充值金额{{item.amount}} 赠送{{item.amounts}}
						</view>
						<view v-if="item.type == 12 && item.chou_money > 0" style="font-size: 28rpx;margin-top: 20rpx;color: #999;">
							使用优惠券{{item.chou_money}}
						</view>
					</view>
				</view>
			</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				total: 0,
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
			//this.getList()
		},
		methods: {
			loadMore() {
				if (this.list.length < this.total) {
					this.page++
					this.getList()
				} else {
					// this.$u.toast('没有更多数据了~');
				}
			},
			async queryList(pageNo, pageSize) {
				var data = {
					page: pageNo,
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
			.item {
				padding: 30rpx;
				background: #FFFFFF;
				border-top: 20rpx solid #F6F6F6;
				&:nth-child(1) {
					border-top:none!important;
					/* border-radius: 20rpx 20rpx 0 0; */
				}
				&:last-child {
					/* border-radius: 0 0 20rpx 20rpx; */
				}
				.left {
					flex: 1;
					width: 460rpx;

					.title {
						font-size: 28rpx;
						font-weight: 500;
						color: #192040;
						font-weight: bold;
						// overflow: hidden;
						// white-space: nowrap;
						// text-overflow: ellipsis;
						width: 100%;
					}

					.time {
						font-size: 24rpx;
						font-weight: 400;
						color: #656565;
						margin-top: 20rpx;
					}
				}

				.right {
					
					color: #5DA72D;
					line-height: 1;
					align-items: flex-end;
					margin-left: 30rpx;

					text {
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 3rpx;
					}
				}
			}
	

		.dfb {
		    display: flex;
		    align-items: center;
		    justify-content: space-between;
		}

	}
</style>
