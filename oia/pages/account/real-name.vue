<template>
	<view class="root">
		<!-- <u-navbar title="实名认证"  :placeholder="true" :autoBack="true" bgColor="#fff"></u-navbar> -->
		<u-navbar title="实名认证" :placeholder="true" :autoBack="true" bgColor="#222" title-style="color:#FFF;"
			leftIconColor="#FFF">
		</u-navbar>
		<view class="box">
			<view class="smallBox">
				<view class="cell dfb">
					<view class="left">姓名</view>
					<input v-model="verified.name" type="text" placeholder="请输入姓名" />
				</view>
			</view>
			<view style="height: 20rpx;background-color: #F7F7F7;"></view>
			<view class="smallBox">
				<view class="cell dfb">
					<view class="left">身份证号</view>
					<input type="text" maxlength="18" v-model="verified.id_cardnum" placeholder="请输入身份证号" />
				</view>
			</view>
			<view style="height: 20rpx;background-color: #F7F7F7;"></view>
			<!-- <view style="margin: 20rpx 30rpx;font-size: 32rpx;font-weight: bold;">签名</view>
			<view style="height: 10rpx;background-color: #F7F7F7;"></view>
			<canvas canvas-id="signature-canvas" @touchstart="startSigning" @touchmove="sign" @touchend="stopSigning" style="width: 100%; height: 200px;"></canvas>
			<button @click="clearCanvas">清除</button> -->
			<!-- <button @click="saveSignature">保存签名</button> -->
			<!-- <view class="title">
				上传身份证
			</view>
			<image @tap="previewImg(cardImgUrl.idcard_img1)" style="width: 600rpx;height: 230rpx;display: block;margin: 0 auto;" v-if="cardImgUrl.idcard_img1"
				:src="cardImgUrl.idcard_img1" mode="aspectFill"></image>
			<image v-else @tap="Updateidz(1)" class="exma" src="../../static/images/other/carda.png" mode="widthFix"></image>
			<image @tap="previewImg(cardImgUrl.idcard_img2)" style="width: 600rpx;height: 230rpx;display: block;margin: 0 auto;margin-top: 30rpx;"
				v-if="cardImgUrl.idcard_img2" :src="cardImgUrl.idcard_img2" mode="aspectFill"></image>
			<image v-else @tap="Updateidz(2)" class="exma" src="../../static/images/other/cardb.png" mode="widthFix"></image> -->
		</view>

		<view class="label_body">
			<view class="label_title">注意事项</view>
			<view class="label_form">
				<view style="flex-shrink: 0;">（1）</view>
				<view style="flex: 1;">根据相关法律规定，需要通过实名认证才能线上交易，您的信息我们将严格保密</view>
			</view>
		</view>
		<view style="padding-bottom: 30px;">
			<view class="btn_shadows" @tap="connfirm">确认</view>
		</view>

		<!-- <u-button class="mainBtnStyle" type="primary" @tap="connfirm">确认</u-button> -->
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js'
	export default {
		data() {
			return {
				verified: {
					name: '',
					id_cardnum: ''
				},
				cardImgUrl: {
					idcard_img1: '',
					idcard_img2: ''
				},
				cardInfo: {
					name: '',
					id_cardnum: '',
					idcard_img1: '',
					idcard_img2: ''
				},
				isSigning: false,
				context: null,
				startX: 0,
				startY: 0,
			}
		},
		/* onLoad() {
			const context = uni.createCanvasContext('signature-canvas', this);
			this.context = context;
			this.resetCanvas();
		}, */
		methods: {
			//签名测试
			/* clearCanvas() {
				// 获取 Canvas 上下文  
				const ctx = uni.createCanvasContext('signature-canvas');
				// 清除整个画布  
				ctx.draw();
			},
			startSigning(e) {
				this.isSigning = true;
				// 初始化画笔位置（可选，如果需要从触摸开始点开始绘制）  
				const {
					touches
				} = e;
				const startTouch = touches[0];
				this.context.beginPath(); // 开始一个新的路径  
				this.context.moveTo(startTouch.x, startTouch.y); // 移动到触摸开始的位置  
			},
			stopSigning() {
				this.isSigning = false;
				this.context.draw(true); // 传入 true 以确保之前的路径被清除，仅绘制当前的路径  
			},
			sign(e) {
				if (!this.isSigning) return;
				const {
					touches
				} = e;
				const touch = touches[0] || e.changedTouches[0];
				this.context.lineTo(touch.x, touch.y);
				this.context.stroke();
			},
			clearCanvas() {
				this.context.clearRect(0, 0, 300, 150);
				this.context.draw();
			},
			resetCanvas() {
				this.clearCanvas();
				this.context.setLineWidth(5);
				this.context.setStrokeStyle('#000000');
				this.context.setLineCap('round');
				this.context.setLineJoin('round');
			},
			saveSignature() {
				var qianming_v = "";
				uni.canvasToTempFilePath({
					canvasId: 'signature-canvas',
					success: (res) => {
						// 这里可以将签名图片上传到服务器或者做其他操作  
						qianming_v = res.tempFilePath;
					},
					fail: (err) => {
						console.error('签名失败：', err);
						qianming_v = null;
					}
				});
				return qianming_v;
			}, */
			//用户信息
			async getuser() {

			},
			previewImg(img) {
				// 预览
				let imglist = img.split(",")
				//imglist.push(img)
				// console.log(imglist)
				uni.previewImage({
					urls: imglist,
				});
			},

			//提交身份信息
			async connfirm() {
				// 身份证正则
				/* let exp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!this.verified.name || !this.verified.id_cardnum) {
					this.$u.toast('姓名或者身份证不能为空')
					return
				}
				if (!exp.test(this.verified.id_cardnum)) {
					this.$u.toast('您输入的身份证不符合规则请检查您的身份证号')
					return
				}

				if (!this.cardImgUrl.idcard_img1 || !this.cardImgUrl.idcard_img2) {
					this.$u.toast('您的身份证信息未上传完全')
					return
				} */
				/* var qianming = this.saveSignature();
				if(!qianming){
					this.$u.toast('签名失败，请重试')
					return
				} */
				uni.showLoading({
					title: ''
				});

				let that = this;
				let params = {
					real_name: this.verified.name,
					id_card: this.verified.id_cardnum,
					//id_photo1: qianming,
					/* id_photo1: this.cardImgUrl.idcard_img1,
					id_photo2: this.cardImgUrl.idcard_img2 */
				}
				let res = await this.$store.dispatch("imUploadIDcard", params);
				if (res.code == 1) {
					uni.hideLoading();
					this.$u.toast(res.info)
					this.cardInfo.name = this.verified.name
					this.cardInfo.id_cardnum = this.verified.id_cardnum
					/* this.cardInfo.idcard_img1 = res.data.id_photo1
					this.cardInfo.idcard_img2 = res.data.id_photo2 */
					uni.setStorageSync('cardImgUrl', this.cardInfo)
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/mine'
						});
					}, 1500)

				} else {
					uni.hideLoading()
					this.$u.toast(res.info);
				}

			},
			Updateidz(id) { //上传证件（id:1身份证正面，2:身份证反面，3:驾驶证，4:驾驶证车辆，4:从业资格照）
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数默认9张
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						let tempFilePaths = chooseImageRes.tempFilePaths;
						console.log('tempFilePaths', tempFilePaths[0])
						//把图片转为base64格式
						pathToBase64(tempFilePaths[0]).then(path => {
								let baseImage = path;
								// console.log('baseImage',baseImage);
								if (baseImage) {
									//调用上传图片接口
									// 			debugger
									this.updeBaseimg(baseImage, id)
								}
							})
							.catch(error => {
								console.error(error)
							})
					}
				});
			},



			async updeBaseimg(imgurl, id) {
				let that = this;
				let params = {
					base_img: imgurl
				}
				uni.showLoading({
					title: '上传中'
				});
				let res = await this.$store.dispatch("imUploadFile", params);
				if (res.code == 1) {
					uni.hideLoading()
					switch (id) {
						case 1:
							this.cardImgUrl.idcard_img1 = res.data.url;
							this.idcardA = false
							break;
						case 2:
							this.cardImgUrl.idcard_img2 = res.data.url;
							this.idcardB = false
							break;
						default:
							// 默认代码块
					}

				} else {
					uni.hideLoading()
					this.$u.toast(res.info);
				}
			}

		}
	}
