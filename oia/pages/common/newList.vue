<template>
	<view class="main_auto">
		<u-navbar title="新闻列表" :placeholder="true" @rightClick="openQd()" :autoBack="true" 
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<view class="news_item" v-for="(item, index) in list" :key="index" @tap="toSwiper(item.id)">
			<image class="news_right" :src="item.cover"></image>
			<view class="news_left">
				<view class="news_left_title">{{item.name}}</view>
				<view class="news_left_lable">
					<text>{{item.create_at}}</text>
					<text class="state">新闻有料</text>
				</view>
			</view>
		</view>
		<view class="news_item" v-for="(item, index) in list2" :key="index" @tap="toSwiper(item.id)">
			<image class="news_right" :src="item.cover"></image>
			<view class="news_left">
				<view class="news_left_title">{{item.name}}</view>
				<view class="news_left_lable">
					<text>{{item.create_at}}</text>
					<text class="state">新闻有料</text>
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
				list: [],
				list2: [],
			}
		},
		onLoad() {
			this.getNews()
		},
		methods: {
			// 获取新闻列表
			async getNews() {
				var that = this;
				var params = {
					type: 1,
				}
				uni.showLoading({
					title: ''
				});
				let res = await this.$store.dispatch("newsItem", params);
				if (res.code == 1) {
					let nlist = res.data.hou;
					let nlist2 = res.data.san;
					for (let i = 0; i < nlist.length; i++) {
						let maps = {
							cover: baseApi + nlist[i].cover,
							content: nlist[i].content,
							create_at: nlist[i].create_at,
							name: nlist[i].name,
							id: nlist[i].id,
						}
						this.list.push(maps);
					}
					for (let i = 0; i < nlist2.length; i++) {
						let maps2 = {
							cover: nlist2[i].cover,
							content: nlist2[i].content,
							create_at: nlist2[i].create_at,
							name: nlist2[i].name,
							id: nlist2[i].id,
						}
						this.list2.push(maps2);
					}
					uni.hideLoading();
				}else{
					uni.hideLoading();
				}
			},
			
			toSwiper(rule) {
				uni.navigateTo({
					url: '/pages/common/news?newsid=' + rule,
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
