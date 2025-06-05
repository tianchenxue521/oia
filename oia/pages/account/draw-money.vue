<!-- 提现页 -->
<template>
	<view id="draw">
		<view class="rechrges_s">
			<u-navbar title="提现" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="transparent"
				:titleStyle="{color:'#fff'}"></u-navbar>
		</view>
		<view class="body">
			<view class="amount">
				<view class="amount-text">
					提现金额(元)
				</view>
				<view class="amount-number">
						<!-- <view class="amount-number_lf">￥</view> -->
						<u--input placeholder="请输入提现金额" border="none" :clearable="true" v-model="drawalmoney" type="digit"
							fontSize="20" color="#000000" placeholderClass="aaa" v-if="paytype==4"></u--input>
						<u--input placeholder="请输入提现金额" border="none" :clearable="true" v-model="drawalmoney" type="digit"
							fontSize="20" color="#000000" placeholderClass="aaa" v-if="paytype==5"></u--input>
				</view>
			</view>
			
			<view class="draw_dz">
				<view class="recharge_type">
					<view class="recharge_type_lf" @tap="typeChoose(4)">
						<image v-if="paytype==4"  class="recharge_type_lf_img" src="../../static/images/img/1-5_icon_selected.png">
						<image v-else   class="recharge_type_lf_img" src="../../static/images/img/1-5_icon_Unselected.png"/>
						
						<view class="recharge_type_lf_text">银行卡提现</view>
					</view>
					<view class="recharge_type_rg" @tap="typeChoose(5)">
						<image v-if="paytype==5" class="recharge_type_rg_img" src="../../static/images/img/1-5_icon_selected.png">
						<image v-else  class="recharge_type_rg_img" src="../../static/images/img/1-5_icon_Unselected.png"/>
						<view class="recharge_type_rg_text">USDT提现</view>
					</view>
				</view>
				<view>
					<view class="draw_dz_title" v-if="paytype==4">
						<view class="draw_dz_title_lf">到账银行卡</view>
						<view class="draw_dz_title_rg2" v-if="bankinfo.issue_bank">{{bankinfo.issue_bank}}（{{bankinfo.bank_num}}）</view>
						<view class="draw_dz_title_rg" v-else @tap="add" >添加银行卡</view>
						
					</view>
					
					<view class="draw_dz_title" v-else>
						<view class="draw_dz_title_lf">到账USDT</view>
						<view class="draw_dz_title_rg2" v-if="address" >（{{address}}）</view>
						<view class="draw_dz_title_rg" v-else @tap="goAddress">绑定USDT地址</view>
						
					</view>
				</view>
			</view>
			<view class="recharge_hsuan" v-if="paytype==4">
				提现手续费：{{sxf*1}}% 
				<span style="margin-left: 40rpx;">{{drawalmoney > 0 ? '实际到账：' + (drawalmoney - (drawalmoney * sxf / 100)).toFixed(2):''}}</span>
			</view>
			<view class="recharge_hsuan" v-if="paytype==5">
				提现手续费：{{sxf_u*1}}%
				<span style="margin-left: 40rpx;">{{usdtNum>0 ? '实际到账：' + (usdtNum - (usdtNum * sxf_u / 100)).toFixed(2)+' U':''}}</span>
			</view>
			<view class="recharge_hsuan" v-if="paytype==5">当前汇率：1 USDT = ¥ {{txrate}} {{usdtNum>0 ?  ' 当前换算 '+usdtNum+' U' : '' }}</view>
			<view class="btn_shadows" @tap="ok">确 认</view>
			<!-- <view class="label" v-if="bankinfo.issue_bank">注意：提现时间{{time.start_hour}}-{{time.end_hour}}</view> -->
			<view class="label"  v-if="!bankinfo.issue_bank">注意：您还未添加默认银行卡，点击添加银行卡即可快速前往添加页面</view>
		</view>
		
		<u-popup :show="show" @close="show=false" round="10" mode='center'>
			<view class="shuru">
				<text>输入资金密码</text>
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
				drawalmoney: '',
				bankinfo: {}, //银行卡信息
				balance: "",
				principal: "",
				withdraw: "",
				ktxian: 0,
				show:false,
				pwds:'',
				time:{},
				paytype:4,
				address:"",
				txrate:0,
				userinfo:{},
				usdtNum:0,
				sxf: "",
				sxf_u: "",
			}
		},
		onLoad() {
			this.getuser();
		},
		onShow() {
			//this.txFees();
			this.getBank()
			this.fees_info();
		},
		watch:{
			drawalmoney(v,o){
				// console.log(v,o);
				this.usdtNum= (v/this.txrate).toFixed(2)
			}
		},
		methods: {
			
			// 提现时间
			async fees_info() {
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("fees_info", params);
				this.sxf = res.percent;
				this.sxf_u = res.USDT_percent;
			},
			
			// 提现时间
			async txFees() {
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("txFees", params);
				if (res.code == 1) {
					this.time = res.data;
				}
			},
			
			// 获取默认银行卡
			async getBank() {
				let that = this;
				let params = {}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("imGetBankM", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.bankinfo = res.data[0];
				}
			},
			
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo = res.data;
					this.txrate=res.data.txrate;
					this.address=res.data.usdt;
				}
			},
			
			//选择提现类型
			typeChoose(type){
				this.paytype = type;
				console.log(this.paytype);
			},
			
		
			add() {
				uni.navigateTo({
					url: '/pages/account/bind-bank-card'
				})
			},
			
			//添加usdt地址
			goAddress() {
				uni.navigateTo({
					url: '/pages/account/ustd'
				})
			},
			
		
			
			
			
			async finish(pwd){
				let params = {
					amount: this.drawalmoney,
					passkey:pwd,
					paytype:this.paytype,
					address:this.address
				}
				uni.showLoading({
					title: '提现中'
				})
				let res = await this.$store.dispatch("homeWitnDraw", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.drawalmoney = ''
					this.$u.toast("提现成功");
					this.show=false
					this.pwds=''
				}else{
					uni.hideLoading();
					this.show=false;
					this.$u.toast(res.info);
					this.pwds=''
				}
			},
			
			ok() {
				if(this.paytype==4){
					if (!this.bankinfo.issue_bank) {
						uni.showToast({
							title: '请先绑定银行卡',
							icon: 'none'
					
						})
						return
					}
				}
				if(this.paytype==5){
					if (!this.address) {
						uni.showToast({
							title: '请先绑定USDT地址',
							icon: 'none'
					
						})
						return
					}
				}
				
				if (!this.drawalmoney) {
					uni.showToast({
						title: '提现金额不能为空',
						icon: 'none'
				
					})
					return
				}
				
				if (this.drawalmoney < 100) {
					uni.showToast({
						title: '提现金额不能少于100整',
						icon: 'none'
				
					})
					return
				}
				this.show=true
			},
		}
	}
