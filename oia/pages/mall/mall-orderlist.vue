<template>
	<view class="root">
		<!-- <u-navbar title="兑换记录"  :placeholder="true" :autoBack="true" bgColor="#F3F3F3" :titleStyle="{color:'#333',fontWeight: 'bold'}"></u-navbar> -->
		<u-navbar title="兑换记录" :placeholder="true" :autoBack="true" bgColor="#222" title-style="color:#FFF;"
			leftIconColor="#FFF">
		</u-navbar>
		<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false"
			:height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true">
			<view class="item" v-for="(item,index) in dataList" :key="item.id + 'xaa'">
				<view class="header dfb bb">
					<view class="">订单号：{{item.code}}</view>
					<text class="">{{item.stutas==1?'审核中':'兑换成功'}}</text>
				</view>
				<view class="content dfa bb">
					<image :src="item.cover" mode=""></image>
					<view class="">
						{{item.name}}
					</view>
				</view>
				<view class="footer dfb">
					<text>{{item.create_at}}</text>
					<view class="">{{item.amount}}积分</view>
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
				topHeight: 0,
				dataList: [],

			}
		},
		onLoad() {
			uni.getSystemInfo({ //获取滚动高度
				success: (res) => {
					// 可使用窗口高度，将px转换rpx
					// #ifdef H5
					this.topHeight = res.windowHeight - uni.upx2px(120)
					// #endif

					// #ifdef APP-PLUS
					this.topHeight = res.windowHeight - uni.upx2px(100);
					// #endif

				},

			})
		},
		onShow() {
			//this.mrpOrderList()
		},
		methods: {
			async queryList(pageNo, pageSize) {
				var that = this;
				var params = {
					page: pageNo
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("OrderList", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.$refs.paging.complete(res.records);
				}
			},


			//获取列表
			async mrpOrderList(page) { //获取订单
				let that = this;
				let params = {
					page: page,
				}
				let res = await this.$store.dispatch("OrderList", params);
				if (res.code == 1) {
					this.count = res.count;
					this.amount = res.amount;
					// 数据总条数
					this.total = res.count
					if (this.page == 1) {
						// 如果是第一页,直接赋值
						this.list = res.records
					} else {
						// 如果不是第一页,就数组拼接
						this.list = this.list.concat(res.records)
					}
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.root {
		background: #F3F3F3;
		padding: 0 0 30rpx 0;

		.item {
			// width: 100%;
			background: #fff;
			padding: 0 26rpx;
			margin-bottom: 50rpx;
			.header {
				padding: 20rpx 0;
				text {
					color: #666;
				}
			}

			.content {
				padding: 20rpx 0;
				align-items: flex-start;

				image {
					width: 150rpx;
					height: 150rpx;
					margin-right: 30rpx;
					flex-shrink: 0;
				}

				view {
					line-height: 38rpx;
					font-size: 28rpx;
					color: #000;
				}
			}

			.footer {
				padding: 20rpx 0;

				text {
					font-size: 26rpx;
				}

				view {
					font-size: 30rpx;
					color: #EB3731;
					font-weight: bold;
				}
			}
		}

		.bb {
			border-bottom: solid 1rpx #d8d8d8;
		}

		.dfb {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>