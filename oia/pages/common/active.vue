<template>
	<view class="main">
		<!-- <u-navbar :title="name" :placeholder="true" :autoBack="true" bgColor="#fff"></u-navbar> -->
		<u-navbar :title="name" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<view class="tu">
			<image v-if="aboutUsInfo.cover" mode="widthFix" :src="aboutUsInfo.cover"></image>
		</view>
		<view class="as" v-if="aboutUsInfo.content" v-html="aboutUsInfo.content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				aboutUsInfo: ''
			}
		},
		onLoad(options) {
			this.name = options.name
			this.getBase()
		},
		methods: {
			async getBase(){
				let that = this;
				let params = {
					name: this.name
				}
				let res = await this.$store.dispatch("baseAbout", params);
				if (res.code == 1) {
					this.aboutUsInfo = res.data
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		// background-color: #f1f1ff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	}

	.tu image {
		width: 100%;
	}

	.name {
		padding-bottom: 30rpx;
	}
</style>
<style scoped>
    .as >>> img{
       width: 100% !important;
	   height: auto!important;
  }
</style>
