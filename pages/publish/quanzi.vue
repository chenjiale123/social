<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		
		<view class="img">
		
					<u-upload v-if="imgshow" width="106px" height="141px" :show-upload-list="true" :action="action" :form-data="ossData" @on-success="bbb" ref="uUpload"   @on-remove="removeFile" max-count="9"> 
		
					</u-upload>
					<htz-image-upload v-if="videoshow"  mediaType="video" compress="true" maxDuration="60" :max="1"  v-model="ceshiData" @inputlet="updata"   @uploadSuccess="ceshiUploadSuccess"  :formData="ossData" action="https://jileaf.oss-cn-hangzhou.aliyuncs.com"></htz-image-upload>
		</view>
		<view style="padding: 40rpx;">
			<u-input v-model="model.content" type="textarea" :border="border" height="100" :auto-height="autoHeight" />
		</view>
	

<view class="topic">
	<view class="left">
		<image src="../../static/pub-detail/topic.png" mode=""></image>
		<text>参与话题</text>
	</view>
	<view class="right" @click="topicShow">
		<!-- <input placeholder="请输入话题"  :value="value" :disabled="flag" @input="changeTopic" placeholder-style='text-align:right' placeholder-class="aright"></input> -->
		<text>{{model.privacy}}</text>
	 <image src="../../static/inter.png" mode="" ></image>
	</view>
</view>


	<!-- 	<view class="privacy" @click="actionSheetShow = true">
			<view class="left">
				<image class="icon" src="../../static/shetuan.png"></image>
				<view class="name">谁可以看</view>
				<view style="position: absolute;right: 0;" v-model="model.privacy">{{model.privacy}}</view>
			</view>

		</view> -->
		<view style="text-align: center;margin-top: 125rpx;">
			<button size="medium" class="btn" @click="submit">发表圈子</button>
		</view>

		<view style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
			<image @click="previewImage(index1,list1)" v-for="(res1, index1) in list1" :src="res1.url" mode="aspectFill"
				style="margin-bottom: 10rpx;width:220rpx;height:220rpx;"></image>
		</view>

		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		
		
		
	</view>
</template>

