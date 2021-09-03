<template>
	<view class="search">
		<view class="top">
			<u-search :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<view class="history">
			<view class="title">
				<text>历史记录</text>
				<image src="../../static/del.png" mode=""></image>
			</view>
			<view class="list">
				<view class="item">
					2021减肥目标
				</view>
				<view class="item">
					2021减肥目标
				</view>
				<view class="item">
					2021减肥目标
				</view>
				<view class="item">
					2021减肥目标
				</view>
			</view>
		</view>
	
	     <view class="sort">
			 <text>探索发现</text>
	     	 <view class="sortlist">
	     	 	<view class="item">
	     	 		搜索预设搜索
	     	 	</view>
	     	 </view>
	     </view>
	</view>
</template>

<script>
	export default{
		data(){
			
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background: #f7f7f7;
	}
	.top{
		width: 100%;
		height: 100upx;
		border-bottom: 2upx solid #bbb;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.history{
			width: 100%;
			height: auto;
			overflow: hidden;
			padding: 0 30upx;
			box-sizing: border-box;
			background: #fff;
	}
	.history>.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 18upx;
	}
	.history>.title>text{
		color: rgba(16, 16, 16, 100);
		font-size: 16px;
	}
	.history>.title>image{
		width: 17px;
		height: 17px;
	}
	.list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 22upx;
		flex-wrap: wrap;
	}
	.list>.item{
		color: rgba(16, 16, 16, 100);
		font-size: 12px;
		border-radius: 27px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 100);
		padding: 10upx 20upx;
		margin-top: 14upx;
		
	}
	.sort{
		margin-top:20upx ;
		padding:30upx  ;
		box-sizing: border-box;
		background: #fff;
	}
	.sort>text{
		display: block;
		color: rgba(16, 16, 16, 100);
		font-size: 16px;
		margin-bottom: 40upx;
	}
	.sortlist{
		display: flex;
		justify-content: space-between;
		 align-items: center;
		 flex-wrap: wrap;
	}
	.sortlist>.item{
		width: 50%;
		color: rgba(16, 16, 16, 100);
		font-size: 13px;
		margin-top: 20upx;
	}
</style>
