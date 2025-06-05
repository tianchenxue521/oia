<template>
	<view id="piggy">
		<u-navbar title="日益宝" leftIconColor="#fff" @rightClick="piggylDetail()" :placeholder="true" :autoBack="true" bgColor="#222" :titleStyle="{fontWeight: 'bold',color:'#fff'}">
			<view class="unavslot-right" slot="right">收益记录</view>
		</u-navbar>
		
		<view class="piggy_bg">
			<view class="piggy_bgs">
				<view class="mailllist_title_lf">
					<view  class="mailllist_title_lf_lf">日益宝余额</view>
					<image class="mailllist_title_rg" @tap="moneyEyes=!moneyEyes" mode="widthFix" src="../../static/images/mall/eye2.png"/>
				</view>
				<view class="mailllist_title">
					<view class="mailllist_money" v-if="!moneyEyes">{{money_box}}</view>
					<view class="mailllist_money"  v-if="moneyEyes">****</view>
				</view>
				
				<!-- <view class="piggy_bg_btn">
					<view class="piggy_bg_btnk_lf" :class="{'actives': paytype==1 }" @tap="paytype=1">转入</view>
					<view class="piggy_bg_btnk_rg"  :class="{'actives': paytype==2 }"  @tap="paytype=2">转出</view>
				</view> -->
			</view>
		</view>
		
		<view style="padding: 15px 0px;border-radius: 0 0 15px 15px;background-color: #FFF;margin: 0 30rpx;box-shadow: 0px 3px 15px 0px rgba(0,0,0,0.1);">
			<view style="display: flex;align-items: center;text-align: center;">
				<view style="width: 50%;" class="piggy_bg_btnk_lf" :class="{'actives': paytype==1 }" @tap="paytype=1">转入</view>
				<view style="width: 1px;height: 28rpx;background-color: #EBEBEB;"></view>
				<view style="width: 50%;" class="piggy_bg_btnk_rg"  :class="{'actives': paytype==2 }"  @tap="paytype=2">转出</view>
			</view>
		</view>
		
		<view class="piggy_zt" style="margin-top: 40rpx;padding-top: 0px;">
			<view class="amount">
				<view class="amount-text" v-show="paytype===1" style="color: #7C838D;">
					转入
				</view>
				
				<view class="amount-text" v-show="paytype===2" style="color: #7C838D;">
					转出
				</view>
				<view class="amount-number">
					<input type="number" class="input-number" v-model="values" placeholder="请输入金额"
						placeholder-style="font-size:30rpx" style="height: 100rpx;">
				</view>
			</view>
			<view class="prompt">
				<view style="color: #999999;">日益宝收益规则: 日益宝最低转入金额100元，存入满24小时才有收益，每日0点结算收益，用户可以随时转出，存入未满24小时中途转出，不产生收益、结算前转出不产生收益。</view>
				<view style="color: #F00;font-weight: 500;font-size: 28rpx;margin-top: 40rpx;">日益宝日收益率：{{lv}}%</view>
			</view>
			<view class="footer_body">
				<view class="btn_shadows mgt24" @click="ok">确 认</view>
			</view>
		</view>
		

		
		<u-popup :show="show" @close="show=false" round="10" mode='center'>
			<view class="shuru">
				<text>请输入密码</text>
				<text v-if="paytype==1">转入到日益宝</text>
				<text v-else>转出到余额</text>
				<text>￥{{values}}</text>
				<view class="ipts">
					<u-code-input dot v-model="pwds" :focus="true" :maxlength="6" @finish="finish"></u-code-input>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				paytype: 1,
				values: '',
				pwds: '',
				money_box: 0,
				ifCk: false,
				moneyEyes: false,
				lv: 0,
			}
		},
		onLoad() {
			this.getuser();
			this.get_lv();
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			ok() {
				if (this.values === '' || this.values < 100) {
					uni.showToast({
						title: '操作金额最低为100元',
						icon: 'none'
					})
					return
				}
				this.show = true
				this.pwds = ''
			},
			
			//日益宝日收益率
			async get_lv(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("get_box_ratio", params);
				if (res.code == 1) {
					this.lv = res.data;
				}
			},
			
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.money_box = (parseInt(res.data.money_box * 100) / 100).toFixed(2);
					console.log(this.money_box)
				}
			},
			ck() {
				this.ifCk = !this.ifCk
			},
			async finish(pwd) {
				uni.showLoading({
					title: '处理中'
				})
				let params = {
					paytype: this.paytype,
					amount: this.values,
					passkey: pwd,
				}
				let res = await this.$store.dispatch("orderBoxOrder", params);
				if(res.code==1){
					uni.$u.toast('处理成功');
					this.values = "";
					this.show = false;
					uni.hideLoading();
					this.getuser()
				}else{
					uni.$u.toast(res.info);
					this.pwds = ''
					uni.hideLoading();
					
				}
			},
			
			//收益记录
			piggylDetail(){
				uni.navigateTo({
					url: '/pages/piggy-bank/piggy-detail'
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	#piggy {
		width: 100%;
		background: #F7F7F7;
		height: 100vh;
		.unavslot-right{
			color: #fff;
			font-size: 28rpx;
		}
		.piggy_bg{
			background: linear-gradient(180deg, #222222 0%, #222222 100%);
			background-size: 100% 100%;
			padding-top: 60rpx;
			.piggy_bgs{
				background: url('../../static/images/img/1-5_bg_productbg.png') no-repeat;
				background-size: 100%;
				height: 260rpx;
				margin: 0 24rpx;
			}
			
			.mailllist_title_lf{
				font-size: 30rpx;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 40rpx;
				.mailllist_title_lf_lf{
					
				}
				.mailllist_title_rg{
					width: 30rpx;
					margin-left: 20rpx;
				}
			}
			.mailllist_title{
				display: flex;
				align-items: center;
				padding-top: 36rpx;
				justify-content: center;
				.mailllist_money{
					font-size: 48rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
			.mailllist_title2{
				font-size: 30rpx;
				font-weight: 400;
				color: #FFFFFF;
				padding-top: 46rpx;
				padding-left: 60rpx;
			}
			
			
			.piggy_bg_btn{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 112rpx;
				margin-top: 44rpx;
			}
			.piggy_bg_btnk_lf{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 12rpx 55rpx;
				font-size: 32rpx;
				font-weight: bold;
				border-radius: 30px;
				color: #fff;
				border:2rpx solid #fff
			}
			.piggy_bg_btnk_rg{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 12rpx 55rpx;
				font-size: 32rpx;
				font-weight: bold;
				border-radius: 30px;
				color: #fff;
				border:2rpx solid #fff
			}
			
			.actives{
				background-color: #fff!important;
				color: #602BF9!important;
			}
			
			

		}
		
		.piggy_zt{
			background-color: #F7F7F7;
			margin-top: -30rpx;
			padding-top: 44rpx;
		}

		
		.amount {
			padding: 50rpx 0rpx 24rpx 30rpx;
			margin: 0 30rpx 0 30rpx;
			background-color: #FFF;
			border-radius: 30rpx;
			box-shadow: 0px 3px 15px 0px rgba(0,0,0,0.1);
			.amount-text {
				font-size: 36rpx;
				color: #000000;
		
			}
			
		
			.amount-number {
				display: flex;
				align-items: baseline;
				margin-top: 30rpx;
				font-size: 50rpx;
		
				.input-number {
					width: 500rpx;
					height: 100rpx;
					font-size: 50rpx;
					font-weight: bold;
				}
			}
		}
		
		.prompt {
			padding: 0rpx 50rpx;
			color: #626262;
			margin: auto;
			font-size: 24rpx;
			margin-top: 30rpx;
		
		}
		
		.footer_body {
			flex: 1;
			padding: 24rpx 30rpx 80rpx 30rpx;
			display: flex;
			align-items: flex-end;
		}
		
		.btn_shadows{
			background: linear-gradient(90deg, #FFDEAE 0%, #D7B68D 100%);
			height: 96rpx;
			font-size: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #000;
			margin-top: 120rpx;
			width: 100%;
			border-radius: 30px;
		}
		
		.shuru {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 18rpx;
			border-radius: 20rpx;
		
			text {
				&:nth-child(1) {
					font-size: 36rpx;
					font-weight: bold;
				}
		
				&:nth-child(2) {
					font-size: 26rpx;
					color: #333;
					font-weight: 400;
					margin-top: 30rpx;
				}
		
				&:nth-child(3) {
					font-size: 40rpx;
		
					font-weight: bold;
					margin-top: 30rpx;
				}
			}
		
			.ipts {
				margin-top: 24rpx;
				margin-bottom: 24rpx;
		
				::v-deep .u-code-input {
					.u-code-input__item {
						border-radius: 8rpx;
						background-color: #F1F1F1;
						border: none !important;
					}
				}
			}
		}
	}
</style>
