<template>
	<view id="task">
		<view class="task_top">
			<view class="detail_bg_top">
				<image mode="widthFix" @tap="toReturn()" src="../../static/images/img/zzz.png"/>
				<span>做任务领红包</span>
			</view>
			<!-- <view class="task_top_tu">
				<image mode="widthFix" src="../../static/images/other/task.png"/>
			</view> -->
		</view>

		<image @click="toinvite()" mode="widthFix" src="../../static/images/img/1-4_bg_invite.png" style="width: 100%;margin-top: -100px;"/>
		
		<view class="task_l" v-if="list.length>0" style="margin-top: 20rpx;">
			<view class="task_zt" v-for="(item,index) in list" :key="index+'xyy'">
				<!-- <view class="task_zt_index">{{index+1}}</view> -->
				<view class="task_zt_t1" style="text-align: center;padding-top: 20px;">
					<view class="task_zt_t1_lf" style="width: 30%;">
						<span class="task_zt_t1_lf_sp2" style="color: #443D31;font-size: 50rpx;">{{item.people}}</span>
					</view>
					<view class="task_zt_t1_lf" style="width: 30%;">
						<span class="task_zt_t1_lf_sp2" style="color: #443D31;font-size: 50rpx;">{{item.amount}}</span>
					</view>
					<view class="listcont_t3lf" style="width: 40%;">
						<view class="listcont_t3lf_rg" style="padding: 10rpx 40rpx;margin-left: 40rpx;">
							<image mode="widthFix" src="../../static/images/img/1-4_icon_revenue.png"/>
							<span>{{item.away_amount}}</span>
						</view>
					</view>
				</view>
				<view class="task_zt_t2" style="text-align: center;padding-top: 20rpx;">
					<view class="task_zt_t2_lf" style="width: 30%;">
						<span class="task_zt_t2_lf_sp1" style="color: #999999;">团队人数</span>
					</view>
					<view class="task_zt_t2_lf" style="width: 30%;">
						<span class="task_zt_t2_lf_sp1" style="color: #999999;">累计建仓</span>
					</view>
					<view class="task_zt_t2_lf" style="width: 40%;" v-if="item.sid == 1">
						<span style="background-color: #e9e9e9;padding: 8rpx 30rpx;border-radius: 18rpx;font-size: 28rpx;">待完成</span>
					</view>
					<view class="task_zt_t2_lf" style="width: 40%;" v-if="item.sid == 2 && item.state == 1" @click="lingqu(item.id)">
						<span style="background-color: #FFECCD;padding: 8rpx 30rpx;border-radius: 18rpx;font-size: 28rpx;">领取奖励</span>
					</view>
					<view class="task_zt_t2_lf" style="width: 40%;" v-else-if="item.sid == 2">
						<span style="background-color: #e9e9e9;padding: 8rpx 30rpx;border-radius: 18rpx;font-size: 28rpx;">已完成</span>
					</view>
				</view>
				<!-- <view class="task_zt_t2">
					<view class="task_zt_t2_lf task_pleft">
						<span class="task_zt_t2_lf_sp1">当前人数：</span>
						<span class="task_zt_t2_lf_sp2">{{item.poorPeople}}</span>
					</view>
					<view class="task_zt_t2_lf">
						<span class="task_zt_t2_lf_sp1">当前金额：</span>
						<span class="task_zt_t2_lf_sp2">{{item.poorAmount}}</span>
					</view>
				</view>
				<view class="listcont_t3">
					<view class="listcont_t3lf" style="padding-left: 30rpx;">
						<view class="listcont_t3lf_lf">奖励红包：</view>
						<view class="listcont_t3lf_rg">
							<image mode="widthFix" src="../../static/images/other/ji.png"/>
							<span>{{item.away_amount}}</span>
						</view>
					</view>
					<view class="listcont_t3rg">
						<view class="listcont_t3rg_lf">状态：</view>
						 <view class="listcont_t3rg_rg list_wc" v-if="item.state == 1">已完成</view>
						<view class="listcont_t3rg_rg" v-else-if="item.state == 0" >待完成</view> 
					</view>
				</view> -->
			</view>
		</view>
		<view style="height: 50rpx;"></view>
		<view style="width: 100%;height: 100%;position: fixed;top: 0;" v-if="an_if == 1"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				count: 0,
				data: [],
				an_if: 0,
			}
		},
		onLoad() {
			this.getList();
		},
		onShow(){
			
		},
		methods: {
			async lingqu(x) {
				this.an_if = 1;
				let that = this;
				let params = {
					aid: x
				};
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("set_team_task", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.$u.toast(res.info);
					this.getList();
				}else{
					uni.hideLoading();
					this.$u.toast(res.info);
					this.an_if = 0;
				}
			},
			//用户信息
			async getList(){
				let that = this;
				let params = {}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("teamTask", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.data = res.data;
					this.queryList2();
				}
			},
			// 团队信息
			async queryList() {
				let param = {
					page: 1,
					level: 1,
					pid: ""
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("teamsLevel", param);
				if (res.code == 1) {
					uni.hideLoading();
					this.count = res.count;
					for(var i=0;i<this.data.length;i++){
						this.data[i].sid = 0;
						if(this.data[i].people <= this.count){
							this.data[i].sid = 2;
						}else{
							this.data[i].sid = 1;
							//break;
						}
					}
					this.list = this.data;
				}
			},
			// 团队信息2
			async queryList2() {
				let param = {}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("get_user_x", param);
				if (res.code == 1) {
					uni.hideLoading();
					for(var i=0;i<this.data.length;i++){
						if(this.data[i].people <= res.data.count && this.data[i].amount <= res.data.teamsAmount){
							this.data[i].sid = 2;
						}else{
							this.data[i].sid = 1;
						}
					}
					this.list = this.data;
				}
				this.an_if = 0;
			},
			toinvite() {
				uni.navigateTo({
					url: '/pages/account/invite'
				});
			},
			
			//返回
			toReturn(){
				uni.navigateBack({
					delta: 1
				});
			},
			
		}
	}
