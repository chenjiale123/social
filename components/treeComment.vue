<template>

	<!-- <view>
		<u-toast ref="uToast" />

		<view class="vfor" v-for="(item,index) in commentList" :key="index">
		
			<view class="item_wrap">
				<view class="left">
					<view class="avatar">
						<u-image width="58rpx" height="58rpx" shape="circle" :src="item.uava"></u-image>
					</view>
					<view class="nick">
						<text>{{item.rname}}</text>
					</view>
					<view class="ptime">
						<text>{{item.rdate}}</text>
					</view>
				</view>
			</view> 
			<view class="content" @click="reply(item.rname,item.id,item.uid)" >
				<view class="reply_to">@{{item.rname}}:</view>
				<view class="reply_content">{{item.content}}</view>
			</view>
			<tree-comment :commentList="item.commentList" ></tree-comment>
		</view>
		<u-mask :show="isInput" @click="maskClick">
			<view class="commentInputView">
				<view class="inputView">
					<u-input v-model="wContent" clearable="false" :focus="focus" confirm-type="评论" @confirm="writePComment"
					 :placeholder="'回复'+nickname" />
				</view>
			</view>
		</u-mask>
		<u-action-sheet :list="myList" v-model="mySheetShow" :cancel-btn="true" @click="mySheetClick()"></u-action-sheet>
		<u-action-sheet :list="otherList" v-model="otherSheetShow" :cancel-btn="true" @click="otherSheetClick()"></u-action-sheet>
		-->
	<view style="width: 100%;height: auto;overflow: hidden;">

		<u-toast ref="uToast" />

		<!-- :style="{left:`${-ies.replyLevel*30}rpx`,position:'relative'}" -->
		<view class="reply" v-if="ids==ies.rid" v-for="(ies,idx1) in commentList"  >
			<view class="inall">
				<view class="left" @click.stop="reply2(ies)">
								<image :src="ies.uava" mode="aspectFill"></image>
							</view>
							<view class="right">
								<view class="top" @click.stop="reply2(ies)">
									<view class="name">
										<view class="_name"> <text>{{ies.name}}回复{{ies.rname}}</text>
											<!-- <image src="../../static/lv1.png" mode="aspectFit"></image> -->
											<text style="color: rgba(232, 163, 50, 100);
														font-size: 12px;margin-left: 10upx;">Lv.1</text>
											<view class="time">{{ies.rdate}}</view>
										</view>
										<view class="praise-group" v-if="ies.replyLevel==2">
											<image v-if="ies.like==false" @click.stop="getLike(ies.id,ies.tid)"
												src="../static/good.png" />
											<image v-else @click.stop="unLike(ies.id,ies.tid)" src="../static/goods.png" />
											<text>{{ies.likeCount}}</text>
				
										</view>
				
									</view>
				
								</view>
								<!-- 点击回复 -->
								<view class="content" @click.stop="reply2(ies)">{{ies.content}}</view>
				<!--   -->
							<!-- 	<view class="bottom">
									<view style="height:100%;width: 100%;color: #000000;border-radius: 15rpx;" >
				
										<tree-comment v-if="ies.subLevel.length!==0" :ids="ies.id" :tid="ies.tid"
											:commentList="ies.subLevel"></tree-comment>
				
				
				
									</view>
				
								</view> -->
				
							</view>
			</view>
			<view class="bottom">
				<view style="height:100%;width: 100%;color: #000000;border-radius: 15rpx;" >
				<!-- <mote-lines-divide :line="3" expandText="展开" foldHint="收起" enableButton='true'> -->
				<tree-comment v-if="ies.subLevel.length!==0" :ids="ies.id" :tid="ies.tid"
					:commentList="ies.subLevel"></tree-comment>
				<!-- </mote-lines-divide>		 -->
				
						
						
						
				</view>
						
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
						height="120" auto-height="true" cursor-spacing='60' />
				</view>
				<view class="right">
					<button type="default" @click="submit">发送</button>
				</view>
			</view>

		</u-popup>
		<u-modal v-model="hidden" content="是否确认删除您的帖子" @confirm="sure" @cancel="cancel" show-cancel-button='true'>
		</u-modal>


	</view>
</template>
<script>
	import treeComment from './treeComment'
	import * as api from '@/common/api/api.js'
