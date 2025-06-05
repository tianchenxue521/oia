<template>
	<view>
		<web-view :src="urls" :update-title="false"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls: ''
			}
		},
		onShow() {
			this.getKefu()
		},
		methods: {
			async getKefu(){
				var that = this;
				uni.showLoading({
					title: '加载中'
				})
				var params = {}
				let res = await this.$store.dispatch("kefuMessage", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.urls = res.data.kefu;
				}
			},
			
		}
	}
</script>

<style lang='scss' scoped>
	page {
		height:100vh;
	}
</style>
