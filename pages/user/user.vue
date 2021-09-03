<template>
	<view class="user">
		<!-- 	<view class="header" v-bind:class="{'status':isH5Plus}">
			<u-toast ref="uToast" />
			<view class="userinfo">
				<view class="face" @click="modify">
					<image :src="userinfo.ava"></image>
				</view>
				<view class="info">
					<view class="username">{{userinfo.username}}
						<u-icon v-if="userinfo.gender == '男'" size="40" name="../../../static/boy.png"></u-icon>
						<u-icon v-if="userinfo.gender == '女'" size="40" name="../../../static/girl.png"></u-icon>
					</view>
					<view class="integral">积分:{{userinfo.integral}}</view>
				</view>
			</view>
			<view class="setting">
				<u-button v-if="userinfo.status == 0" type="success" shape="circle" size="mini" @click="qiandao">签到</u-button>
				<u-button v-if="userinfo.status == 1" type="primary" disabled="true" shape="circle" size="mini">已签到</u-button>
			</view>

			<view class="fans">
				<view class="fan" @click="fans(0)">
					粉丝：{{userinfo.fans}}
				</view>
				<view class="fan" @click="fans(1)">
					关注：{{userinfo.follow}}
				</view>
			</view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" hover-class="hover" @click="quanzi(openid)">
					<view class="icon">
						<image src="../../static/xiaoyuan1.png"></image>
					</view>
					我的圈子
				</view>
		

				<view class="label" hover-class="hover" @click="info(openid)">
					<view class="icon">
						<image src="../../static/my2.png"></image>
					</view>
					个人主页
				</view>
			</view>
		</view>


		<view class="list">
			<view class="li" hover-class="hover" @click="modify">
				<view class="icon">
					<image src="../../static/ziliao.png"></image>
				</view>
				<view class="text">个人资料</view>
				
			</view>

			<view class="li" hover-class="hover" @click="good">
				<view class="icon">
					<image src="../../static/dianzan.png"></image>
				</view>
				<view class="text">我的收藏</view>
				
			</view>
			<view class="li" hover-class="hover" @click="about">
				<view class="icon">
					<image src="../../static/guanyu.png"></image>
				</view>
				<view class="text">关于我们</view>
			</view>
			
			<view class="li" hover-class="hover" @click="logout">
				<view class="icon">
			
				</view>
				<view class="text">退出登录</view>
				
			</view>
			
		
		</view>
	
	 -->

		<view class="intro">
			<view class="top">

				<view class="left" @click="userlogin">
					<image :src="userinfo.ava" mode="aspectFit"></image>
					<view class="center">
						<text>{{userinfo.username }}</text>
						<view class="num">
							Lv.1
						</view>
						<view class="sign">
							<image src="../../static/sign.png" mode="aspectFit"></image>
							<text>双鱼座</text>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="edit" @click="modify">
						<text>编辑资料</text>
						<image src="../../static/edit.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<text v-if="userinfo.introduce==null">去编辑资料完善个人简介吧</text>
						<text v-else>{{userinfo.introduce}}</text>
			
			<view class="datum">
				<view class="left">
					<view class="item" @click="agree">
						<text>{{userinfo.likes}}</text>
						<text>被点赞</text>
					</view>
					<view class="item" @click="collect">
						<text>{{userinfo.collects}}</text>
						<text>被收藏</text>
					</view>
					<view class="item" @click="comment">
						<text>{{userinfo.replies}}</text>
						<text>被评论</text>
					</view>
				</view>
				<view class="right" @click="integral">
					<text>{{userinfo.integral}}</text>
					<text>积分</text>
				</view>

			</view>
		</view>


		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bold="true" bg-color="transparent"
			active-color="#fff" inactive-color="#fff"></u-tabs>

		<view class="dayli" v-if="current==0">
			<text>我的日常</text>
			<view v-if="commentList.length==0">
				<image src="../../static/file.png" mode="aspectFit"></image>
				<text>发布笔记，记录生活</text>
				<button type="default" @click="sub">去发布</button>
			</view>

			<view class="dalayList" v-if="commentList.length!==0">
				<view class="topicList">
				<u-waterfall v-model="commentList" ref="uWaterfall">
						<template v-slot:left="{leftList}">
						<view class="item" v-for="(item,index) in leftList" :key="index" @click="toDetail(item.id)">
							<image v-if="item.type==1" :src="item.pocUrl[0].url" mode="widthFix"></image>
							<view class="videoImg" v-if="item.type==2" >
								<image  :src="item.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit"
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
								<image  v-if="item.type==1" :src="item.pocUrl[0].url" mode="widthFix"></image>
								<view class="videoImg" v-if="item.type==2" >
									<image  :src="item.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit"
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
			</view>
			
			
		
			
			
			
			
		</view>

	<view class="dayli" v-if="current==1">
			<text>当前情况</text>
			<view >
				<image src="../../static/file.png" mode="aspectFit"></image>
				<text>您暂未授权获取您的步数信息无法查看步数分析情况</text>
				<button type="default" @click="sub">暂未开通</button>
			</view>
			</view>
		<view class="good" v-if="current==2">
			<view class="tab">
				<view v-for="(item, index) in navList" :key="index" class="nav-item"
					:class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
					{{ item.text }}
				</view>

			</view>


			<view class="list" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">

				<view class="topicList1">
			
					
					
					<u-waterfall v-model="navList[index].commentList" ref="uWaterfall">
							<template v-slot:left="{leftList}">
					
							
							<view class="item" v-for="(item1,index1) in leftList" :key="index1"
									>
					<image v-if="item1.circleVo==null" src="../../static/null.png" mode="widthFix" class="img" ></image>
					<image v-if="item1.circleVo!==null&&item1.circleVo.type==1" :src="item1.circleVo.pocUrl[0].url" mode="aspectFill" class="img" 	@click="toDetail(item1.circleVo.id)"></image>
					<image v-if="item1.circleVo!==null&&item1.circleVo.type==2" :src="item1.circleVo.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit" class="img" 	@click="toDetail(item1.circleVo.id)"></image>
							<text v-if="item1.circleVo!==null">{{item1.circleVo.content}}</text>
									<view class="bottom" v-if="item1.circleVo==null">
										<view class="left">
											<image :src="item1.avatar" mode="aspectFit"></image>
											<text>{{item1.nickname}}</text>
										</view>
										<view class="right">
											<image src="../../static/goods.png" mode="aspectFit"></image>
											<text>{{item1.likeNum}}</text>
										</view>
									</view>
									<view class="bottom" v-if="item1.circleVo!==null" @click="toDetail(item1.circleVo.id)">
										<view class="left">
											<image :src="item1.circleVo.uava" mode="aspectFit"></image>
											<text>{{item1.circleVo.uname}}</text>
										</view>
										<view class="right">
											<image src="../../static/goods.png" mode="aspectFit"></image>
											<text>{{item1.circleVo.likeNum | million}}</text>
										</view>
									</view>
								</view>
								</template>
								<template v-slot:right="{rightList}">
					
								<view class="item" v-for="(item1,index1) in rightList" :key="index1"
										>
									
									<image v-if="item1.circleVo==null" src="../../static/null.png" mode="widthFix" class="img" ></image>
							<image v-if="item1.circleVo!==null&&item1.circleVo.type==1" :src="item1.circleVo.pocUrl[0].url" mode="aspectFill" class="img" 	@click="toDetail(item1.circleVo.id)"></image>
							<image v-if="item1.circleVo!==null&&item1.circleVo.type==2" :src="item1.circleVo.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit" class="img" 	@click="toDetail(item1.circleVo.id)"></image>
											<text v-if="item1.circleVo!==null">{{item1.circleVo.content}}</text>
										<view class="bottom" v-if="item1.circleVo==null">
											<view class="left">
												<image :src="item1.avatar" mode="aspectFit"></image>
												<text>{{item1.nickname}}</text>
											</view>
											<view class="right">
												<image src="../../static/goods.png" mode="aspectFit"></image>
												<text>{{item1.likeNum}}</text>
											</view>
										</view>
										<view class="bottom" v-if="item1.circleVo!==null" @click="toDetail(item1.circleVo.id)">
											<view class="left">
												<image :src="item1.circleVo.uava" mode="aspectFit"></image>
												<text>{{item1.circleVo.uname}}</text>
											</view>
											<view class="right">
												<image src="../../static/goods.png" mode="aspectFit"></image>
												<text>{{item1.circleVo.likeNum}}</text>
											</view>
										</view>
									</view>
									</template>
							</u-waterfall>
				</view>
			</view>



		</view>
	<view class="dayli1" v-if="current==3">
		<view class="imgList">
		<view class="mitem" v-for="(item1,index) in commentList" :key="index">
					<image :src="item1.pocUrl[0].url" mode="aspectFill"></image>
			</view>
		</view>
	</view>
	</view>