</script>


<style scoped lang="scss">
	#task{
		width: 100%;
		background: #F3F3F3;
		.task_top{
			background: linear-gradient(180deg, #E0BF9F 0%, #F0D5BA 100%);
			height: 350rpx;
			border-radius: 0 0 50rpx 50rpx;
			.detail_bg_top{
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				padding-top: 80rpx;
				image{
					position: absolute;
					left: 30rpx;
					width:36rpx;
				}
				span{
					font-size: 34rpx;
					color: #333;
					font-weight: bold;
				}
			}
			.task_top_tu{
				margin-top: 56rpx;
				padding-left: 18rpx;
				image{
					width: 580rpx;
				}
			}
		}
		
		.task_l{
			margin-top: -150rpx;
		}
		.task_zt{
			background: linear-gradient(180deg, #FFECCD 0%, #FFFFFF 100%);
			box-shadow: 0px 2px 7px 0px rgba(206,206,206,0.69);
			border-radius: 20rpx;
			margin: 0 24rpx;
			position: relative;
			margin-bottom: 34rpx;
			padding-bottom: 40rpx;
			.task_zt_index{
				background: linear-gradient(120deg, #FFECCD 0%, #FFF 100%);
				border-radius: 20rpx 0px  20rpx 0px;
				padding:6rpx 35rpx;
				position: absolute;
				top: 0rpx;
				left: 0rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
			
			.task_zt_t1{
				display: flex;
				align-items: center;
				padding-top: 100rpx;
				.task_zt_t1_lf{
					width: 50%;
					.task_zt_t1_lf_sp1{
						font-size: 28rpx;
						font-weight: 400;
					}
					.task_zt_t1_lf_sp2{
						font-size: 30rpx;
						font-weight: bold;
						color: #364FFB;
					}
				}
			}
			
			.task_pleft{
				padding-left: 30rpx;
			}
			.task_zt_t2{
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				.task_zt_t2_lf{
					width: 50%;
					.task_zt_t2_lf_sp1{
						font-size: 28rpx;
						font-weight: 400;
					}
					.task_zt_t2_lf_sp2{
						font-size: 30rpx;
						font-weight: bold;
						color: #364FFB;
					}
				}
			}
			
			
			
			.listcont_t3{
				display: flex;
				padding-top: 30rpx;
			}
			.listcont_t3lf{
				// width: 50%;
				display: flex;
				align-items: center;
			}
			.listcont_t3lf_lf{
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
			.listcont_t3lf_rg{
				display: flex;
				align-items: center;
				background: #4D4435;
				border-radius: 30px;
				padding: 8rpx 19rpx;
				
				image{
					width: 36rpx;
					margin-right: 10rpx;
				}
				span{
					font-size: 28rpx;
					font-weight: bold;
					color: #FFF;
				}
			}
			.listcont_t3rg{
				display: flex;
				align-items: center;
				padding-left: 65rpx;
			}
			.listcont_t3rg_lf{
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
			.listcont_t3rg_rg{
				color: #fff;
				border-radius: 30px;
				padding: 11rpx 30rpx;
				background: #E4EFFF;
				font-size: 26rpx;
				color: #333333;
			}
			.list_wc{
				    background: #999!important;
			}
			
		}
	}
</style>
