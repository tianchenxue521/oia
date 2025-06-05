<template>
	<view>
		<view class="content">
			<!-- <u-navbar :title="title" :placeholder="true" :autoBack="true" bgColor="#fff"></u-navbar> -->
			<u-navbar title="成员详情" :placeholder="true" :autoBack="true" @rightClick="go_()" 
			bgColor="#222" 
			title-style="color:#FFF;"
			leftIconColor="#FFF">
				<view class="u-nav-slot" slot="right">
					<u-icon name="list" color="#fff" size="20"></u-icon>
				</view>
			</u-navbar>
			<view style="background: #222222;width: 100%;height: 300rpx;"></view>
			<view style="margin-top: -270rpx;padding: 0 20rpx;">
				<view style="padding: 30rpx;border-radius: 20rpx;
				background: url('../../static/images/img/1-2-2_bg_card.png') no-repeat;background-size: 100% 100%;height: 600rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view style="display: flex;">
							<image mode="widthFix" src="../../static/images/login/touxiang.png" style="width: 80rpx;"/>
							<view style="margin-left: 30rpx;color: #FFF;line-height: 80rpx;">
								<view style="">{{phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</view>
							</view>
						</view>
						<view style="display: flex;">
							<view style="color: #FFF;line-height: 80rpx;">
								<view>累积建仓</view>
							</view>
							<view style="margin-left: 30rpx;color: #FFF;line-height: 80rpx;">
								<view>{{mrp}}</view>
							</view>
						</view>
					</view>
					<view style="border: 2px solid #AAA;padding: 10rpx 20rpx;margin-top: 20rpx;border-radius: 16rpx;background: #FFF;">
						<view style="display: flex;">
							<image mode="widthFix" src="../../static/images/img/1-2-2_icon_usdt.png" style="width: 70rpx;"/>
							<view class="ka_text" style="margin: 0 20rpx;">USDT</view>
						</view>
						<view style="height: 4rpx;background: #26A17B;border-radius: 8rpx;margin-top: 10rpx;"></view>
						<view style="padding-top: 30rpx;">
							<view style="display: flex;">
								<view style="width: 48%;display: flex;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">提现进行中</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.tixian_usdt_dai}}
									</view>
								</view>
								<view style="width: 48%;display: flex;margin-left: 4%;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">提现已到账</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.tixian_usdt}}
									</view>
								</view>
							</view>
						</view>
						<view style="padding-top: 30rpx;">
							<view style="display: flex;">
								<view style="width: 48%;display: flex;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">充值进行中</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.chongzhi_usdt_dai}}
									</view>
								</view>
								<view style="width: 48%;display: flex;margin-left: 4%;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">充值已到账</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.chongzhi_usdt}}
									</view>
								</view>
							</view>
						</view>
						<view style="height: 2rpx;background: #EFEFEF;border-radius: 4rpx;margin-top: 20rpx;"></view>
						<view style="display: flex;">
							<image mode="widthFix" src="../../static/images/img/1-2-2_icon_yuan.png" style="width: 70rpx;"/>
							<view class="ka_text" style="margin: 0 20rpx;">人民币</view>
						</view>
						<view style="height: 4rpx;background: #CD7F00;border-radius: 8rpx;margin-top: 10rpx;"></view>
						<view style="padding-top: 30rpx;">
							<view style="display: flex;">
								<view style="width: 48%;display: flex;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">提现进行中</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.tixian_dai}}
									</view>
								</view>
								<view style="width: 48%;display: flex;margin-left: 4%;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">提现已到账</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.tixian}}
									</view>
								</view>
							</view>
						</view>
						<view style="padding-top: 30rpx;">
							<view style="display: flex;">
								<view style="width: 48%;display: flex;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">充值进行中</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.chongzhi_dai}}
									</view>
								</view>
								<view style="width: 48%;display: flex;margin-left: 4%;">
									<view style="width: 8rpx;height: 8rpx;background: #26A17B;border-radius: 8rpx;margin-top: 14rpx;"></view>
									<view style="color: #666;font-size: 22rpx;margin-left: 20rpx;">充值已到账</view>
									<view style="color: #333;font-size: 22rpx;font-weight: 600;width: calc(100% - 148rpx);text-align: right;">
										{{list.chongzhi}}
									</view>
								</view>
							</view>
						</view>
						<view style="height: 10rpx;"></view>
					</view>
				</view>
			</view>
			<view style="height: 100rpx;background: #FFF;">
				<view class="invest_tab">
					<u-tabs :list="tabList"
						@click="changeTab"
						 lineWidth="30"
						 :scrollable="false"
						 lineColor="#01544E"
						:activeStyle="{
							color: '#01544E',
							fontWeight: 'bold',
							 transform: 'scale(1)'
							
						}"
						:inactiveStyle="{
							color: '#806139',
							fontWeight: 'bold',
							transform: 'scale(1)'
						}"
						itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 84rpx;"
						></u-tabs> 
				</view>
			</view>
			<view class="team_item_bg">
				<view class="body">
					<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false" :height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true" :show-loading-more-no-more-view="false">
						<view class="body_item" style="padding-top: 0px;" v-for="(item,index) in dataList" :key="index" @tap="subOrdinate(item.id,item.phone,item.mrp)">
							<view style="float: right;background-color: #2A2724;border-radius: 30rpx 30rpx 0 30rpx;color: #FFF;
							width: 140rpx;height: 50rpx;line-height: 50rpx;text-align: center;font-size: 24rpx;">
								团队成员
							</view>
							<view class="body_item_lf" style="padding-top: 30rpx;">
								<image class="body_item_lf_img" src="../../static/images/img/1_icon_user-avatar.png"/>
								<view class="body_item_t">
									<view class="body_item_t_1">{{item.username}}</view>
									<view class="body_item_t_2">{{item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</view>
								</view>
							</view>
							<view style="height: 1rpx;background-color: #E4E4EE;width: 90%;margin-left: 5%;margin-top: 20rpx;"></view>
							<view class="body_items" style="justify-content: space-around">
								<view class="body_item_zh">
									<view class="body_item_zh_top">{{item.mrp}}</view>
									<view class="body_item_zh_btm">投资金额</view>
								</view>
								<view class="body_item_zh">
									<view class="body_item_zh_top">VIP{{item.vip_name}}</view>
									<view class="body_item_zh_btm">会员等级</view>
								</view>
							</view>
						</view>
						<view style="height: 200rpx;"></view>
					</z-paging>
				</view>
			</view>
			<view style="height: 100rpx;"></view>
		</view>
	</view>
</template>

<script>
	import {baseApi} from "@/utils/config"
	export default {
		data() {
			return {
				id: '',
				phone: '',
				mrp: '',
				list: '',
				dataList: [],
				level: 1,
				topHeight:0,
				amount: "",
				count: "",
				tabList: [],
				tabList3: [{
					name: 'LV.1',
					level:1,
					
				}, {
					name: 'LV.2',
					level:2,
				}, {
					name: 'LV.3',
					level:3,
				}, ],
				tabList5: [{
					name: 'LV.1',
					level:1,
					
				}, {
					name: 'LV.2',
					level:2,
				}, {
					name: 'LV.3',
					level:3,
				}, {
					name: 'LV.4',
					level:4,
				}, {
					name: 'LV.5',
					level:5,
				}, ],
			}
		},
		onLoad(option) {
			this.id = option.id
			this.phone = option.phone
			this.mrp = option.mrp
			uni.getSystemInfo({ //获取滚动高度
				success: (res) => {
					// 可使用窗口高度，将px转换rpx
					// #ifdef H5
						this.topHeight = res.windowHeight - uni.upx2px(560)
					// #endif
					
					// #ifdef APP-PLUS
						this.topHeight = res.windowHeight - uni.upx2px(570);
					// #endif
					
				},
				
			})
		},
		onShow() {
			this.f_level();
			this.itemInfo();
		},
		methods: {
			changeTab(item) {
				this.level = item.level
				this.dataList = [];
				this.$refs.paging.reload();
			},
			async f_level() {
				let param = {}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("get_level", param);
				if (res.code == 1) {
					uni.hideLoading();
					if(res.data == 5){
						this.tabList = this.tabList5;
					}else{
						this.tabList = this.tabList3;
					}
				}
			},
			async itemInfo(){
				var that = this;
				var params = {
					uuid: this.id
				}
				uni.showLoading({
					title: '',
					mask: true
				})
				let res = await this.$store.dispatch("get_teams", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.list = res.data;
				}
			},
			// 团队信息
			async queryList(pageNo, pageSize) {
				let param = {
					uuid: this.id,
					page: pageNo,
					level:this.level
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("teamsLevel", param);
				if (res.code == 1) {
					uni.hideLoading();
					this.amount = res.amount;
					this.count = res.count;
					this.dataList = res.records;
					this.$refs.paging.complete(res.records);
				}
			},
			//查询下级
			subOrdinate(id,phone,mrp){
				/* if(this.userinfo.business_status==1){
					this.id = id;
					this.page =1;
					this.dataList = [];
					this.$refs.paging.reload();
				} */
				uni.navigateTo({
					url: '/pages/team/teams?id='+id+'&phone='+phone+'&mrp='+mrp
				});
			},
			go_(){
				uni.switchTab({
					url: '/pages/tabbar/home'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ka_div{
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 15rpx 0rpx rgba(0,0,0,0.1);
		border-radius: 18rpx;
		margin-bottom: 30rpx;
	}
	.ka_text{
		line-height: 70rpx;
		font-size: 30rpx;
		font-weight: 600;
	}
	.content {
		/* margin: 24rpx 30rpx; */
		background: #F6F7FC;
	}

	.zixun_title {
		margin: 0 24rpx;
		color: #333333;
		font-size: 40rpx;
	}

	.zixun_img {
		margin: 0 24rpx;
	}

	.zixun_img image {
		width: 100%;
		margin-top: 24rpx;
	}

	.zixun_content {
		font-size: 32rpx;
	}

	.zixun_time {
		margin: 0 24rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #cdcdcd;
		font-size: 24rpx;
	}
	.body {
		padding: 0rpx 30rpx;
		.body_item {
			padding: 30rpx 0;
			border-radius: 30rpx;
			background: linear-gradient(180deg, #FFECCD 0%, #FFF 100%);
			box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.16);
			margin-bottom: 30rpx;
			&:nth-child(1) {
				margin-top: 20rpx;
			}
			.body_item_lf{
				display: flex;
				align-items: center;
				margin: 0 30rpx;
				padding-bottom: 10rpx;
				.body_item_lf_img{
					width: 70rpx;
					height: 70rpx;
				}
				.body_item_t{
					display: flex;
					align-items: center;
					padding-left: 19rpx;
					.body_item_t_1{
						font-size: 26rpx;
						color: #333;
					}
					.body_item_t_2{
						color: #333333;
						font-size: 30rpx;
						font-weight: bold;
						padding-left: 10rpx;
					}
					
				}
			}
			.body_items{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top:26rpx;
				margin: 0 50rpx;
				.body_item_zh{
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-right: 20rpx;
					.body_item_zh_top{
						font-size: 30rpx;
						font-weight: bold;
						color: #443D31;
					}
					.body_item_zh_btm{
						font-size: 24rpx;
						color: #999999;
						margin-top: 12rpx;
					}
				}
			}
		}
	}
</style>
<style scoped>
    .zixun_content >>> img{
       width: 100% !important;
    }
	::v-deep .u-navbar__content__title {
			width: auto!important;
			padding: 0 160rpx !important;
			white-space:nowrap; 
			text-overflow:ellipsis; 
			-o-text-overflow:ellipsis; 
			overflow: hidden; 
	}
</style>
