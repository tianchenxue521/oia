<template>
	<view class="main_auto">
		<!-- <view style="background: #222;color: #FFF;text-align: center;height: 88rpx;font-size: 32rpx;position: fixed;width: 100%;line-height: 88rpx;">
			投资列表
		</view> -->
		<view style="background: url('../../static/images/invest/2-1_bg_banner.png') no-repeat;
		background-size: 100%;height: 450rpx;"></view>
		
		<view style="background: #F7F7F7;padding: 0 30rpx;margin-top: -65rpx;border-radius: 50rpx 50rpx 0 0;padding-top: 30rpx;">
			<view style="margin-left: 10rpx;display: flex;margin-bottom: 30rpx;">
				<view style="width: 8rpx;height: 34rpx;border-radius: 4rpx;background: #CD7F00;margin-right: 12rpx;margin-top: 8rpx;"></view>
				<view style="font-size: 34rpx;font-weight: 600;color: #333333;">为您推荐</view>
			</view>
			<view style="display: flex;justify-content: space-between;">
				<image mode="widthFix" src="../../static/images/invest/2-1_card_futures.png" style="width: 31%;background: #FFFAE8;border-radius: 18rpx;
box-shadow: 0rpx 3rpx 15rpx 0rpx rgba(0,0,0,0.1);" @click="go_invest(1)"/>
				<image mode="widthFix" src="../../static/images/invest/2-1_card_fund.png" style="width: 31%;background: #FFFAE8;border-radius: 18rpx;
box-shadow: 0rpx 3rpx 15rpx 0rpx rgba(0,0,0,0.1);" @click="go_invest(3)"/>
				<image mode="widthFix" src="../../static/images/invest/2-1_card_stock.png" style="width: 31%;background: #FFFAE8;border-radius: 18rpx;
box-shadow: 0rpx 3rpx 15rpx 0rpx rgba(0,0,0,0.1);" @click="go_invest(4)"/>
			</view>
		</view>
		<view style="padding: 30rpx;margin-top: 37rpx;">
			<view style="display: flex;">
				<view :class="top_v == index ? 'top_an':'top_an0'" v-for="(item, index) in list" :key="index" @click="invest(index,item.type)">
					<span>{{item.name}}</span>
				</view>
			</view>
		</view>
		
		<view style="padding: 0 30rpx;">
			<view style="background: #FFFFFF;box-shadow: 0rpx 3rpx 15rpx 0rpx rgba(0,0,0,0.1);border-radius: 18rpx;padding: 34rpx 30rpx 10rpx 30rpx">
				<view style="display: flex;color: #999999;font-size: 30rpx;margin-bottom: 30rpx;">
					<view style="width: 50%;">名称</view>
					<view style="width: 25%;text-align: center;">周期</view>
					<view style="width: 25%;text-align: center;">利率</view>
				</view>
				<view style="height: 25rpx;background-image: linear-gradient(#f5f5f5, #FFF);border-radius: 0 0 25rpx 25rpx;margin-bottom: 10rpx;"></view>
				<view v-for="(item, index) in goods_list" :key="index" v-if="index < 5" style="display: flex;color: #333;font-size: 28rpx;margin-bottom: 40rpx;" @tap="goDetail(item.id,item.de_total,item.total,item.name,item.tname,item.status)">
					<view style="width: 50%;" class="text_1_c">{{item.name}}</view>
					<view style="width: 25%;text-align: center;" v-if="item.days != -1 && item.tally_rate != 100">{{item.days}}天</view>
					<view style="width: 25%;text-align: center;" v-else>{{item.day}}天</view>
					<view style="width: 25%;text-align: center;color: #F54949;" v-if="item.percents != -1 && item.tally_rate != 100">{{item.percents}}%</view>
					<view style="width: 25%;text-align: center;color: #F54949;" v-else>{{item.percent}}%</view>
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
				top_v: 0,
				status: 1,
				goods_list: [],
			}
		},
		onLoad() {
			this.newsProductList();
			this.queryList();
		},
		methods: {
			async queryList(){
				var that = this;
				var params = {
					type: this.status
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("newsGoodsTwo", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.goods_list = res.data;
				}
			},
			//获取商品列表
			async newsProductList(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("newsProductList", params);
				if (res.code == 1) {
					const listArray = Object.keys(res.data).map(key => {
						return {
							type: key,
							name: res.data[key]
						};
					});
					this.list = listArray;
				}
			},
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
			invest(index,type){
				this.top_v = index;
				this.status = type;
				this.queryList();
			},
			go_invest(x){
				uni.navigateTo({
					url: '/pages/tabbar/invest?id='+x
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top_an{
		width: 165rpx;
		height: 54rpx;
		text-align: center;
		background: linear-gradient( 270deg, #C7A66D 0%, #DABA83 100%);
		border-radius: 27rpx;
		margin-right: 20rpx;
		span{
			line-height: 54rpx;
			color: #FFF;
			font-size: 26rpx;
		}
	}
	.top_an0{
		width: 165rpx;
		height: 54rpx;
		text-align: center;
		background: #FFF;
		border-radius: 27rpx;
		margin-right: 20rpx;
		span{
			line-height: 54rpx;
			color: #000;
			font-size: 26rpx;
		}
	}
	.text_1_c {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden; //溢出内容隐藏
		text-overflow: ellipsis; //文本溢出部分用省略号表示
		display: -webkit-box; //特别显示模式
		-webkit-line-clamp: 1; //行数
		line-clamp: 2;
		-webkit-box-orient: vertical; //盒子中内容竖直
	}
	.main_auto {
		background: #f5f5f5;
		height: 100vh;
		overflow-y: scroll;
	}
</style>
