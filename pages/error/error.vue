<template>
	<view class="error">
		<image src="../../static/wifi.png" mode=""></image>
		<text>网络连接错误。请重新加载</text>
		<button type="default" @click="again">重新加载</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			again(){
				uni.navigateBack({
					
				})
			}
			
		}
	}
</script>

<style >
	page{
		width: 100%;
		height: 100%;
	}
.error{
	width: 100%;
	height: 100%;
	text-align: center;
	overflow: hidden;
}
image{
	width: 180upx;
	height: 180upx;
	margin-top: 180upx;
	display: block;
}
text{
	margin-top: 74upx;
	color: rgba(138, 138, 138, 100);
	font-size: 14px;
	display: block;
}
button{
	width: 104px;
	height: 40px;
	line-height: 20px;
	border-radius: 25px;
	background: rgba(0, 0, 0, 1);
	
	font-size: 14px;
	text-align: center;
	color: #fff;
	margin-top: 82upx;
}
</style>