</script>
<style scoped lang="scss">
	.root {
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow-y: scroll;

		.box {
			.title {
				font-size: 32rpx;
				font-weight: bold;
				padding: 30rpx;
				margin-top: 50rpx;
			}

			.smallBox {
				padding: 0 30rpx;
				background: #FFFFFF;

				.cell {
					width: 100%;
					height: 100rpx;

					.left {
						font-size: 32rpx;
						font-weight: bold;
					}

					input {
						text-align: right;
					}
				}
			}

			.exma {
				width: 600rpx;
				display: block;
				margin: 0 auto;
				margin-top: 30rpx;
			}
		}

		.bb {
			border-bottom: solid 20rpx #F7F7F7;
		}

		.dfb {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.btn_shadows {
			background: linear-gradient(180deg, #2B2825 0%, #4D4435 100%);
			background-size: 100%;
			height: 96rpx;
			font-size: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 30rpx;
			margin-top: 120rpx;
			color: #fff;
			border-radius: 30px;
		}


		.label_body {
			margin: 0 30rpx;
			margin-top: 20rpx;
			padding-top: 20rpx;

			.label_title {
				font-size: 30rpx;
				color: #333;
			}

			.label_form {
				color: #999;
				font-size: 26rpx;
				display: flex;
				margin-top: 16rpx;
			}
		}




	}
</style>