<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		<view class="comment">
			<view class="right">
				<view class="top">
					<u-avatar @click="userinfo(comment)" :src="comment.uava" mode="circle"></u-avatar>
					<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;">
						<view class="first" style="vertical-align: middle;">
							<text
								style="vertical-align: middle;    color: rgba(16, 16, 16, 100);font-size: 28upx;font-family: SourceHanSansSC-regular;font-weight: bold;">
								{{comment.uname}}
							</text>

							<image src="../../static/lv1.png" mode="aspectFit"
								style="width: 48upx;height: 38upx;margin-left: 20upx; vertical-align: middle;"></image>
							<view class="recommend" v-if="comment.isOfficial==1">
								<image src="../../static/zan.png" mode="aspectFit"></image>
								<text>官方推荐</text>

							</view>
						</view>
						<view style="color: rgba(166, 166, 166, 100);font-size: 10px;">
							<view>{{comment.pubDate}}</view>

						</view>
					</view>


					<image src="../../static/more.png" mode="aspectFit" class="more"
						@click.stop="complain(comment.uid,comment.id)"></image>
				</view>



			</view>

			<view class="lunbo" v-if="comment.type==1" >
				<u-swiper :list="arr" height="800" img-mode="aspectFit" @click="pirview"></u-swiper>
				
			</view>
			<view class="lunbo" v-if="comment.type==2" >
			<video  objectFit='contain'    danmu-btn page-gesture = "true" enable-progress-gesture = true  id="myVideo" v-if="comment.type==2" :src="comment.pocUrl[0].url" controls autoplay style="width: 100%;height: 100%;" ></video>
			</view>


			<view class="content" @click="comment(comment)">
				<text class="etc" v-if="comment.topic!==null"
					@click.stop="toTopic(comment.topic)">#{{comment.topic}}#</text>
				<text>{{ comment.content }}</text>
				<view class="time">
					<text>编辑于 {{comment.pubDate}}</text>
				</view>
			</view>

			<view class="number">{{comment.comNum}}条评论</view>

			<view class="foot">
				<view class="left" @click="bindCom">
					<image src="../../static/pl.png" mode="aspectFit"></image>
					<text>评论</text>
				</view>
				<view class="right">
					<view class="praise-group">
						<image v-if="comment.price==null" @click="$noMultipleClicks(getLike1,comment.id)" src="../../static/exl.png" />
						<image v-else @click="$noMultipleClicks(unLike1,comment.id)" src="../../static/exl1.png" />

						<text>{{comment.likeNum}}</text>
					</view>

					<view class="favor">
						<image v-if="comment.collect==null" @click="$noMultipleClicks(getSc,comment.id)" src="../../static/cang.png">
						</image>

						<image v-else @click="$noMultipleClicks(unSc,comment.id)" src="../../static/cang1.png">
							<!-- 收藏 -->
							<!-- {{comment.likeNum}} -->
							<text> {{comment.collectNum}}</text>
						</image>
					</view>
					<!-- 	<view class="userLeft" @click="share">
						<image src="../../static/xiang.png" mode="aspectFit"></image>
						<text>分享</text>
					</view> -->
					<button class="userLeft" open-type="share">
						<image src="../../static/xiang.png" mode="aspectFit"></image>
						<text>分享</text>
					</button>
				</view>
			</view>



		</view>



		<!-- 回复信息 -->
		<view style="margin-bottom: 150rpx;margin-left: 15rpx;margin-right: 15rpx;">


			<view class="reply" v-for="(ies,idx) in replyList"  >
				<view class="left" @click.stop="reply1(ies)">
					<image :src="ies.rava" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top" @click.stop="reply1(ies)">
						<view class="name">
							<view class="_name"> <text>{{ies.rname}}</text>
								<!-- <image src="../../static/lv1.png" mode="aspectFit"></image> -->
								<text style="color: rgba(232, 163, 50, 100);
								font-size: 12px;margin-left: 10upx;">Lv.1</text>
								<view class="time">{{ies.rdate}}</view>
							</view>
							<view class="praise-group">
								<image v-if="ies.price==null" @click.stop=" $noMultipleClicks(getLike,ies)"
									src="../../static/good.png" />
								<image v-else @click.stop="$noMultipleClicks(unLike,ies)" src="../../static/goods.png" />
								<text>{{ies.likeCount}}</text>

							</view>

						</view>

					</view>
					<!-- 点击回复 -->
					<view class="content" @click.stop="reply1(ies)">{{ies.rcont}}</view>
				
					<view class="bottom">
						<view style="height:100%;width: 100%;color: #000000;border-radius: 15rpx;">

					


