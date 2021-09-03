<template>
	<view class="content">
		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>

	<!-- 	<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="输入密码"
					password="true" />
			</view>

		</view> -->

<!-- 		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>登录</text>
		</view> -->
		<view style="text-align: center;">
			<view>------请您先授权微信登录------</view>
		</view>
		<view style="text-align: center;margin-top: 50rpx;">
			<u-button class="" @click="wxGetUserInfo" size="medium" withCredentials="true" type="success"
				shape="circle">授权登录</u-button>
				<u-button  shape="circle" size="medium" withCredentials="true" type="success" @click="home">查看主页</u-button>
		</view>
<!-- 		<view class="agreenment">
			<navigator url="forget" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="reg" open-type="navigate">注册账户</navigator>
		</view> -->
	</view>
</template>

<script>
	import * as api from '@/common/api/api.js'
	import request from '@/common/api/newapi.js'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				userId: '',
				username: '',
				token: '',
				sex: '',
				userinfo: {
					nickName: '',
					avatarUrl: '',
					gender: ''
				},
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				gender: null,
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			};
		},

		onLoad() {
			// this.getSettingMes()
			this.init();
			this.login();
		},
		methods: {
			home(){
				uni.reLaunch({
					url:'../quanzi/quanzi'
				})
			},
			// 查看已授权选项
			// getSettingMes() {
			// 	let _this = this;
			// 	uni.getSetting({
			// 		success(res) {
			// 			if (res.authSetting['scope.userInfo']) {
			// 				// 用户信息已授权，获取用户信息
			// 				uni.getUserInfo({
			// 					success(res) {
			// 						console.log(res);
			// 					},
			// 					fail() {
			// 						console.log("获取用户信息失败")
			// 					}
			// 				})
			// 			} else if (!res.authSetting['scope.userInfo']) {
			// 				console.log("需要点击按钮手动授权")
			// 			}
			// 		},
			// 		fail() {
			// 			console.log("获取已授权选项失败")
			// 		}
			// 	})
			// },
			login() {
				console.log(api);
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log("code===" + res.code)
						api.request({
							url: '/userLogin/weChatLogin',
							method: 'GET',
							data: {
								code: res.code
							},
						}).then(res => {
							this.OpenId = res.data.openid;
							this.SessionKey = res.data.sessionKey;
							this.userId=res.data.uid;
							console.log(res);
							 uni.setStorageSync('token',res.data.token);
						});
					}
				})
			},
			get() {
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						console.log(res.data);
					},
					fail: function() {
						console.log('fail')
					}
				});
			},
			getVoid(open, userinfo, sex) {
				var that = this
				console.log(api.default+'/userInfo/updateUserInfoById')

				request.post(
						'/userInfo/updateUserInfoById', //仅为示例，并非真实接口地址。
						{
								id:that.userId,
							openId: that.OpenId,
							nickName: that.userinfo.nickname,
							avatarUrl: that.userinfo.avatarUrl,
							gender: that.sex
						}

					)
					.then(response => {

						console.log(response)
						const userInfo={
							userId:that.userId,
							nickName: that.userinfo.nickname,
							avatarUrl: that.userinfo.avatarUrl,
							gender: that.sex
						}
						uni.setStorage({
							key: "userInfo",
							data: userInfo,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						
						// uni.getStorage({
						// 	key: 'phone',
						// 	success:()=>{
					
						// 	},
						// 	fail(){
					
						// 	}
						// 	})
						api.request({
							url: '/userInfo/findUserInfoById',
							method: 'GET',
							data: {
								userId: that.userId
							},
						}).then(res => {
					
							if(res.data.data.phone=="" ||res.data.data.phone==null){
					
								uni.setStorageSync('SessionKey',that.SessionKey)
										uni.navigateTo({
											url:'./powLogin?SessionKey='+that.SessionKey
										})
							}else{
										uni.navigateBack({
											
										})
							}
						
						})
					
					console.log('5555')
					})
					.catch(ex => {
						console.log(ex)
					});

			},
			wxGetUserInfo: function(res) {
				var that = this;


				uni.getUserProfile({
					desc: 'Wexin', // 这个参数是必须的
					success: res1 => {
						console.log(res1)
						that.userinfo = res1.userInfo;
						that.userinfo.nickname = res1.userInfo.nickName;
						that.userinfo.avatarUrl = res1.userInfo.avatarUrl;
						if (res1.userInfo.gender == '1') {
							that.sex = '男'
						} else if (res1.userInfo.gender == '0') {
							that.sex = '女'
						}

						that.getVoid(that.OpenId, that.userinfo, that.sex)
					},
					fail: err => {
						console.log(err)
					uni.navigateTo({
						url:'../quanzi/quanzi'
					})
					}
				})



			},





			init() {
				uni.getStorage({
					key: 'phone',
					success: (res) => {
						//console.log(res);
						this.phone = res.data
					},
				});
			},

			//登录
			bindLogin() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				api.request({
					url: '/userLogin/login',
					data: {
						phone: this.phone,
						password: this.password
					},
					method: 'POST',
					//dataType: 'json',
				}).then(res => {
					console.log(res.data.data)
					if (!res.data.flag) {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					} else {
						//成功后的逻辑
						let userInfo = {
							userId: res.data.data.userId,
							username: res.data.data.username,
							avatarUrl: res.data.data.avatarUrl,
							gender: res.data.data.gender,
							phone: res.data.data.phone,
							//token:res.data.data.token,
						}
						uni.setStorage({
							key: "userInfo",
							data: userInfo,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						uni.setStorage({
							key: "token",
							data: res.data.data.token,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						uni.setStorage({
							key: 'phone',
							data: userInfo.phone,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						uni.reLaunch({
							url: '../quanzi/quanzi'
						});
						//uni.navigateBack();
					}
				});


			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 300upx;
		
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreenment text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
