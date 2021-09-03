<template>
	<view class="wrap">
		
		<view class="allCom">
		<u-input placeholder="请输入你的看法" class="view" v-model="preview"></u-input>
	
		<view class="comment" >
			<view class="right">
				<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;">
					<u-avatar @click="userinfo(res)" :src="content.uava"></u-avatar>
					<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;">
						<view style="    display: flex;     align-items: center;">
										{{content.uname}}
							<u-icon style="margin-left: 10rpx;" v-if="content.ugender == '男'" size="30"
								name="http://mrliblog.work/boy.png"></u-icon>
							<u-icon style="margin-left: 10rpx;" v-if="content.ugender == '女'" size="30"
								name="http://mrliblog.work/girl.png"></u-icon>
						</view>
						<view style="display: flex;">
							<view>{{content.pubDate}}</view>
		
						</view>
						<!-- 定位信息 -->
					
					</view>
		
				</view>
				<!-- 文本内容 -->
				<view class="content">
					<text v-if="content.topic!==null">#{{content.topic}}</text>
					<text>{{ content.content }}</text>
				
				</view>
				<!-- 图片显示区域 -->
				
				<view class="reply-box" v-if="content.pocUrl .length != 0">
					<view v-if="content.pocUrl.length == 1"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,content.pocUrl)" v-for="(res1, index1) in content.pocUrl" :src="res1.url"
							mode="aspectFill" style="width: 100%;"></image>
					</view>
					<view v-if="content.pocUrl.length == 2 || content.pocUrl.length == 4"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,content.pocUrl)" v-for="(res1, index1) in content.pocUrl" :src="res1.url"
							mode="aspectFill" style="width:314rpx;height:334rpx;margin-bottom: 10rpx;"></image>
					</view>
					<view v-if="content.pocUrl.length == 3 || content.pocUrl.length == 6 || content.pocUrl.length == 7"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,content.pocUrl)" v-for="(res1, index1) in content.pocUrl" :src="res1.url"
							mode="aspectFill" style="width:200rpx;height:220rpx;margin-bottom: 10rpx;"></image>
					</view>
					<view v-if="content.pocUrl.length == 5 || content.pocUrl.length == 8"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,content.pocUrl)" v-for="(res1, index1) in content.pocUrl" :src="res1.url"
							mode="aspectFill" style="width:200rpx;height:220rpx;margin-bottom: 10rpx;"></image>
						<view style="width:220rpx;height:220rpx;"></view>
					</view>
					<view v-if="content.pocUrl.length == 9"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,content.pocUrl)" v-for="(res1, index1) in content.pocUrl" :src="res1.url"
							mode="aspectFill" style="margin-bottom: 10rpx;width:220rpx;height:220rpx;"></image>
					</view>
				</view>
				
				
				<!-- 最新回复 -->
		<!-- 		<view style="margin-left: 20rpx;font-size: 25rpx;color: gray;margin-bottom: 10rpx;">
		
					<view> 
						最新回复于{{res.repDate}}
					</view>
		
				</view> -->
		
		
		
			</view>
		</view>
	<!-- 	<view class="topic">
				<view class="left">
					<image src="../../static/pub-detail/topic.png" mode=""></image>
					<text>参与话题</text>
				</view>
				<view class="right">
					<input placeholder="请输入话题"  :value="value" :disabled="flag" @input="changeTopic"></input>
					
					<view class="topicList" v-if="hidden" >
						<text @click="topicValue(topic)">#{{topic}}</text>
					</view>
				</view>
			</view> -->
			<u-button type="success" size="medium" class="btn" @click="transmit">发表圈子</u-button>
		</view>
		<!-- <button type="default" class="btn" >立即转发</button> -->

	</view>
</template>