import MoteLinesDivide from "@/components/mote-lines-divide/mote-lines-divide"


	export default {
		components: {
			MoteLinesDivide,
			treeComment
		},
		props: {
			commentList: Array,
			ids: Number,
			tid: String

		},
		data() {
			return {

				hidden: false,
				flag: "",
				arr: [],
				showmodel: false,
				showdel: false,
				showmodel1: false,
				show: false,

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
				u_id: '', //当前登录人的id
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
				replyLevel: undefined
			}
		},
		mounted() {
			console.log(this.commentList)
			this.getTousu()
			this.get()
		},
		methods: {
			getTousu() {
				api.request({
						url: '/report/list',
						method: 'GET',

					})
					.then(res => {
						console.log(res)
						this.tsList = res.data.data
					})
				console.log(this.commentList)
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
						console.log(res)
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
			get() {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						this.name = res.data.nickName;
						this.ava = res.data.avatarUrl;
						this.u_id = res.data.userId;
						console.log(this.u_id)
					},
					fail(err) {
						console.log(err)
						// uni.navigateTo({
						// 	url: '../login/login'
						// })
					}
				})


				//

			},


			// 投诉
			complain(uid, id) {
          if(this.uid==""){
			  uni.navigateTo({
			  	url:'../pages/login/login'
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

				console.log(this.r_id)
			},
			bindCom() {
				if(this.uid==""){
							  uni.navigateTo({
							  	url:'../pages/login/login'
							  })
				}else{
				this.showmodel1 = true
				this.t_id = this.comment.id
				this.type = 1
				}
			},

			//取消点赞
			unLike(res, id) {
				if(this.uid==""){
							  uni.navigateTo({
							  	url:'../pages/login/login'
							  })
				}else{
				var that = this
				//console.log('取消点赞')
				let t_id = res
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
						that.$nextTick(function() {
							// setTimeout(()=>{
							console.log('666')

							that.$emit('update');
							uni.$emit('handClickSelectAddress', '333')
							// },1000)

						})
						// this.$refs.uToast.show({
						// 	title: '取消点赞',
						// 	type: 'warning',
						// 	duration: '1000'
						// })
					}

				})
			}
			},

			//点赞
			getLike(res, id) {
				if(this.uid==""){
							  uni.navigateTo({
							  	url:'../pages/login/login'
							  })
				}else{
				var that = this
				let t_id = res
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
						that.$nextTick(function() {
							// setTimeout(()=>{
							console.log('666')

							that.$emit('update');
							uni.$emit('handClickSelectAddress', '333')
							// },1000)

						})
						// this.$refs.uToast.show({
						// 	title: '点赞成功',
						// 	type: 'success',
						// 	duration: '1000'
						// })
					}
				});
		}
			},




			//删除评论
			shanchu1(res) {
				if(this.uid==""){
							  uni.navigateTo({
							  	url:'../pages/login/login'
							  })
				}else{
				var that = this
				if (res == 0) {
					api.request({
						url: '/reply/deleteReplyAndMes',
						method: 'GET',
						data: {
							id: this.r_id, //评论列表id
							tid: this.tid, //图片id
							time: this.time
						},
					}).then(res => {
						if (res.data.data == 1) {
							this.$refs.uToast.show({
								title: '删除回复成功',
								type: 'success',
							})
							that.$nextTick(function() {
								// setTimeout(()=>{
								console.log('666')

								that.$emit('update');
								uni.$emit('handClickSelectAddress', '333')
								// },1000)

							})
						} else {
							console.log('删除失败')
						}
					});
				}
			}
			},
			//删除回复
			shanchu2(res) {
				if(this.uid==""){
							  uni.navigateTo({
							  	url:'../pages/login/login'
							  })
				}else{
				var that = this
				if (res == 0) {
					api.request({
						url: '/replys/deleteReplysAndMes',
						method: 'GET',
						data: {
							id: this.res_id,
							tid: this.tid, //图片id
							time: this.time
						},
					}).then(res => {
						if (res.data.data == 1) {
							this.$refs.uToast.show({
								title: '删除回复成功',
								type: 'success',
							})
							that.$nextTick(function() {
								// setTimeout(()=>{
								console.log('666')

								that.$emit('update');
								uni.$emit('handClickSelectAddress', '333')
								// },1000)

							})
						} else {
							console.log('删除失败')
						}
					})
				}
				}
			},


			//提交评论或回复
			submit() {
				var that = this
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
										tid: this.tid, //当前图片文章id
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

										console.log('updatePage')
										that.$nextTick(function() {
											// setTimeout(()=>{
											console.log('666')
											uni.$emit('handClickSelectAddress', '333')
											that.$emit('update');
											uni.$emit('handClickSelectAddress', '333')
											// },1000)

										})


										this.$refs.uToast.show({
											title: '评论成功',
											type: 'success'
										})
										this.showmodel1 = false
										this.value = '';
									} else if (res.data.code == 0) {
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
										this.$emit('update');

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
				console.log(this.u_id, res.uid)
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


		}
	}
</script>

<style lang="scss" scoped>
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

	.reply {
	
		//padding: 30rpx;
		margin-top: 10rpx;
		// border-bottom: 1px solid #bbb;
		.inall{
				display: flex;
		}

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
