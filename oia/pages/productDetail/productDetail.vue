<template>
	<view id="prodetail">
		<view class="detail_bg">
			<view class="detail_bg_top">
				<image mode="widthFix" @tap="toReturn()" src="../../static/images/img/zzz.png" />
				<view style="color: #222;width: 70%;">{{ info.name }}</view>
			</view>
		</view>

		<view class="detail_zt">
			<!-- <view class="detail_zt_title">
				<image mode="widthFix" src="../../static/images/productdetail/top.png" />
			</view>
			<view class="detail_zt_name">{{info.tname}}：{{info.name}}</view> -->
			<view class="detail_zt_lv" style="display: flex;justify-content: space-around;padding-left: 0px;">
				<view>
					<view class="detail_zt_lv_t1">
						<view class="detail_zt_lv_t1_lf" v-if="info.percents != -1 && info.tally_rate != 100">
							{{ info.percents }}</view>
						<view class="detail_zt_lv_t1_lf" v-else>{{ info.percent }}</view>
						<view class="detail_zt_lv_t1_rg">%</view>
					</view>
					<view class="detail_zt_lv_t2" v-if="info.tally_rate != 100 && info.type == 1">预计收益</view>
					<view class="detail_zt_lv_t2" v-else>日均收益率</view>
				</view>
				<view>
					<view class="detail_zt_lv_t1">
						<view class="detail_zt_lv_t1_lf">{{ info.total > 10000 ? info.total / 10000 + '万' : info.total
						}}
						</view>
					</view>
					<view class="detail_zt_lv_t2">产品总金额</view>
				</view>
				<view>
					<view class="detail_zt_lv_t1">
						<view class="detail_zt_lv_t1_lf">{{ (info.de_total / info.total * 100).toFixed(2) }}</view>
						<view class="detail_zt_lv_t1_rg">%</view>
					</view>
					<view class="detail_zt_lv_t2">已售百分比</view>
				</view>
			</view>
			<view class="detail_zt_xz">
				<view class="detail_zt_xzlf">
					<view class="detail_zt_xzlf_t">限投份额{{ info.limit_max_num }}</view>
					<!-- <view class="detail_zt_xzlf_b"></view> -->
				</view>
				<view class="detail_zt_xzlf">
					<view class="detail_zt_xzlf_t" v-if="info.days != -1 && info.tally_rate != 100 && info.type == 1">
						预计周期{{ info.days }}天</view>
					<view class="detail_zt_xzlf_t" v-else>理财期限{{ endDay }}天</view>
				</view>
				<view class="detail_zt_xzlf">
					<view class="detail_zt_xzlf_t">{{ info.start_money }}元起投</view>
				</view>
			</view>
			<view class="detail_zt_xz" style="padding-top: 0px;" v-if="info.limit_max_money > 0">
				<view class="detail_zt_xzlf">
					<view class="detail_zt_xzlf_t">{{ info.limit_max_money * 1 }}元上限</view>
				</view>
			</view>
			<!-- <view class="detail_zt_cb">(本产品由“{{info.tenderer}}”承保)</view> -->
		</view>

		<view class="sy_gc">
			<view class="sy_gc_title" style="text-align: center;border: 0;">收益过程</view>
			<view class="sy_gc_tu" style="justify-content: space-around;padding-top: 0px;">
				<view style="text-align: center;">
					<image mode="widthFix" src="../../static/images/img/1-5_icon_equity1.png" style="width: 50rpx;" />
					<view style="color: #0F0F0F;font-size: 30rpx;margin-top: 40rpx;">申请提交</view>
					<view style="color: #AEAEAE;font-size: 24rpx;margin-top: 4rpx;">今日</view>
				</view>
				<view style="text-align: center;">
					<image mode="widthFix" src="../../static/images/img/1-5_icon_equity2.png" style="width: 50rpx;" />
					<view style="color: #0F0F0F;font-size: 30rpx;margin-top: 40rpx;">每日返利</view>
					<view style="color: #AEAEAE;font-size: 24rpx;margin-top: 4rpx;">24小时后</view>
				</view>
				<view style="text-align: center;">
					<image mode="widthFix" src="../../static/images/img/1-5_icon_equity3.png" style="width: 50rpx;" />
					<view style="color: #0F0F0F;font-size: 30rpx;margin-top: 40rpx;">申请提现</view>
					<view style="color: #AEAEAE;font-size: 24rpx;margin-top: 4rpx;">24小时内到账</view>
				</view>
			</view>

			<view class="wxts">
				<view class="wxts_label">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2">买入后不可撤销，到期前不可取出</view>
				</view>
				<view class="wxts_label">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2">产品到期，可自行选择提现，或复投</view>
				</view>


				<view class="wxts_label" v-if="info.is_integral == 1">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2">双倍积分：{{ info.start_money }}*2</view>
				</view>
				<view class="wxts_label" v-if="info.red_total > 0">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2">赠送红包：{{ info.start_money }}*{{ info.red_total }}%={{ red_total_v }}
					</view>
				</view>
				<view class="wxts_label" v-if="info.is_dividend == 1">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2">浮动分红：{{ info.dividend_total }}%</view>
				</view>
				<view class="wxts_label" v-if="info.t_if == 1">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2" style="width: calc(100% - 30rpx);">上级返利：
						<span v-for="(item2, index) in info.t_tier" :key="index" style="font-size: 24rpx;"
							v-if="index > 0 && index <= info.dai_c">
							{{ index }}级:{{ item2 }}%，
						</span>
					</view>
				</view>
				<view class="wxts_label" v-if="info.hong == 2">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2" style="width: calc(100% - 30rpx);">VIP杠杆福利：
						<span v-for="(item2, index) in info.vip_scales" :key="index" style="font-size: 24rpx;">
							{{ item2.name }}:{{ item2.number }}%，
						</span>
					</view>
				</view>

				<view class="wxts_label">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2" style="display: flex;" v-if="info.hong == 2">
						<viwe style="margin-top: 16rpx;">收益公式：</viwe>
						<view>
							<span>{{ info.start_money }}*({{ info.percent }}%+{{ (Number(vip_percent)).toFixed(2)
							}}%)*{{ endDay }}={{ sy_1
									* 1 }}</span><br>
							<span v-if="info.is_dividend == 1">
								{{ info.start_money }}*({{ info.vip_scales[this.vipcode].number }}%+{{
									info.dividend_total }}%)={{ sy_2
									* 1 }}
							</span>
							<span v-else>{{ info.start_money }}*{{ info.vip_scales[this.vipcode].number }}%={{ sy_2 *
								1 }}</span>
						</view>
					</view>
					<view class="wxts_label_v2" style="display: flex;" v-else>
						<viwe :style="info.is_dividend == 1 ? 'margin-top: 16rpx;' : ''">收益公式：</viwe>
						<view>
							<span>{{ info.start_money }}*({{ info.percent }}%+{{ (Number(vip_percent)).toFixed(2)
							}}%)*{{ endDay }}={{ sy_1
									* 1 }}</span><br>
							<span v-if="info.is_dividend == 1">{{ info.start_money }}*{{ info.dividend_total }}%={{ sy_2
								*
								1 }}</span>
						</view>
					</view>
				</view>
				<view class="wxts_label">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2">收益结算：
						<span>
							{{ info.start_money }}+{{ sy_1 * 1 }}
						</span>
						<span v-if="info.is_dividend == 1 || info.hong == 2">
							+{{ sy_2 * 1 }}
						</span>
						<span v-if="info.red_total > 0">
							+{{ red_total_v }}
						</span>
						<span>
							={{ syjs * 1 }}
						</span>
					</view>
				</view>
				<view class="wxts_label" v-if="info.is_relation == 1">
					<view class="wxts_label_v1"></view>
					<view class="wxts_label_v2" style="color: red;">组合产品：
						<span>
							此产品需购买({{ info.relation.name }})后才可过后买此产品!
						</span>

					</view>
				</view>
			</view>
		</view>

		<view style="margin: 24rpx 30rpx;">
			<image mode="widthFix" src="../../static/images/img/1-5_banner_1.png"
				style="width: 100%;border-radius: 18rpx;" />
		</view>

		<view class="amount">
			<view class="amount-text">
				买入金额
			</view>
			<view class="amount-number">
				￥
				<input class="input-number" :placeholder="placeholderText" type="number" v-model="buymoney"
					@input="change" placeholder-style="font-size:28rpx" />
			</view>
			<!-- 新增密钥输入框 -->
			<view v-if="info.is_key == 1" style="margin-top: 20rpx;">
				<input class="input-key" v-model="inputKey" maxlength="32" placeholder="请输入购买密钥"
					style="width: 100%;height: 80rpx;font-size: 28rpx;border: 1px solid #eee;border-radius: 8rpx;padding-left: 20rpx;" />
			</view>
			<view style="color:red;font-size:24rpx;" v-if="info.is_key == 1 && keyError">{{ keyError }}</view>
		</view>

		<view class="pay_type" style="margin-bottom: 24rpx;">
			<view class="pay_type_lf" style="margin-bottom: 30rpx;">代金券</view>
			<view class="pay_type_rg" v-if="xuan_jin_name">
				<view style="display: flex;width: 80%;" @click="show_jin = true">
					<view>
						<image mode="heightFix" src="../../static/images/img/1-5_icon_payment.png"
							style="height: 80rpx;" />
					</view>
					<view style="margin-left: 20rpx;">
						<view class="pay_type_rg_t" style="line-height: 80rpx;">{{ xuan_jin_name }}</view>
					</view>
				</view>
				<view style="width: 20%;text-align: right;">
					<image mode="heightFix" src="../../static/images/mine/right-icon1.png"
						style="height: 40rpx;margin-top: 20rpx;" />
				</view>
			</view>
			<view class="pay_type_rg" v-if="!xuan_jin_name" @click="show_jin = true">
				<view style="display: flex;width: 80%;">
					<view style="margin-left: 20rpx;">
						<view class="pay_type_rg_t" style="line-height: 80rpx;">选择代金券</view>
					</view>
				</view>
				<view style="width: 20%;text-align: right;">
					<image mode="heightFix" src="../../static/images/mine/right-icon1.png"
						style="height: 40rpx;margin-top: 20rpx;" />
				</view>
			</view>
		</view>

		<u-popup :show="show_jin" @close="show_jin = false" round="16" mode="bottom">
			<view style="height: 500rpx;">
				<view style="height: 80rpx;line-height: 80rpx;text-align: center;">
					选择代金券
				</view>
				<view style="height: 400rpx;padding: 0 40rpx;overflow-y: scroll;">
					<view @click="xuan_jin(index)" v-for="(item, index) in list" :key="index"
						style="height: 150rpx;display: flex;border-bottom: 1px solid #E5E5E5;width: 100%;">
						<view style="width: 50%;margin-left: 20rpx;line-height: 150rpx;text-align: left;">
							{{ item.name }}
						</view>
						<view style="width: 50%;text-align: right;">
							<image mode="heightFix" src="../../static/images/mine/right-icon1.png"
								style="height: 40rpx;margin-top: 55rpx;" />
						</view>

					</view>
				</view>
			</view>
		</u-popup>

		<view class="pay_type">
			<view class="pay_type_lf" style="margin-bottom: 30rpx;">支付方式</view>
			<view class="pay_type_rg">
				<view style="padding-top: 20rpx;">
					<image mode="widthFix" src="../../static/images/img/1-5_icon_payment.png" style="width: 60rpx;" />
				</view>
				<view style="margin-left: 20rpx;">
					<view class="pay_type_rg_t">余额支付</view>
					<view class="pay_type_rg_b">
						<span class="pay_type_rg_b_sp1">当前可用</span>
						<span class="pay_type_rg_b_sp2">{{ balance }}</span>
						<span class="pay_type_rg_b_sp1">元</span>
					</view>
				</view>
			</view>
		</view>

		<view class="acc">
			<view class="xy" @tap="zhegnCe()">
				<image src="../../static/images/img/1-5_icon_selected.png" v-show="checked"></image>
				<image src="../../static/images/img/1-5_icon_Unselected.png" v-show="!checked"></image>
				<text>已悉知风险提示并同意服务协议，已知晓此产品为中低风险</text>
			</view>
		</view>
		<view class="buy_btn">
			<view class="buy_btns" v-if="info.time_state == 1">
				{{ shijian_kaishi }}
			</view>
			<view class="buy_btns" @tap="showBuyFn()" v-else>立即购买</view>
		</view>

		<!--密码弹出框-->
		<u-popup :show="show" @close="show = false" round="10" mode='center'>
			<view class="shuru">
				<text>输入资金密码</text>
				<text>
					<span>确认支付</span>
					<!-- <span style="color: red;padding: 0 4rpx;" v-if="info.switch==0">{{info.start_money}}</span> -->
					<span style="color: red;padding: 0 4rpx;">{{ buymoney }}</span>
					<span> 元</span>
				</text>
				<view class="ipts">
					<u-code-input dot v-model="pwds" :focus="true" :maxlength="6" @finish="finish"></u-code-input>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: "",
			id: "",
			checked: false,
			// VIP的加息率
			vip_percent: 0,
			buymoney: "", // 购买金额
			itemList: [], // vip数组
			balance: 0, // 余额
			info: {}, //投资详情
			id: null, // 投资id
			show: false,
			show_jin: false,
			pwds: '',
			placeholderText: '',
			sy_1: 0,
			sy_2: 0,
			sy_3: 0,
			syjs: 0,
			userInfo: {},
			vipcode: 0,
			vipname: 0,
			list: [],
			xuan_jin_v: -1,
			xuan_jin_name: "",
			endDate: '',
			shijian_kaishi: '',
			int: null,
			red_total_v: 0,
			inputKey: '',      // 密钥输入
			keyError: '',      // 密钥错误提示
		}
	},
	onLoad(option) {
		this.id = option.id;
		this.title = option.title;
		this.getuser();
		this.lun_order_list(1);
	},
	onShow() {

	},
	onUnload() {
		this.int = window.clearInterval(this.int);
		this.int = null;
	},
	methods: {
		handleBeforeUnload(event) { //页面关闭
			this.int = null;
		},
		dingshiqi() {
			var that = this;
			// 转换日期字符串为Date对象  
			const endDate = new Date(that.endDate);
			const currentDate = new Date(this.info.date);
			// 计算时间差  
			const diff = endDate - currentDate;

			// 将毫秒转换为天、小时、分钟和秒  
			var days = Math.floor(diff / (1000 * 60 * 60 * 24));
			var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((diff % (1000 * 60)) / 1000);

			// 格式化字符串  
			var shijian = `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
			that.shijian_kaishi = shijian;
			this.int = self.setInterval(function () {
				seconds--;

				if (seconds < 0) {
					seconds = 59;
					minutes--;
					if (minutes < 0) {
						minutes = 59;
						hours--;
						if (hours < 0) {
							hours = 23;
							days--;
						}
					}
				}
				hours = hours * 1;
				minutes = minutes * 1;
				seconds = seconds * 1;
				if (hours < 10) {
					hours = "0" + hours;
				}
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				var shijian = `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
				that.shijian_kaishi = shijian;
				if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
					that.$router.go(0);
				}
			}, 1000);
		},
		xuan_jin(x) {
			this.xuan_jin_v = x;
			this.xuan_jin_name = this.list[x].name;
			this.show_jin = false;
		},
		async lun_order_list(x) {
			var that = this;
			var params = {
				type: x
			}
			uni.showLoading({
				title: '加载中'
			})
			let res = await this.$store.dispatch("get_lunOrderList", params);
			if (res.code == 1) {
				uni.hideLoading();
				this.list = res.data;
				if (this.list) {
					this.xuan_jin(0);
				}
			}
		},
		// 个人信息
		async getuser() {
			var that = this;
			var params = {}
			uni.showLoading({
				title: ''
			});
			let res = await this.$store.dispatch("userUserinfo", params);
			if (res.code == 1) {
				this.vipcode = res.data.vip_name;
				this.vipname = res.data.vip_name;
				if (res.data.balance) {
					this.balance = parseFloat(res.data.balance).toFixed(2);
				} else {
					this.balance = 0;
				}
				this.userInfo = res.data;
				this.getVip();
			}
		},

		showBuyFn() {
			// 校验密钥是否填写
			if (this.info.is_key == 1) {
				if (!this.inputKey) {
					this.keyError = '请输入购买密钥';
					return;
				} else {
					this.keyError = '';
				}
			}
			// 你可以在这里加密钥校验逻辑，比如请求后端接口校验密钥
			// if (this.inputKey !== '123456') {
			//     this.keyError = '密钥错误';
			//     return;
			// }

			if (this.buymoney === '' && this.info.start_money === '') {
				this.$u.toast("请填写买入金额");
				return;
			}
			var m = 0;
			m = this.buymoney;
			let number = parseInt(m) % 100;
			if (number == 0) {
				if (m < this.info.start_money) {
					this.buymoney = '';
					this.$u.toast("投资金额不能低于起投金额");
					return;
				} else {
					this.buymoney = parseInt(m);
				}
			} else {
				if (this.info.switch != 0) {
					this.buymoney = '';
					this.$u.toast("买入金额为100的整数倍，请重新输入");
					return;
				}

			}

			if (this.checked) {
				this.show = true;
			} else {
				this.$u.toast("请先知悉风险提示并同意服务协议")
			}

		},
		async finish(pwd) {
			let data = {};
			let that = this;
			/* if (this.info.switch == 0) {
				data.amount = this.info.start_money;
			} else {
				data.amount = this.buymoney;
			} */
			data.amount = this.buymoney;
			data.proid = this.id;
			data.passkey = pwd;
			data.key = this.inputKey; // 添加密钥到数据中
			if (this.list[this.xuan_jin_v]) {
				data.chou_id = this.list[this.xuan_jin_v].id;
			} else {
				data.chou_id = 0;
			}
			that.show = false;
			uni.showLoading({
				title: '买入中'
			});

			let res = await this.$store.dispatch("orderPlaceOrder", data);
			if (res.code == 1) {
				uni.hideLoading();
				uni.$u.toast("买入成功")
				setTimeout(() => {
					that.pwds = '';
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
			} else {
				uni.hideLoading();
				uni.$u.toast(res.info)
				that.pwds = '';
			}
		},



		async getVip() {
			var that = this;
			var params = {}
			let res = await this.$store.dispatch("baseVip", params);
			if (res.code == 1) {
				this.itemList = res.data;
				this.vip_percent = this.isHasObj(this.itemList, this.vipcode);
				console.log(this.vip_percent)
				this.getDeail();
			}
		},
		// 获取VIP的加息率
		isHasObj(arr, val) {
			var percent = 0;
			percent = arr[val].percent;
			return percent;
			/* for (var i = 0; i < arr.length; i++) {
				if (arr[i].id == val) {
					percent = arr[i].percent;
				}
			} */
		},
		blur(e) {
			let number = parseInt(e.target.value) % 100;
			console.log(number);
			if (number == 0) {
				if (e.target.value < this.info.start_money) {
					this.buymoney = '';
					this.$u.toast("投资金额不能低于起投金额");
				} else {
					this.buymoney = parseInt(e.target.value);
				}
			} else {
				this.buymoney = '';
				this.$u.toast("买入金额为100的整数倍，请重新输入");
			}
		},

		async getDeail() {
			var that = this;
			var params = {
				proid: this.id
			}
			uni.showLoading({
				title: ''
			});
			let res = await this.$store.dispatch("newsCoinInfo", params);
			if (res.code == 1) {
				this.info = res.data;
				this.info.t_if = 0;
				if (this.info.t_tier != null && this.info.t_tier != "") {
					for (var i = 0; i <= this.info.dai_c; i++) {
						if (this.info.t_tier[i] > 0) {
							this.info.t_if = 1;
						}
					}
				}
				if (this.info.days != -1 && this.info.tally_rate != 100) {
					this.info.day = this.info.days;
				}
				if (this.info.percents != -1 && this.info.tally_rate != 100) {
					this.info.percent = this.info.percents;
				}
				let info = res.data;
				let aa = 0;
				let cc = 0;
				this.red_total_v = parseFloat(info.start_money * Number(info.red_total / 100));
				//收益+本金
				aa = parseFloat(info.start_money * (Number(info.percent / 100) + Number(this.vip_percent /
					100)) * info.day) + parseFloat(info.start_money);
				//收益
				cc = parseFloat(info.start_money * (Number(info.percent / 100) + Number(this.vip_percent /
					100)) * info.day);
				this.sy_1 = cc.toFixed(2);
				if (info.hong == 2) {
					this.sy_3 = parseFloat(info.start_money * Number(info.vip_scales[this.vipcode].number / 100)).toFixed(2);
				}
				if (info.is_dividend == 1 && info.dividend_total > 0) {
					this.sy_2 = parseFloat(info.start_money * (Number(info.dividend_total / 100))).toFixed(2);
					this.sy_2 = this.sy_2 * 1 + this.sy_3 * 1;
					let bb = (this.sy_1 * 1) + (this.sy_2 * 1) + info.start_money;
					if (info.red_total > 0) {
						bb += this.red_total_v
					}
					this.syjs = bb.toFixed(2);
				} else {
					this.sy_2 = this.sy_2 * 1 + this.sy_3 * 1;
					let bb = (this.sy_1 * 1) + (this.sy_3 * 1) + info.start_money;
					if (info.red_total > 0) {
						bb += this.red_total_v
					}
					this.syjs = bb.toFixed(2);
				}
				this.placeholderText = '起投金额' + res.data.start_money + '起';
				uni.hideLoading();
				this.endDate = info.time_start;
				if (info.time_state == 1) {
					this.dingshiqi();
				}
			}
		},

		change(e) {
			e.target.value = e.target.value.replace(/^0|[^\d]|[.]/g, '');
			this.$nextTick(() => {
				this.buymoney = e.target.value;
			});

		},

		zhegnCe() {
			this.checked = !this.checked;
		},

		//返回
		toReturn() {
			uni.navigateBack({
				delta: 1
			});
		},

	},
	computed: {
		// 计算理财期限
		endDay() {
			if (this.info.end_time) {
				function getDuration(my_time) {
					var days = my_time / 1000 / 60 / 60 / 24;
					var daysRound = Math.floor(days);
					var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
					var hoursRound = Math.floor(hours);
					var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
					var minutesRound = Math.floor(minutes);
					var seconds = (my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 *
						minutesRound)).toFixed(2);
					return daysRound ? daysRound + '天' : '' + hoursRound + '时' + minutesRound + '分';
				}

				console.log('this.info.end_time', this.info.end_time);
				let arr = this.info.end_time.split(/[- : \/]/);
				let days = Date.parse(new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]));
				let datatime = getDuration(days - (new Date()).getTime());
				console.log(datatime);
				return datatime;
			} else {
				return this.info.day;
			}
		},
		endDaybat() {
			if (this.info.end_time) {
				function getDuration(my_time) {
					var days = my_time / 1000 / 60 / 60 / 24;
					var daysRound = Math.floor(days);
					var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
					var hoursRound = Math.floor(hours);
					var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
					var minutesRound = Math.floor(minutes);
					var seconds = (my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 *
						minutesRound)).toFixed(2);
					return daysRound ? daysRound : '1'
				}

				console.log('this.info.end_time', this.info.end_time);
				let arr = this.info.end_time.split(/[- : \/]/);
				let days = Date.parse(new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]));
				let datatime = getDuration(days - (new Date()).getTime());
				console.log(datatime);
				return datatime;
			} else {
				return this.info.day;
			}
		}

	},
}
</script>

