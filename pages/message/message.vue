

<template>
	
	<view class="msg">
		<view class="notice">
			
			<view class="nitem" @click="notice">
				<image src="../../static/notice.png" mode=""></image>
				<view class="right">
					<view class="top">
						<text>官方通知</text>
						<text>2012-3-21</text>
					</view>
					<text>内容内容内容内容内容内容内容内容…</text>
				</view>
			</view>
			<view class="nitem">
				<image src="../../static/gift.png" mode=""></image>
				<view class="right">
					<view class="top">
						<text>热门活动</text>
						<text>2012-3-21</text>
					</view>
					<text>内容内容内容内容内容内容内容内容…</text>
				</view>
			</view>
		</view>
		
		
		<view class="check">
			<view class="item" @click="check">
				<view class="left">
					<image src="../../static/shenhe.png" mode=""></image>
					<text>审核提醒</text>
				</view>
				<view class="right" v-if="arr2.length>0">
					<text>{{arr2.length}}</text>
				</view>
			</view>
		</view>
		<view class="mes">
				<view class="item" @click="agree">
					<view class="left">
						<image src="../../static/exl.png" mode=""></image>
						<text>点赞</text>
					</view>
					<view class="right" v-if="arr1.length>0">
						<text>{{arr1.length}}</text>
					</view>
				</view>
				
				<view class="item" @click="collect">
					<view class="left">
						<image src="../../static/cang.png" mode=""></image>
						<text>收藏</text>
					</view>
					<view class="right" v-if="arr.length>0">
						<text>{{arr.length}}</text>
					</view>
				</view>
				
				<view class="item" @click="comment">
					<view class="left">
						<image src="../../static/lun.png" mode=""></image>
						<text>评论</text>
					</view>
					<view class="right" v-if="mes_list.length>0">
						<text>{{mes_list.length}}</text>
					</view>
				</view>
				
				
			</view>
		
	</view>
 </template>
<script>
	import * as api from '@/common/api/api.js'
	export default{
		data(){
			return{
				name:'',
				ava:'',
				u_id:'',
				arr:[],
				mes_list:[],
				arr1:[],
				arr2:[]
			}
		},
		onLoad(){
			
		
		},
		onShow() {
			this.init()
			this.get()
			console.log(this.arr.length+this.arr1.length+this.mes_list.length)
		
			
	
		},
		methods:{
			notice(){
				console.log('666')
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					uni.navigateTo({
						url:'./notice'
					})
				}
				
			},
			agree(){
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url:'./agreeList'
				})
				}
			},
			collect(){
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url:'./collect'
				})
				}
			},
			comment(){
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url:'./comment'
				})
				}
			},
			check(){
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url:'./check'
				})
				}
			},
			init(){
			var that=this
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log(res)
					this.name = res.data.nickName;
					this.ava = res.data.avatarUrl;
					this.u_id = res.data.userId;
					console.log(this.u_id)
					that.getAgreeList()
					that.getGoodList()
					that.getCheck()
					},
					fail(err) {
						console.log(err)
					
					}
					})
			},
			getAgreeList(){
				
				api.request({
					url:'/dianzan/noread/'+this.u_id,
					method:"GET"
				})
				.then(res=>{
					console.log(res)
					this.arr1=res.data.data
				})
			},
			getCheck(){
				
				api.request({
					url:'/mes/iacs/noread/'+this.u_id,
					method:"GET"
				})
				.then(res=>{
					console.log(res)
					this.arr2=res.data.data
				})
			},
			getGoodList(){
				
				api.request({
					url:'/shouCang/noread/'+this.u_id,
					method:"GET"
				})
				.then(res=>{
					console.log(res)
					this.arr=res.data.data
				})
			},
			get() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.u_id = res.data.userId;
						api.request({
							url: '/mes/noread/'+this.u_id,
							method: 'GET',
						/* 	data: {
								openid: this.u_id
							}, */
						}).then(res=>{
							console.log(res)
							this.mes_list = res.data.data
							if( this.arr.length+this.arr1.length+this.mes_list.length+this.arr2.length>0){
								wx.showTabBarRedDot({index:2})
							}else{
								
										  wx.hideTabBarRedDot({index:2})
							}
						})
			
					}
				})
			},
			
		}
	}
	
</script>

<style >
	page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.msg{
		width: 100%;
		height: 100%;
				background-color: #f7f7f7;
	}
	.notice{
		width: 100%;
		height: auto;
		overflow: hidden;
			background-color: #f7f7f7;
	}
	
		.nitem{
		padding: 20upx 30upx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		
	}
	.nitem>image{
		width: 42upx;
		height: 42upx;
	}
	.nitem>.right{
		width: 90%;
		height: 140upx;
		border-bottom: 2px solid #bbb;
		padding: 20upx 0;
		box-sizing: border-box;
	}
		.nitem>.right>.top{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.nitem>.right>.top>text:nth-child(1){
			color: rgba(0, 0, 0, 1);
			font-size: 14px;
		}
		.nitem>.right>.top>text:nth-child(2){
			color: rgba(166, 166, 166, 100);
			font-size: 10px;
		}
		.nitem>.right>text{
			display: block;
			color: rgba(166, 166, 166, 100);
			font-size: 13px;
			margin-top: 8upx;
		}
	.mes{
		width: 100%;
		height: auto;
		overflow: hidden;
			background-color: #f7f7f7;
			margin-top: 30upx;
	}
	.check{
		width: 100%;
		height: auto;
		overflow: hidden;
			background-color: rgba(249, 188, 96, 0.17);
			margin-top: 30upx;
			border: 1px solid rgba(187, 187, 187, 100);
	}
	.item{
		padding: 20upx 30upx;
		/* background-color: #fff; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		
	}
		.item>.left{
			vertical-align: middle;
		}
		.item>.left>image{
			width: 40upx;
			height: 40upx;
				vertical-align: middle;
		}
		.item>.left>text{
			margin-left: 28upx;
			font-size: 28upx;
				vertical-align: middle;
		}
			.item>.right>text{
				width: 26px;
				height: 18px;
				line-height: 20px;
				border-radius: 24px;
				background-color: rgba(247, 79, 79, 100);
				color: #fff;
				display: block;
				text-align: center;
			}
</style>
