<template>
	<view id="contract">
		<u-navbar title="我的合同" :placeholder="true" :autoBack="true" bgColor="#FFF"></u-navbar>
		<!-- 合同页面 -->
		<view class="main">
			<view style="padding-top: 20rpx;text-align: center;">
				<!-- <view>{{title}}</view> -->
				<view>理财投资合同</view>
				<view>合同编号：<span style="border-bottom: 1px solid #000;">{{item.code}}</span></view>
			</view>
			<view style="margin-top: 40rpx;">
				<view>甲方（投资人)：<span style="border-bottom: 1px solid #000;">{{userInfoData.real_name}}</span></view>
				<view>身份证号：<span style="border-bottom: 1px solid #000;">{{userInfoData.id_card}}</span></view>
				<view style="margin-top: 20rpx;">乙方（投资产品提供方)：</view>
				<view>公司名称：<span style="border-bottom: 1px solid #000;">{{htz.name1}}</span></view>
				<view style="margin-top: 20rpx;">丙方（担保方)：<span style="border-bottom: 1px solid #000;">{{htz.name2}}</span></view>
				<view style="line-height: 34rpx;margin-top: 20rpx;">根据《中华人民共和国合同法》及其他有关法律法规，甲乙双方本着平等自愿、公平诚信的原则，订立本合同。</view>
			</view>

			<!-- <text style="text-indent:0">经甲乙双方经友好协商，在相互尊重和互利互惠的原则基础上，就甲方使用乙方提供的本应用所有服务的有关事项达成如下协议:</text> -->
			<text class="fw" style="margin-top: 40rpx;">一、投资产品概述</text>
			<view class="">
				<view>产品名称：<span style="border-bottom: 1px solid #000;">{{item.name}}</span></view>
				<view>投入金额：人民币
					<span style="border-bottom: 1px solid #000;">{{item.amount}}</span>元
					(大写：<span style="border-bottom: 1px solid #000;">{{item.amounts}}</span>)
				</view>
				<view>收益周期（天）：<span style="border-bottom: 1px solid #000;">{{endDay}}</span></view>
				<view>项目收益率：<span style="border-bottom: 1px solid #000;">{{item.percent_jiaxi.toFixed(2)}}%</span>
				</view>
				<view style="display: flex;">合同签约时间：{{item.create_at_v[0]}}年{{item.create_at_v[1]}}月{{item.create_at_v[2]}}日</view>
				<view style="display: flex;">理财项目到期时间：{{item.end_at_v[0]}}年{{item.end_at_v[1]}}月{{item.end_at_v[2]}}日</view>
				<view>应收本息总额：人民币
					<span style="border-bottom: 1px solid #000;">{{benxi_zong}}</span>元
					(大写：<span style="border-bottom: 1px solid #000;">{{benxi_zongs}}</span>)
				</view>
				<!-- <span> <i>产品名称</i><i style="background-color: #fff;">{{item.name}}</i> </span>
				<span> <i style="background-color: #fff;">投资人姓名</i><i>{{userInfoData.real_name}}</i> </span>
				<span> <i>投资人身份证</i><i style="background-color: #fff;">{{userInfoData.id_card}}</i> </span>
				<span> <i style="background-color: #fff;">投入人民币数额</i><i>{{item.amount}}</i> </span>
				<span> <i>收益周期（天）</i><i style="background-color: #fff;"> {{endDay}}</i></span>
				<span> <i style="background-color: #fff;">收益率</i><i>{{item.percent_jiaxi.toFixed(2)}}%</i> </span>
				<span> <i>签约时间</i><i style="background-color: #fff;">{{item.create_at}}</i> </span>
				<span> <i style="background-color: #fff;">到期日</i><i>{{item.end_at}}</i> </span>
				<span> <i>应收本息（人民币）</i>
					<i style="background-color: #fff;">
						{{(parseFloat(item.amount*(item.percent_jiaxi/100))*endDay+ parseFloat(item.amount)).toFixed(2)}}
						<i
							v-if="item.is_dividend">+分红({{(parseFloat(item.amount*(item.percent_jiaxi/100))*endDay*(item.dividend_total/100)).toFixed(2)}})</i>
					</i>
				</span> -->
			</view>
			<text class="fw" style="margin-top: 20rpx;">二、协议期注意事项</text>
			<text>
				1.甲方保证其提供的信息和资料的真实性，不得提供虚假资料。甲方提供虚假资料，构成违约，应承担违约责任，同时本协议视为提前终止。
			</text>
			<text>2.甲方不得擅自终止本协议，否则乙方将取消为甲方的理财服务，甲方不享受任何理财收益，甲方投资时必须看清楚投资项目的一切事宜，按照公司要求进行投资,如有违反规定，甲方并承担由此所引起的一切损失</text>
			<text>3.甲方保证其所用于投资资金来源合法，甲方是该资金的合法所有人，如果因合法性问题发生争议，由甲方自行负责解决。如甲方未能解决，因甲方资金安全问题导致账户被相关司法机关冻结或执行，由甲方自行负责解决相关司法问题</text>
			<text class="fw">三、理财协议生成流程</text>
			<text>1.本协议成立:乙方在[{{htz.name1}}]理财平台上发布相关的理财产品及相关收益，甲方按照[{{htz.name1}}]的规则，在点击确认投资时，本协议下所约定的内容即成立，本协议的签署关系同时成立。</text>
			<text>2.理财金由甲方账户划转到乙方的综合理财账户上进行具体的理财操作，由于甲方全权委托乙方理财，因此在股权，基金项目的投资风险由乙方承担，乙方首先要考虑资金的安全性，然后才考虑资金的收益。甲方不得以任何形式干预乙方的理财操作。收益是每天发放到甲方账户，待理财投资周期到期止，乙方应将甲方理财本金划入其甲方开户的理财账户内。</text>
			<text class="fw">四、乙方对甲方投资资金负有控制风险的责任</text>
			<text>1.如果投资有亏损情况，则无论亏损大小由乙方承担全部损失，按合同承诺付款给甲方。如果乙方出现违约将由担保方丙方履行承诺付款给甲方。</text>
			<text>2.乙方同意并承诺，乙方负责对甲方所投资金的收益金额和返款时间的保证，乙方必须按照本协议的约定，按时间全额将其返还到甲方的账户中。</text>
			<text>3.如果返款日遇到法定假日或公休日，返款日期时间不受影响。</text>
			<text class="fw"> 五、保密义务</text>
			<text>甲乙双方对其通过接触和通过其他渠道得知的有关各方的商业机密等严格保密，对所有资料严格保密，不得向任何其他人员及机构透露个人的信息。</text>
			<text class="fw"> 六、合同的法律效应</text>
			<text>1.本协议经投资人通过投资平台点击确认投资后自动生成并签订，本协议自生成时生效。</text>
			<text>2.本协议履行期间，各方如发生争议或者纠纷，应友好协商解决，如协商不成，任何一方有权向乙方所在地人民法院起诉。</text>
			<text>3.本协议采用电子文本形式制成，各方均认可该形式的法律效应。</text>
			<text>4.乙方一份，甲方一份，丙方一份，具有同等法律效应。</text>
			<text class="fw"> 七、其他</text>
			<text>本协议的任何修改、补充均需[{{htz.name1}}]平台以电子文本形式作出。</text>

			<!-- <view class="gaiz">
				
				<view class="cont_zg">
					<view class="cont_li">
						<image :src="htz.cover2" mode="widthFix" />
							<span>甲方：{{htz.name1}}</span>
							
					</view>
					<view style="margin-top: 16rpx;">签约时间：{{item.create_at}}</view>
				</view>
				
				<view class="cont_zg" style="margin-top: 40rpx;">
					<view class="cont_li">
							<span>乙方：{{userInfoData.real_name}}</span>
					</view>
					<view style="margin-top: 16rpx;">签约时间：{{item.create_at}}</view>
				</view>
			
			</view> -->

			<view class="cont_li2" style="padding-bottom: 20rpx;">
				<view style="display: flex;">
					<view>甲方：{{userInfoData.real_name}}</view>
					<!-- <image :src="userInfoData.id_photo1" mode="heightFix" style="height: 80rpx;margin-top: 20rpx;margin-left: 80rpx;"></image> -->
				</view>
				<view style="margin-top: 16rpx;">签约时间：{{item.create_at_v[0]}}年{{item.create_at_v[1]}}月{{item.create_at_v[2]}}日</view>
			</view>

			<view class="cont_li2" style="padding: 80rpx 0 ;">
				<image :src="htz.cover1" mode="widthFix">
					<span>乙方：{{htz.name1}}</span>
					<view style="margin-top: 16rpx;">签约时间：{{item.create_at_v[0]}}年{{item.create_at_v[1]}}月{{item.create_at_v[2]}}日</view>
			</view>




			<view class="cont_li2">
				<image :src="htz.cover2" mode="widthFix">
					<span>丙方：{{htz.name2}}</span>
					<view style="margin-top: 16rpx;">签约时间：{{item.create_at_v[0]}}年{{item.create_at_v[1]}}月{{item.create_at_v[2]}}日</view>
			</view>

		</view>
		<!-- <u-loading-page :loading='loading' bg-color="#f1f1f1"></u-loading-page> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {},
				userInfoData: {},
				htz: {},
				title: "",
				jine_v: 0,
				jines_v: "",
				benxi_zong: 0,
				benxi_zongs: "",
			}
		},
		onLoad(option) {
			this.item = JSON.parse(option.item)
			console.log("**********")
			console.log(this.item)
			this.order_shou();
			//签约时间
			var arr = this.item.create_at.split(" ");
			arr = arr[0].split("-");
			this.item.create_at_v = arr;
			//到期时间
			var arr = this.item.end_at.split(" ");
			arr = arr[0].split("-");
			this.item.end_at_v = arr;
			//投入金额转大写
			this.item.amounts = this.numberToChinese(this.item.amount);
			//计算总额
			var a = (parseFloat(this.item.amount * (this.item.percent_jiaxi / 100)) * this.endDay + parseFloat(this.item
				.amount)).toFixed(2)
			var b = (parseFloat(this.item.amount * (this.item.percent_jiaxi / 100)) * this.endDay * (this.item
				.dividend_total / 100)).toFixed(2)
			if (this.item.is_dividend) {
				this.jine_v = a * 1 + b * 1;
				this.jine_vs = a;
			} else {
				this.jine_v = a;
				this.jine_vs = a;
			}
			//总额转大写
			this.jines_v = this.numberToChinese(this.jine_v);
		},
		onShow() {
			this.userInfo()
			this.contractSeal()
		},
		methods: {
			async order_shou() {
				var that = this;
				var params = {
					id: this.item.id
				}
				let res = await this.$store.dispatch("order_shou", params);
				if (res.code == 1) {
					this.benxi_zong = res.data.money;
					this.benxi_zongs = this.numberToChinese(this.benxi_zong);
				}
			},
			numberToChinese(num) {
				num = num * 1;
				const units = ['', '拾', '佰', '仟'];
				const bigUnits = ['', '万', '亿', '兆'];
				const digits = '零壹贰叁肆伍陆柒捌玖';
				const decimalUnits = ['角', '分', '厘']; // 小数单位  
				if (typeof num !== 'number' || isNaN(num)) {
					return '请输入一个有效的数字';
				}
				// 分离整数部分和小数部分  
				const [integerPart, decimalPart] = num.toString().split('.');
				let integerStr = integerPart;
				let decimalStr = decimalPart ? decimalPart.slice(0, 3) : ''; // 只取小数点后三位  
				// 处理整数部分  
				let integerResult = '';
				let zeroCount = 0;
				let needZero = false;
				let len = integerStr.length;
				for (let i = 0; i < len; i++) {
					let n = parseInt(integerStr[i]);
					let p = len - i - 1;
					let q = Math.floor(p / 4);
					let mod = p % 4;
					if (n === 0) {
						zeroCount++;
						if (zeroCount < 4 && (i !== len - 1 || integerStr[i + 1] !== undefined)) { // 避免末尾的零  
							needZero = true;
						}
					} else {
						if (needZero) {
							integerResult += digits[0];
							needZero = false;
						}
						zeroCount = 0;
						integerResult += digits[n] + units[mod];
					}
					if (mod === 0 && zeroCount < 4 && i !== len - 1) { // 避免在整数的最后添加大单位  
						integerResult += bigUnits[q];
					}
				}
				integerResult = integerResult
					.replace(/零[拾佰仟]/g, '零')
					.replace(/零{2,}/g, '零')
					.replace(/^零/, '')
					.replace(/零$/, ''); // 去掉末尾的零  
				// 处理小数部分  
				let decimalResult = '';
				for (let i = 0; i < decimalStr.length; i++) {
					let n = parseInt(decimalStr[i]);
					if (n !== 0) {
						decimalResult += digits[n] + decimalUnits[i];
					} else if (decimalResult && decimalStr[i + 1] !== undefined) {
						// 如果前面已经有数字并且不是小数部分的最后一位，则添加'零'  
						// 但如果下一位也是零，则不添加（避免连续的零）  
						if (decimalStr[i + 1] !== '0') {
							decimalResult += digits[0];
						}
					}
					// 如果小数部分是零或者没有小数部分，则不添加任何内容  
				}
				// 合并整数部分和小数部分  
				let result = integerResult + "元";
				if (decimalResult) {
					result += '' + decimalResult;
				} else if (integerResult === '' && num !== 0) {
					// 处理特殊情况：当输入为0.xxx时，整数部分应为'零'  
					result = digits[0];
				}else{
					result += "整";
				}
				// 去掉末尾不必要的'零角'、'零分'、'零厘'  
				result = result.replace(/(零[角分厘])$/, '');
				return result;
			},
			// userInfo() {

			// 	userUserinfo().then(res => {
			// 		this.userInfoData = res
			// 	})
			// },


			async userInfo() {
				var that = this;
				var params = {}
				let res = await this.$store.dispatch("userUserinfo", params);
				if (res.code == 1) {
					this.userInfoData = res.data;
				}
			},


			// 合同详情
			async contractSeal() {
				var that = this;
				var params = {
					tid: this.item.htcode
				}
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.$store.dispatch("baseContractSeal", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.title = res.data.name1 + '投资合同书'
					this.htz = res.data;
				}
			},
			// //合同详情
			// contractSeal() {
			// 	uni.showLoading({
			// 		title: '加载中'
			// 	})
			// 	baseContractSeal({
			// 		tid: this.item.htcode
			// 	}).then(res => {
			// 		uni.setNavigationBarTitle({
			// 			title: res.name1 + '投资合同书'
			// 		})
			// 		this.htz = res
			// 	})
			// }
		},
		computed: {
			// 计算理财期限
			endDay() {
				if (this.item.end_time) {
					function getDuration(my_time) {
						var days = my_time / 1000 / 60 / 60 / 24;
						var daysRound = Math.floor(days);
						var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
						var hoursRound = Math.floor(hours);
						var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
						var minutesRound = Math.floor(minutes);
						var seconds = (my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 *
							minutesRound)).toFixed(2);
						return daysRound
					}
					let arr = this.item.end_time.split(/[- : \/]/)
					let days = Date.parse(new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]));
					let datatime = getDuration(days - (new Date()).getTime())
					// console.log(datatime);
					return datatime
				} else {
					return this.item.day
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#contract {
		width: 100%;

		font-size: 28rpx;
		background-color: #FFF;
		height: 100vh;
		overflow-y: scroll;
		// ::v-deep .u-navbar {
		// 	.u-icon {
		// 		span {
		// 			color: #ffffff;
		// 		}

		// 	}

		// 	.u-navbar__content__title {
		// 		color: #ffffff;
		// 	}
		// }
		.hetongzhang {
			position: absolute;
			right: 0;
			bottom: 20rpx;
			width: 200rpx;
		}

		.hetongzhang2 {
			position: absolute;
			left: 0;
			bottom: 20rpx;
			width: 200rpx;
		}

		text {
			display: block;
			text-indent: 2em;
		}

		.main {
			position: relative;
			padding: 0 48rpx;
			line-height: 2em;

			.common {
				text-align: center;
			}

			.num {
				text-align: center;
				text-indent: 2em;
			}

			.mx {
				width: 100%;
				display: flex;
				flex-direction: column;

				span {
					width: 100%;
					display: flex;
					justify-content: space-around;

					i {
						flex: 1;
						text-align: center;
						padding: 20rpx 0;
						font-style: normal;
					}
				}
			}

			.yf {
				text-align: right;
			}

			.fw {
				font-weight: bold;
				font-size: 30rpx;
				text-indent: 0;
			}
		}
	}

	.cont_li {
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
	}

	.cont_li image {
		width: 200rpx;
		margin-left: 40rpx;
		position: absolute;
		transform: translateY(-20px);
	}

	.cont_zg {
		padding-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.gaiz {
		display: flex;
		margin-top: 40rpx;
		flex-direction: column;
	}

	.cont_li2 {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 60rpx 0;
	}

	.cont_li2 image {
		width: 180rpx;
		margin-left: 40rpx;
		position: absolute;
		transform: translateY(-30rpx);
	}
</style>

<style scoped>
	::v-deep .u-navbar__content__title {
		width: auto !important;
	}
</style>