<style scoped lang="scss">
#prodetail {
	width: 100%;
	background: #F5F6F6;
	height: 100vh;
	overflow-y: scroll;

	.detail_bg {
		background: linear-gradient(180deg, #E0BF9F 0%, #F0D5BA 100%);
		/* background: url('../../static/images/productdetail/detail_bg.png') no-repeat;
			background-size: 100% 100%; */
		border-radius: 0 0 30rpx 30rpx;
		height: 300rpx;

		.detail_bg_top {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			padding-top: 40rpx;

			image {
				position: absolute;
				left: 30rpx;
				width: 36rpx;
			}
		}

	}

	.detail_zt {
		background: #FFFFFF;
		background: url('../../static/images/img/1-5_bg_productbg.png') no-repeat;
		background-size: 100% 100%;
		border-radius: 30rpx;
		margin: 0 30rpx;
		margin-top: -140rpx;
		padding-bottom: 45rpx;

		.detail_zt_title {
			display: flex;
			justify-content: center;
			position: relative;

			image {
				width: 422rpx;
				margin-top: -26rpx;
			}
		}

		.detail_zt_name {
			font-size: 30rpx;
			font-weight: bold;
			color: #6B3232;
			display: flex;
			justify-content: center;
		}

		.detail_zt_lv {
			/* align-items: center; */
			padding-top: 61rpx;
			padding-left: 40rpx;

			.detail_zt_lv_t1 {
				display: flex;
				align-items: baseline;
				line-height: 1;

				.detail_zt_lv_t1_lf {
					font-size: 50rpx;
					font-weight: bold;
					color: #D1B599;
				}

				.detail_zt_lv_t1_rg {
					font-size: 38rpx;
					font-weight: bold;
					color: #D1B599;
				}
			}

			.detail_zt_lv_t2 {
				font-size: 24rpx;
				font-weight: 400;
				padding-top: 33rpx;
				color: #FFF;
			}
		}

		.detail_zt_xz {
			margin: 0 35rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			padding: 40rpx 0rpx;

			.detail_zt_xzlf {
				display: flex;
				flex-direction: column;
				align-items: center;
				background: linear-gradient(180deg, #F2DAC2 0%, #E5C39F 100%);
				border-radius: 50rpx;
				padding: 6rpx 23rpx;
				margin-right: 20rpx;

				.detail_zt_xzlf_t {
					font-size: 24rpx;
					color: #3B3B39;
				}

				.detail_zt_xzlf_b {
					font-size: 34rpx;
					color: #3B3B39;
					padding-top: 18rpx;
					font-weight: bold;
				}
			}
		}

		.detail_zt_cb {
			font-size: 24rpx;
			color: #3167FF;
			display: flex;
			justify-content: center;
			padding-top: 31rpx;
			font-weight: bold;
		}

	}


	.amount {
		padding: 34rpx 30rpx;
		background-color: #ffffff;
		margin: 24rpx 25rpx;
		background: #FFFFFF;
		border-radius: 20rpx;

		.amount-text {
			font-size: 32rpx;
			color: #333;
			padding-top: 14rpx;
			font-weight: bold;
		}

		.amount-number {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			font-size: 50rpx;
			font-weight: Bold;
			border-bottom: 2rpx solid #E5E5E5;

			.input-number {
				width: 500rpx;
				height: 100rpx;
				font-size: 50rpx;

			}
		}

		.amount_shangxian {
			font-size: 24rpx;
			padding-top: 26rpx;

			.amount_sx_sp1 {
				color: #A7A6A6;
			}

			.amount_sx_sp2 {
				color: #3166FF;
				padding: 0 6rpx;
				font-weight: bold;
			}
		}
	}

	.pay_type {
		padding: 34rpx 30rpx;
		background-color: #ffffff;
		margin: 0rpx 25rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		align-items: center;

		.pay_type_lf {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
		}

		.pay_type_rg {
			display: flex;
			align-content: flex-start;

			.pay_type_rg_t {
				font-size: 28rpx;
				color: #333333;
			}

			.pay_type_rg_b {
				font-size: 26rpx;
				padding-top: 20rpx;

				.pay_type_rg_b_sp1 {
					color: #A7A6A6;
				}

				.pay_type_rg_b_sp2 {
					color: #3166FF;
					padding: 0 6rpx;
					font-weight: bold;
				}
			}
		}
	}

	.sy_gc {
		padding: 45rpx 30rpx;
		background-color: #ffffff;
		margin: 0rpx 30rpx;
		border-radius: 20rpx;
		margin-top: 24rpx;

		.sy_gc_title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			border-bottom: 2rpx solid #E5E5E5;
			padding-bottom: 41rpx;
		}

		.sy_gc_tu {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 35rpx;

			image {
				width: 166rpx;
			}
		}

		.wxts {
			padding: 17rpx 0;
			margin-top: 30rpx;

			.wxts_label {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				margin: 0 0 10rpx 25rpx;

				.wxts_label_v1 {
					margin-right: 20rpx;
					width: 10rpx;
					height: 10rpx;
					border-radius: 30px;
					background: #322D28;
				}

				.wxts_label_v2 {
					font-size: 26rpx;
					color: #666666;
				}
			}
		}

	}

	.acc {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 40px;
		padding: 0 27rpx;
		padding-bottom: 180rpx;

		.xy {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #333333;
			text-align: center;

			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 10rpx;
			}
		}
	}

	.buy_btn {
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: #fff;
		padding: 26rpx 0;

		.buy_btns {
			background: #2B2825;
			width: calc(100% - 50rpx);
			color: #fff;
			padding: 29rpx 0;
			font-size: 32rpx;
			border-radius: 30px;
			display: flex;
			justify-content: center;
			margin-left: 25rpx;
		}
	}


	.shuru {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 18rpx;
		border-radius: 20rpx;

		text {
			&:nth-child(1) {
				font-size: 28rpx;
				font-weight: bold;
			}

			&:nth-child(2) {
				font-size: 24rpx;
				color: #333;
				font-weight: 400;
				margin-top: 16rpx;
			}

			&:nth-child(3) {
				font-size: 40rpx;

				font-weight: bold;
				margin-top: 30rpx;
			}
		}

		.ipts {
			margin-top: 24rpx;
			margin-bottom: 48rpx;

			::v-deep .u-code-input {
				.u-code-input__item {
					border-radius: 8rpx;
					background-color: #F1F1F1;
					border: none !important;
				}
			}
		}
	}

}
</style>

<style scoped>
::v-deep .u-navbar__content__title {
	width: auto !important;
	padding: 0 80rpx !important;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	overflow: hidden;
}
</style>