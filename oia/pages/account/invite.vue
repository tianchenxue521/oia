<template>
	<view id="invite">
		<view class="invite_top">
			<!-- <view class="forg_return" @tap="goBack()">
				<u-icon name="arrow-left" color="#333" :bold="true" size="20"></u-icon>
			</view>
			<view class="invite_t1">
				<image mode="widthFix" src="../../static/images/other/invite_t1.png" />
			</view>
			<view class="invite_t2">成功邀请好友将领取福利</view>
			<view class="invite_bg">
				<view class="invite_bg_ma">{{userinfo.invite_code}}</view>
				<view class="invite_bg_btn" @tap="copyInvite">复制邀请码</view>
				<view v-for="(item,index) in link" @click="lankcopy(item.content)" :key="index">
					<view class="invite_bg_copy" v-if="index==0">
						<view class="invite_bg_copy_lf">{{item.name}}</view>
						<image class="invite_bg_copy_rg" mode="widthFix" src="../../static/images/other/icin_copy@2x.png"/>
					</view>
				</view>
			</view>
			<view class="invite_di">
				<image mode="widthFix" src="../../static/images/other/gdgz.png"/>
			</view> -->
			
			<view style="position: absolute;z-index: 10;top: 0;width: 100%;padding: 40rpx 0 0 40rpx;" @tap="goBack()">
				<image mode="widthFix" src="../../static/images/productdetail/return.png" style="width: 50rpx;"/>
			</view>
			<image mode="widthFix" src="../../static/images/img/6_bg_topbg.png" style="width: 100%;"/>
			<view style="background: url('../../static/images/img/6_bg_bottombg.png') no-repeat;background-size: 100%;height: 1000rpx;margin-top: -20rpx;">
				<view style="text-align: center;color: #FFCC94;font-size: 50rpx;padding-top: 100rpx;">
					{{userinfo.invite_code}}
				</view>
				<view @tap="copyInvite" style="text-align: center;background: linear-gradient(90deg, #4D4435 0%, #2B2825 100%);height: 70rpx;width: 40%;margin-left: 30%;margin-top: 40rpx;border-radius: 70rpx;line-height: 70rpx;color: #FFF;font-size: 30rpx;">
					点击复制邀请码
				</view>
			</view>
			<image mode="widthFix" src="../../static/images/img/6_bg_banner.png" style="width: 100%;"/>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{},//用户信息
				bgcolor:"transparent",
				link:[],
			}
		},
		onLoad() {
			this.getLink();
			this.getuser();
		},
		onShow(){
			
		},
		methods: {
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo = res.data;
				}
			},
			
			async getLink(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("getLink", params);
				if (res.code == 1) {
					this.link = res.data;
				}
			},
			
			copyInvite() { //复制邀请码
				let that = this;
				uni.setClipboardData({
					data: that.userinfo.invite_code,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
					}
				});
			},
			
			lankcopy(lxx){//复制链接地址
			let that = this;
				uni.setClipboardData({
					data: lxx,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
					}
				});
					
			},
			
			//返回
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
	#invite{
		background: #222;
		height: 100vh;
		overflow-y: scroll;
		.invite_top{
			/* background: url('../../static/images/other/invite_top.png') no-repeat;
			background-size: 100% 100%;
			height: 1020rpx; */
			.forg_return{
				display: flex;
				align-items: center;
				position: absolute;
				left: 40rpx;
				top:70rpx;
			}
			
			.invite_t1{
				margin: 0 58rpx 0 82rpx;
				padding-top: 140rpx;
				image{
					width: 100%;
				}
			}
			.invite_t2{
				font-size: 36rpx;
				color: #1353CB;
				display: flex;
				justify-content: center;
				padding-top: 34rpx;
				font-weight: bold;
			}
			
			.invite_bg{
				background-size: 100% 100%;
				height: 909rpx;
				.invite_bg_ma{
					padding-top: 450rpx;
					display: flex;
					justify-content: center;
					font-size: 50rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
				
				.invite_bg_btn{
					background: url('../../static/images/other/invite_top_btn.png') no-repeat;
					background-size: 100% 100%;
					height: 90rpx;
					margin: 0 120rpx;
					font-size: 32rpx;
					color: #FFFFFF;
					font-weight: bold;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 133rpx;
				}
				.invite_bg_copy{
					display: flex;
					align-items: center;
					justify-content: center;
					padding-top: 43rpx;
					.invite_bg_copy_lf{
						font-size: 26rpx;
						color: #333333;
					}
					.invite_bg_copy_rg{
						width: 25rpx;
						margin-left: 7rpx;
					}
				}
		
			}
			.invite_di{
				margin: 0 75rpx;
				padding-bottom: 60rpx;
				image{
					width: 100%;
				}
			}
			
		}
	}
</style>