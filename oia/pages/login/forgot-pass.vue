<template>
	<view id="login">
		
		<view class="forg_return" @tap="goBack">
			<u-icon name="arrow-left" color="#333" size="23"></u-icon>
		</view>
		<view class="login_cy_name">
			<image mode="widthFix" src="../../static/images/login/logo2.png"/>
		</view>
		
		<view class="login_body">
			<view class="login_form"  v-if="!ifYz">
				<image class="login_form_tt" mode="widthFix" src="../../static/images/login/username.png"/>
				<view class="login_form_line"></view>
				<input placeholder="请输入手机号" class="input" placeholder-style="color:#83878E" v-model="registerInfo.phone"
				maxlength="11" />
				
			</view>
			<view class="login_form" style="margin-top: 50rpx;"  v-if="!ifYz">
				<image class="login_form_tt" mode="widthFix" src="../../static/images/login/code.png"/>
				<view class="login_form_line"></view>
				<view class="login_form_cd">
					<input placeholder="请输入验证码" class="code_input" placeholder-style="color:#83878E"
						v-model="registerInfo.code" />
						<view class="get_code_btn" v-if="countdown===60" @tap='getCode'>验证码</view>
						<view class="get_code_btn2" v-if="countdown<60">{{countdown}}秒后重试</view>
				</view>
				
			</view>
			<view class="login_form" v-if="ifYz">
				<image class="login_form_tt" mode="widthFix" src="../../static/images/login/pwd.png"/>
				<view class="login_form_line"></view>
				<input placeholder="请输入密码" class="input" placeholder-style="color:#83878E"
					v-model="registerInfo.password" />
			</view>
			<view class="login_form" style="margin-top: 50rpx;" v-if="ifYz">
				<image class="login_form_tt" mode="widthFix" src="../../static/images/login/pwd.png"/>
				<view class="login_form_line"></view>
				<input placeholder="请再次确入密码" class="input" placeholder-style="color:#83878E"
					v-model="registerInfo.repassword" />
			</view>
			<view class="log_btn2" @tap="next" v-if="!ifYz">下一步</view>
			<view class="log_btn2" @tap="reg" v-if="ifYz">确认</view>
		</view>
		
		
	</view>
</template>

