<template>
	<view class="topic">
		
		<view class="topTitle">
			
	
		<view class="title">
			<image src="../../static/topic2.png" mode="aspectFit"></image>
			<text>{{name}}</text>
			
			
		</view>
		
		<view class="num">
			<view class="rightup">
			<!-- 	<image src="../../static/cang.png" mode="aspectFit"></image>
				<image src="../../static/lun.png" mode="aspectFit"></image>
				<image src="../../static/xiang.png" mode="aspectFit"></image> -->
				<image src="../../static/userList.png" mode=""></image>
			</view>	
			<text>等520人参与·1025次浏览</text>
		</view>
			</view>
<!-- 		<view class="topicList">
			<view class="item" v-for="(item,index) in topicList" :key="index" @click="toDetail(item.id)">
					<image :src="item.pocUrl[0].url" mode="widthFix"></image>
				<text>{{item.content}}</text>
				<view class="bottom">
					<view class="left">
						<image :src="item.uava" mode="aspectFit"></image>
						<text>{{item.uname}}</text>
					</view>
					<view class="right">
						<image src="../../static/goods.png" mode="aspectFit"></image>
						<text>{{item.likeNum}}</text>
					</view>
				</view>
			</view>
		</view>
		
 -->	
 	<u-waterfall v-model="topicList" ref="uWaterfall">
 			<template v-slot:left="{leftList}">
				<view class="item" v-for="(item,index) in leftList" :key="index" @click="toDetail(item.id)">
					<image v-if="item.type==1" :src="item.pocUrl[0].url" mode="widthFix"></image>
					
					<view class="videoImg" v-if="item.type==2" >
						<image  :src="item.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFill"
							 class="img"></image>
							<image src="../../static/bofang.png" mode="" class="play"></image>
					</view>
					<text>{{item.content}}</text>
					<view class="bottom">
						<view class="left">
							<image :src="item.uava" mode="aspectFit"></image>
							<text>{{item.uname}}</text>
						</view>
						<view class="right">
							<image src="../../static/goods.png" mode="aspectFit"></image>
							<text>{{item.likeNum}}</text>
						</view>
					</view>
				</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="item" v-for="(item,index) in rightList" :key="index" @click="toDetail(item.id)">
							<image v-if="item.type==1" :src="item.pocUrl[0].url" mode="widthFix"></image>
							
							<view class="videoImg" v-if="item.type==2" >
								<image  :src="item.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFill"
									 class="img"></image>
									<image src="../../static/bofang.png" mode="" class="play"></image>
							</view>
						<text>{{item.content}}</text>
						<view class="bottom">
							<view class="left">
								<image :src="item.uava" mode="aspectFit"></image>
								<text>{{item.uname}}</text>
							</view>
							<view class="right">
								<image src="../../static/goods.png" mode="aspectFit"></image>
								<text>{{item.likeNum}}</text>
							</view>
						</view>
					</view>
					</template>
			</u-waterfall>
				
 
 </view>
</template>

<script>
	import * as api from '@/common/api/api.js'
	export default {
		data() {
			return {
				name: '',
				topicList: [],
				id:''
			}
		},
		onLoad(res) {
			this.name = res.name
			this.id=res.id
			this.getTopic(this.id)
			  
		},
		methods: {
			toDetail(id){
				uni.navigateTo({
					url:'../quanzi/comment?id='+id
				})
			},

			getTopic(id) {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						that.u_id = res.data.userId;
						api.request({
								url: '/circle/topic',
								method: 'POST',
								data: {
									topicId: id,
									page: 1,
									limit: 20,
									userId: that.u_id
								}

							})
							.then(res => {
								console.log(res)
								this.topicList = res.data.data.records
								// var arr=[]
								// 	for(let i = 0; i < res.data.data.records.length; i++) {
								// 					let index = this.$u.random(0,res.data.data.records.length - 1);
								// 					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
								// 					let item = JSON.parse(JSON.stringify(res.data.data.records[index]))
								// 					item.idx = this.$u.guid();
								// 					arr.push(item);
								// 				}
								// 			this.topicList=arr
								// 			console.log(this.topicList)
							})

					},
					fail: (res) => {

						/* 	uni.showToast({
								title: '您尚未登录'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '../login/login'
								})
							}, 1500) */
					}
				})

			}
		
		}
	}
</script>

<style scoped>
	.topic {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.topTitle{
			width: 94%;
		padding: 20upx 0;
		height: auto;
		overflow: hidden;
				margin: 0 auto;
		box-sizing: border-box;

		border-bottom: 2px solid #eee;
	}

	.title {
	
	

	
		vertical-align: middle;

	}
	.num{
		width: 100%;
				vertical-align: middle;
				margin-top: 18upx;
	}
	.num>.rightup{
		display: inline-block;
			vertical-align: middle;
	}
	.num>.rightup>image{
		width: 160upx;
		height: 40upx;
	}
	.num>text{
		color: rgba(138, 138, 138, 100);
		font-size: 10px;
		margin-left: 20upx;
			vertical-align: middle;
	}

	.title>image {
		width: 42upx;
		height: 42upx;
		margin-right: 20upx;
		vertical-align: middle;
	}

	.title>text {
		vertical-align: middle;
	}


	.item {
	/* 	width: 48%;
		height: 600upx;
		box-shadow: 0px 2px 6upx 0upx rgba(79, 72, 72, 0.5);
		border-radius: 6px;
		margin-top: 30upx; */
		height: auto;
			border-radius: 6px;
				margin: 5px;
				background-color: #ffffff;
				padding: 8px;
				position: relative;
				box-shadow: 0px 2px 6upx 0upx rgba(79, 72, 72, 0.5);
	}

	.item>image {
		width: 100%;
	  
		border-radius: 8px 8px 0px 0px;
	}
	.item>.videoImg {
		width: 100%;
	    height: 400upx;
		border-radius: 8px 8px 0px 0px;
		position: relative;
	}
	 .videoImg>.img{
		width: 100%;
		height: 100%;
	}
	 .videoImg>.play{
		position: absolute;
			width: 80upx;
			height: 80upx;
		left: 50%;
		top: 50%;
		margin-left: -40upx;
		margin-top: -40upx;
	}

	.item>text {
		display: block;
		padding: 0 10upx;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.bottom {
		width: 100%;
		padding: 0 10upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10upx;

	}

	.bottom>.left {
		vertical-align: middle;
	}

	.bottom>.left>image {
		width: 48upx;
		height: 48upx;
		border-radius: 50%;
		vertical-align: middle;
	}

	.bottom>.left>text {
		vertical-align: middle;
		font-size: 26upx;
	}

	.bottom>.right {
		vertical-align: middle;
	}

	.bottom>.right>image {
		width: 28upx;
		height: 28upx;

		vertical-align: middle;
	}

	.bottom>.right>text {
		font-size: 24upx;
	}
</style>
