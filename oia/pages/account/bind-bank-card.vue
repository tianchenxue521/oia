<template>
	<view class="main_hidden">
		<view class="rechrges_s">
			<u-navbar title="绑定银行卡" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="transparent"
				:titleStyle="{color:'#fff'}"></u-navbar>
		</view>
		
		<view class="body">
			<view class="login_body">
				<view class="login_form">
					<text class="text">银行</text>
					<input placeholder="请选择您的银行" v-model="form.issue_bank" disabled="" v-if="ifKs" @click="show=true" />
					<input placeholder="请输入您的银行" v-model="form.issue_bank" v-if="!ifKs" />
					<image src="../../static/images/other/right-icon1.png" v-if="ifKs"></image>
					<view class="get_code_btn" v-if="!ifKs" @tap="selectKs(true)">快速添加</view>
					<view class="get_code_btn" v-if="ifKs" @tap="selectKs(false)">手动填写</view>
				</view>
				<view class="login_form">
					<text class="text">支行</text>
					<input placeholder="请输入您的支行" v-model="form.bank" />
				</view>
				<view class="login_form">
					<text class="text">卡号</text>
					<input placeholder="请输入您的卡号" v-model="form.bank_num" />
				</view>
			</view>
			<view class="login_body">
				<view class="login_form">
					<text class="text">姓名</text>
					<input placeholder="请输入您的姓名" v-model="form.real_name" />
				</view>
				<view class="login_form">
					<text class="text">手机号</text>
					<input placeholder="请输入您的预留手机号" v-model="form.bank_phone" />
				</view>
				<view class="login_form">
					<text class="text">默认卡</text>
					<switch :checked="form.bank_status" @change="changeSwitch" style="margin-top: -4rpx;"
						color="#222"></switch>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn_shadows" @click="save">
				确认添加
			</view>
			
		</view>
		
		<u-popup :show="show" @close="show=false" round="16" mode="bottom">
			<view class="bankePop">
				<view class="title">
					选择银行
				</view>
				<view class="pop_body">
					<view class="item" @tap="Selectbank(item.name)" v-for="(item,index) in bankList" :key="index">
						<image class="item_image" :src="item.cover" mode="widthFix"></image>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import auth from "@/utils/check"
	export default {
		data() {
			return {
				ifKs: true,
				show: false,
				bankList: [],
				form: {
					issue_bank: '',
					bank: '',
					bank_num: '',
					real_name: '',
					bank_phone: '',
					bank_status: true
				},
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			async save() {
				if (!this.form.issue_bank) {
					this.$u.toast("请选择银行");
					return
				}
				if (!this.form.bank_num) {
					this.$u.toast("请填写您的银行卡号");
					return
				}
				if (!this.form.bank) {
					this.$u.toast("请填写您的支行");
					return
				}
				if (!this.form.real_name) {
					this.$u.toast("请填写您的真实姓名");
					return
				}
				if (!this.form.bank_phone) {
					this.$u.toast("请输入您的预留手机号");
					return
				}
				// if (!auth.validatePhone(this.form.bank_phone)) {
				// 		uni.$u.toast("请输入正确的手机号")
				// 	return
				// }
				uni.showLoading({
					title: '绑定中'
				});
				let res = await this.$store.dispatch("imBindBank", this.form);
				if (res.code == 1) {
					uni.hideLoading();
					this.$u.toast("绑定成功");
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				}else{
					uni.hideLoading();
					this.$u.toast(res.info);
				}
			},
			//获取银行卡列表
			async getList() {
				let param= {}
				let res = await this.$store.dispatch("imGetBank", param);
				if (res.code == 1) {
					this.bankList = res.data;
				}
			},
			
			changeSwitch(e) {
				this.form.bank_status = e.detail.value
			},
			Selectbank(name) {
				this.form.issue_bank = name
				this.show = false
			},
			selectKs(b) {
				this.ifKs = b
				this.show = b
			}
		}
	}
</script>
<style>
	.main_hidden{
		background: #F3F3F3;
		height: 100vh;
	}
	.bankePop {
		height: 50vh;
		font-size: 32rpx;
		display: flex;
		flex-direction: column;
	}

	.bankePop .title {
		font-size: 32rpx;
		font-weight: 400;
		text-align: center;
		font-weight: bold;
		margin-top: 24rpx;
	}

	.pop_body {
		padding: 24rpx 30rpx;
		flex: 1;
		overflow-y: auto;
	}

	.pop_body .item {
		border-bottom: 1px solid #f5f5f5;
		display: flex;
		align-items: center;
		height: 150rpx;
	}

	.item_image {
		width: 100rpx;
		height: 100rpx;
		margin-right: 50rpx;
	}

	.pop_body .name {
		font-size: 30rpx;
		font-weight: 400;
	}
</style>
<style lang="scss" scoped>
	.main_hidden {
		.rechrges_s{
			height: 88rpx;
			background: #222;
			padding-top: env(safe-area-inset-top);
		}

		.body {
			flex: 1;
			background: #fff;
			overflow-y: auto;
			.login_body {
				background: #fff;
				// margin-top: 24rpx;
				// border-radius: 16rpx;

				.login_form {
					border-bottom: 0.6px solid #f5f5f5;
					display: flex;
					align-items: center;
					height: 120rpx;

					.get_code_btn {
						width: 160rpx;
						font-size: 26rpx;
						height: 60rpx;
						border-radius: 20rpx;
						margin-right: 24rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						background: #222;
					}

					text {
						font-size: 30rpx;
						color: #333;
						padding: 0 24rpx;
						margin-right: 24rpx;
						width: 120rpx;
					}

					input {
						font-size: 30rpx;
						flex: 1;
					}

					image {
						width: 16rpx;
						height: 30rpx;
						margin-right: 26rpx;
					}
				}
			}

		}

		.footer {
			margin: 0 30rpx;
			width: calc(100% - 60rpx);
			margin-top: 150rpx;
		}
		.btn_shadows{
			background: #222;
			height: 94rpx;
			font-size: 32rpx;
			border-radius: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			margin: 0 30rpx;
			
		}
	}
</style>
