<template>
	<view class="agree">
		<view class="item" v-for="(item,index) in arr " :key="index">
			<image :src="item.avatar" mode="aspectFill" class="avter"></image>
			<view class="center">
				<view class="user">
					<text>{{item.nickname}}</text>
					<!-- <image src="../../static/lv1.png" mode="aspectFill"></image> -->
					<text style="color: rgba(232, 163, 50, 100);
					font-size: 12px;margin-left: 10upx;">Lv.1</text>
				</view>
				<text>点赞了你的笔记   {{item.timestamp}}</text>
			</view>
			<image v-if="item.circleVo==null" src="../../static/null.png" mode="aspectFill" class="img" ></image>
			<image v-if="item.circleVo!==null&&item.circleVo.type==1" :src="item.circleVo.pocUrl[0].url" mode="aspectFill" class="img" @click="detail(item)"></image>
			<image v-if="item.circleVo!==null&&item.circleVo.type==2" :src="item.circleVo.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit" class="img" @click="detail(item)"></image>
			
		</view>
	
		<view class="item" v-for="(item,index1) in arr1 " :key="index1">
			<image :src="item.avatar" mode="aspectFill" class="avter"></image>
			<view class="center">
				<view class="user">
					<text>{{item.nickname}}</text>
					<!-- <image src="../../static/lv1.png" mode="aspectFill"></image> -->
					<text style="color: rgba(232, 163, 50, 100);
					font-size: 12px;margin-left: 10upx;">Lv.1</text>
				</view>
				<text>点赞了你的评论   {{item.timestamp}}</text>
			</view>
			
			<image v-if="item.circleVo==null" src="../../static/null.png" mode="aspectFill" class="img" ></image>
	<image v-if="item.circleVo!==null&&item.circleVo.type==1" :src="item.circleVo.pocUrl[0].url" mode="aspectFill" class="img" @click="detail(item)"></image>
	<image v-if="item.circleVo!==null&&item.circleVo.type==2" :src="item.circleVo.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit" class="img" @click="detail(item)"></image>
	
		</view>
		
		
		<view class="item" v-for="(item,index) in arr2 " :key="index">
			<image :src="item.avatar" mode="aspectFill" class="avter"></image>
			<view class="center">
				
				<view class="user">
					<text>{{item.nickname}}</text>
					<!-- <image src="../../static/lv1.png" mode="aspectFill"></image> -->
					<text style="color: rgba(232, 163, 50, 100);
					font-size: 12px;margin-left: 10upx;">Lv.1</text>
				</view>
				<text>点赞了你的回复   {{item.timestamp}}</text>
			</view>
		<image v-if="item.circleVo==null" src="../../static/null.png" mode="aspectFill" class="img" ></image>
	<image v-if="item.circleVo!==null&&item.circleVo.type==1" :src="item.circleVo.pocUrl[0].url" mode="aspectFill" class="img" @click="detail(item)"></image>
	<image v-if="item.circleVo!==null&&item.circleVo.type==2" :src="item.circleVo.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit" class="img" @click="detail(item)"></image>
	
		</view>
	</view>
</template>

<script>
		import * as api from '@/common/api/api.js'
	export default{
		data(){
			return{
				arr:[],
				arr1:[],
				arr2:[]
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			detail(res){
			console.log(res)
				uni.navigateTo({
					url: '../quanzi/comment?id=' + res.circleVo.id + '&name=' + res.nickname
				})
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
				
					that.getGoodList(res.data.userId)
					},
					})
			},
		
			getGoodList(){
				
				api.request({
					url:'/dianzan/list/'+this.u_id,
					method:"GET"
				})
				.then(res=>{
					console.log(res)
					this.arr=res.data.data.circleVos
					this.arr1=res.data.data.replyVos
					this.arr2=res.data.data.replysVos
					console.log(this.arr,this.arr1,this.arr2)
					
				})
			},
			
		}
	}
</script>

<style scoped>
	.agree{
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 20upx 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #f7f7f7;
		background-color: #fff;
	}
	.item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 36upx 0;
		box-sizing: border-box;
	}
	.item>.avter{
		width: 47px;
		height: 47px;
	}
	.item>.center{
		margin-right: 30upx;
		margin-left: 14upx;
	}
	.item>.center>.user{
		vertical-align: middle;
	}
	.item>.center>.user >image{
		width: 24px;
		height: 19px;
		margin-left: 14upx;
		vertical-align: middle;
	}
		.item>.center>.user>text{
			vertical-align: middle;
		}
		.item>.center>text{
			display: block;
			color: rgba(166, 166, 166, 100);
			font-size: 12px;
			margin-top: 18upx;
		}
		.img{
			width: 72px;
			height: 54px;
			border-radius: 6px;
	box-shadow: 0px 2px 12upx 0px rgba(79, 72, 72, 1);
	margin-right: 10upx;
		}
</style>
