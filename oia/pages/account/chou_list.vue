<template>
	<view class="root">
		<u-navbar title="抽奖记录" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<view>
			<view class="item dfb" v-for="(item,index) in list" :key="index">
				<view class="left">
					<view class="left_cz_text">
						<text class="left_cz_text_s1">{{item.name}}</text>
					</view>
					<text class="left_cz_text2">{{item.create_at_date}}</text>
				</view>
				<view class="right">
					<view style="color: #f1a532;">￥{{item.money}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				topHeight:0,
				list: [],
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
		onLoad() {
			this.lun_order_list();
		},
		methods: {
			async lun_order_list() {
				var that = this;
				var params = {
					type: 0
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("get_lunOrderList", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.list = res.data;
				}
			}
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
