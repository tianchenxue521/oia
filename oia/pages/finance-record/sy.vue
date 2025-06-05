<template>
	<view class="root">
		<!-- <u-navbar title="收益明细" :placeholder="true" :autoBack="true" bgColor="#F3F3F3" :titleStyle="{color:'#333',fontWeight: 'bold'}"></u-navbar> -->
		<u-navbar title="收益明细" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false" :height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true" :show-loading-more-no-more-view="false">
			<view class="item dfb" v-for="(item,index) in dataList" :key="index">
				<view class="left">
					<view class="title">
						<text v-if="item.type==1">签到</text>
						<text v-if="item.type==2">活动奖励</text>
						<text v-if="item.type==3">投资{{item.name}}收益</text>
						<text v-if="item.type==4">下{{item.from_user_lev}}级（{{item.from_user_real_name}}）购买<i
								class='red'>{{item.amount_total}}元</i>奖励</text>
						<text v-if="item.type==5">赎回投资产品</text>
						<text v-if="item.type==6&&item.status==0">充值中</text>
						<text v-if="item.type==6&&item.status==1">充值成功</text>
						<text v-if="item.type==6&&item.status==2">充值失败</text>
						<text v-if="item.type==7">日益宝存入余额</text>
						<text v-if="item.type==8"></text>
						<text v-if="item.type==9"></text>
						<text v-if="item.type==10">日益宝收益</text>
						<text v-if="item.type==11&&item.status==0">提现中</text>
						<text v-if="item.type==11&&item.status==1">提现成功</text>
						<text v-if="item.type==11&&item.status==2">提现失败</text>
						<text v-if="item.type==12">购买{{item.name}}产品</text>
						<text v-if="item.type==13">手续费</text>
						<text v-if="item.type==14">扣除金额</text>
						<text v-if="item.type==15">余额取出到日益宝</text>
						<text v-if="item.type==17">任务奖励</text>
						<text v-if="item.type==88">红包</text>
						<text v-if="item.type==31">购买{{item.reward_num}}次{{item.name}}产品赠送额外单项总利息{{item.amount/1}}元</text>
						<text v-if="item.type==99">分红</text>
						<text style="color: red; font-size: 26rpx; font-weight: 600; margin:0 8rpx;" v-if="item.red_total/1>0"> (红包: +{{item.red_total}})</text>
						<text style="color: red; font-size: 26rpx; font-weight: 600;" v-if='item.dividend_total/1>0'> (产品分红: +{{item.dividend_total}}%)</text>
					</view>
					<view class="time">{{item.create_at}}</view>
				</view>
				<view class="right two">+{{(item.amount/1).toFixed(2)}}</view>
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
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("teamEarnings", data);
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
				width: 360rpx;

				.title {
					font-size: 28rpx;
					font-weight: 500;
					color: #192040;
					font-weight: bold;
				}

				.time {
					font-size: 24rpx;
					font-weight: 400;
					color: #656565;
					margin-top: 20rpx;
				}
			}

			.right {
				font-size: 34rpx;
				font-weight: bold;
				line-height: 1;
				align-items: flex-end;
				margin-left: 30rpx;
				&.one {
					color: #5DA72D;
				}
				
				&.two {
					color: #FF5B5B;
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