<script>
		import * as api from '@/common/api/api.js'
	export default {
		data() {
			return {
				value:'',
				topic:'',
				ossData: {
				
				},
				flag:false,
				hidden:false,
				content:{},
				id:'',
				preview:''
			}
		},
		onLoad(res) {
			this.id = res.id;
			 this.user=JSON.parse(res.user)//用户图片的id
			 console.log(this.user)
			this.getDetail(this.id)
			},
		methods: {
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
			// 查详情
			getDetail(id){
				api.request({
					url:'/circle/info/'+id,
					method:'POST'
				})
				.then(res=>{
					console.log(res)
					this.content=res.data.data
				})
			},
			// 转发
			transmit(){
			api.request({
				url: '/circle/publishCircle',
				method: 'POST',
				data: {
				
					uid: this.user.uid,
					uname: this.user.uname,
					uava: this.user.uava,
					ugender: this.user.ugender,
					content:this.preview,
					fromId:this.id,
							place: "",
							topic:null
				},
			}).then(res => {
				if (res.data.flag) {
					uni.reLaunch({
						url: '../publish/success'
					})
				} else {
					this.$refs.uToast.show({
						title: '发表失败',
						type: 'error'
					})
				}
			});
			}
			
		}
	}
</script>

<style lang="scss" >
	page{
		width: 100%;
		height: 100%;
		
	}
	
	.topic{
		width: 100%;
		height: 98upx;
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.topic>.left{
		vertical-align: middle;
	}
	.topic>.left>image{
		width: 40upx;
		height: 40upx;
			vertical-align: middle;
	}
	.topic>.left>text{
		font-size: 28upx;
		margin-left: 10upx;
		vertical-align: middle;
	}
	.topic>.right{
		position: relative;
	}
	.topic>.right>.topicList{
		z-index: 999;
		width: 100px;
		height: 100px;
		overflow: auto;
		position: absolute;
		top: 50upx;
		right: 0;
		background-color: #fff;
		border: 1px solid #eee;
		padding:  20upx;
		box-sizing: border-box;
	}
		.topic>.right>.topicList>text{
			display: block;
			width: 100%;
			
		}
	.topic>.right>input{
		width: 50%;
		height: 70%;
	
	}
	.num {
		display: inline;
	}
	.btn{
		
		width: 220upx;
		height: 60upx;
		margin: 0 auto;
		margin-top: 20upx;
		font-size: 26upx;
		text-align: center;
		line-height: 60upx;
		background: #fff;
		display: block;
	}

	.wrap {
		background: #fff;
		height: 100%;
		width: 100%;
	}
.allCom{
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding: 0 10upx;
	box-sizing: border-box;
}
.view{
	width: 100%;
	height: 200upx;
	display: block;
	padding-left: 30upx;
	box-sizing: border-box;
}
	.comment {
		margin-top: 15rpx;
		background: #ffffff;
		display: flex;
		border-radius: 20rpx;
		//padding: 30rpx;
		//margin-top: 10rpx;
		margin-bottom: 20rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		border: 1px solid #eee;
		// padding: 10upx;
		box-sizing: border-box;

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
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					position: absolute;
					left: 110rpx;

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
			//margin-bottom: 10rpx;
			margin-left: 20rpx;
			margin-top: 15rpx;
			margin-bottom: 15rpx;
			margin-right: 20rpx;
		}
		.content>text{
			display: block;
			margin-top: 10upx;
		}
		.content>text:nth-child(1){
			color: #ff5c5f;
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
				// margin-left: 10rpx;
				// display: flex;
				// font-size: 24rpx;
				// color: #9a9a9a;
				// margin-bottom: 10rpx;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}

				.weibo-handle {
					display: flex;
					//padding-top: 15rpx;
					font-size: 28rpx;
					padding-bottom: 25rpx;
				}

				.weibo-handle image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}

				.weibo-handle view {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.weibo-handle .comment-group {
					background: #ffffff;
				}

				.weibo-handle .praise-group {
					background: #ffffff;
				}

				// .weibo-handle .favor{
				// 	background: #ffffff;
				// }
			}
		}
	}
</style>

