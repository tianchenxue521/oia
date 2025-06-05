<template>
	<view class="main_hidden">
		<!-- <u-navbar title="我的投资" :placeholder="true" :autoBack="true" bgColor="#F3F3F3" ></u-navbar> -->
		<u-navbar title="我的投资" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false" :height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true" :show-loading-more-no-more-view="false">
			<view class="item" v-for="(item,index) in dataList" :key="index" @tap="toContract(item,item.tally_type,item.status)">
				<view v-if="item.status==0 && item.tally_type != 1" class="tag2">筹集中</view>
				<view v-if="item.status==0 && item.tally_type == 1" class="tag2">投资中</view>
				<view class="tag" v-if="item.status == 2">筹集失败</view>
				<view class="tag" v-if="item.status == 3">已结束</view>
				<view class="xt_cp_title">{{item.name}}
					<!-- <text>{{item.name}}</text>
					<view class="state"></view> -->
				</view>
				<view class="xp_bottom">
					<view class="b_item">
						<text class="title1" v-if="item.percents != -1 && item.tally_type != 1 && item.status==0">{{item.percents}}%</text>
						<text class="title1" v-else>{{item.percent}}%</text>
						<text class="label" v-if="item.tally_rate != 100 && item.p_type == 1 && item.status==0 && item.tally_type != 1">预计收益</text>
						<text class="label" v-else>日均收益率</text>
					</view>
					<view class="b_item">
						<text class="title2" v-if="item.days != -1 && item.tally_type != 1 && item.status==0">{{item.days}}天</text>
						<text class="title1" v-else>{{item.day}}天</text>
						<text class="label" v-if="item.tally_rate != 100 && item.p_type == 1 && item.status==0 && item.tally_type != 1">预计周期</text>
						<text class="label" v-else>周期</text>
					</view>
					<view class="b_item">
						<text class="title2">{{item.amount}}元</text>
						<text class="label">起投金额</text>
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
				let res = await this.$store.dispatch("orderOrderList", data);
				if (res.code == 1) {
					uni.hideLoading();
					this.$refs.paging.complete(res.records);
				}
			},
			toContract(info,y,status) {
				if(status == 2){
					return;
				}
				if(y == 2){
					return;
				}
				uni.navigateTo({
					url: `/pages/common/contract?item=${encodeURIComponent(JSON.stringify(info))}`,
				})
			},
		}
	}
</script>
<style scoped lang="scss" >
	.main_hidden {
		background: #F3F3F3;
		width: 100%;
		.item {
			padding: 24rpx 30rpx;
			background: #fff;
			position: relative;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			&:nth-child(1) {
				margin-top: 20rpx;
			}

			.tag {
				width: 15%;
				font-size: 25rpx;
				color: white;
				text-align: center;
				padding: 5rpx;
				position: absolute;
				right: 0rpx;
				background: #999;
				top: 0rpx;
				border-radius: 0 16rpx 0 16rpx;
			}

			.tag2 {
				font-size: 25rpx;
				color: #222;
				text-align: center;
				padding: 5rpx 24rpx;
				position: absolute;
				right: 0rpx;
				background: #FFE3B1;
				top: 0rpx;
				border-radius: 0 16rpx 0 16rpx;
			}

			.xt_cp_title {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				font-weight: bold;
				color: #000000;
				margin-top: 16rpx;

				.state {
					padding: 3rpx 12rpx;
					margin-left: 16rpx;
					border-radius: 10rpx;
					background: #E3E1E6;
					color: #A42C2D;
					font-weight: 400;
					font-size: 22rpx;
				}
			}

			.xp_bottom {
				display: flex;
				margin-top: 30rpx;

				.b_item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.label {
					font-size: 26rpx;
					color: #959595;
					margin-top: 24rpx;
				}

				.title1 {
					color: #DB2228;
					font-size: 36rpx;
					font-weight:bold;
					margin-top: -6rpx;
				}

				.title2 {
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>

