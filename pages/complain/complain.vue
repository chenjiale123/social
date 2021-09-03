<template>
	<view class="complain">

		<view class="reason">
			<text>投诉原因：</text>
			<text>{{con}}</text>
		</view>

		<view class="content">
			<text>投诉描述（必填项）</text>

			<textarea value="" @input="content" placeholder="提供更多内容信息，有助于投诉被快速处理~" />
		</view>

		<view class="foot">
			<button type="info" shape="square" @click="sub"  v-if="able">提交</button>
				<button type="info" shape="square" @click="sub" disabled v-if="!able">提交</button>
			<text>您的投诉信息，处理结果将在第一时间给您推送反馈</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as api from '@/common/api/api.js'
	export default {
		data() {
			return {
				id: '',
				con: '',
				circleId: '',
				val: '',
				rId: '',
				able:false
			}
		},
		onLoad(res) {
			this.id = res.id
			this.con = res.con
			if (res.circleId) {
				this.circleId = res.circleId
			} else {
				this.rId = res.rId
			}
		},
		methods: {
			content(e) {
				console.log(e)
				this.val = e.detail.value
				console.log(e.detail.value)
				if(e.detail.value!==""){
					this.able=true
				}else{
						this.able=false
				}
			},
			sub() {
				var that = this
				if (this.circleId) {
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							console.log(res)
							this.name = res.data.nickName;
							this.ava = res.data.avatarUrl;
							this.u_id = res.data.userId;
							console.log(this.u_id)
							api.request({
								url: '/report/save',
								method: 'POST',
								data: {
									userId: String(that.u_id),
									catId: that.id,
									circleId: that.circleId,
									content: that.val,
									type: 1,
								}
							}).then(res => {


								console.log(res)
								if (res.data.flag == true) {
									this.$refs.uToast.show({
										title: '投诉成功',
										type: 'success',

									})
									setTimeout(() => {
										uni.navigateBack()
									}, 1500)

								}

								//console.log(res.data)
							});
						}
					})

				} else {
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							console.log(res)
							this.name = res.data.nickName;
							this.ava = res.data.avatarUrl;
							this.u_id = res.data.userId;
							console.log(this.u_id)
							api.request({
								url: '/report/save',
								method: 'POST',
								data: {
									userId: String(that.u_id),
									catId: that.id,
									replyId: that.rId,
									content: that.val,
									type: 2,
								}
							}).then(res => {


								console.log(res)
								if (res.data.flag == true) {
									this.$refs.uToast.show({
										title: '投诉成功',
										type: 'success',

									})
									setTimeout(() => {
										uni.navigateBack()
									}, 1500)

								}

								//console.log(res.data)
							});
						}
					})

				}
			}
		}
	}
</script>

<style scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.complain {
		width: 100%;
		height: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.reason {
		width: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.reason>text:nth-child(1) {
		color: rgba(138, 138, 138, 100);
		font-size: 26upx;
	}

	.reason>text:nth-child(2) {
		color: rgba(16, 16, 16, 100);
		font-size: 28upx;
		font-weight: bold;
	}

	.content {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 28upx;
	}

	.content>text {
		display: block;
		color: rgba(51, 51, 51, 100);
	}

	.content>textarea {
		display: block;
		width: 100%;
		height: 460upx;
		border: 1px solid #bbb;
		padding: 20upx;
		box-sizing: border-box;
		margin-top: 30upx;
	}

	.foot {
		width: 100%;
		height: auto;
		margin-top: 200upx;
		overflow: hidden;
		text-align: center;
	}

	.foot>button {
		width: 240px;
		height: 48px;
		line-height: 20px;
		border-radius: 24px;
		background-color: #FDBC58;
		margin: 0 auto;
		font-size: 28upx;
		line-height: 48px;
		color: #fff;
	}

	.foot>text {
		color: rgba(167, 167, 167, 100);
		font-size: 14px;
		margin-top: 26upx;
	}
</style>