</script>

<style lang="scss" scoped>
	#draw{
		background: #F3F3F3;
		height: 100vh;
	}
	.rechrges_s{
		height: 88rpx;
		background: #222222;
	}
	.body {
		//margin-top: -240rpx;
	}
	.back {
		// background-color: (RGBA(246, 246, 246));
		// background: url('../../static/images/my/my-tx-bg-bg.png') no-repeat;
		// background-size: 100% 100%;
	}

	.body {
	}
	

		.draw_dz{
			padding: 52rpx 40rpx;
			background-color: #ffffff;
			.recharge_type{
				display: flex;
				align-items: center;
				padding-bottom: 40rpx;
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
			
			.draw_dz_title{
				display: flex;
				align-items: center;
				justify-content: space-between;
					
				.draw_dz_title_lf{
					font-size: 32rpx;
					font-weight: bold;
					color: #000000;
				}
				.draw_dz_title_rg{
					padding: 16rpx 50rpx;
					font-size: 28rpx;
					color: #fff;
					background: #222;
					border-radius: 16rpx;
				}
				.draw_dz_title_rg2{
					font-size: 30rpx;
					color: #333333;
				}
			}
			.draw_dz_z{
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				image{
					width: 24rpx;
				}
				view{
					font-size: 30rpx;
					color: #333333;
				}
			}
			
		}

	.amount {
		padding: 35rpx 0  43rpx 40rpx;
		background-color: #ffffff;
		border-bottom: 20rpx solid #EEEEEE;
		.amount-text {
			font-size: 28rpx;
			font-weight: bold;
			color: #000000;
		}

		.amount-number {
			display: flex;
			align-items: center;
			margin-top: 67rpx;
			font-weight: Bold;

			.amount-number_lf {
				font-size: 50rpx;

			}

			.input-number {
				width: 500rpx;
				height: 100rpx;
				font-size: 80rpx;
			}
			
		}
	}

	.label {
		font-size: 26rpx;
		color: red;
		padding: 0 34rpx;
		margin-top: 30rpx;
	}
	
	.shuru {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 18rpx;
		border-radius: 20rpx;
	
		text {
			&:nth-child(1) {
				font-size: 28rpx;
				font-weight: bold;
			}
	
			&:nth-child(2) {
				font-size: 24rpx;
				color: #333;
				font-weight: 400;
				margin-top: 16rpx;
			}
	
			&:nth-child(3) {
				font-size: 40rpx;
	
				font-weight: bold;
				margin-top: 30rpx;
			}
		}
	
		.ipts {
			margin-top: 24rpx;
			margin-bottom: 48rpx;
	
			::v-deep .u-code-input {
				.u-code-input__item {
					border-radius: 8rpx;
					background-color: #F1F1F1;
					border: none !important;
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
</style>