<!-- /* <style lang="scss">
	@import "uview-ui/index.scss";
</style> */ -->
<script>
	export default {
		 globalData:{
		   SessionKey:""
		  },
		  data(){
		  time:0
		  },
		onShow: function() {
			console.log('App Show')
			var that=this
		
			// var t=24;
			// var seconds = parseInt(t * 3600);
			
			var data=new Date()
			console.log(data.getHours())
			if(data.getHours()==23 && data.getSeconds()==59){
				uni.setStorage({
					key: "timerPageA",
					data: 0
				})
			}else{
				uni.getStorage({
						key: "timerPageA",
						success:(res)=>{
							console.log(res)
							if(res.data>0){
								 
									uni.setStorage({
										key: "timerPageA",
										data: res.data
									})
							}
						}
					})
			}
	
			
		
			// if (seconds > 0) {
			// var timestamp = Date.parse(new Date());
			// timestamp = timestamp / 1000 + seconds;
			// console.log(timestamp)
			// 	uni.setStorage({
			// 		key: "timerPageA",
			// 		data: 0
			// 	})
			// } else {
			// uni.removeStorage({
			//     key: "timerPageA",
			 
			// })
			// }
		
		},
		onLaunch() {
			    		console.log('App Launch');
						
						
						   uni.onNetworkStatusChange((res) => {
						    	//取反满足条件,跳转已经写好的网络异常页面
						        if(!res.isConnected){
						            uni.navigateTo({
						              url: '/pages/error/error',
						            })
						        }else{
									const updateManager = uni.getUpdateManager();
									
									// 检查小程序是否有新版本发布
									updateManager.onCheckForUpdate(function (res) {
									  // 请求完新版本信息的回调
									  console.log(res.hasUpdate);
									});
									
									// 小程序有新版本，则静默下载新版本，做好更新准备
									updateManager.onUpdateReady(function (res) {
										
									  uni.showModal({
									    title: '更新提示',
									    content: '新版本已经准备好，点击确定重新启动',
										showCancel:false,
									    success(res) {
									      if (res.confirm) {
									        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									        updateManager.applyUpdate();
									      }
									    }
									  });
									
									});
									
									updateManager.onUpdateFailed(function (res) {
									  
									  // 新的版本下载失败
									  uni.showModal({
									    title: '已经有新版本了哟~',
									    content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
									  });
									  
									});
								}
						    })
			
			    		
			    	
	
		},
		onHide: function() {
			console.log('App Hide')
			// uni.clearStorage()
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/* 阿里云自定义图标库 */
	// @import "common/aliicon.css";
	button{
		border: none;
	}
	button::after {
	  border:none!important;
	}
</style>
