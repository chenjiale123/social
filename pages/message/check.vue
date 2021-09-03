<template>
	<view class="agree">
		<view class="item" v-for="(item,index) in arr " :key="index">
			<image :src="item.uava" mode="aspectFill" class="avter"></image>
			<view class="center">
				<view class="user">
					<text>{{item.name}}</text>
			<text style="color: rgba(232, 163, 50, 100);
			font-size: 12px;margin-left: 10upx;">Lv.1</text>
				</view>
				<text>收藏了你的笔记   {{item.date}}</text>
			</view>
			<view class="imglist">
				<image v-if="item.circleVo==null" src="../../static/null.png" mode="aspectFill" class="img" ></image>
				<image v-if="item.circleVo!==null&&item.circleVo.type==1" :src="item.circleVo.pocUrl[0].url" mode="aspectFill" class="img" @click="detail(item)"></image>
				<image v-if="item.circleVo!==null&&item.circleVo.type==2" :src="item.circleVo.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit" class="img" @click="detail(item)"></image>
				<view class="zhezao">
					<image src="../../static/butongguo.png" mode=""></image>
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
				arr:[]
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
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
					url:'/mes/iacs/mesList/'+this.u_id,
					method:"GET"
				})
				.then(res=>{
					console.log(res)
					this.arr=res.data.data
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
		.imglist{
			width: 72px;
			height: 54px;
			border-radius: 6px;
			box-shadow: 0px 2px 12upx 0px rgba(79, 72, 72, 1);
			margin-right: 10upx;
			position: relative;
		}
		.img{
			width: 100%;
			height: 100%;
		}
		.zhezao{
			position: absolute;
			width: 100%;    
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.2);
		}
		.zhezao>image{
			width: 100%;
			height: 100%;
		}
		
</style>
