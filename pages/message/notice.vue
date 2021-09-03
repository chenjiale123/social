<template>
	<view class="notice">
		
		 <view class="item">
		 	 <text>2021-3-6</text>
			 <view class="center">
			 	<view class="title">系统通知</view>
				<text>发话题获积分活动|真的假的真真正正呜呜呜发话题获积分活动|真的假的真真正正呜呜呜发话题获积分获积分活动|真的假的真真正正呜呜呜发话题获积分获积分活动|真的假的真真正正呜呜呜发话题获积分活动|真的假的真真正正呜呜呜呜呜呜呜呜呜呜呜…</text>
			   <view class="user">
			   	  <view class="left">
			   	  	<image src="../../static/pub-detail/shexiang.png" mode=""></image>
					<text>nih</text>
			   	  </view>
				  <text>查看详情</text>
			   </view>
			 </view>
		 </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	.notice{
		width: 100%;
		height: auto;
		overflow: hidden;
		padding:  30upx;
		box-sizing: border-box;
	
	}
	.item{
		margin-top: 28upx;
		text-align: center;
		margin-top: 10upx;
	}
	.item>text{
		color: rgba(102, 102, 102, 100);
		font-size: 14px;
	}
	.item>.center{
		width: 100%;
		height: auto;
		overflow: hidden;
		border-radius: 8px;
		text-align: center;
		padding:  20upx;
		box-sizing: border-box;
		box-shadow: 0px 2upx 6upx 0px rgba(79, 72, 72, .5);
	}
	.title{
		color: rgba(16, 16, 16, 100);
		font-size: 14px;
		font-weight: bold;
		text-align: left;
		
	}
	.item>.center>text{
		color: rgba(16, 16, 16, 100);
		font-size: 14px;
	}
	.user{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.user>.left{
		vertical-align: middle;
	}
	.user>.left>image{
		width: 22px;
		height: 22px;
		vertical-align: middle;
	}
	.user>.left>text{
		color: rgba(16, 16, 16, 100);
		font-size: 14px;
		margin-left: 20upx;
		vertical-align: middle;
	}
	.user>text{
		color: rgba(102, 102, 102, 100);
		font-size: 12px;
	}
	
	
	
	
	
	
</style>
