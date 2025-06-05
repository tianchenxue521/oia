<template>
	<view class="main_auto">
		<u-navbar title="公告" :placeholder="true" @rightClick="openQd()" :autoBack="true" 
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<view class="news_item" v-for="(item, index) in list" :key="index" @tap="toSwiper(item.id)">
			<!-- <image class="news_right" :src="item.cover"></image> -->
			<view class="news_left">
				<view style="display: flex;justify-content: space-between;">
					<view class="news_left_title">{{item.title}}</view>
					<view style="background: #f00;width: 20rpx;height: 20rpx;border-radius: 50%;" v-if="item.is_sees == 1"></view>
				</view>
				<view class="news_left_lable" style="margin-top: 20rpx;">
					<text>{{item.create_ats}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseApi} from "@/utils/config"
	export default {
		data() {
			return {
				list: []
			}
		},
		onShow() {
			this.getNews()
		},
		methods: {
			// 获取新闻列表
			async getNews() {
				var that = this;
				var params = {}
				uni.showLoading({
					title: ''
				});
				let res = await this.$store.dispatch("get_gong", params);
				if (res.code == 1) {
					that.list = res.data.records;
					uni.hideLoading();
				}else{
					uni.hideLoading();
				}
			},
			
			toSwiper(rule) {
				uni.navigateTo({
					url: '/pages/tabbar/gonggao?id=' + rule,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main_auto {
		background: #f5f5f5;
		height: 100vh;
		overflow-y: scroll;

		.news_item {
			background: #fff;
			margin-bottom: 24rpx;
			padding: 16rpx 24rpx;
			display: flex;

			.news_left {
				margin-left: 16rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.news_left_title {
					font-size: 32rpx;
					color: rgba(51, 51, 51, 1);
					font-weight: 500;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden; //溢出内容隐藏
					text-overflow: ellipsis; //文本溢出部分用省略号表示
					display: -webkit-box; //特别显示模式
					-webkit-line-clamp: 2; //行数
					line-clamp: 2;
					-webkit-box-orient: vertical; //盒子中内容竖直
				}

				.news_left_lable {
					display: flex;
					font-size: 24rpx;
					color: rgba(153, 153, 153, 1);
					align-items: center;
					justify-content: space-between;
					.state {
						padding: 8rpx 17rpx;
						margin-right: 16rpx;
						background: #FFE3B1;
						border-radius: 10rpx;
						color: #222;
						font-size: 24rpx;
					}
				}
			}


			.news_right {
				border-radius: 16rpx;
				width: 220rpx;
				height: 160rpx;
			}
		}
	}
</style>
