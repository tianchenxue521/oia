<template>
	<view id="defback">
		<!-- <u-navbar title="默认银行卡"  :placeholder="true" :autoBack="true" bgColor="#fff"></u-navbar> -->
		<u-navbar title="默认银行卡" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
			<view class="defback_zt">
				  <view class="defback_zlist" v-for="(bank, index) in bankList" :key="index"  @tap="setBank(bank.id,2)">
					
					   <view class="defback_zlist_rg">
						   <view class="dfz_rg_s">
							   <view class="dfz_rg_name">{{bank.issue_bank}}</view>
							   <view class="dfz_rg_num">
								   <view class="card_lf_btm_lf">****</view>
								   <view class="card_lf_btm_rg">{{bank.bank_num.substr(-4)}}</view>
							   </view>
						   </view>
						   
						   <view class="dfz_rg_del">
							   <view class="dfz_rg_del_btn" @tap.stop="setBank(bank.id,1)">删除</view>
						   </view>
						  <!-- <image class="dfz_rg_img" mode="widthFix" src="../../static/images/other/bankcard_bg.png"></image> -->
					   </view>
					   <image class="defback_zlist_lf"  v-if="bank.bank_status == 1" src="../../static/images/other/bank_yes.png"/>
					   <image class="defback_zlist_lf" v-else  src="../../static/images/other/bank_no.png"/>
				  </view>
			</view>
	</view>
</template>

<script>
	// import {
	// 	imGetBankList,
	// 	imSetBank
	// } from '@/libs/api.js'
	export default {
		components: {},
		data() {
			return {
				bankList: [],
				 options1: [{
					text: '删除'
				}]
			};
		},
		onReady() {

		},
		// onNavigationBarButtonTap(e) {
		// 	uni.navigateTo({
		// 		url: '/pages/my/back-add'
		// 	})
		// },
		onShow() {
			this.getList()
		},
		methods: {
			deletes(){
				console.log(111)
			},
			async getList(e) {
				if (e !== 1) {
					uni.showLoading({
						title: '加载中'
					})
				}
				let res = await this.$store.dispatch("imGetBankList", this.pwdinfo);
				if (res.code == 1) {
					uni.hideLoading();
					this.bankList = res.data;
				}
				
			},
			async setBank(id, type) {
				let params = {}
				if (type === 1) {
					params.id = id
					params.type = type
				} else {
					params.id = id
				}
				uni.showLoading({
					title: '处理中'
				})
				let res = await this.$store.dispatch("imSetBank", params);
				if (res.code == 1) {
					this.getList(1)
				}else{
					this.$u.toast(res.info);
				}
				// imSetBank(params).then(res => {
				// 	this.getList(1)
				// })
			}
		}
	};
</script>

<style scoped lang="scss">
	#defback{
		width: 100%;
		background: #fff;
		.defback_zt{
			padding-top: 30rpx;
		}
		.defback_zlist{
			display: flex;
			margin: 0 30rpx;
			align-items: center;
			margin-bottom: 30rpx;
			background: url('../../static/images/img/1-5_bg_productbg.png') no-repeat;
			background-size: 100% 100%;
			height: 300rpx;
			justify-content: space-between;
			padding-right: 36rpx;
		}
		.defback_zlist_lf{
			width: 52rpx;
			height: 52rpx;
		}
		.defback_zlist_rg{
			display: flex;
			flex-direction: column;
			padding-left: 53rpx;
		}
		.dfz_rg_img{
			width: 100%;
		}
		.dfz_rg_s{
			
		}
		.dfz_rg_name{
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 1;
		}
		.dfz_rg_num{
			padding-top: 45rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 1;
			display: flex;
			align-items: center;
			.card_lf_btm_lf{
				height: 36rpx;
				line-height: 42rpx;
				vertical-align: middle;
			}
			.card_lf_btm_rg{
				
			}
			
		}
	
		.dfz_rg_del{
			display: flex;
			.dfz_rg_del_btn{
				padding: 13rpx 39rpx;
				color: #ffff;
				border-radius: 30px;
				font-size: 30rpx;
				margin-top: 58rpx;
				border: 2rpx solid #FFFFFF;
			}
		}
		// <view class="dfz_rg_name">111</view>
		// <view class="dfz_rg_num">111</view>
	}
</style>
