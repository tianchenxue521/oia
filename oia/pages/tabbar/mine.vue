<template>
	<view id="mine">
		<!-- <u-navbar title="" :placeholder="true" :autoBack="false" bgColor="#222222">
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar> -->
		<view class="mine_top">
			<view class="mine_top_title">
				<image @tap="toSet()" class="mine_top_title_lf" mode="widthFix" src="../../static/images/img/4_icon_setting.png" style="margin-top: 40rpx;margin-left: 4rpx;"/>
				<view @tap="toSet()" style="color: #9E9E9E;vertical-align: top;font-size: 24rpx;">设置</view>
				<!-- <image  @tap="toKekfu()" class="mine_top_title_rg" mode="widthFix" src="../../static/images/mine/icon_kefu@2x.png"/> -->
			</view>
			<view style="clear: both;"></view>
			<view class="mine_msgg" style="margin-top: -160rpx;">
				<view class="mine_msgglf">
					<image class="mine_msgglf_lf"  src="../../static/images/login/touxiang.png"/>
					<view class="mine_msgglf_rg">
						<view class="mine_msgglf_rg_top" style="margin-top: 30rpx;">
							<view class="mine_msgglf_rg_top_lf">{{userinfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</view>
							<view class="mine_msgglf_rg_top_rg" v-if="userinfo.certification_status==1">
								<span class="mine_msgglf_rg_top_rg_sp1">VIP</span>
								<span class="mine_msgglf_rg_top_rg_sp2" style="padding-left: 0px;">{{userinfo.vip_name}}</span>
							</view>
						</view>
						<view class="mine_msgglf_rg_top_lf">{{userinfo.real_name}}</view>
						<view class="mine_msgglf_rg_btm" v-if="userinfo.certification_status==1">
							<!-- <image class="mine_msgglf_rg_btm_sp1" mode="widthFix" src="../../static/images/mine/vip.png"/> -->
							<span class="mine_msgglf_rg_btm_sp2" >已实名</span>
						</view>
						
						<view class="mine_msgglf_rg_btm" v-else @tap="goSecondPage(2)">
							<span class="mine_msgglf_rg_btm_sp2" >未实名</span>
						</view>
					</view>
				</view>
			</view>
			<view style="margin: 30rpx 30rpx 0 30rpx;
			padding:30rpx 20rpx 30rpx 30rpx;
			border-radius: 20rpx 20rpx 0px 0px;
			background: url('../../static/images/img/4_bg_total-assets.png') no-repeat;background-size: 100%;">
				<view style="display: flex;">
					<view class="mine_myzc_title" style="color: #FFF;font-size: 36rpx;font-weight: 600;">总资产</view>
					<image @tap="moneyEyes=!moneyEyes" mode="widthFix" src="../../static/images/mall/eye2.png" style="width: 30rpx;margin-left: 20rpx;margin-top: 12rpx;"/>
				</view>
				<view style="display: flex;justify-content: space-between;margin-top: 14rpx;">
					<view class="mine_msg_btm" style="width: 55%;">
						<view>
							<view class="mine_msg_btmlf_tx1" style="color: #FCEDD3;" v-if="moneyEyes">****</view>
							<view class="mine_msg_btmlf_tx1" style="color: #FCEDD3;font-size: 40rpx;
							font-weight: 600;white-space: pre-wrap;" v-if="!moneyEyes">
								{{balance}}
							</view>
							<view class="mine_msg_btmlf_tx2" style="color: #E4E4E4;margin-top: 14rpx;font-size: 24rpx;">可用积分 {{userinfo.mrp}}</view>
						</view>
					</view>
					<view style="width: 45%;display: flex;justify-content: space-between;">
						<span @tap="toDrawmoney()" style="border-radius: 26px;border: 1px solid #FFE3B1;padding: 10rpx 32rpx;color: #FFE3B1;height: 50rpx;">
							提现
						</span>
						<span @tap="toRecharge()" style="border-radius: 26px;background: #FFE3B1;padding: 10rpx 32rpx;color: #333333;height: 50rpx;">
							充值
						</span>
					</view>
				</view>
			</view>
		</view>
			
		<view class="mine_myzc">
			<view class="mine_myzc_title">我的资产</view>
			<view class="mine_msg_btm">
				<view class="mine_msg_btmlf">
					<view class="mine_msg_btmlf_tx1">{{balance}}</view>
					<view class="mine_msg_btmlf_tx2">账户余额 (元)</view>
				</view>
				<view class="mine_msg_btmlf">
					<view class="mine_msg_btmlf_tx1">{{principal}}</view>
					<view class="mine_msg_btmlf_tx2">持仓金额 (元)</view>
				</view>
				<view class="mine_msg_btmlf">
					<view class="mine_msg_btmlf_tx1">{{zj_total}}</view>
					<view class="mine_msg_btmlf_tx2">累计收益 (元)</view>
				</view>
			</view>
		</view>
		
		<view style="width: clac(100% - 40rpx);padding: 20rpx;background-color: #FFF;">
			<image src="../../static/images/img/1_banner_invite.png" style="width: 100%;height: 160rpx;" @tap="toTask"></image>
		</view>
		
		<view style="background-color: #F7F7F7;height: 20rpx;"></view>
		<view class="mine_myzc">
			<view class="mine_myzc_title">我的资产</view>
			<view class="girdBox dfb" style="padding: 0;margin-top: 20rpx;">
				<view class="dfc"  v-for="(item,index) in girdList" :key="index" @click="goPage(index)" style="margin-top: 20rpx;">
					<image :src="'../../static/images/img/4_quicklink_icon'+(index+1)+'.png'" style="width: 100rpx;height: 100rpx;"></image>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="home_invite_log" @tap="toTask">
			<image mode="widthFix" src="../../static/images/mine/ming_p.png"/>
		</view> -->
		
		<!-- <view class="home_box">
			<view class="home_bocont1" @tap="goPage(4)">
				<view class="home_bocont1_t">资 金</view>
				<view class="home_bocont1_b">明 细</view>
			</view> 
			<view class="home_bocont2" @tap="goPage(5)">
				<view class="home_bocont2_t">积 分</view>
				<view class="home_bocont2_b">商 城</view>
			</view>
			<view class="home_bocont3" @tap="goPage(6)">
				<view class="home_bocont3_t">活 期</view>
				<view class="home_bocont3_b">宝</view>
			</view>
			<view class="home_bocont4" @tap="goPage(7)">
				<view class="home_bocont4_t">会 员</view>
				<view class="home_bocont4_b">等 级</view>
			</view>
		</view> -->
		
		<!-- <view class="girdBox dfb">
			<view class="dfc"  v-for="(item,index) in girdList" :key="index" @click="goPage(index)">
				<image :src="'../../static/images/mine/m'+(index+1)+'.png'" mode=""></image>
				<text>{{item}}</text>
			</view>
		</view> -->
		<!-- <view class="home_bg_line1"></view>
		<view class="zhishu_ctitle">
			<view class="zhishu_ctitle1"></view>
			<view class="zhishu_ctitle2"></view>
			<view class="zhishu_ctitle3">更多工具</view>
			<view class="zhishu_ctitle2"></view>
			<view class="zhishu_ctitle1"></view>
		</view> -->
		<view class="mine_myzc">
			<view class="mine_myzc_title">系统设置</view>
			<view class="girdBox dfb" style="padding: 0;margin-top: 20rpx;">
				<view class="dfc"  v-for="(item,index) in fwList" :key="index" @click="goSecondPage(index)" style="margin-top: 20rpx;">
					<image :src="'../../static/images/img/4_quicklink_icon'+(index+9)+'.png'" style="width: 60rpx;height: 60rpx;"></image>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<view style="background-color: #F7F7F7;height: 20rpx;"></view>
		<!-- <view class="my_body">
			<view class="bottom_fun">
				<view class="fun_item" @tap="goSecondPage(0)">
					<image src="../../static/images/mine/s1.png" class="item_left"></image>
					<view class="item_right">
						<text>登录密码</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				<view class="fun_item" @tap="goSecondPage(1)">
					<image src="../../static/images/mine/s2.png" class="item_left"></image>
					<view class="item_right">
						<text>支付密码</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				<view class="fun_item" @tap="goSecondPage(2)">
					<image src="../../static/images/mine/s3.png" class="item_left"></image>
					<view class="item_right">
						<text>实名认证</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="my_body">
			<view class="bottom_fun">
				<view class="fun_item" @tap="goSecondPage(3)">
					<image src="../../static/images/mine/s4.png" class="item_left"></image>
					<view class="item_right">
						<text>银行卡管理</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				<view class="fun_item" @tap="goSecondPage(4)">
					<image src="../../static/images/mine/s5.png" class="item_left"></image>
					<view class="item_right">
						<text>隐私政策</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				<view class="fun_item" @tap="goSecondPage(5)">
					<image src="../../static/images/mine/s6.png" class="item_left"></image>
					<view class="item_right">
						<text>安全保障</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				<view class="fun_item" @tap="goSecondPage(6)">
					<image src="../../static/images/mine/s7.png" class="item_left"></image>
					<view class="item_right">
						<text>用户协议</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				<view class="fun_item" @tap="goSecondPage(7)">
					<image src="../../static/images/mine/s8.png" class="item_left"></image>
					<view class="item_right">
						<text>默认银行卡</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				
				<view class="fun_item" @tap="goSecondPage(8)">
					<image src="../../static/images/mine/s9.png" class="item_left"></image>
					<view class="item_right">
						<text>添加Usdt</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
				
				<view class="fun_item" @tap="goSecondPage(9)">
					<image src="../../static/images/mine/s10.png" class="item_left"></image>
					<view class="item_right">
						<text>退出登录</text>
						<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- <u-modal :show="show" :showCancelButton="true" @confirm="confirm" title="温馨提示" confirmColor="#2D97EB" content="您确认退出登录吗？"
			@cancel="show=false"></u-modal>
		<p-footer></p-footer> -->
	</view>
</template>

<script>
	import {baseApi} from "@/utils/config"
	export default {
		data() {
			return {
				show:false,
				userinfo:{},//用户信息
				moneyEyes: false,
				balance: '',
				principal: '',
				zj_total: '',
				ktxian: 0,
				girdList: [
					'交易记录', 
					'我的团队', 
					'收益明细',
					'日益宝',
					'提现记录',
					'充值记录',
					'会员等级',
					'新手帮助'
				],
				fwList: [
					'登录密码', 
					'支付密码', 
					'实名认证', 
					'银行卡绑定', 
					'隐私政策', 
					'安全保障', 
					'用户协议', 
					'默认银行卡',
					'添加USDT',
					/* '退出登录' */
				]
				
			}
		},
		onLoad() {
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			let that = this;
			that.getuser();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		onShow(){
			this.getuser();
		},
		methods: {
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo = res.data;
					this.balance = (parseInt(res.data.balance * 100) / 100).toFixed(2);
					this.principal = (parseInt(res.data.principal * 100) / 100).toFixed(2);
					let moneybox = (parseInt(res.data.money_box * 100) / 100).toFixed(2);
					this.ktxian = ((parseInt(res.data.balance * 100) / 100) + (parseInt(moneybox * 100) / 100) + (
						parseInt(res.data.principal * 100) / 100)).toFixed(2);
					this.zj_total = (parseInt(res.data.zj_total * 100) / 100).toFixed(2);
				}
			},
			
			goPage(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages/finance-record/zj',
						})
						break
					case 1:
						uni.navigateTo({
							url: '/pages/team/team',
						})
						break
					case 2:
						uni.navigateTo({
							url: '/pages/finance-record/sy'
						})
						break
					case 3:
						uni.navigateTo({
							url: '/pages/piggy-bank/piggy'
						})
						break
					case 4:
						uni.navigateTo({
							url: '/pages/finance-record/tx'
						})
						break
					case 5:
						uni.navigateTo({
							url: '/pages/finance-record/cz'
						})
						break
					case 6:
						uni.navigateTo({
							url: '/pages/vip-level/vip-level',
						});
						break
					case 7:
						uni.navigateTo({
							url: '/pages/common/active?name=新手帮助'
						})
						break
				}
			},
			
			
			goSecondPage(index) {
				let that = this;
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages/account/edit-pass'
						})
						break
					case 1:
						uni.navigateTo({
							url: '/pages/account/edit-payPass'
						})
						break
					case 2:
						if (this.userinfo.certification_status === 1) {
							uni.showToast({
								title: '实名认证已通过审核！',
								icon: 'none'
							});
							
						}else{
							uni.navigateTo({
								url: '/pages/account/real-name'
							});
						}
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/account/bind-bank-card'
						})
						break
					case 4:
						uni.navigateTo({
							url: '/pages/common/active?name=隐私政策'
						});
						break
					case 5:
						uni.navigateTo({
							url: '/pages/common/secure'
						})
						break
					case 6:
						uni.navigateTo({
							url: '/pages/common/active?name=用户协议'
						});
						break
					case 7:
						uni.navigateTo({
							url: '/pages/account/back-list'
						});
						break
					case 8:
						uni.navigateTo({
							url: '/pages/account/ustd'
						});
						break
					case 9:
						that.show = true;
						break
						
				}
			},
			
			//充值
			toRecharge(){
				uni.navigateTo({
					url: '/pages/account/recharge'
				});
			},
			
			//提现
			toDrawmoney(){
				uni.navigateTo({
					url: '/pages/account/draw-money'
				});
			},
			
			
			//任务
			toTask(){
				uni.navigateTo({
					url: '/pages/task/task'
				});
			},
			
			
			//提现
			toSet(){
				uni.navigateTo({
					url: '/pages/account/set'
				});
			},
			
			//客服
			toKekfu(){
				uni.switchTab({
					url: '/pages/tabbar/customer-service'
				});
			},
			
			//退出登录
			confirm() {
				uni.setStorageSync('indexGg', 1);
				uni.removeStorageSync('token');
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
			
			
		}
	}
