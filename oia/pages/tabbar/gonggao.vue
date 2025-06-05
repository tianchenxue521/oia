<template>
	<view>
		<view class="content">
			<!-- <u-navbar :title="title" :placeholder="true" :autoBack="true" bgColor="#fff"></u-navbar> -->
			<u-navbar :title="title" :placeholder="true" :autoBack="true" 
			bgColor="#222" 
			title-style="color:#FFF;"
			leftIconColor="#FFF">
			</u-navbar>
			<view class="zixun_content" v-html="info.content"></view>
			<!-- <view class="zixun_time">{{info.create_at}}</view> -->
		</view>
	</view>
</template>

<script>
	import {baseApi} from "@/utils/config"
	export default {
		data() {
			return {
				id: '',
				info: {},
				/* cover: '', */
				title: ''
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.itemInfo();
			this.set_gong_kan();
		},
		methods: {
			async itemInfo(){
				var that = this;
				var params = {
					id: this.id
				}
				uni.showLoading({
					title: '',
					mask: true
				})
				let res = await this.$store.dispatch("get_gongs", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.info = res.data.records[0];
					this.title = res.data.records[0].title;
					/* this.cover = baseApi + res.data.cover */
				}
			},
			async set_gong_kan(){
				var that = this;
				var params = {
					id: this.id
				}
				let res = await this.$store.dispatch("set_gong_kan", params);
				if (res.code == 1) {
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 24rpx 30rpx;
	}

	.zixun_title {
		margin: 0 24rpx;
		color: #333333;
		font-size: 40rpx;
	}

	.zixun_img {
		margin: 0 24rpx;
	}

	.zixun_img image {
		width: 100%;
		margin-top: 24rpx;
	}

	.zixun_content {
		font-size: 32rpx;
	}

	.zixun_time {
		margin: 0 24rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #cdcdcd;
		font-size: 24rpx;
	}
</style>
<style scoped>
    .zixun_content >>> img{
       width: 100% !important;
    }
	::v-deep .u-navbar__content__title {
			width: auto!important;
			padding: 0 160rpx !important;
			white-space:nowrap; 
			text-overflow:ellipsis; 
			-o-text-overflow:ellipsis; 
			overflow: hidden; 
	}
</style>