</template>
<script>
	import * as api from '@/common/api/api.js'
	export default {
		data() {
			return {
				mes_list:[],
				navList: [{
						state: 0,
						text: '我的赞',
						commentList: []
					},
					{
						state: 1,
						text: '我的收藏',
						commentList: []
					},
				],
				openid: '',
				inverted: true,
				ava: null,
				username: null,
				gender: null,
				userinfo: {
					username: '暂未登录',
					ava: '../../static/imgs/author-icon.jpg',
					gender: '',
					integral: 0,
					fans: '',
					follow: '',
					status: '',
					likes:0,
					collects:0,
					replies:0
				},
				list: [{
					name: '日常'
				}, {
					name: '步数'
				}, {
					name: '赞/收藏',

				}, {
					name: '个性海报',

				}],
				current: 0,
				commentList: [],
				topiccount: '',
				Page: 1,
				tabCurrentIndex:0,
				u_id:'',
				arr3:[]
			};
		},
		filters:{
			 million(value){//过万处理
			  let num;
			 if(value > 9999){//大于9999显示x.xx万
			    num=(Math.floor(value/1000)/10) + 'W';
			 }else if( value < 9999 && value>-9999){
			   num=value
			 }else if(value<-9999){//小于-9999显示-x.xx万
			    num = -(Math.floor(Math.abs(value)/1000)/10)+'W'
			 }
			 return num;
			}
		},
		onLoad() {
			//加载
		this.initagree()
			this.init();
			//this.login();
		},
		onShow() {
		
		
			this.initagree()
				this.init();
		
		},
		methods: {
			userlogin(){
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					
					}
			},
				integral(){
					if(this.u_id==""){
						uni.navigateTo({
							url:'../login/login'
						})
					}else{
					uni.showModal({
						title:"积分系统",
						content:"积分系统暂未开通，感谢关注"
					})
					}
				},
			sub(){
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.reLaunch({
					url:'../publish/quanzi'
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
					url:'../message/agreeList'
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
					url:'../message/collect'
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
					url:'../message/comment'
				})
				}
			},

		
			toDetail(id){
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				console.log(id)
				uni.navigateTo({
					url:'../quanzi/comment?id='+id
				})
				}
			},
	tabClick(index) {
			this.tabCurrentIndex = index;
		},
		

			getGoodList() {

				api.request({
						url: '/shouCang/ilike/' + this.u_id,
						method: "GET"
					})
					.then(res => {
						console.log(res)
						this.navList[1].commentList = res.data.data
						console.log(this.navList[1].commentList)
					})
			},
			initagree() {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						console.log(res)
						this.name = res.data.nickName;
						this.ava = res.data.avatarUrl;
						this.u_id = res.data.userId;
						console.log(this.u_id)

						that.getGoodList1()
							that.getGoodList()
							that.getCheck()
					},
				})
			},

			getGoodList1() {

				api.request({
						url: '/dianzan/ilike/' + this.u_id,
						method: "GET"
					})
					.then(res => {
						console.log(res)
						this.navList[0].commentList = res.data.data
						console.log(this.navList[0].commentList)
					})
			},
		getCheck(){
				var that=this
				api.request({
					url:'/mes/iacs/noread/'+this.u_id,
					method:"GET"
				})
				.then(res=>{
					console.log(res,'99999999999999')
					this.arr3=res.data.data
					
					
					if (that.arr3.length > 0) {
						wx.showTabBarRedDot({
							index: 2
						})
					} else {
						wx.hideTabBarRedDot({
							index: 2
						})
					}
				})
			},
		
			change(index) {
				this.current = index;
			},
			about() {
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url: 'about'
				})
				}
			},
			//签到
		
			fans(res) {
				uni.navigateTo({
					url: 'fans?current=' + res
				})
			},

			modify() {
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url: 'modify/modify'
				})
				}
			},
			good() {
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url: '../good/mine'
				})
				}
			},
			//信息初始化
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
					this.u_id = res.data.userId;
						api.request({
							url: '/userInfo/findUserInfoById',
							method: 'GET',
							data: {
								userId: this.u_id,
							},
						}).then(res => {
							this.userinfo.username = res.data.data.nickName
							this.userinfo.ava = res.data.data.avatarUrl;
							this.userinfo.gender = res.data.data.gender;
							this.userinfo.integral = res.data.data.integral;
							this.userinfo.fans = res.data.data.fans;
							this.userinfo.follow = res.data.data.follow;
							this.userinfo.status = res.data.data.status;
							this.userinfo.likes = res.data.data.likes;
							this.userinfo.collects = res.data.data.collects;
								this.userinfo.replies = res.data.data.replies;
									this.userinfo.introduce = res.data.data.introduce;
							// console.log(res.data[0].nickName)
						})
						
						api.request({
							url: '/circle/getCircleByUserId',
							method: 'GET',
							data: {
								userId: this.u_id,
						
							},
						}).then(res => {
							this.commentList = res.data.data;
							
											
							this.topiccount = res.data.total;
							uni.hideNavigationBarLoading();
							uni.stopPullDownRefresh();
						
						})
					},
					fail(err) {
						console.log(err)
				
					}
				})
			},
			quanzi(res) {
				if(this.u_id==""){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				uni.navigateTo({
					url: '../quanzi/mine?id=' + res
				})
				}
			},
			yuepai(res) {
				uni.navigateTo({
					url: '../yuepai/mine?id=' + res
				})
			},
			zuopin(res) {
				uni.navigateTo({
					url: '../zuopin/mine?id=' + res
				})
			},
			info(res) {
				uni.navigateTo({
					url: 'userinfo/userinfo?uid=' + res
				})
			},
			modify() {
				uni.navigateTo({
					url: 'modify/modify'
				})
			},

			logout() {
				uni.removeStorage({
					key: 'token',

				})
				uni.removeStorage({
					key: 'userInfo',
					success: (res) => {
						uni.reLaunch({
							 
						})
					},
					fail: (res) => {
						uni.reLaunch({
							url: '../login/login'
						})
					}
				})
			},
			login() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						//console.log(res.data);
						that.userinfo.username = res.data.username;
						that.userinfo.ava = res.data.avatarUrl;
						that.userinfo.gender = res.data.gender;
					},
					fail: function() {
						uni.navigateTo({
							url: 'login'
						})
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
			height: 100%;
		// overflow: hidden;
	}

	.user {
		width: 100%;
		
		overflow: hidden;
		background: url(../../static/wode.png);
		// overflow: hidden;
		background-size: 100% 100%;
		min-height: 100%;
	}

	.intro {
		width: 94%;
		height: 196px;
		line-height: 20px;
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.5);
		margin: 30upx auto;
		padding: 26upx;
		box-sizing: border-box;

	}

	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top>.left {
		width: 55%;
		height: auto;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top>.left>image {
		width: 96upx;
		height: 96upx;
	}

	.top>.left>.center {
		margin-left: 18upx;
	}

	.top>.left>.center>text {
		display: block;
		color: rgba(255, 255, 255, 100);
		font-size: 14px;
	}

	.top>.left>.center>.num {
		display: inline-block;
		width: 32px;
		height: 16px;

		border-radius: 16px;
		background-color: rgba(51, 51, 51, 100);
		text-align: center;
		color: rgba(232, 163, 50, 100);
		font-size: 10px;
		line-height: 16px;
	}

	.top>.left>.center>.sign {
		display: inline-block;
		width: 64px;
		height: 16px;
		line-height: 14px;
		border-radius: 16px;
		background-color: rgba(51, 51, 51, 100);
		text-align: center;
		vertical-align: middle;
		margin-left: 20upx;
		

	}

	.top>.left>.center>.sign>image {
		width: 20upx;
		height: 20upx;
		vertical-align: middle;
		margin-left: 6upx;
	}

	.top>.left>.center>.sign>text {
		color: rgba(255, 255, 255, 100);
		font-size: 12px;
		vertical-align: middle;
	}

	.top>.right>.edit {
		width: 74px;
		height: 20px;
		line-height: 20px;
		border-radius: 16px;
		background-color: rgba(255, 255, 255, 0.35);
		vertical-align: middle;
		text-align: center;

	}

	.top>.right>.edit>image {
		width: 26upx;
		height: 26upx;
		vertical-align: middle;
	}

	.top>.right>.edit>text {
		color: rgba(255, 255, 255, 100);
		font-size: 10px;
		vertical-align: middle;
	}

	.intro>text {
		display: block;
		margin-top: 40upx;
		color: rgba(255, 255, 255, 100);
		font-size: 10px;
	}

	.datum {
		display: flex;
		margin-top: 66upx;
		justify-content: space-between;
		align-items: center;
	}

	.datum>.left {
		width: 55%;
		height: auto;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.datum>.left>.item {
		text-align: center;
		width: 33%;
	}

	.datum>.left>.item>text {
		display: block;
		text-align: center;
		margin: 0 auto;
		margin-top: 8upx;
		color: #fff;
	}
	.datum>.right{
		margin-right: 20upx;
	}

	.datum>.right>text {
		display: block;
		text-align: center;
		margin: 0 auto;
		margin-top: 8upx;
		color: #fff;
	}
	 

	.dayli {
		width: 94%;
		// height: 196px;
		line-height: 20px;
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.5);
		margin: 30upx auto;
		padding: 26upx;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
	}
	.dayli1 {
		width: 94%;
		// height: 196px;
		line-height: 20px;
		border-radius: 20px;
		// background-color: rgba(255, 255, 255, 0.5);
		margin: 30upx auto;
		padding: 26upx;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
	}
	

	.dayli>text {
		display: block;
		color: #fff;
	}

	.dayli>view {
		text-align: center;
	}

	.dayli>view>image {
		width: 78upx;
		height: 78upx;
		display: block;
		margin: 30upx auto;
	}

	.dayli>view>text {
		color: rgba(255, 255, 255, 100);
		font-size: 12px;
	}

	.dayli>view>button {
		width: 99px;
		height: 32px;
		line-height: 32px;
		border-radius: 25px;
		font-size: 26upx;
		color: #fff;
		margin: 20upx auto;
		background: #000;
	}
	.imgList{
		width: 100%;
		height: auto;
		overflow: hidden;
		display: flex;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
	}
	.imgList>.mitem{
		width: 32%;
		height: 172px;
		border-radius: 10px;
		background: #fff;
		padding: 10upx;
		box-sizing: border-box;
		margin-top: 30upx; 
		margin-left: 20upx;
	}
	.imgList>.mitem>image{
		width: 100%;
		height: 100%;
			border-radius: 8px;
	}

	.topicList .item {
			width: 310upx;

		border-radius: 6px;
			margin: 8upx;
			background-color: #ffffff;
			padding: 4px;
			box-sizing: border-box;
			position: relative;
			box-shadow: 0px 2px 6upx 0upx rgba(79, 72, 72, 0.5);
	}

	.topicList .item>image {
			width: 100%; 
		
		border-radius: 8px 8px 0px 0px;
	}
	 .videoImg{
	width: 100%;
	
	border-radius: 8px 8px 0px 0px;
	height: 500upx;
		position: relative;
		margin-bottom: 20upx;
		overflow: hidden;
	}
	 .videoImg>.img{
		 display: block;
		width: 100%;
		height: 90%;
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
	

	.topicList .item>text {
		display: block;
		text-align: left;
		padding: 0 10upx;
		box-sizing: border-box;
		height: 48upx;
		width: 100%;
	
overflow: hidden; // 文本超出范围隐藏
white-space: nowrap; // 文本超出范围强制不换行
text-overflow: ellipsis; //文本超出范围显示三个点
	

	}
	
	.topicList1{
		// display: flex;
		// justify-content: space-between;
		// height: auto;
		// overflow: hidden;
		width: 100%;
		overflow: auto;
		// flex-wrap: wrap;
	}
	.topicList{
		// display: flex;
		// justify-content: space-between;
		// height: auto;
		// overflow: hidden;
		width: 100%;
		overflow: auto;
		// flex-wrap: wrap;
	}
 .topicList1 .item {
	/* 	width: 48%;
		height: 600upx;
		box-shadow: 0px 2px 6upx 0upx rgba(79, 72, 72, 0.5);
		border-radius: 6px;
		margin-top: 30upx; */
		width: 310upx;
		height: auto;
			border-radius: 6px;
				margin: 5px;
				background-color: #ffffff;
				padding: 8px;
				position: relative;
				box-shadow: 0px 2px 6upx 0upx rgba(79, 72, 72, 0.5);
	}

	.topicList1 .item>image {
		width: 100%;
		
	  
		border-radius: 8px 8px 0px 0px;
	}
	
		.topicList1 .item>text {
			display: block;
			text-align: left;
			padding: 0 10upx;
			box-sizing: border-box;
			height: 48upx;
			width: 100%;
		
	overflow: hidden; // 文本超出范围隐藏
	white-space: nowrap; // 文本超出范围强制不换行
	text-overflow: ellipsis; //文本超出范围显示三个点
		
	
		}

	.bottom {
		width: 100%;
	
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
		font-size: 24upx;
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
		font-size: 20upx;
		vertical-align: middle;
	}

	.good {
		width: 94%;
		// height: 196px;
		line-height: 20px;
		border-radius: 20px;
		// background-color: rgba(255, 255, 255, 0.5);
		margin: 30upx auto;
		padding: 26upx;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
	}

	.tab {
		width: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.tab>.nav-item {
		color: rgba(255, 255, 255, 100);
		font-size: 10px;
		margin-left: 40upx;
	}

	.current {
		width: 62px;
		height: 20px;
		line-height: 20px;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.35);
		color: rgb(255, 255, 255);
		font-size: 10px;
		text-align: center;
	}
</style>