<!-- 
								<view v-if="inx.rid == ies.id" @click="reply2(inx)" v-for="(inx,index) in replys"
								style="margin-left: 10rpx;">

								<text style="margin-right: 10rpx;color: #007AFF;">{{inx.name}}</text> 回复 <text
									style="margin-left: 10rpx;">{{inx.rname}}</text>
								：
								{{inx.content}}
							</view> -->
									<view class="reply1" 
								v-for="(inx,index) in commentList">
								<my-tree :commentList="inx.subLevel" :ids="ies.id" :tid="ies.tid" @update="update" style="width: 100%;"></my-tree>

							<!-- 	<view class="left" @click.stop="userinfo(inx.uid)">
									<image :src="inx.uava" mode="aspectFill"></image>
								</view>
								<view class="right">
									<view class="top">
										<view class="name">
											<view class="_name"> <text>{{inx.name}} </text>
									
												<text style="color: rgba(232, 163, 50, 100);
												font-size: 12px;margin-left: 10upx;">Lv.1</text>
												<view class="time">{{inx.rdate}}</view>
											</view>
											<view class="praise-group">
												<image v-if="inx.like==false" @click.stop="getLike2(inx.id,ies.tid)"
													src="../../static/good.png" />
												<image v-else @click.stop="unLike2(inx.id,ies.tid)"
													src="../../static/goods.png" />
												<text>{{inx.likeCount}}</text>

											</view>

										</view>
										<view class="content" @click.stop="reply2(inx)">{{inx.content}}</view>
									</view>
			
								</view> -->
							</view>



						</view>

					</view>

				</view>

			</view>


			<view style="text-align: center;font-size: 20rpx;color: #d0d0d0;margin-top: 50rpx;">
				<text>我也是有底线的~</text>
			</view>
		</view>


		<u-action-sheet :list="list" @click="shanchu1" v-model="show"></u-action-sheet>

		<u-action-sheet :list="list" @click="shanchuCir" v-model="showdel"></u-action-sheet>
		<u-action-sheet :list="list2" @click="shanchu2" v-model="show2"></u-action-sheet>
		<u-action-sheet :list="list3" @click="showComment" v-model="show3"></u-action-sheet>

		<u-popup v-model="showmodel" mode="bottom" border-radius="14" closeable="true">
			<view class="mainModel">
				<view class="title">
					举报笔记
				</view>
				<view class="item" @click="inComplain(item.id,item.name)" v-for="(item,index) in tsList" :key="index">
					<text>{{item.name}}</text>
					<image src="../../static/inter.png" mode="aspectFit"></image>
				</view>


			</view>

		</u-popup>

		<u-popup v-model="showmodel1" mode="bottom" border-radius="14" closeable="true">
			<view class="inputBtn">
				<view class="left">
					<u-input v-model="value" type="textarea" :placeholder="'写评论：'+placeholder" border="true"
						height="120" auto-height="true" cursor-spacing='60' placeholder-style="color:#C0C4CC"/>
				</view>
				<view class="right">
					<button type="default" @click="submit">发送</button>
				</view>
			</view>

		</u-popup>
		<u-modal v-model="hidden" content="是否确认删除您的帖子" @confirm="sure" @cancel="cancel" show-cancel-button='true'>
		</u-modal>

	</view>

	</view>

</template>

