<template>
	<view id="login">
		<image src="../../static/images/img/0_bg_welcomebg.png" style="width: 100%;height: 1900rpx;"></image>
		<!-- <view class="login_cy_name">
			<div style="height: 100px;"></div>
		</view> -->
		<view style="position: absolute;top: 440rpx;width: 100%;">
			<view class="invest_tab">
				<u-tabs :list="loginList"
					@click="click"
					:scrollable="false"
					 lineWidth="30"
					 lineColor="#5592E8"
					:activeStyle="{
						color: '#FFF',
						fontWeight: 'bold',
						 transform: 'scale(1.2)'
						
					}"
					:inactiveStyle="{
						color: '#D0CFCF',
						transform: 'scale(1.1)',
						fontWeight: 'bold'
					}"
					itemStyle="height: 84rpx;"
					></u-tabs> 
			</view>
			
			<view class="login_body" v-if="index===1">
				<view class="login_form">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_account.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="输入账号" class="input" type="number" placeholder-style="color:#A9A9A9" v-model="logininfo.phone"
						maxlength="11">
				</view>
				<view class="login_form" style="margin-top: 50rpx;">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_password.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="输入密码" class="input" type="password" placeholder-style="color:#A9A9A9"
						v-model="logininfo.password" />
				</view>
				<view class="forgot">
					<view class="jzmm" @click="ifjz.value= !ifjz.value">
						<!-- <image src="/static/images/login/icon_select@2x.png" v-show="ifjz.value"></image>
						<image src="../../static/images/productdetail/unchecked@2x.png" v-show="!ifjz.value"></image>
						<text>记住密码</text> -->
					</view>
					<view class="reg" @tap="forgotPass">忘记密码?</view>
				</view>
				<view class="log_btn" @tap="login">登 录</view>
				<!-- <view class="xy">
					<text>登录即代表您已阅读同意</text>
					<text class="xy_tx1" @tap="jumpPage(17)">《用户协议》</text>
					<text>和</text>
					<text class="xy_tx1" @tap="jumpPage(15)">《隐私协议》</text>
				</view> -->
			</view>
			
			
			<view class="login_body" v-if="index===2">
				
				<view class="login_form"  v-if="ifYz">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_account.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="输入账号" class="input" type="number" placeholder-style="color:#A9A9A9" v-model="registerInfo.phone"
					maxlength="11" />
					
					
				</view>
				<view class="login_form" style="margin-top: 50rpx;"  v-if="ifYz">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_code.png"/>
					<!-- <view class="login_form_line"></view> -->
					<view class="login_form_cd">
						<input placeholder="输入验证码 " class="code_input" placeholder-style="color:#A9A9A9"
							v-model="registerInfo.code" style="color: #FFF;"/>
							<view class="get_code_btn"  @tap='getCode'>{{randomNumber}}</view>
					</view>
					
				</view>
				<view class="login_form"  v-if="ifYz" style="margin-top: 50rpx;">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_invitecode.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="输入邀请码" class="input" placeholder-style="color:#A9A9A9"
						v-model="registerInfo.invite_code" />
				</view>
				<view class="login_form" v-if="ifYz" style="margin-top: 50rpx;">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_password.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="输入密码" class="input" placeholder-style="color:#A9A9A9"
						v-model="registerInfo.password" type="password"/>
				</view>
				<view class="login_form" style="margin-top: 50rpx;" v-if="ifYz">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_password.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="再次确入密码" class="input" placeholder-style="color:#A9A9A9"
						v-model="registerInfo.repassword" type="password"/>
				</view>
				<view class="login_form" v-if="ifYz" style="margin-top: 50rpx;">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_password.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="输入支付密码" class="input" placeholder-style="color:#A9A9A9"
						v-model="registerInfo.pass_key" type="password" maxlength="6"/>
				</view>
				<view class="login_form" v-if="ifYz" style="margin-top: 50rpx;">
					<image class="login_form_tt" mode="widthFix" src="../../static/images/img/0_icon_password.png"/>
					<!-- <view class="login_form_line"></view> -->
					<input placeholder="再次输入支付密码" class="input" placeholder-style="color:#A9A9A9"
						v-model="registerInfo.pass_keys" type="password" maxlength="6"/>
				</view>
				<view class="log_btn2" @tap="next" v-if="!ifYz">下一步</view>
				<view class="log_btn2" @tap="reg" v-if="ifYz">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import auth from "@/utils/check"
	
	export default {
		data() {
			return {
				index: 1,
				loginList: [
					 {name: '登录',status:1},
					 {name: '注册',status:2},
				],
				ifjz: {
					phone: '',
					password: '',
					value: false
				},
				index: 1,
				logininfo: {
					phone: '',
					password: '',
				},
				registerInfo: {
					phone: '',
					code: '',
					invite_code: '',
					password: '',
					repassword: '',
					pass_key: '',
					pass_keys: '',
				}, //注册信息
				ifYz: true, // 是否已经验证过验证码
				countdown: 60,
				randomNumber:"",
			}
		},
		onLoad() {
			this.generateRandomNumber();
		},
		onShow(){
			
			let ifjzmm = uni.getStorageSync('ifjz');
			if (ifjzmm && ifjzmm !== '') {
				this.ifjz = ifjzmm;
				this.logininfo.phone = this.ifjz.phone;
				if (ifjzmm.value) {
					this.logininfo.password = this.ifjz.password;
				}
			}
			uni.removeStorageSync('ifjz');
			uni.removeStorageSync('token');
			uni.removeStorageSync('userId');
			uni.removeStorageSync('login_code');
			uni.removeStorageSync('indexGg');
		},
		methods: {
			//菜单切换
			click(item) {
				console.log('item', item.status);
				this.index = item.status;
			},
	
			forgotPass() {
				uni.switchTab({
					url: '/pages/tabbar/customer-service'
				});
			},
			
			//登录
			async login() {
				if (!this.logininfo.phone) {
					uni.$u.toast("请输入手机号")
					return;
				}
				if (!this.logininfo.password) {
					uni.$u.toast("请输入密码")
					return;
				}
				uni.showLoading({
					title: '登录中'
				});
				let res
				try{
					res = await this.$store.dispatch("userLogin",this.logininfo);
					if (res.code == 1) {
						uni.hideLoading();
						uni.$u.toast('登录成功');
						this.ifjz.phone = this.logininfo.phone;
						this.ifjz.password = this.logininfo.password;
						uni.setStorageSync('ifjz', this.ifjz);
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('userId', res.data.phone);
						uni.setStorageSync('login_code', res.data.login_code);
						uni.setStorageSync('indexGg', 1);
						
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabbar/home'
							});
						}, 800);
					}else{
						uni.hideLoading();
						uni.$u.toast(res.info);
					}
				}catch(err){
					res =err
				}
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
				if (this.registerInfo.code!=this.randomNumber) {
						uni.$u.toast("验证码输入有误！")
					return
				}
				if (!this.registerInfo.invite_code) {
						uni.$u.toast("请输入邀请码")
					return
				}
				if (!this.registerInfo.password) {
						uni.$u.toast("请输入密码")
					
					return
				}
				console.log(this.registerInfo.password);
				if (!auth.isPasswd(this.registerInfo.password)) {
						uni.$u.toast("只能输入6-12个字母和数字")
					return;
				}
				if (!this.registerInfo.repassword) {
						uni.$u.toast("请再次确认密码")
					return
				}
				
				if (!this.registerInfo.pass_key) {
						uni.$u.toast("输入支付密码")
					return
				}
				if (!this.registerInfo.pass_keys) {
						uni.$u.toast("再次输入支付密码")
					return
				}
				if (this.registerInfo.pass_key != this.registerInfo.pass_keys) {
						uni.$u.toast("输入相同的支付密码")
					return
				}
				return true
			},
			async reg() {
				if (this.verification()) {
					uni.showLoading({
						title: '注册中'
					})
					let res
					try{
						res = await this.$store.dispatch("userRegister",this.registerInfo);
						if (res.code==1) {
							  uni.hideLoading();
							  uni.$u.toast("注册成功");
							  this.index = 1;
						}else{
							uni.hideLoading();
							uni.$u.toast(res.info)
						}
					}catch(err){
						res =err
					}
				
					
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
			},
			
			jumpPage(e) {
				switch (e) {
					case 15:
						uni.navigateTo({
							url: '/pages/common/active?name=隐私政策'
						});
						break;
					case 17:
						uni.navigateTo({
							url: '/pages/common/active?name=用户协议'
						});
						break;
				}
			
			},
			
			getCode() { // 获取短信
				this.generateRandomNumber();
			},
			
			// 生成随机的6位数字
			 generateRandomNumber() {
			 this.randomNumber = Math.floor(100000 + Math.random() * 900000);
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	#login{
		/* background: url('../../static/images/img/0_bg_welcomebg.png')no-repeat;
		background-size: 100%; */
		background-color: #333;
		overflow-y: scroll;
		.login_log{
			display: flex;
			justify-content: center;
			padding-top: 100rpx;
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
			margin-top: 40rpx;
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
				border-radius: 12rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #E35145;
				padding: 12rpx 22rpx;
				letter-spacing:4rpx;
				background: linear-gradient(90deg, #FFDEAE 0%, #D7B68D 100%);
				color: #222;
			}
			.login_form {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #FFDEAE;
				.login_form_tt{
					width: 37rpx;
					margin-left: 41rpx;
					// display: flex;
					// align-items: center;
					// margin-bottom: 30rpx;
					// view{
					// 	font-size: 32rpx;
					// 	color: #fff;
					// 	font-weight: 500;
					// 	padding-left: 20rpx;
					// }
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
					padding-right: 30rpx;
				}
				.input {
					font-size: 32rpx;
					padding-left: 30rpx	;
					border-radius: 20rpx;
					height: 92rpx;
					color: #FFF;
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
				margin-top: 48rpx;
				font-size: 24rpx;
				color: #fff;
				align-items: center;
		
				.jzmm {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					color: #333;
		
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
				background: linear-gradient(90deg, #FFDEAE 0%, #D7B68D 100%);
				height: 92rpx;
				font-size: 32rpx;
				text-align: center;
				display: flex;
				border-radius: 30px;
				justify-content: center;
				color: #222222;
				font-weight: 600;
				align-items: center;
			}
			
			.log_btn2{
				margin-top: 90rpx;
				margin-bottom: 30px;
				background: linear-gradient(90deg, #FFDEAE 0%, #D7B68D 100%);
				border-radius: 30px;
				height: 92rpx;
				color: #222;
				font-size: 32rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		
			.reg {
				font-size: 26rpx;
				color:#D0CFCF;
				left: 0;
				text-align: right;
				//border-bottom: 1rpx solid #E35145;
			}
		
		}
		
		.xy {
			margin-top: 33rpx;
			font-size: 26rpx;
			color: #525252;
			text-align: center;
			.xy_tx1{
				font-weight: bold;
				color: #E35145;
			}
		}
		
		
	}

</style>
<style scoped>
 ::v-deep .u-tabs__wrapper {
	margin: 0 120rpx !important;
 }
 ::v-deep .u-tabs__wrapper__nav__line {
 	height: 10rpx !important;
	background: linear-gradient(90deg, #FFDEAE 0%, #D7B68D 100%) !important;
 }
 
</style>