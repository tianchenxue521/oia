<template>
	<view class="root">
		<u-navbar title="日益宝收益" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false" :height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true" :show-loading-more-no-more-view="false">
			<view class="item dfb" v-for="(item,index) in dataList" :key="index">
				<view class="left">
					<view class="title">
						<text>日益宝收益</text>
					</view>
					<view class="time">{{item.create_at}}</view>
				</view>
				<view class="right dfa">
					<text style="color: #E02020;">+{{item.amount}}</text>
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
			async queryList(pageNo, pageSize) {
				var data = {
					page: pageNo,
					type:10,
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("get_box_money", data);
				if (res.code == 1) {
					uni.hideLoading();
					this.$refs.paging.complete(res.data);
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
				}
				&:last-child {
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
