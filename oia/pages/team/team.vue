<template>
	<view id="team">
		<view class="team_bg">
			<view class="detail_bg_top">
				<image mode="widthFix" @tap="toReturn()" src="../../static/images/productdetail/return.png"/>
				<span>我的团队</span>
			</view>
			<view style="display: flex;padding-left: 40rpx;margin-top: 50rpx;">
				<image mode="widthFix" src="../../static/images/login/touxiang.png" style="width: 80rpx;"/>
				<view style="margin-left: 30rpx;color: #FFF;">
					<view>{{userinfo.real_name}}</view>
					<view>{{userinfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</view>
				</view>
			</view>
			
			<view style="width: 80%;border: 2rpx solid #FFF;height: 60rpx;border-radius: 14rpx;margin-left: 10%;margin-top: 40rpx;display: flex;">
				<input type="text" v-model="sou_v" @input="sou_f()" @click="sou_f()" style="width: 85%;height: 100%;margin-left: 5%;color: #FFF;" placeholder="输入下级手机号或姓名查询" placeholder-style="color:#A9A9A9"/>
				<image mode="widthFix" src="../../static/images/img/ss.png" style="width: 40rpx;margin-top: 10rpx;" @click="sou_f()"/>
			</view>
			
			<view class="invest_tab">
				<u-tabs :list="tabList"
					@click="changeTab"
					 lineWidth="30"
					 :scrollable="false"
					 lineColor="#FFFFFF"
					:activeStyle="{
						color: '#FFFFFF',
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
		
		<view class="team_msg">
			<!-- <view class="team_user">
				<image src="../../static/images/login/touxiang.png"/>
				<view>{{userinfo.phone}}</view>
			</view> -->
			
			<view class="team_men">
				<view class="team_men_lf">
					<view class="team_men_lf_v1" style="font-weight: 400;">{{count}}</view>
					<view class="team_men_lf_v2" style="color: #999999;">团队人数</view>
				</view>
				<view class="team_men_rg">
					<view class="team_men_rg_v1" style="font-weight: 400;">+{{amount}}</view>
					<view class="team_men_rg_v2" style="color: #999999;">团队贡献总额</view>
				</view>
			</view>
			<!-- <view class="team_kong"></view> -->
			
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
								<!-- <view class="body_item_zh">
									<view class="body_item_zh_top">{{item.charge}}</view>
									<view class="body_item_zh_btm">充值总额</view>
								</view>
								<view class="body_item_zh">
									<view class="body_item_zh_top">{{item.withdraw}}</view>
									<view class="body_item_zh_btm">提现总额</view>
								</view> -->
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sou_v: "",
				sou_v2: [],
				count: 0,
				amount: 0,
				level: 1,
				page: 1,
				topHeight:0,
				dataList: [],
				id:"",
				ifSignMask: false,
				userinfo:{
					phone: "", 
					vip_name:"",
					invite_code:"",
					business_status:"",
					real_name: "",
				},
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
		
		onLoad() {
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
		/* filters:{
		 　　phoneFilter(val) {
		 　　　　let reg=/^(.{3}).*(.{4})$/;
		 　　　　return val.replace(reg,'$1****$2');
		 　　}
		}, */
		onShow() {
			this.f_level();
			this.getuser();
		},
		
		
		methods: {
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
			sou_f() {
				if(!this.sou_v){
					this.$u.toast("输入手机号或姓名后查询");
					if(this.sou_v2.length > this.dataList.length){
						this.dataList = this.sou_v2;
					}
					return;
				}
				console.log(this.sou_v);
				if(!this.sou_v2[0]){
					this.sou_v2 = this.dataList;
				}
				this.dataList = [];
				var v = 0;
				for(var i=0;i<this.sou_v2.length;i++){
					if(this.sou_v2[i].phone){
						if(this.sou_v2[i].phone.includes(this.sou_v)){
							this.dataList[v] = this.sou_v2[i];
							v++;
							continue;
						}
					}
					if(this.sou_v2[i].username){
						if(this.sou_v2[i].username.includes(this.sou_v)){
							this.dataList[v] = this.sou_v2[i];
							v++;
							continue;
						}
					}
				}
				if(!this.dataList[0]){
					this.dataList = this.sou_v2;
					this.$u.toast("未找到查询手机号或姓名");
				}
			},
			changeTab(item) {
				this.level = item.level
				this.dataList = [];
				this.id = "";
				this.$refs.paging.reload();
			},
			// 团队信息
			async queryList(pageNo, pageSize) {
				let param = {
					page: pageNo,
					level:this.level,
					pid:this.id
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
					//this.$refs.paging.complete(res.records);
				}
			},
			copyInvite(invite_code) { //复制邀请码
				let that = this;
				uni.setClipboardData({
					data: invite_code,
					success: function() {
						// uni.showToast({
						// 	title: '复制成功',
						// 	icon: 'success'
						// })
						
						that.$u.toast("复制成功");
						console.log("11111111111")
					}
				});
			},
			
			//用户信息
			async getuser(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo.phone = res.data.phone;
					this.userinfo.real_name = res.data.real_name;
					this.userinfo.vip_name = res.data.vip_name;
					this.userinfo.invite_code = res.data.invite_code;
					this.userinfo.business_status = res.data.business_status;
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
			
			//打开弹窗
			openQd(){
				this.ifSignMask = true;
			},
			
			//关闭弹窗
			closeQd(){
				this.ifSignMask = false;
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
	#team{
		width: 100%;
		background: #f2f2f2;
		overflow-y: hidden;
		height: 100vh;
		.uslot_right{
			image{
				width: 44rpx;
				margin-top: 8rpx;
			}
		}
		.team_type{
			font-size: 36rpx!important;
		}
		.team_bg{
			background: linear-gradient(180deg, #222 0%, #222 100%);
			height: 580rpx;
			
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
					color: #FFFFFF;
					font-weight: bold;
				}
			}
			.invest_tab{
				padding-top: 16rpx;
			}
		}
		.team_msg{
			/* background: url('../../static/images/other/team_bg.png') no-repeat;
			background-size: 100%; */
			min-height:582rpx;
			margin-top: -80rpx;
			
			.team_user{
				display: flex;
				align-items: center;
				padding-top:30rpx;
				padding-left: 48rpx;
				image{
					width: 80rpx;
					height: 80rpx;
					border-radius: 100%;
				}
				view{
					color: #fff;
					font-size: 28rpx;
					padding-left: 10rpx;
				}
			}
			.team_men{
				background: linear-gradient(180deg, #FFECCD 0%, #FFF 100%);
				margin: 0 30rpx;
				padding: 26rpx 80rpx;
				border-radius: 32rpx;
				color: #222;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.team_men_lf{
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.team_men_rg{
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.team_men_lf_v1{
					font-size: 46rpx;
					font-weight: bold;
					padding-top: 10rpx;
				}
				.team_men_lf_v2{
					font-size: 30rpx;
					
				}
				.team_men_rg_v1{
					font-size: 46rpx;
					font-weight: bold;
					padding-top: 10rpx;
				}
				.team_men_rg_v2{
					font-size: 30rpx;
					
				}
				
			}
			.team_kong{
				height: 60rpx;
			}
		}
		
		.team_top{
		
		}
		

		
		.team_item_bg{
			
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
	
	}
</style>
<style scoped>
/* 	

	
 ::v-deep .swiper2 .uni-swiper-dots-horizontal {
	    bottom: 24rpx !important;
 }
 ::v-deep .swiper2 .uni-swiper-dot-active {
 		    background:#333!important;
 }
 ::v-deep .swiper2 .uni-swiper-dot {
 		    background: #888888;
 } */
 ::v-deep .u-popup__content {
		background-color: transparent!important;
 }
</style>