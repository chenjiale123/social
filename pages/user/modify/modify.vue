<template>
	<view class="wrap">
		
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" :label-style="{color:'#fff'}">
			<u-form-item label="头像" prop="ava" @click='changeHead' >
				<u-avatar ref="uUpload" style="float: right;" :src="model.ava"></u-avatar>
			</u-form-item>
			<u-form-item label="昵称" prop="name" >
				<u-input input-align="right" :border="border" placeholder="请输入姓名" v-model="model.name" type="text" style="color: #fff!important;" placeholder-style="color:#fff">
				</u-input>
			</u-form-item>
			<u-form-item label="性别" prop="sex">
				<u-input input-align="right" :border="border" type="select" :select-open="actionSheetShow"
					v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true" placeholder-style="color:#fff"  style="color: #fff!important;"></u-input>
			</u-form-item>
			<u-form-item label="生日" prop="birth">
				<u-input input-align="right" :border="border" type="select" :select-open="pickerShow"
					v-model="model.birth" placeholder="请选择生日" @click="pickerShow = true"></u-input>
			</u-form-item>

			<u-form-item label="手机号码" prop="phone" label-width="200rpx">
			
				<u-button @click="getPhone" v-if="model.phone==''||model.phone==null" size="mini" style="float: right;"> 授权手机号</u-button>
				<u-input input-align="right" :border="border" placeholder="手机号码" v-else v-model="model.phone" type="text">
				</u-input>
			</u-form-item>
			<u-form-item label="微信号(选填)" label-width="200rpx">
				<u-input input-align="right" :border="border" placeholder="微信号" v-model="model.wechat" type="text">
				</u-input>
			</u-form-item>
			<u-form-item label="QQ(选填)" label-width="200rpx">
				<u-input input-align="right" :border="border" placeholder="QQ" v-model="model.qq" type="text"></u-input>
			</u-form-item>
		<u-form-item label="个人简介(选填)" label-width="200rpx">
				<u-input input-align="right" :border="border" placeholder="个人简介" v-model="model.user" type="text"></u-input>
			</u-form-item>
		</u-form>
		<view class="submit" @click="submit">
			<view class="text">
				<text>保存资料</text>
			</view>
		</view>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-picker mode="time" v-model="pickerShow" @confirm="timeConfirm"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as api from '@/common/api/api.js'
	import http from '@/common/api/http.js'
	export default {
		data() {
			return {
				fileName: [],
				openid: '',
				model: {
					qq: '',
					wechat: '',
					name: '',
					sex: '',
					birth: '',
					ava: '',
					phone: null,
					user:''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur',
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}, ],
					birth: [{
						required: true,
						message: '请选择生日',
						trigger: 'change'
					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur'],
					}, ],
				},
				border: false,
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				actionSheetShow: false,
				pickerShow: false,
				errorType: ['message'],
			};
		},
		onShow() {
			//this.get();
		
			this.get();
			
		},
		onLoad() {
		
		},
		methods: {
getPhone(){
	uni.navigateTo({
		url:'../../login/powLogin'
	})
},
			changeHead() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.model.ava = res.tempFilePaths[0]
						this.fileName = res.tempFilePaths
						//console.log("头像上传"+this.model.ava);
					}
				});
			},
			//初始化
			get() {
				const that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {

						that.openid = res.data.userId;
					
						// that.model.birth = res.data.birth;
						// that.model.wechat = res.data.wechat;
						// that.model.phone = res.data.phone;
						// that.model.qq = res.data.qq;
					},
					complete() {
						that.userinfo();
					}
				});
				uni.getStorage({
					key: 'phone',
					success: function(res) {
				
						that.model.phone=res.data
						
						// that.model.birth = res.data.birth;
						// that.model.wechat = res.data.wechat;
						// that.model.phone = res.data.phone;
						// that.model.qq = res.data.qq;
					},
					fail() {
					
					},
					complete() {
						
					}
				});
			},
			//获取用户信息
			userinfo() {
				api.request({
					url: '/userInfo/findUserInfoById',
					method: 'GET',
					data: {
						userId: this.openid
					},
				}).then(res => {
					this.model.name = res.data.data.nickName;
					this.model.sex = res.data.data.gender;
					this.model.birth = res.data.data.birth;
					this.model.phone = res.data.data.phone;
					this.model.ava = res.data.data.avatarUrl;
					this.model.wechat = res.data.data.wechat;
					this.model.qq = res.data.data.qq;
					this.model.user = res.data.data.introduce;
					uni.hideLoading();
				})

			},
			//保存资料
			submit() {
				console.log("dsadasdsaw文件名" + this.fileName[0]);
				if (this.fileName[0] == undefined) {
					this.submitInfo(this.model.ava)
				} else(
					uni.uploadFile({
						url: http.baseUrl + '/upload/uploadChangdiImg', //仅为示例，非真实的接口地址
						filePath: this.fileName[0],
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data);
							if (uploadFileRes.data != '') {
								this.submitInfo(uploadFileRes.data);
							} else {
								this.$refs.uToast.show({
									title: '更换头像失败',
									type: 'error'
								})
							}
						}
					})
				)
			},
			submitInfo(avaName) {
				let that = this;
				api.request({
					url: '/mesCheck/getData',
					method: 'GET',
					data: {
						content: that.model.user,
					},
				}).then(res => {
					//console.log(res);
				
					if (res.data.errcode == 0) {
						api.request({
							url: '/userInfo/updateUserInfoById',
							method: 'POST',
							data: {
								id: that.openid,
								//avatarUrl: that.model.ava,
								avatarUrl: avaName,
								nickName: that.model.name,
								gender: that.model.sex,
								birth: that.model.birth,
								phone: that.model.phone,
								wechat: that.model.wechat,
								qq: that.model.qq,
								introduce:that.model.user
							},
						}).then(res => {
							if (res.data.data == 1) {
								that.$refs.uToast.show({
									title: '保存信息成功',
									type: 'success',
									duration: '1000'
								})
								console.log(that.openid)
								uni.setStorage({
									key: 'userInfo',
									data: {
										userId: that.openid,
										username: that.model.name,
										avatarUrl: avaName,
										gender: that.model.sex,
										birth: that.model.birth,
										phone: that.model.phone,
										wechat: that.model.wechat,
										qq: that.model.qq,
										introduce:that.model.user
									}
								});
								uni.setStorage({
									key:'phone',
									data:that.model.phone,
									success: (res) => {
										//console.log("存放的值"+res.data);
									}
								});
								setTimeout(function() {
									uni.reLaunch({
										url:'../user'
									})
								}, 1000)
								
						
							} else {
								that.$refs.uToast.show({
									title: '保存信息失败',
									type: 'error'
								})
							}
						});
								
						}
						})
				
		
			},





			// 点击actionSheet回调	
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.sex = this.actionSheetList[index].text;
			},
			timeConfirm(e) {
				this.model.birth = e.year + '-' + e.month + '-' + e.day;
			}
		}
	};
</script>

<style  lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.wrap {
		//padding: 30rpx;
		background:url(../../../static/wode.png);
		width: 100%;
		height: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.submit {
	width: 240px;
	height: 48px;
	line-height: 48px;
	border-radius: 24px;
	background-color: rgba(51, 51, 51, 100);
	text-align: center;
	margin: 0 auto;
	margin-top: 130upx;

		.text {
		
			color: #fff;
		}
	}
	.u-input__input {
		color: #f7f7f7!important;
		}


	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