<script>
	import * as api from '@/common/api/api.js'
	import http from '@/common/api/http.js'
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	export default {
		  components: {
		            htzImageUpload,
		        },
		data() {

			return {
				videoshow:true,
				imgshow:true,
				ceshiData: [],
				value:'',
				topic:'',
				ossData: {

				},
				flag:false,
				hidden:false,
				formData2: {
					longitude: '',
					latitude: ''
				},
				addressObj: '',
				fileName: [],
				imgList: [],
				category: 'image',
				l: [],
				list1: [],
				list2: [],
				u_id: '',
				u_name: '',
				u_ava: '',
				u_gender: '',
				model: {
					content: '',
					location: '',
					privacy: '选择话题能获取更多赞哦',
					tpid:''
				},
				action: 'https://jileaf.oss-cn-hangzhou.aliyuncs.com',
				list: [],
				autoHeight: true,
				border: false,
				actionSheetShow: false,
				location: '',
				privacy: '公开',
				actionSheetList: [{
						text: '# 热门话题'
					},
					{
						text: '# 热门话题'
					},
					{
						text: '# 热门话题'
					}
				],
			}
		},
		onShow() {
			this.init();
			this.getPolicy()
			this.getTopicList()
		},
		methods: {
			ceshiUploadSuccess(res){
				console.log(res)
			  console.log(this.ceshiData)
			  if(res.length>0){
				  this.imgshow=false
			  }else{
				   this.imgshow=true
			  }
				uni.hideLoading({
					title: '上传中'
				});
				this.ceshiData=res
			},
			updata(res){
				
				console.log(res)
				if(res.length==0){
					   this.imgshow=true
				}
			},
			getTopicList(){
				api.request({
					url:'/topic/list',
					method:'GET'
				})
				.then(res=>{
					console.log(res)
					this.actionSheetList=res.data.data.map(item=>{
						return{
							text:item.topic,
							id:item.id
						}
					})
					
					console.log(this.actionSheetList)
				})
			},
			changeTopic(e){
			
				this.topic= e.detail.value
				if(this.topic==""){
					this.hidden=false
				}else{
						this.hidden=true
				}
			},
			topicValue(value){
			     this.flag=true
				this.hidden=false
				this.value='#'+this.topic
				
			},
			topicShow(){
				this.actionSheetShow=true
			},
			checkMes() {
				console.log("checkMes");
				api.request({
					url: '/mesCheck/getData',
					method: 'GET',
					data: {
						content: this.model.content,
					},
				}).then(res => {
					if (res.errmsg == 'ok') {
						console.log("内容检查成功");
					} else {
						this.$refs.uToast.show({
							title: '内容包含敏感词汇!请检查!',
							type: 'error'
						})
						return;
					}
				});


			},
			//初始化用户信息
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						this.u_id = res.data.userId;
						this.u_name = res.data.nickName;
						this.u_ava = res.data.avatarUrl;
						this.u_gender = res.data.gender;
					},
					fail(err) {
						console.log(err)
						
					}
				})
			},

	
			bbb(data, index, lists, name,file) {
				// this.fileName.push(data)
				console.log( [... lists])
			
					var path=lists[index].url.split('/')[2]
					console.log(path)
					// var arr=[... lists].map(item=>{
					// 	return{
					// 		url: this.ossData.host +
     //      "/" +
     //      this.ossData.dir + "_"+ path
					// 	}
					// })
			
				// for(let i in [... lists]){
						this.fileName.push({url:
          this.ossData.host +
          "/" +
          this.ossData.dir + "_"+ path}
		  )
				// }
				 
				console.log(this.fileName)
				if(this.fileName.length>0){
								  this.videoshow=false
				}else{
								   this.videoshow=true
				}

			},
			change(data, index, lists, name){
				console.log(data, index, lists, name)
			},
			err(data, index, lists, name){
					console.log(data, index, lists, name)
			},
			//用户删除了那些图片
			removeFile(index, lists, name) {
				//console.log("移除了第" + index + "张图片");
				this.fileName.splice(index, 1)
				if(this.fileName==0){
					this.videoshow=true
				}
				//console.log(this.fileName + "删除后的文件");
			},
			//图片全部上传完成后执行此方法  
			aaa() {
				//console.log("aaa执行" + this.fileName);
				uni.hideLoading();
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					if(this.fileName.length>0){
						api.request({
								url: '/circle/publishCircle',
								method: 'POST',
								data: {
									type:1,
									pocUrl: this.fileName,
									uid: this.u_id,
									uname: this.u_name,
									uava: this.u_ava,
									ugender: this.u_gender,
									content: this.model.content,
									place: this.model.location,
									privacy: this.model.privacy,
									topicId:this.model.tpid
								},
							}).then(res => {
								if (res.data.flag) {
									uni.reLaunch({
										url: 'success'
									})
								} else {
									this.$refs.uToast.show({
										title: res.data.message,
										type: 'error'
									})
								}
							}).catch(err=>{
								console.log(err)
							})
						
					}else if(this.ceshiData.length>0){
						api.request({
								url: '/circle/publishCircle',
								method: 'POST',
								data: {
									type:2,
									pocUrl: this.ceshiData,
									uid: this.u_id,
									uname: this.u_name,
									uava: this.u_ava,
									ugender: this.u_gender,
									content: this.model.content,
									place: this.model.location,
									privacy: this.model.privacy,
									topicId:this.model.tpid
								},
							}).then(res => {
								if (res.data.flag) {
									uni.reLaunch({
										url: 'success?state=1'
									})
								} else {
									this.$refs.uToast.show({
										title: res.data.message,
										type: 'error'
									})
								}
							})
							.catch(err=>{
								console.log(err)
							})
						
					}else{
						api.request({
								url: '/circle/publishCircle',
								method: 'POST',
								data: {
									type:0,
									pocUrl: this.ceshiData,
									uid: this.u_id,
									uname: this.u_name,
									uava: this.u_ava,
									ugender: this.u_gender,
									content: this.model.content,
									place: this.model.location,
									privacy: this.model.privacy,
									topicId:this.model.tpid
								},
							}).then(res => {
								if (res.data.flag) {
									uni.reLaunch({
										url: 'success'
									})
								} else {
									this.$refs.uToast.show({
										title: res.data.message,
										type: 'error'
									})
								}
							})
							.catch(err=>{
								console.log(err)
							})
					}
							
				}
		
		},
			getUUID() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
					return (c === "x" ?
						(Math.random() * 16) | 0 :
						"r&0x3" | "0x8"
					).toString(16);
				});
			},
			// 获取阿里云
			getPolicy() {
				var that = this
				api.request({
						url: '/upload/oss/policy',
						method: 'GET'
					})
					.then(response => {

						this.ossData = {

							policy: response.data.data.policy,
							
							signature: response.data.data.signature,
							ossaccessKeyId:response.data.data.accessid,
							key:response.data.data.dir  + "_${filename}",
							dir: response.data.data.dir,
							host: response.data.data.host,
						}
						console.log(this.ossData)
					})
			},
			//图片上传
			submit() {
				//检查敏感词汇



				console.log(this.imgList)
				if (this.model.content == '' ) {  
					this.$refs.uToast.show({
						title: '内容不能为空哦！',
						type: 'error'
					})
				} else {
					//console.log(this.imgList + "==============");
					api.request({
						url: '/mesCheck/getData',
						method: 'GET',
						data: {
							content: this.model.content,
						},
					}).then(res => {
						//console.log(res);

						if (res.data.errcode == 0) {
							console.log("内容检查成功");

							// this.$refs.uUpload.upload();
							uni.showLoading({
								title: '发布中，请稍后'
							});
							this.aaa()

						} else {
							this.$refs.uToast.show({
								title: '内容包含敏感词汇!请检查!',
								type: 'error'
							})
							return;
						}
					});
				}
			},
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.privacy = this.actionSheetList[index].text;
				this.model.tpid=this.actionSheetList[index].id
				console.log(this.model.privacy)
			},
			//位置信息
			/* locationTap() {
				const that = this;
				uni.getSetting({
					success: res => {
						//console.log(res.authSetting['scope.address'])
						const isLocation = res.authSetting['scope.address'];
						if (isLocation) {
							that.openLocationPage();
						} else {
							uni.authorize({
								scope: 'scope.userLocagion',
								success: res => {
									//console.log(res);
									that.openLocationPage();
								}
							})
						}
					}
				})
			}, */
			locationTap() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						if (this.formData2.longitude && this.formData2.latitude) {
							uni.navigateTo({
								url: "/pages/map/map?lng=" + this.formData2.longitude + "&lat=" + this
									.formData2.latitude
							})
						} else {
							uni.navigateTo({
								url: "/pages/map/map?lng=" + res.longitude + "&lat=" + res.latitude
							})
						}
					},
					fail: () => {
						uni.getSetting({
							success: (res) => {
								console.log(res);
								var status = res.authSetting;
								if (!status['scope.userLocation']) {
									uni.showModal({
										title: "是否授权当前位置",
										content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
										success: (tip) => {
											if (tip.confirm) {
												uni.openSetting({
													success: (data) => {
														if (data
															.authSetting[
																'scope.userLocation'
															] === true
														) {
															uni.showToast({
																title: "授权成功",
																icon: "success",
																duration: 1000
															})
															uni.getLocation({
																type: 'wgs84',
																success: (
																	res
																) => {
																	console
																		.log(
																			'当前位置的经度：' +
																			res
																			.longitude
																		);
																	console
																		.log(
																			'当前位置的纬度：' +
																			res
																			.latitude
																		);
																	uni.navigateTo({
																		url: "/pages/map/map?lng=" +
																			res
																			.longitude +
																			"&lat=" +
																			res
																			.latitude
																	})
																}
															})
														} else {
															uni.showToast({
																title: "授权失败",
																icon: "none",
																duration: 1000
															})
														}
													}
												})
											}
										}
									})
								} else {
									uni.getLocation({
										type: 'wgs84',
										success: (res) => {
											console.log('当前位置的经度：' + res.longitude);
											console.log('当前位置的纬度：' + res.latitude);
											uni.navigateTo({
												url: "/pages/map/map?lng=" +
													res.longitude + "&lat=" +
													res.latitude
											})
										}
									})
								}
							},
							fail: (res) => {
								uni.showToast({
									title: "调用授权窗口失败",
									icon: "none",
									duration: 1000
								})
							}
						})
					}
				})
			},

			openLocationPage() {
				uni.chooseLocation({
					success: res => {
						//console.log(res.name);
						if (res.name) {
							delete res['errMsg'];
							this.model.location = res.name;
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	 /deep/ .aright{
		text-align: right!important;
	}
	.wrap {
		//padding: 40rpx 60rpx;
		width: 100%;
	}

	.img {
		padding: 20rpx;

	}

	.wrap .content {
		font-size: 30rpx;
		width: 100%;
		height: 200rpx;
	}

	.wrap .location {
		margin-left: 40rpx;
		margin-right: 40rpx;
		margin-top: 40rpx;
		border-top: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.wrap .left {
		display: flex;
		font-size: 28rpx;
	}

	.wrap .left .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 40rpx;
	}

	.btn {
		margin-top: 40upx;
		width: 240px;
		height: 48px;
	  color:#fff;
		border-radius: 24px;
		background-color: #3BB19B;
	}

	.privacy {
		margin-left: 40rpx;
		margin-right: 40rpx;
		//margin-top: 40rpx;
		//border-top: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			font-size: 28rpx;
			width: 100%;
			position: relative;
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 40rpx;
		}
	}
	.topic{
		width: 100%;
		height: 98upx;
		margin-top: 200upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 50upx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}
	.topic>.left>image{
		width: 40upx;
		height: 40upx;
		
	}
	.topic>.left>text{
		font-size: 28upx;
		margin-left: 10upx;
	}
	.topic>.right{
		position: relative;
		vertical-align: middle;
	}
	.topic>.right>text{
		color: rgba(167, 167, 167, 100);
		font-size: 12px;
		vertical-align: middle;
		margin-right: 100upx;
	}
		.topic>.right>image{
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
			
		}

	
</style>
