import Vue from 'vue'
import Vuex from 'vuex'
import $http from '@/utils/http'
Vue.use(Vuex)

const store = new Vuex.Store({

	state: {
		books: [],
		myInfo: {},
		// 是否是app版本
		// 是否第一次弹出公告
		isFirstNotice: true
	},

	getters: {
		userIdGetter(state) {
			return state.userId
		}
	},
	mutations: {
		// 所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
		// 第二个参数是可选参数，用于调用该 mutations 方法的时候传参
		initBooks(state, books) {
			state.books = books
		},
		addNewBook(state, book) {
			state.books.unshift(book)
		}
	},
	actions: {

		//首页
		async userLogin({
			commit
		}, params) {
			const res = $http.post('/user/login', params)
			return res
		},

		// 发送验证码
		async userGetSms({
			commit
		}, params) {
			const res = $http.post('/user/getsms', params)
			return res
		},

		// 校验验证码
		async userCheckSms({
			commit
		}, params) {
			const res = $http.post('/user/checksms', params)
			return res
		},

		// 用户注册
		async userRegister({
			commit
		}, params) {
			const res = $http.post('/user/register', params)
			return res
		},

		// 修改密码
		async imForgetPassWord({
			commit
		}, params) {
			const res = $http.post('/im/forgetPassWord', params)
			return res
		},

		// 获取用户信息
		async userUserinfo({
			commit
		}, params) {
			const res = $http.post('/user/userinfo', params)
			return res
		},

		// 获取轮播图列表
		async baseSlider({
			commit
		}, params) {
			const res = $http.post('/base/base_slider', params)
			return res
		},



		// 获取上证指数
		async imStockIndex({
			commit
		}, params) {
			const res = $http.post('/im/stock-index', params)
			return res
		},

		// 获取产品
		async newsGoodsList({
			commit
		}, params) {
			const res = $http.post('/news/goods_list', params)
			return res
		},

		// 新推产品
		async newsCoinNew({
			commit
		}, params) {
			const res = $http.post('/news/coin_new', params)
			return res
		},

		// 新闻有料
		async newsItem({
			commit
		}, params) {
			const res = $http.post('/news/item_list', params)
			return res
		},

		// 新闻详情
		async newsItemInfo({
			commit
		}, params) {
			const res = $http.post('/news/item_info', params)
			return res
		},

		// 获取签到信息
		async homeGetSign({
			commit
		}, params) {
			const res = $http.post('/home/getsign', params)
			return res
		},

		// 签到
		async homeSign({
			commit
		}, params) {
			const res = $http.post('/home/sign', params)
			return res
		},

		// 获取客服链接
		async kefuMessage({
			commit
		}, params) {
			const res = $http.post('/base/kefu_message', params)
			return res
		},

		// 获取团队列表
		async teamsLevel({
			commit
		}, params) {
			const res = $http.post('/team/teams_level', params)
			return res
		},

		// 获取vip等级
		async baseVip({
			commit
		}, params) {
			const res = $http.post('/base/vip', params)
			return res
		},

		// 关于我们
		async baseAbout({
			commit
		}, params) {
			const res = $http.post('/base/about', params)
			return res
		},

		// 投资列表
		async newsGoodsTwo({
			commit
		}, params) {
			const res = $http.post('/news/goods', params)
			return res
		},

		// 修改密码 type1登录密码
		async imChangePassword({
			commit
		}, params) {
			const res = $http.post('/im/change-password', params)
			return res
		},

		// 修改资金密码
		async imChangePassKeys({
			commit
		}, params) {
			const res = $http.post('/im/changePasskeys', params)
			return res
		},

		// 上传图片接口
		async imUploadFile({
			commit
		}, params) {
			const res = $http.post('/im/uploadFile', params)
			return res
		},

		// 实名认证接口
		async imUploadIDcard({
			commit
		}, params) {
			const res = $http.post('/im/uploadIDCard', params)
			return res
		},

		// 获取银行卡列表
		async imGetBankList({
			commit
		}, params) {
			const res = $http.post('/im/getBankList', params)
			return res
		},

		// 获取默认银行卡
		async imGetBankM({
			commit
		}, params) {
			const res = $http.post('/im/getBank', params)
			return res
		},

		// 操作银行卡
		async imSetBank({
			commit
		}, params) {
			const res = $http.post('/im/setBank', params)
			return res
		},

		// 获取银行卡列表
		async imGetBank({
			commit
		}, params) {
			const res = $http.post('/im/get-IssueBank', params)
			return res
		},

		// 绑定银行卡
		async imBindBank({
			commit
		}, params) {
			const res = $http.post('/im/bindBank', params)
			return res
		},

		// 获取数据公共接口
		async teamAccountChange({
			commit
		}, params) {
			const res = $http.post('/team/account_change', params)
			return res
		},

		// 充值提现接口
		async orderBoxOrder({
			commit
		}, params) {
			const res = $http.post('/order/box_order', params)
			return res
		},

		// 收益明细
		async teamEarnings({
			commit
		}, params) {
			const res = $http.post('/team/earnings', params)
			return res
		},

		// 做任务领红包
		async teamTask({
			commit
		}, params) {
			const res = $http.post('/team/task', params)
			return res
		},

		// 我的投资
		async orderOrderList({
			commit
		}, params) {
			const res = $http.post('/order/order_list', params)
			return res
		},

		// 获取合同
		async baseContractSeal({
			commit
		}, params) {
			const res = $http.post('/base/contract_seal', params)
			return res
		},

		// 充值
		async homeBalance({
			commit
		}, params) {
			const res = $http.post('/home/balance', params)
			return res
		},

		// 提现
		async homeWitnDraw({
			commit
		}, params) {
			const res = $http.post('/home/withdraw_post', params)
			return res
		},

		// 获取产品详情
		async newsCoinInfo({
			commit
		}, params) {
			const res = $http.post('/news/coin_info', params)
			return res
		},

		// 购买产品
		async orderPlaceOrder({
			commit
		}, params) {
			const res = $http.post('/order/place_order', params)
			return res
		},

		// 积分商城
		async newsMrp({
			commit
		}, params) {
			const res = $http.post('/news/mrp', params)
			return res
		},

		// 积分详情
		async newsMrpInfo({
			commit
		}, params) {
			const res = $http.post('/news/mrp_info', params)
			return res
		},

		// 兑换商品
		async orderMrpOrder({
			commit
		}, params) {
			const res = $http.post('/order/mrp_order', params)
			return res
		},

		// 产品分类
		async newsProductList({
			commit
		}, params) {
			const res = $http.post('/news/product_list', params)
			return res
		},

		// 获取广告图
		async baseCover({
			commit
		}, params) {
			const res = $http.post('/base/cover', params)
			return res
		},

		// 获取身份信息
		async getIDCard({
			commit
		}, params) {
			const res = $http.post('/im/uploadIDCard', params)
			return res
		},

		// 获取公告
		async baseBoard({
			commit
		}, params) {
			const res = $http.post('/base/base_board', params)
			return res
		},

		// 获取公告
		async appVideo({
			commit
		}, params) {
			const res = $http.post('/base/app_video', params)
			return res
		},

		// 下载app
		async appDown({
			commit
		}, params) {
			const res = $http.post('/base/app_down', params)
			return res
		},

		// 下载链接
		async getLink({
			commit
		}, params) {
			const res = $http.post('/base/download', params)
			return res
		},

		// 兑换记录
		async OrderList({
			commit
		}, params) {
			const res = $http.post('/order/mrp_order_list', params)
			return res
		},

		// 充值时间
		async withdrawFees({
			commit
		}, params) {
			const res = $http.post('/base/fees_info', params)
			return res
		},

		// 提现时间
		async txFees({
			commit
		}, params) {
			const res = $http.post('/base/tx_info', params)
			return res
		},


		// 添加收货地址
		async addAddress({
			commit
		}, params) {
			const res = $http.post('/im/add-address', params)
			return res
		},

		// 获取地址信息
		async getAddress({
			commit
		}, params) {
			const res = $http.post('/im/get-address', params)
			return res
		},

		// 获取地址信息
		async addUsdtAddress({
			commit
		}, params) {
			const res = $http.post('/im/usdtAddress', params)
			return res
		},

		// 获取抽奖记录
		async get_lunOrderList({
			commit
		}, params) {
			const res = $http.post('/order/lun_order_list', params)
			return res
		},
		
		// 获取轮盘列表
		async get_lunList({
			commit
		}, params) {
			const res = $http.post('/order/lun_list', params)
			return res
		},
		
		// 抽奖
		async get_placeLun({
			commit
		}, params) {
			const res = $http.post('/order/place_lun', params)
			return res
		},
		
		// 公告
		async get_gong({
			commit
		}, params) {
			const res = $http.post('/base/gong_list', params)
			return res
		},
		
		// 公告详情
		async get_gongs({
			commit
		}, params) {
			const res = $http.post('/base/gong_lists', params)
			return res
		},
		
		// 团队详情
		async get_teams({
			commit
		}, params) {
			const res = $http.post('/team/get_teams_users_level_details', params)
			return res
		},
		
		// 团队分级获取
		async get_level({
			commit
		}, params) {
			const res = $http.post('/team/level', params)
			return res
		},
		
		// 公告未观看条数
		async get_gong_tiao({
			commit
		}, params) {
			const res = $http.post('/base/gong_tiao', params)
			return res
		},
		
		// 公告观看
		async set_gong_kan({
			commit
		}, params) {
			const res = $http.post('/base/gong_kan', params)
			return res
		},
		
		// 获取下级信息
		async get_user_x({
			commit
		}, params) {
			const res = $http.post('/team/get_user_x', params)
			return res
		},
		
		// 获取手续费
		async fees_info({
			commit
		}, params) {
			const res = $http.post('/home/fees_info', params)
			return res
		},
		
		// 获取热门产品
		async coin_hot({
			commit
		}, params) {
			const res = $http.post('/news/coin_hot', params)
			return res
		},
		
		// 活期宝收益
		async get_box_money({
			commit
		}, params) {
			const res = $http.post('/team/get_box_money', params)
			return res
		},
		
		// 活期宝收益率
		async get_box_ratio({
			commit
		}, params) {
			const res = $http.post('/base/box_ratio', params)
			return res
		},
		
		// 领取任务奖励
		async set_team_task({
			commit
		}, params) {
			const res = $http.post('/team/set_team_task', params)
			return res
		},
		
		// 获取投资收益
		async order_shou({
			commit
		}, params) {
			const res = $http.post('/order/order_shou', params)
			return res
		},

	}

})
export default store