<script>
	import myTree from '../../components/treeComment.vue';
	import * as api from '@/common/api/api.js'
	export default {
		components: {
			myTree
		},
			
	
		data() {
			return {
				  noClick:true,
				commentList: [{
					content: "2",
					id: 71,
					isDel: 0,
					like: false,
					likeCount: 0,
					name: "方圆百里可乐味",
					rdate: "2021-08-04 10:34:26",
					replyLevel: 2,
					rid: 728,
					rname: "Wiggins",
					tid: 453453692,
					type: 1,
					uava: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep5Ka6DpHpLslhEX7N7g0vJIAibfANDV0MOYoCFT5YiaCK1pic7QHicTm95ibxo8HHd61ev099QUyvI9AA/132",
					uid: 2211,

					commentList: [{
						content: "2",
						id: 71,
						isDel: 0,
						like: false,
						likeCount: 0,
						name: "方圆百里可乐味",
						rdate: "2021-08-04 10:34:26",
						replyLevel: 3,
						rid: 728,
						rname: "Wiggins",
						tid: 453453692,
						type: 1,
						uava: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep5Ka6DpHpLslhEX7N7g0vJIAibfANDV0MOYoCFT5YiaCK1pic7QHicTm95ibxo8HHd61ev099QUyvI9AA/132",
						uid: 2211,
					}]
				}, {
					content: "2",
					id: 72,
					isDel: 0,
					like: false,
					likeCount: 0,
					name: "方圆百里可乐味",
					rdate: "2021-08-04 10:34:26",
					replyLevel: 2,
					rid: 728,
					rname: "Wiggins",
					tid: 453453692,
					type: 1,
					uava: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep5Ka6DpHpLslhEX7N7g0vJIAibfANDV0MOYoCFT5YiaCK1pic7QHicTm95ibxo8HHd61ev099QUyvI9AA/132",
					uid: 2211,

					commentList: [{
						content: "2",
						id: 72,
						isDel: 0,
						like: false,
						likeCount: 0,
						name: "方圆百里可乐味",
						rdate: "2021-08-04 10:34:26",
						replyLevel: 3,
						rid: 728,
						rname: "Wiggins",
						tid: 453453692,
						type: 1,
						uava: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep5Ka6DpHpLslhEX7N7g0vJIAibfANDV0MOYoCFT5YiaCK1pic7QHicTm95ibxo8HHd61ev099QUyvI9AA/132",
						uid: 2211,
					}]
				}],
				hidden: false,
				flag: "",
				arr: [],
				showmodel: false,
				showdel: false,
				showmodel1: false,
				time: '',
				id: null, //用户图片的id
				list: [{
					text: '删除'
				}],
				list2: [{
					text: '删除'
				}],
				list3: [{
					text: '评论'
				}, {
					text: '举报'
				}],
				show2: false,
				show3: false,
				show: false,
				u_id: null, //当前登录人的id
				r_id: null,
				m_id: '', //图片发布人的id
				res_id: null,
				type: 0,
				name: 'kristen',
				rename: null,
				ava: '',
				placeholder: '',
				value: '',
				type: 'text',
				border: true,
				comment: {},
				replyList: [],
				replys: [],
				com_num: '',
				tsList: [],
				replytype: undefined,
				replysSec: [],

				replysNum: [],
				replyLevel: undefined,
				videoContext:''
			}
		},


		onLoad(res) {
			this.id = res.id; //用户图片的id
			this.placeholder = res.name;
		
			
		
		if(res.uid=="null"||res.uid==null){
			this.u_id=null
			
		}else{
			this.u_id=res.uid
		}
			
		
		},
	
		onShow() {
  this.noClick=true
			//console.log(res.id+"==="+res.name);
			var that=this
		this.getTousu()
		that.get()
			
				// uni.$on("handClickSelectAddress", res => {
				 
				// that.get()
				// })
		
		},
		
// 		onReady: function (res) {
// 		    this.videoContext = uni.createVideoContext('myVideo',this);
// 		       this.videoContext.requestFullScreen({direction: 0});
// 			   // this.videoContext = uni.createVideoContext('myVideo', this);
// 			   //  this.videoContext.requestFullScreen({direction: 0});
// 			   //  this.videoContext.play()
// },
		methods: {
		// 	fullscreenchange (e){
			
		
		// 		if(!e.detail.fullScreen){
		// 			this.videoContext.stop()
		// 		}
		// 	},
			pirview(e){
		
			var	arr=[]
				for(let i in this.arr){
					arr.push(this.arr[i].image)
				}
				uni.previewImage({
					urls:arr,
					loop:true
				})
			},
			update() {
				console.log('999')
				this.get();
		
			},
			// 举报列表
			getTousu() {
				api.request({
						url: '/report/list',
						method: 'GET',

					})
					.then(res => {
					
						this.tsList = res.data.data
					})
			},
			shanchuCir() {

				this.hidden = true

			},
			cancel() {
				this.hidden = false
			},
		
			sure() {
				api.request({
						url: '/circle/delTopicById?tid=' + this.t_id,
						method: 'GET'
					})
					.then(res => {
					
						if (res.data.flag == true) {
							this.$refs.uToast.show({
								title: '删除成功',
								type: 'success',
								duration: '300'
							})
							uni.navigateBack({

							})
						} else {
							this.$refs.uToast.show({
								title: '删除失败',
								type: 'error',
								duration: '1000'
							})
						}
					})
			},

			// 投诉
			complain(uid, id) {
             if(this.u_id==null){
				uni.navigateTo({
					url:'../login/login'
				})
			 }else{
				 if (this.u_id == uid) {
				 	this.showdel = true
				 	this.t_id = id
				 } else {
				 	this.showmodel = true
				 	this.flag == ""
				 }
			
			 }
				
			},

			inComplain(id, con) {
				this.showmodel = false
				if (this.flag == "") {
					uni.navigateTo({
						url: '../complain/complain?id=' + id + "&con=" + con + '&circleId=' + this.id
					})
				} else {
					uni.navigateTo({
						url: '../complain/complain?id=' + id + "&con=" + con + '&rId=' + this.r_id
					})
				}

			},
			bindCom() {
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				this.showmodel1 = true
				this.t_id = this.comment.id
				this.type = 1
				}
			},
			//点击收藏
			getSc(res) {
				var that = this
				let t_id = res
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				api.request({
					url: '/shouCang/addSc',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.u_id
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.get();
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'success',
							duration: '1000'
						})
					}else{
								that.$refs.uToast.show({
									title: '收藏失败',
									type: 'success',
									duration: '1000'
								})
							}
				});
				}
			},
			// 转发
			// share(user, id) {
			// 	console.log(user, id)

			// 	uni.navigateTo({
			// 		url: './share?id=' + id + '&user=' + JSON.stringify(user)
			// 	})
			// },
			//取消收藏
			unSc(res) {
				let t_id = res
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				api.request({
					url: '/shouCang/deleteSc',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.u_id
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.get();
						this.$refs.uToast.show({
							title: '取消收藏',
							type: 'warning',
							duration: '1000'
						})
					}

				})
				}
			},
			//取消点赞
			unLike(ies) {
				//console.log('取消点赞')
		if(this.u_id==null){
			uni.navigateTo({
				url:'../login/login'
			})
		}else{
				api.request({
					url: '/dianzan/cancelDianzan',
					method: 'POST',
					data: {
						replyId: ies.id, 
						uid: this.u_id,
						type: 2,
						tid: ies.tid
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.get();
						this.$refs.uToast.show({
							title: '取消点赞',
							type: 'warning',
							duration: '1000'
						})
					}

				})
				}
			},

			//点赞
			getLike(ies) {
			  console.log(ies)
			  if(this.u_id==null){
			  	uni.navigateTo({
			  		url:'../login/login'
			  	})
			  }else{
				api.request({
					url: '/dianzan/addDianzan',
					method: 'POST',
					data: {
						replyId: ies.id,
						uid: this.u_id,
						type: 2,
						tid: ies.tid
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.get();
						this.$refs.uToast.show({
							title: '点赞成功',
							type: 'success',
							duration: '1000'
						})
					}else{
								that.$refs.uToast.show({
									title: '点赞失败',
									type: 'success',
									duration: '1000'
								})
							}
				});
				}
			},
		
			unLike1(res) {
				//console.log('取消点赞')
				let t_id = res
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				api.request({
					url: '/dianzan/cancelDianzan',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.u_id,
						type: 1
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.get();
						this.$refs.uToast.show({
							title: '取消点赞',
							type: 'warning',
							duration: '1000'
						})
					}

				})
				}
			},

		
			getLike1(res) {
				let t_id = res
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					api.request({
							url: '/dianzan/addDianzan',
							method: 'POST',
							data: {
								tid: t_id,
								uid: this.u_id,
								type: 1
							},
						}).then(res => {
							if (res.data.data == 1) {
								this.get();
								this.$refs.uToast.show({
									title: '点赞成功',
									type: 'success',
									duration: '1000'
								})
							}else{
										that.$refs.uToast.show({
											title: '点赞失败',
											type: 'success',
											duration: '1000'
										})
									}
						});
					
				}
			},

		
			unLike2(res, id) {
				//console.log('取消点赞')
				let t_id = res
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				api.request({
					url: '/dianzan/cancelDianzan',
					method: 'POST',
					data: {
						replyId: t_id,
						uid: this.u_id,
						type: 3,
						tid: id
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.get();
						this.$refs.uToast.show({
							title: '取消点赞',
							type: 'warning',
							duration: '1000'
						})
					}

				})
				}
			},

			//点赞
			getLike2(res, id) {
				let t_id = res
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				api.request({
					url: '/dianzan/addDianzan',
					method: 'POST',
					data: {
						replyId: t_id,
						uid: this.u_id,
						type: 3,
						tid: id
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.get();
						this.$refs.uToast.show({
							title: '点赞成功',
							type: 'success',
							duration: '1000'
						})
					}else{
								that.$refs.uToast.show({
									title: '点赞失败',
									type: 'success',
									duration: '1000'
								})
							}
				});
				}
			},
			//用户信息初始化
		
			//删除评论
			shanchu1(res) {
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				if (res == 0) {
					api.request({
						url: '/reply/deleteReplyAndMes',
						method: 'GET',
						data: {
							id: this.r_id, //评论列表id
							tid: this.id, //图片id
							time: this.time
						},
					}).then(res => {
						if (res.data.data == 1) {
							this.$refs.uToast.show({
								title: '删除回复成功',
								type: 'success',
							})
							this.get();
						} else {
							console.log('删除失败')
						}
					});
				}
				}
			},
		
			shanchu2(res) {
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				if (res == 0) {
					api.request({
						url: '/replys/deleteReplysAndMes',
						method: 'GET',
						data: {
							id: this.res_id,
							tid: this.id, //图片id
							time: this.time
						},
					}).then(res => {
						if (res.data.data == 1) {
							this.$refs.uToast.show({
								title: '删除回复成功',
								type: 'success',
							})
							this.get();
						} else {
							console.log('删除失败')
						}
					})
				}
				}
			},
			//初始化评论信息
			get() {
				var that = this
				// uni.getStorage({
				// 	key: 'userInfo',
				// 	success: (res) => {
				// 		console.log(res)
				// 		this.name = res.data.nickName;
				// 		this.ava = res.data.avatarUrl;
				// 		this.u_id = res.data.userId;
				// 		console.log(this.u_id)
				
				
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
					
						that.name = res.data.nickName;
						that.ava = res.data.avatarUrl;
					    that.u_id=res.data.userId
					
					api.request({
						url: '/circle/info',
						method: 'POST',
						data: {
							circleId: that.id,
							userId: this.u_id
						}
					}).then(res => {
					if(res.data==null){
						this.$refs.uToast.show({
							title: '此贴已被删除',
							type: 'success',
						})
						
					}else{
						that.comment = res.data.data
						that.m_id = res.data.data.uid;
						
						var arr = []
												
						var arr1 = that.comment.pocUrl.map(item => {
							return {
								image: item.url
							}
						})
										
						that.arr = arr1
					}
					
					});
					
						},fail() {
							
					// 		api.request({
					// 			url: '/userInfo/findUserInfoById',
					// 			method: 'GET',
					// 			data: {
					// 				userId: that.u_id,
					// 			},
					// 		}).then(res => {
					// 			this.name = res.data.data.nickName
					// 			this.ava = res.data.data.avatarUrl;
					
					// 			// console.log(res.data[0].nickName)
					// 		})
						}
						})
						api.request({
							url: '/reply/getReplyByTopicId',
							method: 'POST',
							data: {
								userId: that.u_id, 
								topicId: that.id
							}
						}).then(res => {


							this.replyList = res.data

							//console.log(res.data)
						});
                    if(this.u_id==null){
						api.request({
							url: '/circle/info/'+ that.id,
							method: 'GET',
							
						}).then(res => {
						if(res.data==null){
							this.$refs.uToast.show({
								title: '此贴已被删除',
								type: 'success',
							})
						
						}else{
						
							that.comment = res.data.data
							that.m_id = res.data.data.uid;
							
							var arr = []
													
							var arr1 = that.comment.pocUrl.map(item => {
								return {
									image: item.url
								}
							})
						
							that.arr = arr1
						}
						
						});
					}else{
						api.request({
							url: '/circle/info',
							method: 'POST',
							data: {
								circleId: that.id,
								userId: this.u_id
							}
						}).then(res => {
						if(res.data==null){
							this.$refs.uToast.show({
								title: '此贴已被删除',
								type: 'success',
							})
						
						}else{
							
							that.comment = res.data.data
							that.m_id = res.data.data.uid;
							
							var arr = []
													
							var arr1 = that.comment.pocUrl.map(item => {
								return {
									image: item.url
								}
							})
					
							that.arr = arr1
						}
						
						});
					}
					
						//读取回复
					
						api.request({
							url: '/replys/getReplyByTopicId',
							method: 'POST',
							data: {
								userId: that.u_id,
								topicId: that.id,

							}
						}).then(res => {

							// that.replys = res.data

							this.commentList = res.data.data

				

						})
			


				//

			},



			mapList(items) {
				items.map(item => {
					return {
						item: item
					}
				})

			},
			//提交评论或回复
			submit() {
				if (this.type == 2) {
					if (this.value == '') {
						this.$refs.uToast.show({
							title: '内容不能为空',
							type: 'error'
						})
					} else {
						api.request({
							url: '/mesCheck/getData',
							method: 'GET',
							data: {
								content: this.value,
							},
						}).then(res => {
							//console.log(res);

							if (res.data.errcode == 0) {
								console.log(this.replyLevel);
								api.request({
									url: '/replys/insertReplysInfo/' + this.m_id,
									method: 'POST',
									data: {
										type: this.replytype,
										uid: this.u_id, //当前登录人的id
										tid: this.id, //当前图片文章id
										rid: this.r_id, //当前评论的id
										//m_id: this.m_id,//发布当前图片用户的id
										uava: this.ava, //当前人头像
										name: this.name, //当前人用户名
										rname: this.rename, //被回复人的用户名
										content: this.value, //当前内容
										replyLevel: this.replyLevel

									},
								}).then(res => {
									if (res.data.data == 1) {
										//console.log("评论成功")
										this.get();

										this.$refs.uToast.show({
											title: '评论成功',
											type: 'success'
										})
										this.showmodel1 = false
										this.value = '';
									} else  {
										this.$refs.uToast.show({
											title: '评论失败',
											type: 'success'
										})
											this.get();
									}
								});

							} else {
								this.$refs.uToast.show({
									title: '内容包含敏感词汇!请检查!',
									type: 'error'
								})
								return;
							}
						});

					}
				} else {
					if (this.value == '') {
						this.$refs.uToast.show({
							title: '内容不能为空',
							type: 'error'
						})
					} else {
						api.request({
							url: '/mesCheck/getData',
							method: 'GET',
							data: {
								content: this.value,
							},
						}).then(res => {
							//console.log(res);

							if (res.data.errcode == 0) {
								console.log("内容检查成功");
								api.request({
									url: '/reply/insertReplyInfo/' + this.m_id,
									method: 'POST',
									data: {
										uid: this.u_id, //当前登录人的id
										rname: this.name, //当前登录人的用户名
										rava: this.ava, //当前登录人的头像
										//	m_id: this.m_id,//发布当前图片的用户id
										rcont: this.value, //文本内容
										tid: this.id //图片以及文章的id
									},
								}).then(res => {
									if (res.data.data == 1) {
										console.log("评论成功")
										this.showmodel1 = false
										this.get();
										this.$refs.uToast.show({
											title: '评论成功',
											type: 'success'
										})
										this.value = '';
									} else if (res.data.data == 0) {
										console.log("评论失败")
									}

								});

							} else {
								this.$refs.uToast.show({
									title: '内容包含敏感词汇!请检查!',
									type: 'error'
								})
								return;
							}
						});

					}

				}


			},

			showComment(index) {
				console.log(this.list3[index].text)
				this.flag = this.list3[index].text
				if (this.list3[index].text == '评论') {
					this.showmodel1 = true
				} else {
					this.showmodel = true
					// uni.navigateTo({
					// 	url:'../complain/complain?id='+id+"&con="+con+'&circleId='+this.id
					// })
				}
			},
			//回复评论
			reply1(res) {
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				//等于自己就删除  不等于自己就回复他人
				this.replytype = 1

				// if(res.replyLevel==null){
				this.replyLevel = res.replyLevel + 1
				// }
				console.log(res.replyLevel + 1)
				if (this.u_id == res.uid) {
					this.r_id = res.id;
					this.time = res.rdate;
					this.t_id = res.id
					this.show = true;
					console.log(this.time)
					//console.log(this.r_id)
				} else {
					this.placeholder = res.rname;
					this.rename = res.rname;
					this.r_id = res.id;
					this.m_id = res.uid;
					this.t_id = res.id
					this.type = 2;
					this.show3 = true
					/* 	this.$refs.uToast.show({
							title: '当前回复：' + this.placeholder,
							type: 'success',
						}) */
				}
				}


			},
			reply2(res) {
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				console.log(res)
				this.replytype = 2
				// if(res.replyLevel==null){
				this.replyLevel = res.replyLevel + 1
				// }
				console.log(res.replyLevel + 1)

				if (this.u_id == res.uid) {
					this.r_id = res.id;
					this.res_id = res.id;
					this.time = res.rdate;
					this.t_id = res.id
					this.show2 = true;
					//console.log(this.r_id)
				} else {
					this.placeholder = res.name;
					this.rename = res.name;
					this.r_id = res.id;
					this.m_id = res.uid;
					this.t_id = res.id
					this.type = 2;
					this.show3 = true
					/* this.$refs.uToast.show({
						title: '当前回复：' + this.placeholder,
						type: 'success',
					}) */
				}
				}


			},
			reply(res) {
				if(this.u_id==null){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				// if(res.replyLevel==null){
				this.replyLevel = res.replyLevel + 1
				// }
				console.log(res.replyLevel + 1)
				this.placeholder = res.uname //图片用户的用户名
				this.m_id = res.uid //图片用户的id
				this.time = res.rdate //评论日期
				this.type = 0
				/* 	this.$refs.uToast.show({
						title: '当前回复：' + this.placeholder,
						type: 'success',
					}) */
					}
			},
			//图片预览
			previewImage(current, photos) {
				uni.previewImage({
					current,
					urls: photos
				})
			},
			//个人中心跳转
			userinfo(res) {
				//console.log(res)
				uni.navigateTo({
					url: '../user/userinfo/userinfo?uid=' + res
				})
			},

		},
		onShareAppMessage() {
			api.request({
					url: '/userInfo/addIntegral',
					method: 'POST',
					data: {
						userId: that.u_id,
						integral: 5
					}
				})
				.then(respon => {
					console.log(respon)
					that.$refs.uToast.show({
						title: '积分加5',
						type: 'success',
						duration: '1000'
					})
				})
			// 　if (res.from === 'button') {// 来自页面内分享按钮
			// 　　　　console.log(res.target)
			// 　　}
			return {
				title: "来自" + this.comment.uname + '的分享',
				path: '/pages/quanzi/comment?id=' + this.comment.id,
				imageUrl: this.comment.pocUrl[0].url,
				content: this.comment.content,
			}
		},
		onShareTimeline() {
			var that=this
			api.request({
					url: '/userInfo/addIntegral',
					method: 'POST',
					data: {
						userId: that.u_id,
						integral: 5
					}
				})
				.then(respon => {
					console.log(respon)
					that.$refs.uToast.show({
						title: '积分加5',
						type: 'success',
						duration: '1000'
					})
				})
			// 　if (res.from === 'button') {// 来自页面内分享按钮
			// 　　　　console.log(res.target)
			// 　　}
			console.log("id=" +encodeURIComponent(JSON.stringify(that.comment.id))+"&name="+encodeURIComponent(JSON.stringify(that.comment.uname)))

			return {
				title: "来自" + this.comment.uname + '的分享',
				query: "id=" +encodeURIComponent(JSON.stringify(that.comment.id))+'&uid=null'
				+"&name="+that.comment.uname,
				imageUrl: this.comment.pocUrl[0].url,
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.lunbo{
		width: 100%;
		height: 800upx;
	}
	.userLeft {
		vertical-align: middle;
		margin: 0;
		padding: 0;
		border: 1px solid transparent !important;
		background: #fff !important;
		border-color: #fff !important;
	}

	.inputBtn {
		width: 94%;
		height: auto;
		overflow: hidden;
		margin: 0 auto;
		padding: 50upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 80upx;
	}

	.inputBtn>.left {
		width: 80%;
		height: 120upx;
	}

	.inputBtn>.right {
		width: 18%;
		height: 160upx;
		line-height: 140upx;
		overflow: hidden;

	}

	.inputBtn>.right>button {
		display: block;
		width: 100%;
		height: 140upx;
		background-color: #FDBC58;
		color: #fff;
		font-size: 28upx;
		line-height: 140upx;
		vertical-align: middle;
		margin-top: 14upx;

	}

	.foot {
		width: 100%;
		height: 108upx;
		border-top: 1px solid #bbb;
		padding: 0 30upx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9999;
	}

	.foot>.left {
		vertical-align: middle;
	}

	.foot>.left>image {
		width: 50upx;
		height: 50upx;
		vertical-align: middle;
	}

	.foot>.right {
		vertical-align: middle;
		width: 55%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.foot>.right image {
		width: 50upx;
		height: 50upx;
		vertical-align: middle;
	}

	.foot>.right text {
		font-size: 24upx;
		vertical-align: middle;
		margin-left: 10upx;
	}

	.foot>.left>text {
		font-size: 24upx;
		vertical-align: middle;
		margin-left: 10upx;
	}

	.content {
		//margin-bottom: 10rpx;

		margin-top: 15rpx;
		margin-bottom: 15rpx;

	}

	.content>text {
		display: block;
		margin-top: 16upx;
		text-align: justify;
		text-justify: newspaper;
		word-break: break-all;
	}

	.content>.etc {
		color: #ff5c5f !important;
	}

	.content>.time {
		margin-top: 18upx;
		padding: 30upx 0;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.content>.time>text {
		float: right;
		color: rgba(138, 138, 138, 100);
		font-size: 10px;

	}

	.number {
		color: rgba(138, 138, 138, 100);
		font-size: 12px;
	}

	.recommend {
		width: 132upx;
		height: 36upx;
		line-height: 36upx;
		border-radius: 18upx;
		background-color: rgba(249, 194, 18, 100);
		color: rgba(16, 16, 16, 100);

		text-align: center;
		font-family: Arial;
		margin-left: 20upx;
		vertical-align: middle;
		display: inline-block;
	}

	.recommend>image {
		width: 22upx;
		height: 22upx;
		vertical-align: middle;
	}

	.recommend>text {
		color: rgba(255, 255, 255, 100);
		font-size: 20upx;
		vertical-align: middle;
	}

	.mainModel {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 0 30upx;
		box-sizing: border-box;

	}

	.mainModel>.title {
		width: 100%;
		height: 98upx;
		text-align: center;
		font-size: 28upx;
		font-weight: bold;
		line-height: 98upx;
	}

	.mainModel>.item {
		width: 100%;
		height: 98upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #bbb;
	}

	.mainModel>.item>image {
		width: 36upx;
		height: 36upx;
	}

	.more {
		width: 48upx;
		height: 48upx;
		float: right;
		margin-right: 30upx;
		margin-top: 20upx;

	}

	.wrap {
		//padding: 10rpx;
		height: 100%;
		width: 100%;
	}

	.place {
		margin-left: 15upx;
	}

	.button {
		position: absolute;
		top: 35rpx;
		right: 30rpx;

	}

	.input {
		display: flex;

		width: 100%;
		z-index: 999;
		//background: red;

		background: #fff;
		align-items: center;
		margin-top: 24upx;

		//padding: 20rpx;
		image {
			width: 64upx;
			height: 64upx;
			border-radius: 50%;
		}
	}

	.num {
		display: inline;
	}

	.comment {

		//padding: 30rpx;
		margin-top: 10rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;

		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}

		.pic {
			.img_wrapper {
				width: 220upx;
				height: 150upx;
				margin-right: 15upx;
				display: inline-block;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}

	.comment>.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}

	.comment>.right {
		flex: 1;
		//padding-left: 20rpx;
		font-size: 30rpx;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;


		}



		.reply-box {
			//background-color: rgb(242, 242, 242);
			//border-radius: 12rpx;

			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;

				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;

				.more {
					margin-left: 6rpx;
				}
			}
		}

		.test {
			float: left;
			padding: 15rpx;
		}

		.img {
			display: flex;
		}

		.bottom {
			//margin-top: 20rpx;
			margin-left: 10rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			margin-bottom: 10rpx;
			position: relative;


			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}

			.weibo-handle {
				display: flex;
				position: absolute;
				right: 0;
				//padding-top: 15rpx;
				font-size: 28rpx;
				padding-bottom: 25rpx;
			}

			.weibo-handle image {
				width: 40rpx;
				height: 40rpx;
				//margin-right: 20rpx;
				margin-left: 20rpx;
			}

			.weibo-handle view {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}



	.reply {
		display: flex;
		//padding: 30rpx;
		margin-top: 10rpx;
		border-bottom: 1px solid #bbb;

		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}

		.pic {
			.img_wrapper {
				width: 220upx;
				height: 150upx;
				margin-right: 15upx;
				display: inline-block;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			//padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: inline;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {

					position: relative;
					left: 10rpx;

					display: flex;
					justify-content: space-between;
					align-items: center;

					._name {
						vertical-align: middle;
					}

					._name>text {
						color: rgba(138, 138, 138, 100);
						font-size: 24upx;
						vertical-align: middle;
					}

					._name>image {
						width: 40upx;
						height: 38upx;
						vertical-align: middle;
					}

					.praise-group>image {
						width: 30upx;
						height: 30upx;
						margin-right: 30upx;

					}

					.praise-group {
						text-align: center;
					}

					.praise-group>text {
						display: block;
						color: rgba(138, 138, 138, 100);
						font-size: 10px;
						margin: 0 auto;
						margin-right: 30upx;
					}
				}

				.time {

					font-size: 24rpx;
					color: #000;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
				margin-left: 10rpx;
				margin-top: 10rpx;

				color: #000;
				font-size: 30upx;

			}

			.reply-box {
				//background-color: rgb(242, 242, 242);
				//border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.test {
				float: left;
				padding: 15rpx;
			}

			.img {
				display: flex;
			}

			.bottom {
				margin-top: 20rpx;
				margin-left: 10rpx;
				display: flex;
				font-size: 24rpx;
				color: #eeeeee;
				margin-bottom: 10rpx;
				line-height: 50rpx;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}

			}
		}
	}

	.reply1 {
		display: flex;
		//padding: 30rpx;
		margin-top: 10rpx;


		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}

		.pic {
			.img_wrapper {
				width: 220upx;
				height: 150upx;
				margin-right: 15upx;
				display: inline-block;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
				position: relative;
				top: 14upx;
			}
		}

		.right {
			flex: 1;
			//padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: inline;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {

					position: relative;
					left: 10rpx;

					display: flex;
					justify-content: space-between;
					align-items: center;

					._name {
						vertical-align: middle;
					}

					._name>text {
						color: rgba(138, 138, 138, 100);
						font-size: 20upx;
						vertical-align: middle;
					}

					._name>image {
						width: 40upx;
						height: 38upx;
						vertical-align: middle;
					}

					.praise-group>image {
						width: 30upx;
						height: 30upx;
						margin-right: 30upx;

					}

					.praise-group {
						text-align: center;
					}

					.praise-group>text {
						display: block;
						color: rgba(138, 138, 138, 100);
						font-size: 10px;
						margin: 0 auto;
						margin-right: 30upx;
					}
				}

				.time {

					font-size: 20rpx;
					color: #000;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
				margin-left: 10rpx;
				margin-top: 10rpx;

				color: #000;
				font-size: 26upx;

			}

			.reply-box {
				//background-color: rgb(242, 242, 242);
				//border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.test {
				float: left;
				padding: 15rpx;
			}

			.img {
				display: flex;
			}

			.bottom {
				margin-top: 20rpx;
				margin-left: 10rpx;
				display: flex;
				font-size: 24rpx;
				color: #eeeeee;
				margin-bottom: 10rpx;
				line-height: 50rpx;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}

			}
		}
	}
</style>