<script>
	import auth from "@/utils/check"
	export default {
		data() {
			return {
				registerInfo: {
					phone: '',
					code: '',
					password: '',
					repassword: '',
					userid:"",
				}, //注册信息
				ifYz: false, // 是否已经验证过验证码
				countdown: 60,
			}
		},
		onLoad() {
	
		},
		onShow(){
			
		},
		methods: {
			//返回
			goBack() {
				uni.navigateBack()
			},
			

		// -------------------注册部分---------------------	
			//注册判断
			verification() {
				// if (!auth.validatePhone(this.registerInfo.phone)) {
				// 		uni.$u.toast("请输入正确的手机号")
				// 	return
				// }
				if (!this.registerInfo.phone) {
						uni.$u.toast("请输入手机号")
					return
				}
				if (!this.registerInfo.code) {
						uni.$u.toast("请输入验证码")
					return
				}
				if (!this.registerInfo.password) {
						uni.$u.toast("请输入密码")
					
					return
				}
				if (!auth.isPasswd(this.registerInfo.password)) {
						uni.$u.toast("只能输入6-12个字母和数字")
					return;
				}
				if (!this.registerInfo.repassword) {
						uni.$u.toast("请再次确认密码")
					return
				}
				return true
			},
			
			async reg() {
				if (this.verification()) {
					uni.showLoading({
						title: '修改中'
					})
					this.registerInfo.userid = this.registerInfo.phone
					let res
					try{
						res = await this.$store.dispatch("imForgetPassWord",this.registerInfo);
						if (res.code==1) {
							  uni.hideLoading();
							  uni.$u.toast("修改成功");
							  this.index = 1;
							  setTimeout(() => {
							  	uni.reLaunch({
							  		url: '/pages/login/login'
							  	})
							  }, 1500)
						}else{
							uni.hideLoading();
							uni.$u.toast(res.info)
						}
					}catch(err){
						res =err
					}
				
					
				}
			},
			
			async getCode() { // 获取短信
				// if (!auth.validatePhone(this.registerInfo.phone)) {
				// 		uni.$u.toast("请输入正确的手机号")
				// 	return
				// }
				if (!this.registerInfo.phone) {
						uni.$u.toast("请输入手机号")
					return
				}
				uni.showLoading({
					title: '发送中'
				});
			
				var params = {
					phone: this.registerInfo.phone,
					type: 2
				}
				let res
				try{
					res = await this.$store.dispatch("userGetSms", params)
					if (res.code == 1) {
						setTimeout(() => {
							uni.hideLoading();
						    this.getCountDown()
						    uni.$u.toast("发送成功");
						}, 1000);
						
					} else {
						uni.$u.toast(res.info);
					}
				}catch(err){
					res =err
				}
			
			},
			
			getCountDown() {
				if (this.countdown !== 0) {
					this.countdown--
					setTimeout(() => {
						this.getCountDown()
					}, 1000)
				} else {
					this.countdown = 60
				}
			},
	
			async next() {
				if (!this.registerInfo.phone) {
					uni.$u.toast("请输入手机号")
					return
				}
				if (!this.registerInfo.code) {
					uni.$u.toast("请输入验证码")
					return
				}
				uni.showLoading({
					title: ''
				});
				let res
				try{
					res = await this.$store.dispatch("userCheckSms",this.registerInfo);
					if (res.code==1) {
						  uni.hideLoading();
						  uni.$u.toast("校验成功");
						  this.ifYz = true;
					}else{
						uni.hideLoading();
						uni.$u.toast(res.info)
					}
				}catch(err){
					res =err
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	#login{
		height: 100vh;
		background: linear-gradient(0deg, #F1F1F1 0%, #FFF1F1 100%);
		overflow-y: hidden;
		.login_log{
			display: flex;
			justify-content: center;
			padding-top: 200rpx;
			image{
				width: 130rpx;
				border-radius: 100%;
			}
		}
		.login_cy_name{
			display: flex;
			justify-content: center;
			padding-top: 200rpx;
			image{
				width: 570rpx;
			}
		}
		.invest_tab{
			padding-top: 60rpx;
		}
		
		.login_body {
			margin: 0 30rpx;
			margin-top: 100rpx;
			padding: 58rpx 30rpx 26rpx 30rpx;
		
			.login_bbbbb {
				width: 70rpx;
				height: 60rpx;
				position: absolute;
				top: 40rpx;
				left: 40rpx;
			}
		
			.get_code_btn {
				font-size: 28rpx;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #E35145;
				padding: 14rpx 27rpx;
			}
			.get_code_btn2{
				font-size: 28rpx;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #E35145;
				padding: 14rpx 0;
				width: 190rpx;
			}
		
		
		
			.login_form {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 30px;
				background-color: #fff;
				.login_form_tt{
					width: 37rpx;
					margin-left: 41rpx;
					
				}
				.login_form_line{
					width: 2rpx;
					height: 30rpx;
					background: #9E9E9E;
					margin-left: 25rpx;
				}
				.login_form_cd{
					border-radius: 20rpx;
					height: 92rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex: 1;
				}
				.input {
					font-size: 32rpx;
					padding-left: 30rpx;
					border-radius: 20rpx;
					height: 92rpx;
					color: #333;
					display: flex;
					flex: 1;
				}
				.code_input{
					background-color:transparent!important;
					padding-left: 30rpx;
					font-size: 32rpx;
					color: #333;
				}
		
				// .image {
				// 	width: 40rpx;
				// 	height: 46rpx;
				// }
			}
		
			.forgot {
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
				font-size: 24rpx;
				color: #fff;
				align-items: center;
		
				.jzmm {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #fff;
		
					image {
						width: 26rpx;
						height: 26rpx;
					}
		
					text {
						margin-left: 10rpx;
					}
				}
			}
		
			.log_btn {
				margin-top: 54rpx;
				background: linear-gradient(90deg, #D33124 0%, #E45448 100%);
				height: 92rpx;
				font-size: 32rpx;
				text-align: center;
				display: flex;
				border-radius: 30px;
				justify-content: center;
				color: #fff;
				align-items: center;
			}
			
			.log_btn2{
				margin-top: 137rpx;
				margin-bottom: 30px;
				background: linear-gradient(90deg, #D33124 0%, #E45448 100%);
				border-radius: 30px;
				height: 92rpx;
				color: #fff;
				font-size: 32rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		
			.reg {
				font-size: 26rpx;
				color:#fff;
				left: 0;
				text-align: right;
				border-bottom: 1rpx solid #fff;
			}
		
		}
		
		.xy {
			margin-top: 40rpx;
			font-size: 26rpx;
			color: #fff;
			.xy_tx1{
				font-weight: bold;
				color: $color-text1;
			}
		}
		
		.forg_return{
			display: flex;
			align-items: center;
			// padding-left: 70rpx;
			// padding-top: 80rpx;
			position: absolute;
			left: 40rpx;
			top:70rpx;
			// view{
			// 	color: #fff;
			// 	font-size: 30rpx;
			// }
		}
		.forg_zh{
			padding-left: 70rpx;
			padding-top: 80rpx;
		}
		.forg_zh_t1{
			font-size: 36rpx;
			color: #fff;
		}
		.forg_zh_t2{
			font-size: 26rpx;
			color: #fff;
		}
		
	}

</style>
<style scoped>
 ::v-deep .u-tabs__wrapper {
	margin: 0 120rpx !important;
 }
</style>