<template>
	<view class="common_footer">
		<!-- <image class="logo" src="../../static/images/tabbar/footer_logo.png"></image> -->
		<view class="footer_title">Oman Investment Authority</view>
		<text class="footer_label">—— &nbsp;&nbsp;&nbsp;财富在这里&nbsp;&nbsp;&nbsp; ——</text>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			};
		}
	};
</script>

<style lang="scss" scoped>
	.common_footer {
		padding: 40rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F2F3F5;

		.logo {
			width: 60rpx;
			height: 60rpx;
		}

		.footer_title {
			font-size: 32rpx;
			font-weight: bold;
			color: #CACACA;
			margin-top: 20rpx;
		}

		.footer_label {
			font-size: 22rpx;
			color: #CACACA;
			font-weight: 600;
			margin-top: 20rpx;
		}
	}
</style>