</script>

<style scoped lang="scss">
	#mine{
		background: #F7F7F7;
		width: 100%;
		.home_bg_line1{
			height: 24rpx;
			background: #F5F5F5;
		}
		.mine_top{
			/* background: url('../../static/images/mine/mine_top.png') no-repeat;
			background-size: 100%; */
			background-color: #222;
		}
		.mine_top_title{
			/* display: flex;
			align-items: center;
			justify-content: flex-end; */
			float: right;
			padding-top: 90rpx;
			padding-right: 40rpx;
			.mine_top_title_lf{
				width: 41rpx;
			}
			.mine_top_title_rg{
				width: 41rpx;
				margin-left: 40rpx;
			}
		}
	
		.mine_msgg{
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			padding-left: 40rpx;
			padding-top: 52rpx;
			.mine_msggrg{
				padding-right: 40rpx;
				display: flex;
				align-items: center;
				.mine_msggrg_lf{
					width: 34rpx;
				}
				.mine_msggrg_rg{
					padding-left: 10rpx;
					color: #fff;
					font-size: 28rpx;
				}
			}
			.mine_msgglf{
				display: flex;
				align-items: center;
			}
			.mine_msgglf_lf{
				width: 114rpx;
				height: 114rpx;
				border-radius: 100%;
			}
			.mine_msgglf_rg{
				display: flex;
				flex-direction: column;
				padding-left: 24rpx;
			}
			.mine_msgglf_rg_top{
				display: flex;
				align-items: center;
			}
			.mine_msgglf_rg_top_lf{
				color: #FFF;
				font-size: 32rpx;
				font-weight: bold;
			}
			.mine_msgglf_rg_top_rg{
				color: #AF9160;
				font-weight: 600;
				font-size: 32rpx;
				padding-left: 20rpx;
				.mine_msgglf_rg_top_rg_sp1{
					
				}
				.mine_msgglf_rg_top_rg_sp2{
					padding-left: 10rpx;
				}
			}
			.mine_msgglf_rg_btm{
				display:flex;
				align-items: center;
				padding: 4rpx 7rpx;
				background: #414141;
				border-radius: 30px;
				width: 102rpx;
				justify-content: center;
				margin-top: 20rpx;
				.mine_msgglf_rg_btm_sp1{
					color: #FFF;
					font-size: 24rpx;
				}
				.mine_msgglf_rg_btm_sp2{
					color: #FFF;
					font-size: 24rpx;
				}
			}
		}
		.mine_zchang{
			background: #343537;
			background: url('../../static/images/mine/mine_bg.png') no-repeat;
			background-size: 100%;
			margin:  0 30rpx;
			margin-top: 50rpx;
			padding:20rpx 20rpx 20rpx 30rpx;
			border-radius: 20rpx 20rpx 0px 0px;
			.mine_zchang_title{
				display: flex;
				align-items: center;
				.mine_zchang_title_lf{
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
				}
				.mine_zchang_title_rg{
					width: 36rpx;
					margin-left: 21rpx;
					margin-top: 4rpx;
				}
			}
			.mine_zchang_num{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 20rpx;
				.mine_zchang_num_lf{
					font-size: 48rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
				.mine_zchang_num_rg{
					display: flex;
					align-items: center;
					.mine_zchang_num_rg_cz{
						background: #FEE2B2;
						border-radius: 30px;
						font-size: 28rpx;
						color: #333333;
						padding: 11rpx 32rpx;
						border: 1rpx solid #FEE2B2;
						margin-right: 14rpx;
					}
					.mine_zchang_num_rg_tx{
						background: #343537;
						border-radius: 30px;
						font-size: 28rpx;
						color: #FEE2B2;
						padding: 11rpx 32rpx;
						border: 1rpx solid #FEE2B2;
					}
				}
			}
			.mine_zchang_jf{
				font-size: 28rpx;
				color: #FFFFFF;
				padding-top: 10rpx;
			}
		}
		
		.mine_myzc{
			background-color: #FFF;
			margin-bottom: 30rpx;
			padding: 22rpx 30rpx 36rpx 30rpx;
			.mine_myzc_title{
				font-size: 36rpx;
				color: #000;
				padding-left: 10rpx;
				padding-top: 12rpx;
				font-weight: 600;
			}
			.mine_msg_btm{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 14rpx 10rpx;
				margin-top: 14rpx;
				.mine_msg_btmlf{
					width: 33%;
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
				}
				.mine_msg_btmlf_tx1{
					color: #000;
					font-size: 34rpx;
					font-weight: bold;
				}
				.mine_msg_btmlf_tx2{
					color: #999999;
					font-size: 22rpx;
					padding-top: 10rpx;
				}
			}
			
			.topbg_zj_yuerg{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding: 0rpx 30rpx;
				margin-top: 20rpx;
				.topbg_zj_yuerg_l{
					font-size: 30rpx;
					color: #FFFFFF;
					border: 2rpx solid #FFFFFF;
					border-radius: 30px;
					padding: 12rpx 50rpx;
				}
				.topbg_zj_yuerg_r{
					font-size: 30rpx;
					color: #477EDD;
					background: #FFFFFF;
					border-radius: 30px;
					border: 2rpx solid #FFFFFF;
					padding: 12rpx 50rpx;
					margin-left: 10px;
				
				}
			}
		}
		.home_invite_log{
			padding: 0 30rpx;
			image{
				width: 100%;
			}
		}
		
		.home_box{
			margin: 0 24rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 22rpx;
			// align-items: center;
			.home_bocont1{
				width: 24.5%;
				background: url('../../static/images/mine/m5.png') no-repeat;
				background-size: 100%;
				height: 176rpx;
				
				.home_bocont1_t{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 18rpx;
					padding-left: 19rpx;
				}
				.home_bocont1_b{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 2rpx;
					padding-left: 19rpx;
				}
			}
			.home_bocont2{
				width: 24.5%;
				background: url('../../static/images/mine/m6.png') no-repeat;
				background-size: 100%;
				height: 176rpx;
				.home_bocont2_t{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 18rpx;
					padding-left: 19rpx;
				}
				.home_bocont2_b{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 2rpx;
					padding-left: 19rpx;
				}
			}
			.home_bocont3{
				width: 24.5%;
				background: url('../../static/images/mine/m7.png') no-repeat;
				background-size: 100%;
				height: 176rpx;
				.home_bocont3_t{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 18rpx;
					padding-left: 19rpx;
				}
				.home_bocont3_b{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 2rpx;
					padding-left: 36rpx;
				}
			}
			.home_bocont4{
				width: 24.5%;
				background: url('../../static/images/mine/m8.png') no-repeat;
				background-size: 100%;
				height: 176rpx;
				.home_bocont4_t{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 18rpx;
					padding-left: 19rpx;
				}
				.home_bocont4_b{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 2rpx;
					padding-left: 19rpx;
				}
			}
			
			
			
		}
		
		// <view class="home_box">
		// 	<view class="home_bocont">
		
		.girdBox {
			flex-wrap: wrap;
			padding: 36rpx 30rpx;
			display: flex;
			view {
				width: 25%;
				flex-direction: column;
				display: flex;
				align-items: center;
				image {
					width: 68rpx;
					height: 68rpx;
					display: block;
					margin-bottom: 14rpx;
				}
		
				text {
					font-size: 26rpx;
					font-weight: 500;
					color: #333;
				}
			}
		
		}
		
		.zhishu_ctitle{
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 60rpx;
			.zhishu_ctitle1{
				width: 5rpx;
				height: 5rpx;
				background: #333333;
				border-radius: 100%;
			}
			.zhishu_ctitle2{
				width: 8rpx;
				height: 8rpx;
				background: #333333;
				border-radius: 100%;
				margin: 0 10rpx;
			}
			.zhishu_ctitle3{
				font-size: 36rpx;
				font-weight: bold;
				color: #000000;
				padding: 0 10rpx;
			}
		}
		
		.my_body {
			// padding: 24rpx 30rpx;
			margin-top: 34rpx;
			.bottom_fun {
				background-color: #fff;
				border-radius: 30rpx;
				margin: 0 25rpx;
				.fun_item {
					display: flex;
					align-items: center;
					height: 100rpx;
					padding: 0 30rpx;
					&:last-child {
						.item_right {
							border: none;
						}
					}
		
					.item_left {
						width: 44rpx;
						height: 44rpx;
						margin-right: 24rpx;
					}
		
					.item_right {
						flex: 1;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						color: #000;
						font-weight: 600;
						.right_icon {
							width: 14rpx;
							height: 24rpx;
						}
					}
				}
			}
		}
		
	}
</style>
<style scoped>
 ::v-deep .u-modal__content__text {
	text-align: center!important;
 }
</style>