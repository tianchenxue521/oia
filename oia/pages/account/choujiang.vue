<template>
	<view class="root">
		<view class="rechrges_s">
			<!-- <u-navbar title="" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="transparent"
				:titleStyle="{color:'#fff'}"></u-navbar> -->
			
			<view style="background-color: #0f0c09;height: 100rpx;">
				<image mode="widthFix" @tap="go_home()" src="../../static/images/productdetail/return.png" 
				style="width: 40rpx;margin-top: 20rpx;margin-left: 20rpx;"/>
			</view>
			
		</view>
		<view class="Lottery">
			<view class="Lottery_top_turntable">
				<view class="turntable_spin" :animation="animationData" style="transform: rotate(-30deg)">
					<view class="turntable_spin_item" v-for="(item, index) in list" v-if="index == 0"
						:style="'transform: rotate(' + (index - 1) * 60 + 'deg) translate(90px);'">
						<view class="item_view">
							<view>{{item.name}}</view>
						</view>
					</view>
					<view class="turntable_spin_item" v-for="(item, index) in list" v-if="index == 1"
						:style="'transform: rotate(' + (index - 1) * 60 + 'deg) translate(90px);'">
						<view class="item_view">
							<view>{{item.name}}</view>
						</view>
					</view>
					<view class="turntable_spin_item" v-for="(item, index) in list" v-if="index == 2"
						:style="'transform: rotate(' + (index - 1) * 60 + 'deg) translate(90px);'">
						<view class="item_view">
							<view>{{item.name}}</view>
						</view>
					</view>
					<view class="turntable_spin_item" v-for="(item, index) in list" v-if="index == 3"
						:style="'transform: rotate(' + (index - 1) * 60 + 'deg) translate(90px);'">
						<view class="item_view">
							<view>{{item.name}}</view>
						</view>
					</view>
					<view class="turntable_spin_item" v-for="(item, index) in list" v-if="index == 4"
						:style="'transform: rotate(' + (index - 1) * 60 + 'deg) translate(90px);'">
						<view class="item_view">
							<view>{{item.name}}</view>
						</view>
					</view>
					<view class="turntable_spin_item" v-for="(item, index) in list" v-if="index == 5"
						:style="'transform: rotate(' + (index - 1) * 60 + 'deg) translate(90px);'">
						<view class="item_view">
							<view>{{item.name}}</view>
							<!-- <image class="mine_msgglf_lf" :src="item.img" style="width: 60rpx;height: 60rpx;" mode="widthFix"/> -->
						</view>
					</view>
				</view>
				<!-- <view class=" turntable_spin_active">
				</view> -->
				<view class="turntable_spin_btn" @click="placeLun()">
				</view>
				<view style="width: calc(100% - 200rpx);display: flex;padding: 720rpx 100rpx 0 100rpx;font-size: 22rpx;">
					<view style="width: 50%;padding: 10rpx 0 0 40rpx;">
						<view @click="go_chou_list()" style="height: 100rpx;">
							我的积分
							<view style="margin-top: 10rpx;">{{userinfo.mrp}}</view>
						</view>
					</view>
					<view style="width: 50%;" @click="go_jiang_list()">我的奖品</view>
				</view>
				<view style="height: 100rpx;font-size: 22rpx;margin-top: 10rpx;margin-right: 100rpx;">每次抽奖需消耗{{amount}}积分</view>
			</view>
		</view>
		<image mode="widthFix" src="../../static/images/img/7_bg_lucktdraw2.png" style="width: 100%;"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{},//用户信息
				// 中奖的产品索引
				prizeIndex: -1,
				// 导出的动画函数
				animationData: null,
				//动画函数
				animation: null,
				ini_v: 0,
				fo: 0,
				jiaodu: 0,
				list: [],
				amount: "",
				chou_data: {},
				jishi_v_if: 1,
			}
		},
		onShow(){
			this.getuser();
			this.lun_list();
		},
		methods: {
			go_home() {
				uni.switchTab({
					url: '/pages/tabbar/home'
				});
			},
			async lun_list() {
				var that = this;
				var params = {}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("get_lunList", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.list = res.data.list;
					this.amount = res.data.amount;
				}
			},
			async placeLun() {
				if(this.jishi_v_if == 0){
					uni.$u.toast("请勿重复操作")
					return;
				}
				this.jishi_v_if = 0;
				var that = this;
				var params = {}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("get_placeLun", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.chou_data = res.data;
					for(var i=0;i<6;i++){
						if(res.data.id == this.list[i].id){
							this.prizeIndex = i + 1;
							break;
						}
					}
					if(this.prizeIndex == -1){
						this.jishi_v_if = 1;
						uni.$u.toast("当前网络不稳定，请稍后再试")
					}else{
						this.drawClick();
						this.getuser();
					}
				}else{
					this.jishi_v_if = 1;
					uni.hideLoading();
					uni.$u.toast(res.info);
				}
			},
			drawClick() {
				if(this.ini_v == 1){
					return;
				}
				console.log(1)
				this.ini_v = 1;
				if(this.fo == 1){
					this.drawClick_s();
				}
				setTimeout(() => {
					//旋转角度
					var rota = ((Math.abs(this.prizeIndex - 6)) % 6) * 60 + 30;
					//创建动画
					this.animation = uni.createAnimation({
						// 动画持续时间
						duration: 3000,
						//定义动画的效果
						timingFunction: 'ease-in-out'
					});
					//设置旋转角度
					this.animation.rotate(rota + 3600).step()
					this.animationData = this.animation.export()
					setTimeout(() => {
						this.ini_v = 0;
						this.fo = 1;
						this.jiaodu = rota;
						uni.$u.toast("恭喜获得："+this.chou_data.name)
					}, 3000);
				}, 100);
				setTimeout(() => {
					this.jishi_v_if = 1;
				}, 10000);
			},
			drawClick_s(){
				this.animation = uni.createAnimation({
					duration: 1,
					timingFunction: 'ease-in-out'
				});
				this.animation.rotate(-this.jiaodu - 60).step()
				this.animationData = this.animation.export()
			},
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo = res.data;
				}
			},
			//我的奖品
			go_jiang_list() {
				uni.navigateTo({
					url: '/pages/account/jiang_list'
				});
			},
			//抽奖记录
			go_chou_list() {
				uni.navigateTo({
					url: '/pages/account/chou_list'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.Lottery {
		background-color: #0F0C09;
		width: 100vw;
		/* height: 1300rpx; */
		padding-top: 100rpx;
		text-align: center;
		align-items: center;
		background: url('../../static/images/img/7_bg_lucktdraw1.png') no-repeat;
		background-size: 100%;
		//background-color: #0F0C09;

		.Lottery_top_turntable {
			position: relative;
			background: url('../../static/images/img/7_bg_table.png') no-repeat;
			width: 720rpx;
			background-size: 100%;
			margin: auto;
			margin-top: 45%;
			/* height: 1200rpx; */

			.turntable_spin {
				top: 32rpx;
				left: 76rpx;
				width: 580rpx;
				height: 580rpx;
				position: absolute;
				border-radius: 50%;
				border-radius: 50%;
				background: url('../../static/images/img/7_bg_table2.png') no-repeat;
				background-size: 100% 100%;

				.turntable_spin_item {
					top: 40%;
					left: 40%;
					width: 60px;
					height: 50px;
					z-index: 99999;
					position: absolute;
					text-align: center;
					.item_view {
						font-size: 28rpx;
						transform: rotate(90deg);
						transform-origin: center center;
					}
				}

			}

			.turntable_spin_btn {
				top: 204rpx;
				left: 286rpx;
				width: 160rpx;
				height: 200rpx;
				position: absolute;
				background: url('../../static/images/img/7_bg_table3.png') no-repeat;
				background-size: 100%;
			}

			.turntable_spin_active {
				top: 68rpx;
				left: 207rpx;
				width: 300rpx;
				height: 236rpx;
				position: absolute;
				background-size: 100%;
				background-repeat: no-repeat;
				background-image: url('https://www.ry1688.com/h5/images/Lottery/turntable_active.png');
			}
		}
	}

	.root {
		background: #F3F3F3;
		height: 100vh;

		.rechrges_s {
			height: 88rpx;
			background: #222;
		}
	}
</style>
<style scoped>
	::v-deep .u-modal__content__text {
		text-align: center !important;
	}
</style>