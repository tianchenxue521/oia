<template>
	<view id="home">
		<!-- <view class="top_bg">
			<view class="top_bg_msg">
				<view class="top_bg_msg_lf"> 思达资本欢迎您！</view>
				<image class="top_bg_msg_rg" @tap="jumpPage(17)" mode="widthFix" src="../../static/images/home/icon_service@2x.png"/>
			</view>
		</view> -->
		<!--轮播图-->
		<view class="lunb_body">
			<swiper :indicator-dots="false" circular autoplay class="swiper" style="height: 380rpx;">
				<swiper-item class="swiper_item" v-for="(item,index) in imgList" :key="index" @tap="toSwiper(item.rule)">
					<view class="swiper_image" :style="{background:`url(${item.img})`}"></view>
				</swiper-item>
			</swiper>
		</view>
		<view style="position: absolute;z-index: 9999;padding: 20rpx 0 0 20rpx;display: flex;right: 20rpx;top: 20rpx" @click="go_gonggao()">
			<image mode="widthFix" src="../../static/images/home/gg_img.png" style="width: 50rpx;"/>
			<view v-if="gong_tiao_v > 0" style="background: #f00;width: 30rpx;height: 30rpx;border-radius: 50%;font-size: 12rpx;text-align: center;line-height: 30rpx;color: #FFF;">
				{{gong_tiao_v}}
			</view>
		</view>
		<view class="topbg_zj" style="margin-top: 0;margin: 0;">
			<!-- <image mode="widthFix" src="../../static/images/img/1_banner_security1.png"/> -->
			<!-- <view class="topbg_zj_title">
				<view>总资产</view>
				<image mode="widthFix" @tap="moneyEyes=!moneyEyes" src="../../static/images/home/eyes.png"/>
			</view>
			<view class="topbg_zj_num" v-if="!moneyEyes">{{ktxian}}</view>
			<view class="topbg_zj_num"  v-if="moneyEyes">****</view>
			<view class="topbg_zj_yue">
				<view class="topbg_zj_yuelf">
					<view class="topbg_zj_yuelf_t">余额</view>
					<view class="topbg_zj_yuelf_b">{{balance}}</view>
				</view>
				<view class="topbg_zj_yuerg">
					<view class="topbg_zj_yuerg_l" @tap="jumpPage(19)">提现</view>
					<view class="topbg_zj_yuerg_r" @tap="jumpPage(18)">充值</view>
				</view>
			</view> -->
		</view>
		<view class="my_body" @click="go_user()">
			<view class="bottom_fun">
				<view class="fun_item">
					<image src="../../static/images/login/touxiang.png" class="item_left" style="width: 60rpx;height: 60rpx;"></image>
					<view class="item_right">
						<view>
							<text style="color: #FFF;">{{userinfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</text>
							<view class="mine_msgglf_rg_top_lf">{{userinfo.real_name}}</view>
						</view>
						<view>
							<span style="margin-right: 10px;color: #AE9061;">我的资产</span>
							<image src="../../static/images/mine/right-icon1.png" class="right_icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!--金刚区-->
		<view class="headet_three">
			<view class="three_item" @tap="openQd">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon1.png"></image>
				<text>签到</text>
			</view>
			<view class="three_item" @tap="jumpPage(3)">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon2.png"></image>
				<text>邀请</text>
			</view>
			<view class="three_item" @tap="jumpPage(10)">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon3.png"></image>
				<text>新闻资讯</text>
			</view>
			<view class="three_item" @tap="jumpPage(5)">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon4.png"></image>
				<text>日益宝</text>
			</view>

		</view>
		
		<view class="headet_three">
			<view class="three_item" @tap="jumpPage(2)">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon5.png"></image>
				<text>积分商城</text>
			</view>
			<view class="three_item" @tap="jumpPage(6)">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon6.png"></image>
				<text>会员等级</text>
			</view>
			<view class="three_item" @tap="jumpPage(7)">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon7.png"></image>
				<text>公司简介</text>
			</view>
			<view class="three_item" @tap="jumpPage(8)">
				<image mode="widthFix" src="../../static/images/img/1_quicklink_icon8.png"></image>
				<text>我的投资</text>
			</view>
		</view>
		
		<view style="background-color: #F7F7F7;height: 20rpx;margin-top: 40rpx;"></view>
		<view style="width: clac(100% - 40rpx);padding: 20rpx;background-color: #FFF;">
			<image src="../../static/images/img/1_banner_invite.png" style="width: 100%;height: 160rpx;" @click="toTask()"></image>
		</view>
		
		<view style="background-color: #F7F7F7;height: 20rpx;"></view>
		<view style="margin: 30rpx;background-color: #FFF;">
			<view style="display: flex;margin-bottom: 40rpx;">
				<view style="background-color: #DEA567;width: 6rpx;height: 40rpx;border-radius: 32rpx;"></view>
				<view style="font-weight: 600;font-size: 34rpx;margin-left: 20rpx;">新推产品</view>
				<view style="color: #999999;margin-left: 60%;margin-right: 20rpx;" @click="go_xin()">更多</view>
				<image mode="widthFix" src="../../static/images/mine/right-icon1.png" @click="go_xin()" style="width: 18rpx;margin-top: 6rpx;"></image>
			</view>
			<view class="home_zt">
				<view class="home_cplist" style="margin-bottom: 30px;" v-for="(item, index) in getlist1" v-if="index < 1" :key="index">
					<view class="home_cplist_title">
						<view class="home_cplist_title_lf">{{item.name}}</view>
						<!-- <view class="home_cplist_title_rg">中低风险</view> -->
					</view>
					<view class="home_cplist_cp">
						<view class="home_cplist_cplf">
							<view class="home_cplist_cplf_lf">
								<view class="home_cplist_cplf_lf_t" v-if="item.percents != -1 && item.tally_rate != 100 && item.type == 1">{{item.percents}}%</view>
								<view class="home_cplist_cplf_lf_t" v-else>{{item.percent}}%</view>
								<view class="home_cplist_cplf_lf_b" v-if="item.tally_rate != 100 && item.type == 1">预计收益</view>
								<view class="home_cplist_cplf_lf_b" v-else>日均收益率</view>
							</view>
							<view class="home_cplist_cplf_rg">
								<view class="home_cplist_cplf_rg_t">
									<view class="home_cplist_cplf_rg_ts" v-if="item.days != -1 && item.tally_rate != 100 && item.type == 1">{{item.days}}</view>
									<view class="home_cplist_cplf_rg_ts" v-else>{{item.day}}</view>
									<view class="home_cplist_cplf_rg_tx">天</view>
								</view>
								<view class="home_cplist_cplf_rg_b">{{item.start_money}}元起投</view>
							</view>
						</view>
						<view @tap="goDetail(item.id,item.de_total,item.total,item.name,item.tname,item.status)" style="background-color: #2B2825;color: #FFF;height: 70rpx;width: 200rpx;border-radius: 70rpx;text-align: center;line-height: 70rpx;">
							去抢购
						</view>
						<!-- <image class="home_cplist_cprg" mode="widthFix" src="../../static/images/home/zoushi1.png"/> -->
					</view>
				</view>
			</view>
		</view>
		
		<view style="background-color: #F7F7F7;height: 20rpx;"></view>
		<view style="margin: 30rpx;background-color: #FFF;">
			<view style="display: flex;margin-bottom: 40rpx;">
				<view style="background-color: #DEA567;width: 6rpx;height: 40rpx;border-radius: 32rpx;"></view>
				<view style="font-weight: 600;font-size: 34rpx;margin-left: 20rpx;">热门产品</view>
				<view style="color: #999999;margin-left: 60%;margin-right: 20rpx;" @click="go_re()">更多</view>
				<image mode="widthFix" src="../../static/images/mine/right-icon1.png" @click="go_re()" style="width: 18rpx;margin-top: 6rpx;"></image>
			</view>
			<view class="home_zt" style="width: 100%;overflow-x: auto;display: flex;">
				<view class="home_cplist" style="box-shadow: 0px 3px 15px 0px rgb(0 0 0 / 10%);margin-bottom: 30px;width: 500rpx;margin-right: 30rpx;background: url('../../static/images/img/1_bg_products2.png') no-repeat;background-size: 100%;" v-for="(item, index) in getlist2" v-if="index < 3" :key="index">
					<view class="home_cplist_title">
						<view class="home_cplist_title_lf">{{item.name}}</view>
						<!-- <view class="home_cplist_title_rg">中低风险</view> -->
					</view>
					<view class="home_cplist_cp">
						<view class="home_cplist_cplf" style="width: 214rpx;">
							<view class="home_cplist_cplf_lf">
								<view class="home_cplist_cplf_lf_t" v-if="item.percents != -1 && item.tally_rate != 100 && item.type == 1">{{item.percents}}%</view>
								<view class="home_cplist_cplf_lf_t" v-else>{{item.percent}}%</view>
								<view class="home_cplist_cplf_lf_b" v-if="item.tally_rate != 100 && item.type == 1">预计收益</view>
								<view class="home_cplist_cplf_lf_b" v-else>日均收益率</view>
							</view>
						</view>
						<view @tap="goDetail(item.id,item.de_total,item.total,item.name,item.tname,item.status)" style="background-color: #2B2825;color: #FFF;height: 60rpx;width: 200rpx;border-radius: 60rpx;text-align: center;line-height: 60rpx;">
							去抢购
						</view>
						<!-- <image class="home_cplist_cprg" mode="widthFix" src="../../static/images/home/zoushi1.png"/> -->
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="home_zt">
			<view class="select_login">
				<view class="select_i " :class="{'active':ind===0}" @click="ind=0">
					新推产品
				</view>
				<view class="select_line"></view>
				<view class="select_i" :class="{'active':ind===1}" @click="ind=1">
					热门产品
				</view>
				<view class="select_line"></view>
				<view class="select_i" :class="{'active':ind===2}" @click="ind=2">
					最近购买
				</view>
			</view>
			<view v-if="ind==0&&getlist1.length>0">
				<view class="home_cplist" v-for="(item, index) in getlist1" :key="index" @tap="goDetail(item.id,item.name,item.tname)">
					<view class="home_cplist_title">
						<view class="home_cplist_title_lf">{{item.tname}}:{{item.name}}</view>
						<view class="home_cplist_title_rg">中低风险</view>
					</view>
					<view class="home_cplist_cp">
						<view class="home_cplist_cplf">
							<view class="home_cplist_cplf_lf">
								<view class="home_cplist_cplf_lf_t">{{item.percent}}%</view>
								<view class="home_cplist_cplf_lf_b">日均收益率</view>
							</view>
							<view class="home_cplist_cplf_rg">
								<view class="home_cplist_cplf_rg_t">
									<view class="home_cplist_cplf_rg_ts">{{item.day}}</view>
									<view class="home_cplist_cplf_rg_tx">天</view>
								</view>
								<view class="home_cplist_cplf_rg_b">{{item.start_money}}元起投</view>
							</view>
						</view>
						<image class="home_cplist_cprg" mode="widthFix" src="../../static/images/home/zoushi1.png"/>
					</view>
				</view>
			</view>
			<view v-if="ind==1&&getlist2.length>0">
				<view class="home_cplist" v-for="(item,index) in getlist2" :key="index" v-if="index < 3" @tap="goDetail(item.id,item.name,item.tname)">
					<view class="home_cplist_title">
						<view class="home_cplist_title_lf">{{item.tname}}:{{item.name}}</view>
						<view class="home_cplist_title_rg">中低风险</view>
					</view>
					<view class="home_cplist_cp">
						<view class="home_cplist_cplf">
							<view class="home_cplist_cplf_lf">
								<view class="home_cplist_cplf_lf_t">{{item.percent}}%</view>
								<view class="home_cplist_cplf_lf_b">日均收益率</view>
							</view>
							<view class="home_cplist_cplf_rg">
								<view class="home_cplist_cplf_rg_t">
									<view class="home_cplist_cplf_rg_ts">{{item.day}}</view>
									<view class="home_cplist_cplf_rg_tx">天</view>
								</view>
								<view class="home_cplist_cplf_rg_b">{{item.start_money}}元起投</view>
							</view>
						</view>
						<image class="home_cplist_cprg" mode="widthFix" src="../../static/images/home/zoushi1.png"/>
						
					</view>
					
				</view>
			</view>
			<view v-if="ind==2&&getlist3.length>0">
				<view class="home_cplist" v-for="(item,index) in getlist3" :key="index" v-if="index < 3" @tap="goDetail(item.product_id,item.name,item.tname)">
					<view class="home_cplist_title">
						<view class="home_cplist_title_lf">{{item.tname}}:{{item.name}}</view>
						<view class="home_cplist_title_rg">中低风险</view>
					</view>
					<view class="home_cplist_cp">
						<view class="home_cplist_cplf">
							<view class="home_cplist_cplf_lf">
								<view class="home_cplist_cplf_lf_t">{{item.percent}}%</view>
								<view class="home_cplist_cplf_lf_b">日均收益率</view>
							</view>
							<view class="home_cplist_cplf_rg">
								<view class="home_cplist_cplf_rg_t">
									<view class="home_cplist_cplf_rg_ts">{{item.day}}</view>
									<view class="home_cplist_cplf_rg_tx">天</view>
								</view>
								<view class="home_cplist_cplf_rg_b">{{item.start_money}}元起投</view>
							</view>
						</view>
						<image class="home_cplist_cprg" mode="widthFix" src="../../static/images/home/zoushi1.png"/>
					</view>
				</view>
			</view>
		</view> -->
		
		<view style="background-color: #F7F7F7;height: 20rpx;"></view>
		<view style="margin: 30rpx;background-color: #FFF;">
			<view style="display: flex;margin-bottom: 40rpx;">
				<view style="background-color: #DEA567;width: 6rpx;height: 40rpx;border-radius: 32rpx;"></view>
				<view style="font-weight: 600;font-size: 34rpx;margin-left: 20rpx;">新闻资讯</view>
				<view style="color: #999999;margin-left: 60%;margin-right: 20rpx;" @tap="jumpPage(10)">更多</view>
				<image mode="widthFix" src="../../static/images/mine/right-icon1.png" @tap="jumpPage(10)" style="width: 18rpx;margin-top: 6rpx;"></image>
			</view>
			<view style="background-color: #F5F5F5;height: 2rpx;"></view>
			<view class="news_item" v-for="(item, index) in newlist" :key="index" @tap="toSwiper(item.id)" style="margin-bottom: 0px;border-bottom: 1rpx solid #F5F5F5;">
				<image class="news_right" :src="item.cover"></image>
				<view class="news_left">
					<view class="news_left_title">{{item.name}}</view>
					<view class="news_left_lable">
						<text class="state">金融卫士</text>
						<text>{{item.create_at}}</text>
					</view>
				</view>
			</view>
			<view class="news_item" v-for="(item, index) in newlist2" :key="index" @tap="toSwiper(item.id)" style="margin-bottom: 0px;border-bottom: 1rpx solid #F5F5F5;">
				<image class="news_right" :src="item.cover"></image>
				<view class="news_left">
					<view class="news_left_title">{{item.name}}</view>
					<view class="news_left_lable">
						<text class="state">金融卫士</text>
						<text>{{item.create_at}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view style="background-color: #F7F7F7;height: 20rpx;margin-top: 40rpx;"></view>
		
		<view style="margin: 30rpx;background-color: #FFF;">
			<view style="display: flex;margin-bottom: 40rpx;">
				<view style="background-color: #DEA567;width: 6rpx;height: 40rpx;border-radius: 32rpx;"></view>
				<view style="font-weight: 600;font-size: 34rpx;margin-left: 20rpx;">认识Power</view>
				<view style="color: #999999;margin-left: 55%;margin-right: 20rpx;" @tap="jumpPage(7)">更多</view>
				<image mode="widthFix" src="../../static/images/mine/right-icon1.png" @tap="jumpPage(7)" style="width: 18rpx;margin-top: 6rpx;"></image>
			</view>
			<image mode="widthFix" src="../../static/images/img/home_index.png" style="width: 100%;border-radius: 16rpx;"/>
			<image mode="widthFix" src="../../static/images/img/photo_2024-10-11_22-50-20.jpg" style="width: 100%;margin-top: 40rpx;"/>
		</view>
		
		<p-footer style="background: #FFF;"></p-footer>
		<!--签到-->
		<u-popup :show="ifSignMask"  mode="center">
			<view  class="home_qd">
				<!-- <view class="home_qd_bg">
					<view class="home_qd_bg_t1">
						<image mode="widthFix" src="../../static/images/home/qiandao_title@2x.png"/>
					</view>
					<view class="home_qd_bg_t2">
						<view class="home_qd_bg2_title">
							<view class="home_qd_bg2_titlf">今日可领取</view>
							<image class="home_qd_bg2_titimg" mode="widthFix" src="../../static/images/mall/jf-icon.png"/>
							<view class="home_qd_bg2_titlf">+{{getsignInfo.amount}}</view>
						</view>
						<view class="home_qd_bg2_t2">签到领现金</view>
						<view class="home_qd_bg2_t3">本月累计签到{{getsignInfo.signIn}}天</view>
						<image class="home_qd_bg2_pos" mode="widthFix" src="../../static/images/home/hand@2x.png"/>
					</view>
					
					<view class="home_qd_bg_t3" v-if="getsignInfo.today==0"  @tap="gohomeSign">立即签到</view>
					<view class="home_qd_bg_t4" v-else-if="getsignInfo.today==1" @tap="closeQd()">已签到</view>
				</view> -->
				<view class="home_qd_bg" style="background: url('../../static/images/img/4-2_dialog_signin.png') no-repeat;
					background-size: 100%;height: 300rpx;padding-top: 350rpx;">
					<view v-if="getsignInfo.signIn > 0">本月累计签到{{getsignInfo.signIn}}天</view>
					<view v-else>本月未签到</view>
					<view style="position: absolute;width: 70%;margin-left: 15%;height: 80rpx;margin-top: 110rpx;" @tap="gohomeSign"></view>
				</view>
				<image class="home_qd_close" @tap="closeQd()"  mode="widthFix" src="../../static/images/home/close.png" style="margin-top: 0;"/>
			</view>
		</u-popup>
		<!--弹窗公告-->
		<u-popup :show="ifggMask"  @close="ggmask()" mode="center">
			<view  class="homemsdk">
				<view class="home_msdk">
					<image mode="widthFix" :src="coverUrl"/>
				</view>
				<image class="home_msdk_close" @tap="ggmask()"  mode="widthFix" src="../../static/images/home/close.png" />
			</view>
		</u-popup>
		<view style="position: fixed;bottom: 15%;right: 0;width: 160rpx;height: 160rpx;" @click="go_choujiang()">
			<image mode="widthFix" src="../../static/images/img/7_icon_lucktdraw.png" style="width: 100%;"/>
		</view>
	</view>
</template>

<script>
	import {baseApi} from "@/utils/config"
	export default {
		data() {
			return {
				ktxian:0,
				balance:0,
				imgList: [], // 轮播图列表
				indexlist: [],
				getlist1: [],//新推产品列表 
				getlist2:[],//热门产品列表 
				getlist3:[],//最近购买
				ifSignMask: false,
				ifggMask: false,
				moneyEyes: false,
				getsignInfo: {}, // 签到信息
				userinfo:{},//用户信息
				newlist:[],//
				newlist2:[],//
				coverUrl: '',
				ind:0,
				gong_tiao_v: 0,
			}
		},
		onLoad() {
			this.newsGoods();
			this.newsGoodsTwo();
			this.getSwiper();
			this.getSign();
			this.getNews()
			uni.startPullDownRefresh();
			let indexGg = uni.getStorageSync('indexGg');
			if (indexGg === 1) {
				this.baseCover();
			}
		},
		onPullDownRefresh() {
			let that = this;
			that.getuser();
			that.recentlyGoods();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		onShow(){
			this.getuser();
			this.imStockIndex();
			this.recentlyGoods();
			this.getgong_tiao();
		},
		methods: {
			//获取公告条数
			async getgong_tiao(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("get_gong_tiao", params);
				this.gong_tiao_v = res.data;
			},
			
			//用户信息
			async getuser(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userinfo = res.data;
					this.balance = (parseInt(res.data.balance * 100) / 100).toFixed(2);
					let moneybox = (parseInt(res.data.money_box * 100) / 100).toFixed(2);
					this.ktxian = ((parseInt(res.data.balance * 100) / 100) + (parseInt(moneybox * 100) /
						100) + (
						parseInt(res.data.principal * 100) / 100)).toFixed(2);
				}
			},
			
			//轮播图列表
			async getSwiper(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("baseSlider", params);
				if (res.code == 1) {
					let alist = res.data;
					if (alist.length > 0) {
						for (let i = 0; i < alist.length; i++) {
							this.imgList.push({
								'name':  alist[i].name,
								'rule': alist[i].rule,
								'img':baseApi+alist[i].img
							});
						}
					}
				}
			},
			
			
			//指数
			async imStockIndex(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("imStockIndex", params);
				if (res.code == 1) {
					this.indexlist = res.data;
				}
			},
			
			
			//新推产品
			async newsGoods(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("newsCoinNew", params);
				if (res.code == 1) {
					this.getlist1 = res.data;
				}
			},
			
			
			// 新闻
			async getNews(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("newsItem", params);
				if (res.code == 1) {
					let nlist = res.data;
					if (res.data.length > 0) {
						for (let i = 0; i < nlist.length; i++) {
							let maps = {
								cover: baseApi + nlist[i].cover,
								content: nlist[i].content,
								create_at: nlist[i].create_at,
								name: nlist[i].name,
								id: nlist[i].id,
							}
							this.newslist.push(maps)
						}
					}
				}
			},
			//广告弹窗
			async baseCover(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("baseCover", params);
				if (res.code == 1) {
					if(res.data.status == 1){
						this.ifggMask = true;
						this.coverUrl = res.data.img;
					}else{
						uni.setStorageSync('indexGg', 2);
					}
				}
			},
			
			//热门产品
			async newsGoodsTwo(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("coin_hot", params);
				if (res.code == 1) {
					this.getlist2 = res.data;
				}
			},
			
			
			async recentlyGoods() {
				let data = {
					page: 1,
				}
				
				let res = await this.$store.dispatch("orderOrderList", data);
				if (res.code == 1) {
					this.getlist3 = res.records;
				}
			},
			
			
			
			// 签到
			async gohomeSign(){
				var that = this;
				var params = {}
				/* uni.showLoading({
					title: '签到中',
					mask: true
				}); */
				let res = await this.$store.dispatch("homeSign", params);
				if (res.code == 1) {
					uni.hideLoading();
					that.getSign();
					this.closeQd();
					uni.$u.toast(res.info)
				}else{
					this.closeQd();
					uni.$u.toast(res.info)
				}
			},
		
			
			// 获取签到信息
			async getSign(){
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("homeGetSign", params);
				if (res.code == 1) {
					this.getsignInfo = res.data;
				}else{
					this.closeQd();
					//uni.$u.toast(res.info)
				}
			},
			
		    openQd() {
				  this.ifSignMask = true;
			},
			closeQd() {
				  this.ifSignMask = false;
				  console.log('close');
			},
			
			ggmask() {
				uni.setStorageSync('indexGg', 2);
				this.ifggMask = false;
			},
			
			// 去往seiper页面
			toSwiper(rule) {
				uni.navigateTo({
					url: '/pages/common/news?newsid=' + rule,
				});
			},
			
			//任务
			toTask(){
				uni.navigateTo({
					url: '/pages/task/task'
				});
			},
			
			//抽奖
			go_choujiang() {
				uni.navigateTo({
					url: '/pages/account/choujiang'
				});
			},
			
			//我的
			go_user() {
				uni.switchTab({
					url: '/pages/tabbar/mine'
				});
			},
			
			//列表
			go_invest(x){
				uni.navigateTo({
					url: '/pages/tabbar/invest?id='+x
				});
			},
			
			//公告
			go_gonggao() {
				uni.navigateTo({
					url: '/pages/tabbar/gonggao_list'
				});
			},
			
			//新品
			go_xin() {
				uni.navigateTo({
					url: '/pages/tabbar/xin'
				});
			},
			
			//热门
			go_re() {
				uni.navigateTo({
					url: '/pages/tabbar/re'
				});
			},
			
			jumpPage(e) {
				switch (e) {
					case 1:
						uni.switchTab({
							url: '/pages/tabbar/invest'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/mall/maill-list',
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/account/invite'
						});
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/common/secure'
						});
						break;
			
					case 5:
						uni.navigateTo({
							url: '/pages/piggy-bank/piggy'
						});
						break;
					case 6:
						uni.navigateTo({
							url: '/pages/vip-level/vip-level'
						});
						break;
					case 7:
						uni.navigateTo({
							url: '/pages/common/active?name=关于我们'
						});
						break;
					case 8:
						uni.navigateTo({
							url: '/pages/common/invest-list'
						});
						break;
					case 9:
						uni.navigateTo({
							url: '/pages/task/task'
						});
						break;
					case 10:
						uni.navigateTo({
							url: '/pages/common/newList'
						});
						break;
					case 11:
						uni.navigateTo({
							url: '/pages/common/secure'
						});
						break;
					case 13:
						uni.navigateTo({
							url: '/pages/account/real-name'
						});
						break;
					case 17:
						uni.switchTab({
							url: '/pages/tabbar/customer-service'
						});
						break;
						
					case 18:
						uni.navigateTo({
							url: '/pages/account/recharge'
						});
						break;
							
					case 19:
						uni.navigateTo({
							url: '/pages/account/draw-money'
						});
						break;
				}
			},
			
			
			// 获取新闻列表
			async getNews() {
				var that = this;
				var params = {
					type: 0,
				}
				let res = await this.$store.dispatch("newsItem", params);
				if (res.code == 1) {
					let nlist = res.data.hou;
					let nlist2 = res.data.san;
					for (let i = 0; i < nlist.length; i++) {
						let maps = {
							cover: baseApi + nlist[i].cover,
							content: nlist[i].content,
							create_at: nlist[i].create_at,
							name: nlist[i].name,
							id: nlist[i].id,
						}
						this.newlist.push(maps);
					}
					for (let i = 0; i < nlist2.length; i++) {
						let maps2 = {
							cover: nlist2[i].cover,
							content: nlist2[i].content,
							create_at: nlist2[i].create_at,
							name: nlist2[i].name,
							id: nlist2[i].id,
						}
						this.newlist2.push(maps2);
					}
				}
			},
			
			// 去往产品详情页
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
	#home{
		.top_bg{
			background-size: 100%;
			height: 392rpx;
			.top_bg_msg{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 80rpx;
				padding-left: 25rpx;
				padding-right: 30rpx;
				.top_bg_msg_lf{
					font-size: 36rpx;
					color: #FFFFFF;
				}
				.top_bg_msg_rg{
					width: 39rpx;
				}
			}
			
		}
		.topbg_zj{
			margin: 0 30rpx;
			margin-top: -230rpx;
			image{
				width: 100%;
			}
			// .topbg_zj_title{
			// 	display: flex;
			// 	align-items: center;
			// 	padding-left: 52rpx;
			// 	padding-top: 35rpx;
			// 	view{
			// 		font-size: 30rpx;
			// 		font-weight: 500;
			// 		color: #FFFFFF;
			// 		padding-right: 12rpx;
			// 	}
			// 	image{
			// 		width: 30rpx;
			// 	}
			// }
			// .topbg_zj_num{
			// 	font-size: 60rpx;
			// 	font-weight: bold;
			// 	color: #FFFFFF;
			// 	padding-left: 52rpx;
			// 	padding-top: 30rpx;
			// 	line-height: 1;
			// }
			
			// .topbg_zj_yue{
			// 	display: flex;
			// 	align-items: center;
			// 	justify-content: space-between;
			// 	padding-left: 53rpx;
			// 	padding-right: 41rpx;
			// 	padding-top: 28rpx;
			// 	.topbg_zj_yuelf{
			// 		display: flex;
			// 		flex-direction: column;
			// 		.topbg_zj_yuelf_t{
			// 			font-size: 26rpx;
			// 			color: #FFFFFF;
			// 		}
			// 		.topbg_zj_yuelf_b{
			// 			font-size: 28rpx;
			// 			color: #FFFFFF;
			// 			padding-top: 19rpx;
			// 		}
			// 	}
			// 	.topbg_zj_yuerg{
			// 		display: flex;
			// 		align-items: center;
			// 		.topbg_zj_yuerg_l{
			// 			font-size: 30rpx;
			// 			color: #FFFFFF;
			// 			border: 2rpx solid #FFFFFF;
			// 			border-radius: 30px;
			// 			padding: 15rpx 44rpx;
			// 		}
			// 		.topbg_zj_yuerg_r{
			// 			font-size: 30rpx;
			// 			color: #477EDD;
			// 			background: #FFFFFF;
			// 			border-radius: 30px;
			// 			border: 2rpx solid #FFFFFF;
			// 			padding: 15rpx 44rpx;
			// 			margin-left: 10px;
			// 		}
			// 	}
			// }
			
		}
		
		
		.headet_three {
			display: flex;
			flex-wrap: wrap;
			margin-top: 44rpx;
			z-index: 9;
			position: relative;
			.three_item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 25%;
		
				image {
					width: 62rpx;
				}
		
				text {
					font-size: 26rpx;
					color: #303030;
					margin-top: 10rpx;
				}
			}
			
			.three_item2{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 25%;
				margin-bottom: 40rpx;
						
				image {
					width: 46rpx;
				}
						
				text {
					font-size: 26rpx;
					color: #333333;
					margin-top: 14rpx;
				}
			}
		
		}
		
		
		.lunb_body{
			.swiper {
				height: 224rpx;
			
				.swiper_item {
					height: 100%;
			
					.swiper_image {
						height: 100%;
						width: 100%;
						background-size: 100% 100% !important;
					}
			
				}
			}
		}
		
		.home_zt{
			.select_login {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding:34rpx 54rpx;
				.select_line{
					height: 26rpx;
					border-left: 2rpx solid #848484;
				}
				.select_i {
					color: #999999;
					font-size: 36rpx;
					color: #333333;
					&.active {
						position: relative;
						color: #333333;
						font-weight: bold;
						&::after {
							position: absolute;
							width: 60rpx;
							border-radius: 30px;
							height: 10rpx;
							content: '';
							background: linear-gradient(90deg, #015EEA 0%, #00C0FA 100%);
							left: 50%;
							bottom: -17rpx;
							transform: translateX(-50%);
						}
					}
				}
			}
			
			.home_cplist{
				background: linear-gradient(180deg, #FFECCD 0%, #FFF 100%);
				border-radius: 20rpx;
				padding: 39rpx 12rpx 33rpx 27rpx;
				.home_cplist_title{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.home_cplist_title_lf{
						white-space:nowrap; 
						text-overflow:ellipsis; 
						-o-text-overflow:ellipsis; 
						overflow: hidden; 
						font-size: 36rpx;
						color: #000000;
						flex: 1;
						padding-right: 30rpx;
					}
					.home_cplist_title_rg{
						border: 1rpx solid #3069FB;
						border-radius: 6rpx;
						padding: 6rpx;
						font-size: 22rpx;
						color: #3069FB;
					}
				}
				.home_cplist_cp{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 18rpx;
					.home_cplist_cplf{
						display: flex;
						align-items: center;
						.home_cplist_cplf_lf{
							display: flex;
							align-items: center;
							flex-direction: column;
							.home_cplist_cplf_lf_t{
								font-size: 38rpx;
								font-weight: bold;
								color: #E50900;
								line-height: 1;
							}
							.home_cplist_cplf_lf_b{
								font-size: 24rpx;
								font-weight: 400;
								color: #696969;
								padding-top: 14rpx;
							}
						}
						.home_cplist_cplf_rg{
							display: flex;
							align-items: center;
							flex-direction: column;
							padding-left: 102rpx;
							.home_cplist_cplf_rg_t{
								display: flex;
								align-items: baseline;
								line-height: 1;
								.home_cplist_cplf_rg_ts{
									font-size: 38rpx;
									font-weight: bold;
									color: #333333;
								}
								.home_cplist_cplf_rg_tx{
									font-size: 24rpx;
									font-weight: bold;
									color: #333333;
								}
							}
							.home_cplist_cplf_rg_b{
								font-size: 24rpx;
								color: #696969;
								padding-top: 14rpx;
							}
						}
					}
					.home_cplist_cprg{
						width: 144rpx;
					}
				}
			}
			
			
			
			// <view class="home_cplist">
			// 	<view class="home_cplist_title">
			// 		<view class="home_cplist_title_lf">混合型:财通碳中和一年持...</view>
			// 		<view class="home_cplist_title_rg">中低风险</view>
			// 	</view>
			// 	<view class="lf">
			// 		<view class="home_cplist_cplf">
			// 			<view class="home_cplist_cplf_lf">
			// 				<view class="home_cplist_cplf_lf_t">2.06%</view>
			// 				<view class="home_cplist_cplf_lf_b">日均收益率</view>
			// 			</view>
			// 			<view class="home_cplist_cplf_rg">
			// 				<view class="home_cplist_cplf_rg_t">85天</view>
			// 				<view class="home_cplist_cplf_rg_b">60000元起投</view>
			// 			</view>
			// 		</view>
			// 		<image class="home_cplist_cprg" mode="widthFix" src="../../static/images/home/zoushi1.png"/>
					
			// 	</view>
				
			// </view>
			
		}
		
		
		
		
		
		.homemsdk{
			text-align: center;
			.home_msdk{
				// background: url('../../static/images/home/gg.png') no-repeat;
				// background-size: 100%;
				// height: 750rpx;
				width: 85vw;
				image{
					width: 100%;
					border-radius: 34rpx;
				}
				
				.home_msdk_t1{
					font-size: 57rpx;
					font-weight: 500;
					color: #5592E8;
					padding-top: 40rpx;
				}
				.home_msdk_t2{
					position: absolute;
					margin: 0 110rpx;
					bottom:  130rpx;
					background: linear-gradient(90deg, #5ECEFF 0%, #2D97EB 100%);
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
					color: #FFFFFF;
					width: calc(100% - 220rpx);
					padding: 24rpx 0;
					border-radius: 30px;
				}
				.home_msdk_t3{
					position: absolute;
					bottom: 60rpx;
					color: #4794E9;
					text-align: center;
					width: 100%;
				}
				
			}
			.home_msdk_close{
				width: 60rpx;
				margin-top: 20rpx;
			}
		}
		
		
		.home_qd{
			text-align: center;
			.home_qd_bg{
				/* background: url('../../static/images/home/qd_bg.png') no-repeat;
				background-size: 100%;
				height: 780rpx; */
				width: 85vw;
				.home_qd_bg_t1{
					padding-top: 59rpx;
					display: flex;
					justify-content: center;
					image{
						width: 216rpx;
					}
				}
				.home_qd_bg_t2{
					
					background-size: 100%;
					height: 330rpx;
					margin: 0 44rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: #fff;
					margin-top: 57rpx;
					padding-top: 39rpx;
					position: relative;
					.home_qd_bg2_title{
						background-color: #fff;
						margin: 0 25rpx;
						
						display: flex;
						align-items: center;
						justify-content: center;
						padding:46rpx 0;
						border-radius: 14rpx;
						.home_qd_bg2_titlf{
							font-size: 28rpx;
							font-weight: bold;
							color: #333333;
						}
						.home_qd_bg2_titimg{
							width: 35rpx;
						}
					}
					
					.home_qd_bg2_t2{
						font-size: 34rpx;
						font-weight: 800;
						color: #2B2057;
						display: flex;
						align-items: flex-start;
						padding-left: 25rpx;
						padding-top: 45rpx;
						line-height: 1;
					}
					.home_qd_bg2_t3{
						font-size: 23rpx;
						color: #2B2057;
						display: flex;
						align-items: flex-start;
						padding-left: 25rpx;
						padding-top: 24rpx;
					}
					.home_qd_bg2_pos{
						width: 183rpx;
						right: 0;
						bottom: 8rpx;
						position: absolute;
					}
					
				}
		
				.home_qd_bg_t3{
					display: flex;
					justify-content: center;
					align-items: center;
					background-size: 100%;
					height: 100rpx;
					margin: 0 36rpx;
					margin-top: 41rpx;
					font-size: 32rpx;
					color: #fff;
				}
				
				.home_qd_bg_t4{
					display: flex;
					justify-content: center;
					align-items: center;
					background-size: 100%;
					height: 100rpx;
					margin: 0 36rpx;
					margin-top: 41rpx;
					font-size: 32rpx;
					color: #fff;
					
				}
		
			}
			.home_qd_close{
				width: 60rpx;
				margin-top: 20rpx;
			}
		}
	}
	
	.my_body {
		background-color: #16130D;
		.bottom_fun {
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
					color: #FFF;
					font-weight: 600;
					.right_icon {
						width: 14rpx;
						height: 24rpx;
					}
				}
			}
		}
	}
	.news_item {
		background: #fff;
		margin-bottom: 24rpx;
		padding: 16rpx 24rpx;
		display: flex;
	
		.news_left {
			margin-left: 16rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
	
			.news_left_title {
				font-size: 32rpx;
				color: rgba(51, 51, 51, 1);
				font-weight: 500;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden; //溢出内容隐藏
				text-overflow: ellipsis; //文本溢出部分用省略号表示
				display: -webkit-box; //特别显示模式
				-webkit-line-clamp: 2; //行数
				line-clamp: 2;
				-webkit-box-orient: vertical; //盒子中内容竖直
			}
	
			.news_left_lable {
				display: flex;
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
				align-items: center;
				justify-content: space-between;
				.state {
					padding: 8rpx 17rpx;
					margin-right: 16rpx;
					background: #FFF7EA;
					border-radius: 10rpx;
					color: #CD8D47;
					font-size: 24rpx;
				}
			}
		}
	
	
		.news_right {
			border-radius: 16rpx;
			width: 220rpx;
			height: 160rpx;
		}
	}
</style>
<!-- <style scoped>
	

	
 ::v-deep .swiper2 .uni-swiper-dots-horizontal {
	    bottom: 24rpx !important;
 }
 ::v-deep .swiper2 .uni-swiper-dot-active {
 		    background:#333!important;
 }
 ::v-deep .swiper2 .uni-swiper-dot {
 		    background: #888888;
 }
 ::v-deep .u-popup__content {
		background-color: transparent!important;
 }

</style> -->

<style scoped>
	 ::v-deep uni-swiper .uni-swiper-dot {
	 	background: rgba(0,0,0,.4)!important;
		border-radius: 6rpx!important;
		width: 24rpx!important;
		height: 6rpx!important;
	 }
	 ::v-deep uni-swiper .uni-swiper-dot-active {
	     background-color: #DE0C08!important;
	 }
	 ::v-deep .u-popup__content {
	 		background-color: transparent!important;
	 }
</style>
