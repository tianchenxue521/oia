<template>
	<view id="invest">
		<u-navbar :title="tit_name" :placeholder="true" :autoBack="true"
		bgColor="#222" 
		title-style="color:#FFF;"
		leftIconColor="#FFF">
		</u-navbar>
		<!-- <view class="invest_bg">
			<view class="rechrges_s">
				<u-navbar :title="tit_name" leftIconColor="#fff" :placeholder="true" :autoBack="true" bgColor="transparent"
					:titleStyle="{color:'#fff'}"></u-navbar>
			</view>
			<view class="invest_tab">
				<view class="invest_tab_s">
					<u-tabs :list="list1"
						@click="click"
						:scrollable="true"
						:activeStyle="{
							color: '#FFF',
							fontWeight: 'bold',
							transform: 'scale(1)',
							background: 'linear-gradient( 270deg, #C7A66D 0%, #DABA83 100%)',
							padding: '8rpx 20rpx',
							borderRadius: '50px'
						}"
						:inactiveStyle="{
							color: '#FFF',
							transform: 'scale(1)'
						}"
						itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 84rpx;"
						></u-tabs>
				</view>
			</view>
		</view> -->
		
		<view v-if="id == 3" :class="os_name == 'ios' ? 'ios_edit_info' : 'edit_info'">
			<view style="display: flex;width: 1200rpx;">
				<view :class="item.value == div_an_text_v ? 'div_an':'div_an0'" v-for="(item, index) in div_an_text" :key="index" @click="an_f(item.value)">
					{{item.name}}
				</view>
			</view>
		</view>
		<view style="height: 110rpx;" v-if="(id == 3 && os_name == 'android')"></view>
		
		<z-paging ref="paging" v-model="dataList" @query="queryList" :auto-clean-list-when-reload="false" :fixed="false" :height="topHeight+'px'" :auto-show-system-loading="true" :loading-more-default-as-loading="true" default-page-size="60">
		 <view class="invest_w" v-for="(item, index) in dataList" :key="index+ 'l'" @tap="goDetail(item.id,item.de_total,item.total,item.name,item.tname,item.status)">
			<!-- <image class="invest_shouqin" v-if="item.timed_type == 0 && item.total == item.de_total" mode="widthFix" src="../../static/images/invest/shouxin.png"/>
			  <image class="invest_shouqin" v-else-if="item.timed_type == 1 && (item.total == item.de_total || item.end_time == 0)" mode="widthFix" src="../../static/images/invest/shouxin.png"/> -->
			<view style="color: #999;font-size: 26rpx;padding-bottom: 10px;" v-if="item.time_state == 1 && item.time_start_v != 404 && item.status != 3">
				开始日期：<span style="color: #DB2228;font-weight: 600;">{{item.time_start_v}}</span>
			</view>
			<view style="color: #999;font-size: 26rpx;padding-bottom: 10px;" v-else-if="item.time_stop != null && item.time_stop_v != 404 && item.status != 3">
				距离结束：<span style="color: #DB2228;font-weight: 600;">{{item.time_stop_v}}</span>
			</view>
			<view class="invest_nei_name" style="justify-content: flex-start;">
				<view class="invest_nei_name_rg2" v-if="item.timed_type == 0 && item.total == item.de_total || item.status == 3">已结束</view>
				<view class="invest_nei_name_rg2" v-else-if="item.timed_type == 1 && (item.total == item.de_total || item.end_time == 0)">已结束</view>
				<view class="invest_nei_name_rg2" v-else-if="item.status == 4" style="padding: 6rpx 10rpx;">筹集失败</view>
				<view class="invest_nei_name_rg" v-else style="background: #F91530;border: 0;height: 40rpx;padding-top: 0;border-radius: 0;
				font-size: 20rpx;border-radius: 40rpx;width: 130rpx;display: flex;">
					<image mode="heightFix" src="../../static/images/img/asset_icon_Hot.png" style="height: 30rpx;margin-top: 5rpx;margin-left: 10rpx;"></image>
					<div style="margin-left: 10rpx;line-height: 40rpx;" v-if="item.time_state == 1">预售中</div>
					<div style="margin-left: 10rpx;line-height: 40rpx;" v-else>投资中</div>
				</view>
				<view class="invest_nei_name_lf" style="margin-left: 20rpx;width: calc(100% - 130rpx);" v-if="item.hong == 2">
					{{item.name}}
				</view>
				<view class="invest_nei_name_lf" style="margin-left: 20rpx;width: calc(100% - 130rpx);" v-else>{{item.name}}</view>
			</view>
			<view style="display: flex;margin-left: -20rpx;margin-top: 10rpx;">
				<image mode="heightFix" src="../../static/images/img/2-2_font1.png" v-if="item.red_total > 0" style="margin-right: 20rpx;height: 40rpx;"/>
				<image mode="heightFix" src="../../static/images/img/2-2_font2.png" v-if="item.is_dividend == 1" style="margin-right: 20rpx;height: 40rpx;"/>
				<image mode="heightFix" src="../../static/images/img/2-2_font3.png" v-if="item.hong == 2" style="margin-right: 20rpx;height: 40rpx;"/>
				<image mode="heightFix" src="../../static/images/img/2-2_font4.png" v-if="item.is_integral == 1" style="margin-right: 20rpx;height: 40rpx;"/>
				<image mode="heightFix" src="../../static/images/img/2-2_font5.png" v-if="item.t_if == 1" style="height: 40rpx;"/>
				<image mode="heightFix" src="../../static/images/img/2-2_font6.png" v-if="item.is_relation == 1" style="height: 40rpx;"/>
				<image mode="heightFix" src="../../static/images/img/2-2_font7.png" v-if="item.is_key == 1" style="height: 40rpx;"/>
			</view>
			<view class="invest_nei_qx" v-if="id == 1">
				<view class="invest_nei_qx_rg_lf">
					<view class="invest_nei_qx_rg_lftp">
						<view class="invest_nei_qx_rg_lftp_v1" style="font-size: 36rpx;" v-if="item.all_money >= 10000">{{item.all_money / 10000}}万</view>
						<view class="invest_nei_qx_rg_lftp_v1" style="font-size: 36rpx;" v-else>{{item.all_money}}元</view>
					</view>
					<view class="invest_nei_qx_rg_lfbtm">募集金额</view>
				</view>
				<view class="invest_nei_qx_rg_rg">
					<view class="invest_nei_qx_rg_rgtp">
						<view class="invest_nei_qx_rg_rgtp_v1" v-if="item.days != -1 && item.tally_rate != 100">{{item.days}}天</view>
						<view class="invest_nei_qx_rg_rgtp_v1" v-else>{{item.day}}天</view>
					</view>
					<view class="invest_nei_qx_rg_rgbtm" v-if="item.tally_rate != 100">预计周期</view>
					<view class="invest_nei_qx_rg_rgbtm" v-else>周期</view>
				</view>
				<view class="invest_nei_qx_rg_rg" style="text-align: center;">
					<view class="invest_nei_qx_rg_rgtp">
						<view class="invest_nei_qx_rg_rgtp_v1" style="font-size: 36rpx;color: #4b84c1;">{{item.tally_rate}}%</view>
					</view>
					<view class="invest_nei_qx_rg_rgbtm">进度</view>
				</view>
				<view class="invest_nei_qx_lf">
					<view class="invest_nei_qx_lf_top">
						<view class="invest_nei_qx_rg_rgtp_v1" v-if="item.percents != -1 && item.tally_rate != 100">{{item.percents}}%</view>
						<view class="invest_nei_qx_rg_rgtp_v1" v-else>{{item.percent}}%</view>
					</view>
					<view class="invest_nei_qx_lf_btm" v-if="item.tally_rate != 100">预计收益</view>
					<view class="invest_nei_qx_lf_btm" v-else>日均收益率</view>
				</view>
			</view>
			<view class="invest_nei_qx" v-else>
				<view class="invest_nei_qx_lf">
					<view class="invest_nei_qx_lf_top">
						<view class="invest_nei_qx_rg_rgtp_v1">{{item.percent}}</view>
						<view class="invest_nei_qx_lf_top_p2">%</view>
					</view>
					<view class="invest_nei_qx_lf_btm">日均收益率</view>
				</view>
				<view class="invest_nei_qx_rg_lf">
					<view class="invest_nei_qx_rg_lftp">
						<view class="invest_nei_qx_rg_lftp_v1">{{item.start_money}}</view>
						<view class="invest_nei_qx_rg_lftp_v2">元</view>
						
					</view>
					<view class="invest_nei_qx_rg_lfbtm">起投金额</view>
				</view>
				<view class="invest_nei_qx_rg_rg" style="text-align: center;">
					<view class="invest_nei_qx_rg_rgtp">
						<view class="invest_nei_qx_rg_rgtp_v1" style="font-size: 36rpx;color: #4b84c1;">
							{{(item.de_total / item.total * 100).toFixed(2)}}%
						</view>
					</view>
					<view class="invest_nei_qx_rg_rgbtm">进度</view>
				</view>
				<view class="invest_nei_qx_rg_rg">
					<view class="invest_nei_qx_rg_rgtp">
						<view class="invest_nei_qx_rg_rgtp_v1">{{item.day}}</view>
						<view class="invest_nei_qx_rg_rgtp_v2">天</view>
					</view>
					<view class="invest_nei_qx_rg_rgbtm">周期</view>
				</view>
			</view>
			<!-- <view class="invest_muji">项目总额：{{item.total/10000}}万</view>
			<view class="bot-box">
				<view class="b-left">
					<view class="bott"></view>
					<view class="r1">
						<u-line-progress :percentage="((item.de_total/item.total)*100).toFixed(2)" :showText="false"
							activeColor="#246BE8" inactiveColor="#E7E7E7" :height="8">
						</u-line-progress>
					</view>
					<view class="r2">{{((item.de_total/item.total)*100).toFixed(2)}}%</view>
				</view>
			</view> -->
		 </view>
		</z-paging>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				/* list1: [], */
				bgcolor:"transparent",
				status:1,
				topHeight:0,
				dataList: [],
				tit_name: "",
				id: 0,
				div_an_text: [
					{
						name: "新手投资区",
						value: 1
					},
					{
						name: "精英策略区",
						value: 2
					},
					{
						name: "保守增值区",
						value: 3
					},
					{
						name: "尊享服务区",
						value: 4
					},
					{
						name: "VIP专享区",
						value: 5
					},
				],
				div_an_text_v: 1,
				int: null,
				data_list: [],
				os_name: '',
			}
		},
		onUnload() {
			this.int = window.clearInterval(this.int);
			this.int = null;
		},
		onLoad(option) {
			this.id = option.id;
			this.status = this.id;
			this.newsProductList();
			uni.getSystemInfo({ //获取滚动高度
				success: (res) => {
					// 可使用窗口高度，将px转换rpx
					// #ifdef H5
						//this.topHeight = res.windowHeight - uni.upx2px(260)
						if(this.id == 3){
							this.topHeight = res.windowHeight - uni.upx2px(186);
						}else{
							this.topHeight = res.windowHeight - uni.upx2px(88);
						}
					// #endif
					// #ifdef APP-PLUS
						this.topHeight = res.windowHeight - uni.upx2px(260);
					// #endif
				},
			})
		},
		onShow(){
			uni.getSystemInfo({
				success: (res) => {
					if (res.osName == 'ios' || res.osName == 'android') {
						this.os_name = res.osName;
					}
				}
			});
			// console.log('os.name ==== >>> ' + this.os_name)
		},
		methods: {
			/* click(item) {//菜单切换
				this.status = item.type;
				this.dataList = [];
				this.$refs.paging.reload();
			}, */
			
			
			//获取商品列表
			async newsProductList(){
				let that = this;
				let params = {}
				let res = await this.$store.dispatch("newsProductList", params);
				if (res.code == 1) {
					const listArray = Object.keys(res.data).map(key => {
						return {
							type: key,
							name: res.data[key]
						};
					});
					console.log('listArray +++++ ' + listArray)
					for(var i=0;i<listArray.length;i++){
						if(listArray[i].type == this.id){
							this.tit_name = listArray[i].name;
							return;
						}
					}
				}
			},
			
			an_f(value){
				console.log(value)
				this.div_an_text_v = value;
				this.scrollToTop();
				this.queryList();
			},
			scrollToTop: function() {
			  uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0 // 动画时长，默认300ms，可以设置为0表示无动画直接跳转
			  });
			},
			async queryList(){
				var that = this;
				var params = {
					type: this.status
				}
				if(this.id == 3){
					params = {
						type: this.status,
						ji_type: this.div_an_text_v
					}
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("newsGoodsTwo", params);
				if (res.code == 1) {
					this.data_list = res.data;
					var a = 0;
					for(var i=0;i<that.data_list.length;i++){
						that.data_list[i].t_if = 0;
						if(that.data_list[i].t_tier != null && that.data_list[i].t_tier != ""){
							for(var y=0;y<that.data_list[i].dai_c;y++){
								if(that.data_list[i].t_tiers[y] > 0){
									that.data_list[i].t_if = 1;
								}
							}
						}
					}
					this.int = window.clearInterval(this.int);
					this.int = null;
					uni.hideLoading();
					this.int = self.setInterval(function(){
						a += 1000;
						for(var i=0;i<that.data_list.length;i++){
							if(that.data_list[i].time_stop != null){
								that.data_list[i].time_stop_v = that.dingshiqi(that.data_list[i].time_stop, that.data_list[i].date, a);
							}
							if(that.data_list[i].time_state == 1){
								that.data_list[i].time_start_v = that.dingshiqi(that.data_list[i].time_start, that.data_list[i].date, a);
							}
						}
						that.$refs.paging.complete(that.data_list);
					},1000);
				}
			},
			
			dingshiqi(x,y,i) {
				var that = this;
				// 转换日期字符串为Date对象  
				const endDate = new Date(x);
				const currentDate = new Date(y);
				
				// 计算时间差  
				var diff = endDate - currentDate;
				diff -= i;
				
				// 将毫秒转换为天、小时、分钟和秒  
				var days = Math.floor(diff / (1000 * 60 * 60 * 24));
				var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((diff % (1000 * 60)) / 1000);
				hours = hours * 1;
				minutes = minutes * 1;
				seconds = seconds * 1;
				if(hours < 10){
					hours = "0"+hours;
				}
				if(minutes < 10){
					minutes = "0"+minutes;
				}
				if(seconds < 10){
					seconds = "0"+seconds;
				}
				
				// 格式化字符串  
				var shijian = `${days}天 ${hours}时 ${minutes}分`;
				if(days > 0 || hours > 0 || minutes > 0 || seconds > 0){
					return shijian;
				}else{
					return 404;
				}
			},
		
			goDetail(id, detotal,total,name,tname,status) {
				if(status == 3 || status == 4){
					uni.$u.toast("已结束");
					return;
				}
				if (detotal >= total) {
					uni.$u.toast("已满仓");
					return
				}
				let title = tname+'：'+name;
				uni.navigateTo({
					url: '/pages/productDetail/productDetail?id=' + id+'&title='+title
				});
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	#invest{
		background: #F2F3F5;
		width: 100%;
		.invest_bg{
			/* background: url('../../static/images/invest/invest_bg.png') no-repeat;
			background-size: 100% 100%; */
			background: #222;
			z-index: 9999;
		}
		.invest_tab{
			background: #222;
			border-radius: 30rpx 30rpx 0 0;
			.invest_tab_s{
				/* margin: 0 20rpx; */
			}
		}
		
		.edit_info {
			position: fixed;
			width: 100%;
			overflow-x: auto;
			padding: 30rpx;
			top: 80rpx;
			z-index: 9999;
		}
		
		.ios_edit_info {
			display: block;
			overflow-x: scroll;
			padding: 30rpx;
		}
		

		
		.invest_w{
			background: linear-gradient(180deg, #FFECCD 0%, #FFF 100%)!important;
			margin: 28rpx 28rpx 0 28rpx;
			border-radius: 30rpx;
			background: #fff;
			box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.16);
			padding:32rpx;
			position: relative;
		}
		.invest_w_bl{
			background: linear-gradient(180deg, #E2E3E5 0%, #FEFEFE 100%)!important;
		}
		.invest_shouqin{
			width: 265rpx;
			position: absolute;
			left: 50%;
			transform: translate(-50%);
		}
		
		.invest_nei_name{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.invest_nei_name_lf{
			color:#333;
			font-size: 28rpx;
			font-weight: bold;
		}
		.invest_nei_name_rg{
			background-color: #2A2724;
			padding: 4rpx 0rpx;
			border:1rpx solid #2A2724;
			color: #FFF;
			border-radius: 30rpx;
			font-size: 24rpx;
			min-width: 106rpx;
			text-align: center;
		}
		
		.invest_nei_name_rg2{
			background-color: #2A2724;
			border:1rpx solid #2A2724;
			padding: 6rpx 0rpx;
			color: #FFF;
			border-radius: 30rpx;
			font-size: 24rpx;
			min-width: 106rpx;
			text-align: center;
			
		}
		.invest_nei_name_fh{
			padding-top: 10rpx;
			color: #333;
			font-size: 30rpx;
			width: 106rpx;
			font-weight: bold;
		}
		.invest_nei_qx{
			display: flex;
			padding-top: 20rpx;
			align-items: center;
			justify-content: space-between;
		}
		.invest_nei_qx_lf{
			display: flex;
			flex-direction: column;
		}
		.invest_nei_qx_zh{
			// border-left: 2rpx solid #ECECEC;
			// height: 90rpx;
			margin: 0 60rpx;
		}
		.invest_nei_qx_rg{
			display: flex;
			justify-content: space-between;
			flex: 1;
		}
		.invest_nei_qx_rg_lf{
			display: flex;
			flex-direction: column;
		}
		.invest_nei_qx_rg_rg{
			display: flex;
			flex-direction: column;
		}
		.invest_nei_qx_lf_top{
			color:#DB2228;
			display: flex;
			align-items: baseline;
		}
		.invest_nei_qx_lf_top_p1{
			font-weight: bold;
			font-size: 44rpx;
		}
		.invest_nei_qx_lf_top_p2{
			font-weight: bold;
			font-size: 28rpx;
		}
		
		.invest_nei_qx_lf_btm{
			font-size: 26rpx;
			color: #959595;
			padding-top: 8rpx;
		}
		.invest_nei_qx_rg_lftp{
			
			color:#333;
			display: flex;
			align-items: baseline;
		}
		
		.invest_nei_qx_rg_lftp_v1{
			font-size: 44rpx;
			font-weight: bold;
		}
		.invest_nei_qx_rg_lftp_v2{
			font-size: 28rpx;
		}
		
		.invest_nei_qx_rg_lfbtm{
			font-size: 26rpx;
			color: #959595;
			padding-top: 8rpx;
		}
		.invest_nei_qx_rg_rgtp{
			
			color:#333;
			display: flex;
			align-items: baseline;
		}
		.invest_nei_qx_rg_rgtp_v1{
			font-size: 44rpx;
			font-weight: bold;
		}
		.invest_nei_qx_rg_rgtp_v2{
			font-size: 28rpx;
		}
		
		.invest_nei_qx_rg_rgbtm{
			font-size: 26rpx;
			color: #959595;
			padding-top: 8rpx;
		}
		.invest_muji{
			font-size: 28rpx;
			color: #333333;
			padding-top: 30rpx;
		}
		.b-left{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10rpx;
			//  .bott{
			// 	display: flex;
			// 	align-items: center;
			// 	margin-top: 14rpx;
			// }
				.r1{
					flex: 1;
				}
				.r2{
					margin-left: 20rpx;
					font-size: 24rpx;
					color: #303030;
				}
			
		}
	}
	.div_an{
		background: linear-gradient( 270deg, #C7A66D 0%, #DABA83 100%);
		border-radius: 27rpx;
		width: 165rpx;
		padding: 8rpx 20rpx;
		text-align: center;
		color: #FFF;
		font-size: 28rpx;
		margin-right: 20rpx;
	}
	.div_an0{
		width: 165rpx;
		padding: 8rpx 20rpx;
		text-align: center;
		color: #333;
		font-size: 28rpx;
		margin-right: 20rpx;
		background: #FFF;
		border-radius: 27rpx;
	}
	
</style>
<style scoped>
	::v-deep .u-tabs__wrapper__nav__line{
		background: #222 !important;
	}
</style>