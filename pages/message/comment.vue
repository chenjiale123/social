<template>
	<view class="agree">
		<view class="list">
			<view class="item" v-for="(item,index) in  mes_list" :key="index">
				<view class="include">
					<image :src="item.uava" mode="aspectFill" class="avter"></image>
					<view class="center">
						<view class="user">
							<text>{{item.name}}</text>
							<!-- <image src="../../static/lv1.png" mode="aspectFill"></image> -->
							<text style="color: rgba(232, 163, 50, 100);
							font-size: 12px;margin-left: 10upx;">Lv.1</text>
						</view>
						<text v-if="item.type==1">评论了你的帖子   {{item.date}}</text>   
							<text  v-if="item.type==2">回复了你的评论   {{item.date}}</text>
						
					</view>
								
					
		<image v-if="item.circleVo==null" src="../../static/null.png" mode="aspectFill" class="img" ></image>
		<image v-if="item.circleVo!==null&&item.circleVo.type==1" :src="item.circleVo.pocUrl[0].url" mode="aspectFill" class="img" @click="detail(item)"></image>
		<image v-if="item.circleVo!==null&&item.circleVo.type==2" :src="item.circleVo.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit" class="img" @click="detail(item)"></image>
		
				</view>
			<view class="content">
						<text>{{item.content}}</text>
						<view class="reply">
							<view class="btn" v-if="item.circleVo!==null" @click="showcom(item.rid,item.tid,item.uid,item.name,item.ruid,item.type,item.rsId)">
								<image src="../../static/reply.png" mode="aspectFill"></image>
								<text>回复评论</text>
							</view>
						<!-- 	<view class="praise-group">
								<image v-if="item.isLike==null || item.isLike==''" @click="$noMultipleClicks(getLike,item.circleVo.id)"
									src="../../static/exl.png" />
								<image v-else @click="$noMultipleClicks(unLike,item.circleVo.id)" src="../../static/exl1.png" />
							
										
							</view> -->
							
						</view>
				         
				
					</view>
			</view>
				
			</view>
			
		   	<u-action-sheet :list="list3" @click="showComment" v-model="show"></u-action-sheet>
			<u-popup v-model="showmodel1" mode="bottom" border-radius="14" closeable="true">
				<view class="inputBtn">
					<view class="left">
						<u-input v-model="value" type="textarea" :placeholder="'写评论：'" border="true"
							height="120" auto-height="true"  cursor-spacing='60' />
					</view>
					<view class="right">
						<button type="default" @click="submit">发送</button>
					</view>
				</view>
			
			</u-popup>
			<u-popup v-model="showmodel" mode="bottom" border-radius="14" closeable="true">
				<view class="mainModel">
					<view class="title">
						举报笔记
					</view>
					<view class="item" @click="inComplain(item.id,item.name)" v-for="(item,index) in tsList" :key="index" >
						<text>{{item.name}}</text>
						<image src="../../static/inter.png" mode="aspectFit"></image>
					</view>
					
			
				</view>
			
			</u-popup>
					<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as api from '@/common/api/api.js'
	export default{
		data(){
			return{
				mes_list:[],
				showmodel:false,
				showmodel1:false,
				show:false,
				list3: [{
					text: '评论'
				},{
					text: '举报'
				}],
				id:'',
				name:'',
				ava:'',
				u_id:'',
				tsList:[],
				rsid:'',
				searchName:'',
				value:''
			}
		},
		onLoad(){
			this.get()
			this.getTousu()
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log(res)
					this.name = res.data.nickName;
					this.ava = res.data.avatarUrl;
					this.u_id = res.data.userId;
					console.log(this.u_id)
					},
					})
		},
		methods:{
			// 举报列表
			detail(res){
		console.log(res)
			uni.navigateTo({
				url: '../quanzi/comment?id=' + res.tid + '&name=' + res.uname
			})
			},
			getTousu(){
				api.request({
					url:'/report/list',
					 method:'GET',
					 
				})
				.then(res=>{
					console.log(res)
					this.tsList=res.data.data
				})
			},
					
			// 投诉
			complain() {
				this.showmodel = true
				this.flag==""
			},
			
			inComplain(id,con) {
				this.showmodel = false
			
					uni.navigateTo({
						url: '../complain/complain?id='+id+"&con="+con+'&rId='+this.id
					})
				
				
				console.log(this.id,id)
			},
			showcom(id,tid,mid,name,ruid,type,rsid){
				this.show=true
				this.id=id
				this.tid=tid
				this.m_id=mid
				this.rname=name
				this.ruid=ruid
				this.type=type
				this.rsid=rsid
				console.log(id,tid,mid,name,ruid,rsid)
				
			},
			showComment(index){
			 
			 var that=this
			 uni.getStorage({
			 	key: 'userInfo',
			 	success: (res) => {
			 		console.log(res)
			 		this.name = res.data.nickName;
			 		this.ava = res.data.avatarUrl;
			 		this.u_id = res.data.userId;
			 api.request({
			 	url: '/circle/info',
			 	method: 'POST',
			 	data: {
			 		circleId: that.tid,
			 		userId: res.data.userId
			 	}
			 })
			 .then(res1=>{
				 if(res1.data==null){
					 that.$refs.uToast.show({
					 	title: '此贴已被删除',
					 	type: 'error'
					 })
				 }else{
					 that.flag=that.list3[index].text
					 that.value=""
					 				if(that.list3[index].text=='评论'){ 
					 					that.showmodel1=true
					 				}else{
					 					that.showmodel=true
					 					// uni.navigateTo({
					 					// 	url:'../complain/complain?id='+id+"&con="+con+'&circleId='+this.id
					 					// })
					 				}
				 }
			 })
			 },
			 })
			 
			
			},
			submit() {
			var that=this
			if(this.type==2){
				if (that.value =='') {
					that.$refs.uToast.show({
						title: '内容不能为空',
						type: 'error'
					})
				} else {
					api.request({
						url: '/mesCheck/getData',
						method: 'GET',
						data: {
							content: that.value,
						},
					}).then(res => {
						//console.log(res);
							
						if (res.data.errcode == 0) {
							console.log("内容检查成功");
							api.request({
								url: '/replys/insertReplysInfo/' + that.ruid,
								method: 'POST',
								data: {
									uid: that.u_id, //当前登录人的id
									tid: that.tid, //当前图片文章id
									rid: that.rsid, //当前评论的id
									//m_id: that.m_id,//发布当前图片用户的id
									uava: that.ava, //当前人头像
									name: that.name, //当前人用户名
									rname: that.rname, //被回复人的用户名
									content: that.value,
									 type:that.type//当前内容
								},
							}).then(res => {
								if (res.data.data == 1) {
									
									console.log(res.data.data)
									that.get();
								
									that.$refs.uToast.show({
										title: '评论成功',
										type: 'success'
									})
										that.showmodel1=false
								  that.value=""
								} else if (res.data.code == 0) {
									console.log("评论失败")
								}
							});
							
						} else {
							that.$refs.uToast.show({
								title: '内容包含敏感词汇!请检查!',
								type: 'error'
							})
							return;
						}
					});
							
				}
						
							
			}else{
				if (that.value == '') {
					that.$refs.uToast.show({
						title: '内容不能为空',
						type: 'error'
					})
				} else {
					api.request({
						url: '/mesCheck/getData',
						method: 'GET',
						data: {
							content: that.value,
						},
					}).then(res => {
						//console.log(res);
							
						if (res.data.errcode == 0) {
							console.log("内容检查成功");
							api.request({
								url: '/replys/insertReplysInfo/' + that.ruid,
								method: 'POST',
								data: {
									// uid: that.u_id, //当前登录人的id
									// tid: that.tid, //当前图片文章id
									// rid: that.id, //当前评论的id
									// //m_id: that.m_id,//发布当前图片用户的id
									// rava: that.ava, //当前人头像
									// name: that.name, //当前人用户名
									// rname: that.rname, //被回复人的用户名
									// rcont: that.value //当前内容
									uid: that.u_id, //当前登录人的id
									tid: that.tid, //当前图片文章id
									rid: that.id, //当前评论的id
									//m_id: that.m_id,//发布当前图片用户的id
									uava: that.ava, //当前人头像
									name: that.name, //当前人用户名
									rname: that.rname, //被回复人的用户名
									content: that.value //当前内容
								},
							}).then(res => {
								if (res.data.data == 1) {
									
									console.log(res.data.data)
									that.get();
								
									that.$refs.uToast.show({
										title: '评论成功',
										type: 'success'
									})
										that.showmodel1=false
									that.value = '';
								} else if (res.data.code == 0) {
									console.log("评论失败")
								}
							});
							
						} else {
							that.$refs.uToast.show({
								title: '内容包含敏感词汇!请检查!',
								type: 'error'
							})
							return;
						}
					});
							
				}
						
							
			}
				
			},
					
			get() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.u_id = res.data.userId;
						api.request({
							url: '/mes/findMesById/'+this.u_id,
							method: 'GET',
						/* 	data: {
								openid: this.u_id
							}, */
						}).then(res=>{
							this.mes_list = res.data
						})
			
					}
				})
			},
		}
	}
