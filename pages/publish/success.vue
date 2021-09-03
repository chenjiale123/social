<template>
	<view>
	<view style="text-align: center;margin-top: 200rpx;">
		<image src="../../static/success.png" mode="aspectFit" style="width: 250rpx;height: 250rpx;"></image>
	</view>
	<view style="text-align: center;margin-top: 50rpx;">
		<!-- <text v-if="state==1">------------发表成功------------</text> -->
		<text >--发表成功,内容正在审核中，请耐心等待--</text>
	</view>
	<view style="text-align: center;margin-top: 100rpx;">
		<u-button type="success" shape="circle" size="medium" @click="shouye">返回首页</u-button>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				state:0
			}
		},
		onLoad(options) {
			console.log(options)
			if(options.state==1){
				this.state=1
			}else{
				this.state=0
			}
		},
		methods:{
			shouye(){
				uni.switchTab({
					url:'../quanzi/quanzi'
				})
			}
		}
	}
</script>

<style>
</style>
