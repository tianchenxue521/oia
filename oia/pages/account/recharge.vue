<!-- 充值页 -->
<template>
	<view id="recharge">
		<view class="rechrges_s">
			<u-navbar title="充值" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="transparent"
				:titleStyle="{color:'#fff'}"></u-navbar>
		</view>
		<view class="body">
			<view class="amount">
				<view class="amount-text">金额</view>
				<view class="amount-number">
					<u--input placeholder="请输入充值金额" border="none" :clearable="true" v-model="drawalmoney" type="digit"
						fontSize="20" color="#000000" placeholderClass="aaa" v-if="paytype==4"></u--input>
					<u--input placeholder="请输入USDT数量" border="none" :clearable="true" v-model="drawalmoney" type="digit"
						fontSize="20" color="#000000" placeholderClass="aaa" v-if="paytype==5"></u--input>
				
				</view>
				<view class="recharge_type">
					<view class="recharge_type_lf" @tap="typeChoose(4)">
						<image v-if="paytype==4"  class="recharge_type_lf_img" src="../../static/images/img/1-5_icon_selected.png">
						<image v-else   class="recharge_type_lf_img" src="../../static/images/img/1-5_icon_Unselected.png"/>
						
						<view class="recharge_type_lf_text">人民币充值</view>
					</view>
					<view class="recharge_type_rg" @tap="typeChoose(5)">
						<image v-if="paytype==5" class="recharge_type_rg_img" src="../../static/images/img/1-5_icon_selected.png">
						<image v-else  class="recharge_type_rg_img" src="../../static/images/img/1-5_icon_Unselected.png"/>
						<view class="recharge_type_rg_text">USDT充值</view>
					</view>
				</view>
			</view>
			<view class="recharge_hsuan" v-if="paytype==5">当前汇率：1 USDT = ¥ {{fxrate}}</view>
			<view class="recharge_hsuan" v-if="paytype==5">{{usdtNum>0 ?  ' 当前换算：'+usdtNum+' ￥' : '' }}</view>
			<view class="btn_shadows mgt24" @tap="ok">确 认</view>
			<!-- <view class="label">注意：充值时间{{time.start_hour}}-{{time.end_hour}}</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drawalmoney: '',
				balance: '',
				principal: '',
				ktxian: 0,
				time: {},
				paytype:4,
				fxrate:0,
				userinfo:{},
				usdtNum:0,
			};
		},
		onLoad() {
			//this.withdrawFees();
			this.getuser();
		},
		watch:{
			drawalmoney(v,o){
				// console.log(v,o);
				this.usdtNum = (v*this.fxrate).toFixed(2)
			}
		},
		methods: {
			//获取充值时间
			async withdrawFees() {
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("withdrawFees", params);
				if (res.code == 1) {
					this.time = res.data;
				}
			},
			
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo = res.data;
					this.fxrate=res.data.fxrate;
				}
			},

			//选择充值类型
			typeChoose(type){
				this.paytype = type;
				console.log(this.paytype);
			},
			
			//充值
			async ok() {
				if (!this.drawalmoney) {
					this.$u.toast("充值金额不能为空");
					return;
				}
				
				/* if (this.drawalmoney < 100) {
					uni.showToast({
						title: '充值金额不能少于100整',
						icon: 'none'
					})
					this.drawalmoney=100
					return
				} */

				// if (this.drawalmoney / 1 < this.time.min / 1) {
				// 	uni.showToast({
				// 		title: '充值金额不能少于' + this.time.min / 1 + '整',
				// 		icon: 'none'
				// 	});
				// 	this.drawalmoney = this.time.min / 1;
				// 	return;
				// }
				// if (this.drawalmoney / 1 > this.time.max / 1) {
				// 	uni.showToast({
				// 		title: '充值金额不能大于' + this.time.max / 1 + '整',
				// 		icon: 'none'
				// 	});
				// 	this.drawalmoney = this.time.max / 1;
				// 	return;
				// }
				uni.showLoading({
					title: '充值中'
				});


				let that = this;
				let params = {
					amount: this.drawalmoney,
					paytype:this.paytype
				}
				if(this.paytype == 5){
					params = {
						amount: this.usdtNum,
						paytype:this.paytype
					}
				}
				let res = await this.$store.dispatch("homeBalance", params);
				if (res.code == 1) {
					this.$u.toast("提交成功，即将为您自动跳转在线客服，根据客服提示进行充值");
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/customer-service'
						});
					}, 1500);
				} else {
					this.$u.toast(res.info);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	#recharge{
		background: #F3F3F3;
		height: 100vh;
	}
	.rechrges_s{
		height: 88rpx;
		background: #222;
	}
	.body {
	}

	.amount {
		padding: 52rpx 0rpx;
		background-color: #ffffff;

		.amount-text {
			font-size: 32rpx;
			font-weight: bold;
			color: #000000;
			padding: 0rpx 40rpx;
		}

		.amount-number {
			display: flex;
			align-items: center;
			margin-top: 60rpx;
			font-weight: Bold;
			padding: 0rpx 40rpx;
			padding-bottom: 43rpx;
			.amount-number_lf {
				font-size: 50rpx;

			}

			.input-number {
				width: 500rpx;
				height: 100rpx;
				font-size: 80rpx;
			}
			
		}
		
		.recharge_type{
			display: flex;
			align-items: center;
			padding: 0rpx 40rpx;
			padding-top: 56rpx;
			border-top: 2rpx solid #EEEEEE;
			.recharge_type_lf{
				display: flex;
				align-items: center;
				.recharge_type_lf_img{
					width: 24rpx;
					height: 24rpx;
				}
				.recharge_type_lf_text{
					font-size: 28rpx;
					font-family: Source Han Sans CN-Medium, Source Han Sans CN;
					font-weight: bold;
					padding-left:20rpx;
				}
			}
			.recharge_type_rg{
				display: flex;
				align-items: center;
				padding-left: 100rpx;
				.recharge_type_rg_img{
					width: 24rpx;
					height: 24rpx;
				}
				.recharge_type_rg_text{
					font-size: 28rpx;
					font-family: Source Han Sans CN-Medium, Source Han Sans CN;
					font-weight: bold;
					padding-left:20rpx;
				}
			}
		}
	}
	.recharge_hsuan{
		margin: 0 30rpx;
		color: #5F94FE;
		font-size: 26rpx;
		font-weight: bold;
		padding-top: 30rpx;
	}

	.label {
		font-size: 26rpx;
		color: red;
		margin-top: 30rpx;
		padding: 0 34rpx;
	}

	.btn_shadows {
		color: #fff;
		font-size: 32rpx;
		border-radius: 30px;
		background: #222;
		height: 96rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 30rpx;
		margin-top: 100rpx;
	}
</style>
<style scoped>
 ::v-deep .u-input {
	    margin-right: 40rpx !important;
 }
 
/* ::v-deep .u-navbar__content {
 background: linear-gradient(180deg, #5ECEFF 0%, #2D97EB 100%) !important;
 }
::v-deep .u-status-bar {
 background: #5ECEFF !important;
 } */
</style>