</script>

<style scoped>
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
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
		margin: 0 auto;
		padding: 90upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
	.agree{
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 20upx 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #f7f7f7;
		background-color: #fff;
	}
	.list{
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.item{
	width: 100%;
	height: auto;
	overflow: hidden;
		padding: 20upx 0;
				box-sizing: border-box;
	
	}
	.include{
		display: flex;
		justify-content: space-between;
		align-items: center;
	

	}
	.include>.avter{
		width: 47px;
		height: 47px;
	}
	.include>.center{
		margin-right: 30upx;
		margin-left: 30upx;
	}
	.include>.center>.user{
		vertical-align: middle;
	}
	.include>.center>.user >image{
		width: 24px;
		height: 19px;
		margin-left: 14upx;
		vertical-align: middle;
	}
		.include>.center>.user>text{
			vertical-align: middle;
		}
		.include>.center>text{
			display: block;
			color: rgba(166, 166, 166, 100);
			font-size: 12px;
			margin-top: 18upx;
		}
		.content{
			width: 82.5%;
			height: auto;
			overflow: hidden;
			float: right;
			margin-top: 20upx;
		}
		.content>text{
			display: block;
			color: rgba(16, 16, 16, 100);
			font-size: 13px;
		}
		.content>.reply{
			margin-top: 14upx;
		}
		.content>.reply>.btn{
			width: 80px;
			height: 27px;
			line-height: 27px;
			border-radius: 40px;
			background-color: rgba(242, 242, 242, 100);
			text-align: center;
			display: inline-block;
		}
		.content>.reply>.btn>image{
			width: 24upx;
			height: 24upx;
		}
		.content>.reply>.btn>text{
			color: rgba(16, 16, 16, 100);
			font-size: 13px;
			margin-left: 10upx;
		}
			.content>.reply>.praise-group{
			
				margin-left: 40upx;
				display: inline-block;
			}
			.content>.reply>.praise-group>image{
				width: 36upx;
				height: 36upx;
			}
		.img{
			width: 72px;
			height: 54px;
			border-radius: 6px;
		box-shadow: 0px 2px 12upx 0px rgba(79, 72, 72, 1);
		margin-right: 10upx;
		}
</style>
