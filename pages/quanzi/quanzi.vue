<template>
	<view class="wrap u-skeleton">
		<u-toast ref="uToast" />
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<view class="tab" style="width: 500upx;padding: 0 30upx;box-sizing: border-box;">
			<u-tabs :list="list" :is-scroll="false" height="100" bg-color="white" :current="current" @change="changes"
				active-color="#E1A32C" bar-width="60" count="cate_count" font-size="36">
			</u-tabs>

		</view>

		<!-- 动态 -->
		<view class="comentOut" v-if=" current==0">
			<view
				style="padding-top: 30upx; width: 100%;background-color: #fff; display: flex;justify-content: space-between;align-items: center;">
				<view style="width: 460upx; margin-left: 30upx;">
					<u-search shape="round" :clearabled="true" margin="30upx" :show-action="false" width="460"
						@change="search">
					</u-search>
				</view>
				<image @click="jiyedetail" src="../../static/jiye.jpg" mode=""
					style="width: 100upx;height: 100upx;margin-right: 30upx;"></image>

			</view>
			<view style="padding: 30upx;background-color: #fff;width: 100%;height: 320upx;box-sizing: border-box;">
				<!-- <u-notice-bar mode="horizontal" :list="noticelist" bg-color="#F9C212" color="#fff"></u-notice-bar> -->

				<u-swiper :list="indexarr" height="320" img-mode="aspectFill" @click="pirview"></u-swiper>


			</view>
			<view class="comment" v-for="(res, index) in commentList">

				<view class="right">
					<view class="offcial" v-if="res.isOfficial==1">
						<image src="../../static/dp.png" mode=""></image>
						<text>官方达人</text>
					</view>
					<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;">

						<u-avatar :src="res.uava" mode="circle"></u-avatar>
						<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;">
							<view
								style="  line-height: 54upx;  display: flex;     align-items: center;color: rgba(16, 16, 16, 100);font-size: 32upx;font-family: SourceHanSansSC-regular;font-weight: bold;">
								{{res.uname}}

								<!-- <image src="../../static/lv1.png" mode=""
									style="width: 48upx;height: 38upx;margin-left: 20upx;"></image> -->
								<text
									style="color: rgba(232, 163, 50, 100);font-size: 12px;margin-left: 10upx;">Lv.1</text>
								<view class="recommend" v-if="res.isOfficial==1">
									<image src="../../static/zan.png" mode=""></image>
									<text>官方推荐</text>

								</view>
							</view>
							<view style="display: flex;color: rgba(166, 166, 166, 100);font-size: 12px;">
								<view>{{res.pubDate}}</view>

							</view>


						</view>
						<image src="../../static/more.png" mode=""
							style="float: right;margin-top: 20upx;width: 48upx;height: 48upx;"
							@click="showModel(res.id,res.uid)"></image>
					</view>




					<view class="content" @click="comment(res)">

						<mote-lines-divide :dt="res.content" :line="3" expandText="展开" foldHint="收起"
							enableButton='true'>
							{{res.content}}
						</mote-lines-divide>
						<!-- {{res.content}} -->
					</view>





					<view class="reply-box" v-if="res.type==1" @click="comment(res)">
						<view v-if="res.pocUrl.length == 1"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="widthFix" style="width: 100%;"></image>
						</view>
						<view v-if="res.pocUrl.length == 2 || res.pocUrl.length == 4"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="width:334rpx;height:334rpx;margin-bottom: 10rpx;">
							</image>
							<!-- <video src="https://jileaf.oss-cn-hangzhou.aliyuncs.com/video/4a4068ca8f01345656d5f307ca633c68.mp4" controls></video> -->
						</view>
						<view v-if="res.pocUrl.length == 3 || res.pocUrl.length == 6 || res.pocUrl.length == 7"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="width:220rpx;height:220rpx;margin-bottom: 10rpx;">
							</image>
						</view>
						<view v-if="res.pocUrl.length == 5 || res.pocUrl.length == 8"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="width:220rpx;height:220rpx;margin-bottom: 10rpx;">
							</image>
							<view style="width:220rpx;height:220rpx;"></view>
						</view>
						<view v-if="res.pocUrl.length == 9"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="margin-bottom: 10rpx;width:220rpx;height:220rpx;">
							</image>
						</view>
					</view>
					<view class="reply-video" v-if="res.type==2" @click="videoPlay(res)">

						<!-- 	 <video id="myVideo"   style="width: 100%;" v-for="(res1, index1) in res.pocUrl" :src="res1"
						             @fullscreenchange="fullscreenchange"       @error="videoErrorCallback"  enable-danmu danmu-btn controls  show-loading></video>
						 -->
						<image data-id="index" class="videoList" v-for="(res1, index1) in res.pocUrl"
							:src="res1.url+ '?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit">
						</image>
						<!-- 	 <video v-for="(res1, index1) in res.pocUrl"  :src="res1"  autoplay='true' data-id="index" 
					      v-if="_index == index"  show-fullscreen-btn="false" 
					    /> -->
						<image src="../../static/bofang.png" mode="" class="play"></image>
						<!-- <video class="video-card" style="width: 100%;" :class="'id'+res.id" v-for="(res1, index1) in res.pocUrl" :src="res1"
							 controls :id="'id'+res.id" @play="videoPlayHandle('id'+res.id)" /> -->


					</view>







					<view class="bottomUp" v-if="res.isOfficial==1">
						<view class="leftup">
							<view class="agree">
								<view class="imgArr">
									<image src="../../static/userList.png" mode=""></image>
								</view>
								<text>等 {{res.likeNum | million}}次赞</text>
							</view>

							<text>共{{res.comNum}}条评论，{{res.collectNum | million}}收藏</text>
						</view>
						<view class="rightup">


							<view class="comment-group1" @click="comment(res)">
								<image src="../../static/lun.png" />
							</view>

							<view class="praise-group1">
								<image v-if="res.price==null" @click="$noMultipleClicks(getLike,res.id)"
									src="../../static/exl.png" />
								<image v-else @click="$noMultipleClicks(unLike,res.id)" src="../../static/exl1.png" />


							</view>

							<view class="favor1">
								<image v-if="res.collect==null" @click="$noMultipleClicks(getSc,res.id)"
									src="../../static/cang.png"></image>

								<image v-else @click="$noMultipleClicks(unSc,res.id)" src="../../static/cang1.png">
									<!-- 收藏 -->


								</image>
							</view>


						</view>
					</view>
					<!-- 用户 -->
					<view class="bottomUser" v-if="res.isOfficial==0">
						<button class="userLeft" :data-data='{res}' open-type="share">
							<image src="../../static/xiang.png" mode=""></image>
							<text>分享</text>
						</button>
						<view class="userRight">

							<view class="comment-group1" @click="comment(res)">
								<image src="../../static/lun.png" />{{res.comNum}}
							</view>

							<view class="praise-group1">
								<image v-if="res.price==null" @click="$noMultipleClicks(getLike,res.id)"
									src="../../static/exl.png" />
								<image v-else @click="$noMultipleClicks(unLike,res.id)" src="../../static/exl1.png" />
								{{res.likeNum}}

							</view>

							<view class="favor1">
								<image v-if="res.collect==null" @click="$noMultipleClicks(getSc,res.id)"
									src="../../static/cang.png"></image>

								<image v-else @click="$noMultipleClicks(unSc,res.id)" src="../../static/cang1.png">
									<!-- 收藏 -->
									{{res.collectNum}}

								</image>
							</view>



						</view>
					</view>


					<!-- <input type="text" value="" @click="comment(res)" placeholder="请留下你的评论"
						placeholder-style="padding-left:30upx;font-size:26upx;;color:#ACACAC;box-sizing:border-box"
						style="padding-left:30upx;font-size:26upx;;color:#ACACAC;box-sizing:border-box;width: 96%;height: 28px;border-radius: 20px;background-color: rgba(240, 240, 240, 100);color: rgba(16, 16, 16, 100);margin: 0 auto;margin-top: 20upx;" /> -->
					<view class="topicname" v-if=" res.topic!==null">
						<text
							style="display: inline-block;width: 32upx;height: 32upx;background-color: #2B85E4;color: #fff;border-radius: 50%;font-size: 26upx;;text-align: center;margin-top: 8upx;">#</text>
						<text class="name" @click="topicDetail(res.topicId,res.topic)"> {{res.topic}}</text>
					</view>
				</view>

			</view>

		</view>



		<view class="tlist" v-if="current==2">
			<view class="top">
				<text>| 热门话题</text>
			</view>
			<view class="title">
				<view class="left">
					<image src="../../static/dd.png" mode=""></image>
					<text>#热门话题</text>
				</view>
				<view class="right">
					<text>200条动态 </text>

				</view>

			</view>

			<view class="list">
				<view class="list-item" v-for="(item,index) in topList" :key="index">
					<view class="topic_name">
						<view class="left">
							<image src="../../static/topic2.png" mode=""></image>
							<text>{{item.toname}}</text>
						</view>
						<view class="right"
							@click="toTopicDetail( topList[index].arr[0].topicId,topList[index].arr[0].topic)">
							<text>{{item.length}}条动态 ></text>
						</view>
					</view>
					<view class="imgList">
						<scroll-view class="tab-scroll-view" :scroll-x="true">
							<image v-if="item1.type==1" v-for="(item1,index1) in item.arr" :src="item1.pocUrl[0].url"
								mode="aspectFill" @click="topicDetail(item1.topicId,item1.topic)"></image>

							<view class="videoImg" v-if="item1.type==2" v-for="(item1,index1) in item.arr"
								@click="topicDetail(item1.topicId,item1.topic)">
								<image :src="item1.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'"
									mode="aspectFill" class="img"></image>
								<image src="../../static/bofang.png" mode="" class="play"></image>
							</view>

						</scroll-view>



					</view>
				</view>

			</view>
		</view>


		<view class="comentOut" v-if=" current==1">

			<view
				style="padding-top: 30upx; width: 100%;background-color: #fff;display: flex;justify-content: space-between;align-items: center;">
				<view style="width: 460upx; margin-left: 30upx;">
					<u-search shape="round" :clearabled="true" margin="30upx" :show-action="false" width="460"
						@change="search">
					</u-search>
				</view>
				<image @click="jiyedetail" src="../../static/jiye.jpg" mode=""
					style="width: 100upx;height: 100upx;margin-right: 30upx;"></image>

			</view>
			<view style="padding-top: 26upx;background-color: #fff;width: 100%;">
				<u-notice-bar mode="horizontal" :list="noticelist" bg-color="#F9C212" color="#fff"></u-notice-bar>
			</view>
			<view class="comment" v-for="(res, index) in commentList1">

				<view class="right">
					<view class="offcial" v-if="res.isOfficial==1">
						<image src="../../static/dp.png" mode=""></image>
						<text>官方达人</text>
					</view>
					<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;">

						<u-avatar :src="res.uava" mode="circle"></u-avatar>
						<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;">
							<view
								style="  line-height: 54upx;  display: flex;     align-items: center;color: rgba(16, 16, 16, 100);font-size: 32upx;font-family: SourceHanSansSC-regular;font-weight: bold;">
								{{res.uname}}

								<!-- <image src="../../static/lv1.png" mode=""
							style="width: 48upx;height: 38upx;margin-left: 20upx;"></image> -->
								<text
									style="color: rgba(232, 163, 50, 100);font-size: 12px;margin-left: 10upx;">Lv.1</text>
								<view class="recommend" v-if="res.isOfficial==1">
									<image src="../../static/zan.png" mode=""></image>
									<text>官方推荐</text>

								</view>
							</view>
							<view style="display: flex;color: rgba(166, 166, 166, 100);font-size: 12px;">
								<view>{{res.pubDate}}</view>

							</view>


						</view>
						<image src="../../static/more.png" mode=""
							style="float: right;margin-top: 20upx;width: 48upx;height: 48upx;"
							@click="showModel(res.id,res.uid)"></image>
					</view>




					<view class="content" @click="comment(res)">

						<mote-lines-divide :dt="res.content" :line="3" expandText="展开" foldHint="收起"
							enableButton='true'>
							{{res.content}}
						</mote-lines-divide>
						<!-- {{res.content}} -->
					</view>





					<view class="reply-box" v-if="res.type==1" @click="comment(res)">
						<view v-if="res.pocUrl.length == 1"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="widthFix" style="width: 100%;"></image>
						</view>
						<view v-if="res.pocUrl.length == 2 || res.pocUrl.length == 4"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="width:334rpx;height:334rpx;margin-bottom: 10rpx;">
							</image>
							<!-- <video src="https://jileaf.oss-cn-hangzhou.aliyuncs.com/video/4a4068ca8f01345656d5f307ca633c68.mp4" controls></video> -->
						</view>
						<view v-if="res.pocUrl.length == 3 || res.pocUrl.length == 6 || res.pocUrl.length == 7"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="width:220rpx;height:220rpx;margin-bottom: 10rpx;">
							</image>
						</view>
						<view v-if="res.pocUrl.length == 5 || res.pocUrl.length == 8"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="width:220rpx;height:220rpx;margin-bottom: 10rpx;">
							</image>
							<view style="width:220rpx;height:220rpx;"></view>
						</view>
						<view v-if="res.pocUrl.length == 9"
							style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							<image @click="previewImage(index1,res1.pocUrl)" v-for="(res1, index1) in res.pocUrl"
								:src="res1.url" mode="aspectFill"
								style="margin-bottom: 10rpx;width:220rpx;height:220rpx;">
							</image>
						</view>
					</view>
					<view class="reply-video" v-if="res.type==2" @click="videoPlay(res)">

						<!-- 	 <video id="myVideo"   style="width: 100%;" v-for="(res1, index1) in res.pocUrl" :src="res1"
				             @fullscreenchange="fullscreenchange"       @error="videoErrorCallback"  enable-danmu danmu-btn controls  show-loading></video>
				 -->
						<image data-id="index" class="videoList" v-for="(res1, index1) in res.pocUrl"
							:src="res1.url+ '?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto'" mode="aspectFit">
						</image>
						<!-- 	 <video v-for="(res1, index1) in res.pocUrl"  :src="res1"  autoplay='true' data-id="index" 
			      v-if="_index == index"  show-fullscreen-btn="false" 
			    /> -->
						<image src="../../static/bofang.png" mode="" class="play"></image>
						<!-- <video class="video-card" style="width: 100%;" :class="'id'+res.id" v-for="(res1, index1) in res.pocUrl" :src="res1"
					 controls :id="'id'+res.id" @play="videoPlayHandle('id'+res.id)" /> -->


					</view>



					<view class="bottomUp" v-if="res.isOfficial==1">
						<view class="leftup">
							<view class="agree">
								<view class="imgArr">
									<image src="../../static/userList.png" mode=""></image>
								</view>
								<text>等 {{res.likeNum | million}}次赞</text>
							</view>

							<text>共{{res.comNum}}条评论，{{res.collectNum | million}}收藏</text>
						</view>
						<view class="rightup">


							<view class="comment-group1" @click="comment(res)">
								<image src="../../static/lun.png" />
							</view>

							<view class="praise-group1">
								<image v-if="res.price==null" @click="$noMultipleClicks(getLike,res.id)"
									src="../../static/exl.png" />
								<image v-else @click="$noMultipleClicks(unLike,res.id)" src="../../static/exl1.png" />


							</view>

							<view class="favor1">
								<image v-if="res.collect==null" @click="$noMultipleClicks(getSc,res.id)"
									src="../../static/cang.png"></image>

								<image v-else @click="$noMultipleClicks(unSc,res.id)" src="../../static/cang1.png">
									<!-- 收藏 -->


								</image>
							</view>


						</view>
					</view>
					<!-- 用户 -->
					<view class="bottomUser" v-if="res.isOfficial==0">
						<button class="userLeft" :data-data='{res}' open-type="share">
							<image src="../../static/xiang.png" mode=""></image>
							<text>分享</text>
						</button>
						<view class="userRight">

							<view class="comment-group1" @click="comment(res)">
								<image src="../../static/lun.png" />{{res.comNum}}
							</view>

							<view class="praise-group1">
								<image v-if="res.price==null" @click="$noMultipleClicks(getLike,res.id)"
									src="../../static/exl.png" />
								<image v-else @click="$noMultipleClicks(unLike,res.id)" src="../../static/exl1.png" />
								{{res.likeNum}}

							</view>

							<view class="favor1">
								<image v-if="res.collect==null" @click="$noMultipleClicks(getSc,res.id)"
									src="../../static/cang.png"></image>

								<image v-else @click="$noMultipleClicks(unSc,res.id)" src="../../static/cang1.png">
									<!-- 收藏 -->
									{{res.collectNum}}

								</image>
							</view>



						</view>
					</view>


					<!-- <input type="text" value="" @click="comment(res)" placeholder="请留下你的评论"
				placeholder-style="padding-left:30upx;font-size:26upx;;color:#ACACAC;box-sizing:border-box"
				style="padding-left:30upx;font-size:26upx;;color:#ACACAC;box-sizing:border-box;width: 96%;height: 28px;border-radius: 20px;background-color: rgba(240, 240, 240, 100);color: rgba(16, 16, 16, 100);margin: 0 auto;margin-top: 20upx;" /> -->
					<view class="topicname" v-if=" res.topic!==null">
						<text
							style="display: inline-block;width: 32upx;height: 32upx;background-color: #2B85E4;color: #fff;border-radius: 50%;font-size: 26upx;;text-align: center;margin-top: 8upx;">#</text>
						<text class="name" @click="topicDetail(res.topicId,res.topic)"> {{res.topic}}</text>
					</view>
				</view>

			</view>

		</view>


		<!-- </view> -->
		<u-action-sheet :list="list1" @click="shanchuCir" v-model="showdel"></u-action-sheet>
		<u-loadmore :status="status" />
		<u-toast ref="uToast" />
		<u-popup v-model="showmodel" mode="bottom" border-radius="14" closeable="true">
			<view class="mainModel">
				<view class="title">
					举报笔记
				</view>
				<view class="item" @click="inComplain(item.id,item.name)" v-for="(item,index) in tsList" :key="index">
					<text>{{item.name}}</text>
					<image src="../../static/inter.png" mode="aspectFit"></image>
				</view>


			</view>

		</u-popup>
		<u-modal v-model="hidden" content="是否确认删除您的帖子" @confirm="sure" @cancel="cancel" show-cancel-button='true'>
		</u-modal>
	</view>
</template>

<script>
	//import api from '@/common/api/api.js'
	import * as api from '@/common/api/api.js'
	import MoteLinesDivide from "@/components/mote-lines-divide/mote-lines-divide"
	// import million from '../../common/common.js'

	import tab from "../../components/tab.vue"
	import topNav from "../../components/topNav.vue"
	import videoList from "../../components/videoList.vue"
	export default {
		components: {
			MoteLinesDivide,
			tab,
			topNav,
			videoList
		},
		data() {
			return {
				indexarr: [],
				_index: 0, //当前正在播放视频的数组下标
				meigeSP: [],
				distance: 0,
				indexKey: 0,
				videolist: [],
				hidden: false,
				showdel: false,
				list1: [{
					text: '删除'
				}],
				showmodel: false,
				noticelist: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				//总条数
				topiccount: '',
				topiccount1: '',
				followtopiccount: '',
				status: 'loadmore',
				isLike: false,
				isSc: false,
				u_id: '',
				Page: '1',
				Fpage: '1',
				urls: [],
				windowswidth: '',
				newwidth: '',
				two: '',
				scrollTop: 0,
				commentList: [],
				commentList1: [],
				commentListFollow: [],
				list: [{
						name: '热门',
						cate_count: "hot"
					},
					{
						name: '官方'
					},

					{
						name: '话题'
					}


				],
				flag: true,
				flag2: true,
				current: 0,
				noClick: true,
				topList: [],
				intPageATime: 0,
				timerPageA: '',
				arr: [],
				arr1: [],
				mes_list: [],
				showText: false,
				tsList: [],
				path: [],
				arr3: []

			}
		},

		onLoad() {




		},
		filters: {
			million(value) { //过万处理
				let num;
				if (value > 9999) { //大于9999显示x.xx万
					num = (Math.floor(value / 1000) / 10) + 'W';
				} else if (value < 9999 && value > -9999) {
					num = value
				} else if (value < -9999) { //小于-9999显示-x.xx万
					num = -(Math.floor(Math.abs(value) / 1000) / 10) + 'W'
				}
				return num;
			}
		},
		onShow() {
			this.videolist = [{
				id: 1,
				src: 'https://jileaf.oss-cn-hangzhou.aliyuncs.com/video/4a4068ca8f01345656d5f307ca633c68.mp4',

			}]

			this.init();
			this.getTopic()








		},
		mounted() {


		},



		onPullDownRefresh: function() {

			//	this.getComment();
			this.init();
			this.getTopic()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			//	this.get();
		},
		//触底事件
		onReachBottom() {
			let a = (this.topiccount / 10)
			let b = (this.followtopiccount / 10)
			//console.log(b)
			//console.log(a)

			this.Page++
			//console.log(this.Page)
			setTimeout(() => {
				if (this.flag) {
					api.request({
						url: '/circle/getCircle',
						method: 'GET',
						data: {
							userId: this.u_id,
							pageNum: this.Page
						},
					}).then(res => {
						//console.log(res.data)
						this.commentList = res.data.records;
						this.topiccount = res.data.total;
						if (this.Page >= a) {
							this.status = 'nomore'
							return
						}
					});
				}

				this.status = 'loading';

			}, 1000)
			//关注页面


		},
		//返回顶层
		onPageScroll(event) {
			this.scrollTop = event.scrollTop;

			//  let scrollTop = event.scrollTop //页面滚动
			//     if (scrollTop==0){
			//       this.indexKey=0
			//       // this.setData({ _index:indexKey})
			// 	  this._index=this.indexKey
			//     }

			//     console.log(scrollTop)
			//     if (scrollTop >= this.distance) { //页面向上滚动indexKey
			//       if (this.indexKey + 1 < this.meigeSP.length && scrollTop >= this.meigeSP[this.indexKey] * 0.9) {
			//         // this.setData({ _index: indexKey + 1 })
			// 		  this._index=this.indexKey+1
			//         this.indexKey += 1
			//         console.log("indexKey", this.indexKey)
			//       }
			//     } else { //页面向下滚动
			//       if (this.distance - scrollTop < 15) { //每次滚动的距离小于15时不改变  减少setData的次数
			//         return
			//       }
			//       if (this.indexKey - 1 > 0 && scrollTop < this.meigeSP[this.indexKey - 1]) {
			//         this.indexKey -= 1
			//     	  this._index=this.indexKey
			//       }
			//     }
			// 	console.log(this.meigeSP)
			// 	console.log(this._index)
			//     this.distance = scrollTop
		},
		onShareTimeline(res) {
			var that = this
			console.log(res)
			// 　if (res.from === 'button') {// 来自页面内分享按钮
			// 　　　　console.log(res.target)
			// 　　}

			return {
				title: "吉小叶",




			}
		},

		onShareAppMessage(res) {
			var that = this
			console.log(res.target.dataset.data.res.type)
			// 　if (res.from === 'button') {// 来自页面内分享按钮
			// 　　　　console.log(res.target)
			// 　　}
			api.request({
					url: '/userInfo/addIntegral',
					method: 'POST',
					data: {
						userId: that.u_id,
						integral: 5
					}
				})
				.then(respon => {
					console.log(respon)
					that.$refs.uToast.show({
						title: '积分加5',
						type: 'success',
						duration: '1000'
					})
				})
				if(res.target.dataset.data.res.type==1){
					return {
						title: "来自" + res.target.dataset.data.res.uname + '的分享',
						path: '/pages/quanzi/comment?id=' + res.target.dataset.data.res.id,
						imageUrl: res.target.dataset.data.res.pocUrl[0].url,
						content: res.target.dataset.data.res.content,
						// success(respon){
					
						//          },
						// fail(err){
						// 	that.$refs.uToast.show({
						// 		title: '分享失败',
					
						// 	})
						// }
					
					}
				}else{
					return {
						title: "来自" + res.target.dataset.data.res.uname + '的分享',
						path: '/pages/quanzi/comment?id=' + res.target.dataset.data.res.id,
						imageUrl: res.target.dataset.data.res.pocUrl[0].url+'?x-oss-process=video/snapshot,t_2000,f_jpg,ar_auto',
						content: res.target.dataset.data.res.content,
						// success(respon){
					
						//          },
						// fail(err){
						// 	that.$refs.uToast.show({
						// 		title: '分享失败',
					
						// 	})
						// }
					
					}
				}
		
		},

		methods: {
			pirview(index) {
				console.log(this.path[index])
				uni.navigateTo({
					url: this.path[index]
				})

			},
			getId() {
				api.request({
					url: '/circle/official?userId=' + this.u_id,
					method: 'GET',

				}).then(res => {
					this.commentList1 = res.data.data;


					this.topiccount1 = res.data.total;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();

				})
			},
			changes(index) {
				console.log(index)
				this.current = index;
				if (index == 1) {
					this.getId()
				}
			},

			jiyedetail() {
				uni.navigateTo({
					url: './jiye'
				})
			},


			videoPlay(res1) {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						that.u_id = res.data.userId;
						uni.navigateTo({
							url: './comment?id=' + res1.id + '&name=' + res1.uname + '&uid=' + that
								.u_id
						})
					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			},

			inComplain(id, con) {

				uni.navigateTo({
					url: '../complain/complain?id=' + id + "&con=" + con + '&circleId=' + this.id
				})
			},

			getTousu() {
				api.request({
						url: '/report/list',
						method: 'GET',

					})
					.then(res => {
						console.log(res)
						this.tsList = res.data.data
					})
			},
			shanchuCir() {

				this.hidden = true

			},
			cancel() {
				this.hidden = false
			},
			sure() {
				api.request({
						url: '/circle/delTopicById?tid=' + this.id,
						method: 'GET'
					})
					.then(res => {
						console.log(res)
						if (res.data.flag == true) {
							this.$refs.uToast.show({
								title: '删除成功',
								type: 'success',
								duration: '300'
							})
							this.init();


							this.getId()







						} else {
							this.$refs.uToast.show({
								title: '删除失败',
								type: 'error',
								duration: '1000'
							})
						}
					})
			},
			showModel(id, uid) {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {

						if (that.u_id == uid) {
							that.showdel = true
							that.id = id
						} else {
							that.showmodel = true
							that.id = id
						}

						that.getTousu()
					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})


			},
			search() {
				uni.navigateTo({
					url: './search'
				})
			},



			getAgreeList() {

				api.request({
						url: '/dianzan/noread/' + this.u_id,
						method: "GET"
					})
					.then(res => {
						console.log(res)
						this.arr1 = res.data.data
					})
			},
			getGoodList() {

				api.request({
						url: '/shouCang/noread/' + this.u_id,
						method: "GET"
					})
					.then(res => {
						console.log(res)
						this.arr = res.data.data
					})
			},

			countTime() {

				let that = this
				// 读取A页计时数值
				// uni.getStorage({
				//     key: 'timerPageA',
				//     success(res) {
				//    that.intPageATime = res.data
				//     }
				// })
				// 计时过程
				uni.getStorage({
					key: "timerPageA",
					success: (res) => {

						if (res.data > 0) {
							that.intPageATime = res.data

						} else {

						}
					}
				})

				that.timerPageA = setTimeout(function() {

					console.log('A页计时器+1', that.intPageATime);

					that.intPageATime = that.intPageATime + 1
					if (that.intPageATime == 60) {
						api.request({
								url: '/userInfo/addIntegral',
								method: 'POST',
								data: {
									userId: that.u_id,
									integral: 5
								}
							})
							.then(res => {
								console.log(res)
								that.$refs.uToast.show({
									title: '积分加5',
									type: 'success',
									duration: '1000'
								})
							})
					}






					uni.setStorage({
						key: "timerPageA",
						data: that.intPageATime
					})
					that.countTime();
				}, 1000);

			},


			share(res) {



			},

			toTopic(name) {
				console.log('666')
				uni.navigateTo({
					url: '../topic/topic?name=' + name
				})
			},
			init() {
				var that = this
				that.getBanner()
				uni.getStorage({
					key: 'userInfo',
					success: (res1) => {
						that.u_id = res1.data.userId;


						api.request({
							url: '/mes/noread/' + that.u_id,
							method: 'GET',
							/* 	data: {
									openid: that.u_id
								}, */
						}).then(res => {
							console.log(res)
							that.getComment(); //初始化获取页面信息
							that.countTime()
							that.getAgreeList()
							that.getGoodList()
							that.getCheck()

							that.mes_list = res.data.data
							console.log(that.arr.length, that.arr1.length, that.mes_list.length, that
								.arr3.length)

						})

					},
					fail: (res) => {


						api.request({
							url: '/circle/getCircle',
							method: 'GET',
							data: {
								userId: "",
								pageNum: that.Page
							},
						}).then(res => {



							that.commentList = res.data.records;
							console.log(that.commentList)
							that.topiccount = res.data.total;
							//console.log(this.commentList)






						})

					}
				})
			},
			getDetail(id) {
				api.request({
						url: '/circle/info/' + id,
						method: 'POST'
					})
					.then(res => {
						console.log(res)
						this.content = res.data.data

					})
			},
			getBanner() {
				api.request({
						url: '/circle/banner',
						method: 'GET'
					})
					.then(res => {




						var arr = res.data.data
						var arr1 = []
						var arr2 = []
						for (let i in arr) {
							arr1.push(arr[i].url)
							arr2.push(arr[i].path)
						}
						this.indexarr = arr1
						this.path = arr2




					})
			},

			topicDetail(id, name) {
				var that = this
				console.log(id, name)
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						that.u_id = res.data.userId;
						uni.navigateTo({
							url: '../topic/topic?id=' + id + '&name=' + name
						})
					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})

			},
			//点击收藏
			getSc(res) {
				let t_id = res
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						that.u_id = res.data.userId;

						api.request({
							url: '/shouCang/addSc',
							method: 'POST',
							data: {
								tid: t_id,
								uid: that.u_id
							},
						}).then(res => {
							if (res.data.data == 1) {
								that.init();
								that.getId()
								that.$refs.uToast.show({
									title: '收藏成功',
									type: 'success',
									duration: '1000'
								})


							} else {
								that.$refs.uToast.show({
									title: '收藏失败',
									type: 'success',
									duration: '1000'
								})
							}
						});

					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			},
			// 转发
			// share(user, id) {
			// 	console.log(user, id)

			// 	uni.navigateTo({
			// 		url: './share?id=' + id + '&user=' + JSON.stringify(user)
			// 	})
			// },
			//取消收藏
			unSc(res) {
				let t_id = res
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						api.request({
							url: '/shouCang/deleteSc',
							method: 'POST',
							data: {
								tid: t_id,
								uid: that.u_id
							},
						}).then(res => {
							if (res.data.data == 1) {

								that.$refs.uToast.show({
									title: '取消收藏',
									type: 'warning',
									duration: '1000'
								})
								that.init();
								that.getId()

							}

						})

					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			},
			//取消点赞
			unLike(res) {
				//console.log('取消点赞')
				let t_id = res
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						api.request({
							url: '/dianzan/cancelDianzan',
							method: 'POST',
							data: {
								tid: t_id,
								uid: that.u_id,
								type: 1
							},
						}).then(res => {
							if (res.data.data == 1) {
								that.init();
								that.getId()

								this.$refs.uToast.show({
									title: '取消点赞',
									type: 'warning',
									duration: '1000'
								})
							}

						})

					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			},
			//点赞
			getLike(res) {
				let t_id = res
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						api.request({
							url: '/dianzan/addDianzan',
							method: 'POST',
							data: {
								tid: t_id,
								uid: that.u_id,
								type: 1
							},
						}).then(res => {
							if (res.data.data == 1) {
								that.init();
								that.getId()
								this.$refs.uToast.show({
									title: '点赞成功',
									type: 'success',
									duration: '1000'
								})
							} else {
								that.$refs.uToast.show({
									title: '点赞失败',
									type: 'success',
									duration: '1000'
								})
							}
						});

					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			},
			getCheck() {
				var that = this
				api.request({
						url: '/mes/iacs/noread/' + this.u_id,
						method: "GET"
					})
					.then(res => {
						console.log(res, '99999999999999')
						this.arr3 = res.data.data


						if (that.arr.length + that.arr1.length + that.mes_list.length + that.arr3.length > 0) {
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
			//标签切换
			change(index) {
				this.current = index;
				//this.status = 'loading';

				api.request({
						url: '/circle/getCircle',
						method: 'GET',
						data: {
							userId: this.u_id,
							pageNum: this.Page
						},
					}).then(res => {
						this.commentList = res.data.records;
						this.topiccount = res.data.total;
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						uni.hideLoading();
					})
					.catch(err => {
						uni.showToast({
							title: '网络错误,请联系开发人员',
							icon: 'none',
						})
					})

			},
			//图片预览
			previewImage(current, photos) {
				// const urls = 
				uni.previewImage({
					current,
					urls: photos
				})
			},
			//个人中心
			userinfo(res) {
				//console.log(res.uid+"页面跳转过来的值")
				uni.navigateTo({
					url: '../user/userinfo/userinfo?uid=' + res.uid
				})
			},

			//评论详情
			comment(res1) {

				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						that.u_id = res.data.userId;
						uni.navigateTo({
							url: './comment?id=' + res1.id + '&name=' + res1.uname + '&uid=' + that
								.u_id
						})
					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})

			},
			getTopic() {
				api.request({
						url: '/circle/topic/group',
						method: 'GET',

					})
					.then(res => {

						this.topList = res.data.data.map(item => {
							return {
								arr: item,
								toname: item.map(item1 => {
									return item1.topic
								})[0],
								length: item.length
							}
						})
						this.status = 'nomore'

						// this.topList
						console.log(this.topList)
					})
			},

			toTopicDetail(id, name) {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						that.u_id = res.data.userId;
						uni.navigateTo({
							url: '../topic/topic?id=' + id + '&name=' + name
						})
					},
					fail() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			},
			//信息初始化			
			getComment() {
				//console.log(this.u_id + "aaaaaaaaaa");
				//关注页面
				var that = this

				that.getId()
				api.request({
					url: '/circle/getCircle',
					method: 'GET',
					data: {
						userId: that.u_id,
						pageNum: that.Page
					},
				}).then(res => {

					console.log(res)

					that.commentList = res.data.records;

					that.topiccount = res.data.total;









				})





				/* 		uni.showLoading({
							title: '加载中'
						}) */

			}

		},
		onUnload() {

			clearTimeout(this.timerPageA);
		},
		onHide() {
			clearTimeout(this.timerPageA);
		}
	}
</script>


<style lang="scss">
	.videoList {
		width: 100%;
		height: 600upx;
	}

	.videocontent {
		width: 100%;
		height: 500px;
	}

	.mainModel {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 0 30upx;
		box-sizing: border-box;

	}

	.mainModel>.title {
		width: 100%;
		height: 98upx;
		text-align: center;
		font-size: 28upx;
		font-weight: bold;
		line-height: 98upx;
	}

	.mainModel>.item {
		width: 100%;
		height: 98upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #bbb;
	}

	.mainModel>.item>image {
		width: 36upx;
		height: 36upx;
	}

	.bottomUp {
		display: flex;
		width: 100%;
		height: auto;
		overflow: hidden;
		justify-content: space-between;
		align-items: center;
	}

	.bottomUp>.leftup {
		display: flex;
		flex-direction: column;
		margin-left: 30upx;
	}

	.bottomUp>.leftup>.agree {
		vertical-align: middle;
	}

	.bottomUp>.leftup>.agree>.imgArr {
		display: inline-block;
		vertical-align: middle;
	}

	.bottomUp>.leftup>.agree>.imgArr>image {
		width: 160upx;
		height: 40upx;
		vertical-align: middle;
	}

	.bottomUp>.leftup>.agree>text {
		font-weight: bold;
		color: rgba(16, 16, 16, 100);
		font-size: 14px;
		vertical-align: middle;
		margin-left: 20upx;
	}

	.bottomUp>.leftup>text {
		display: block;
		color: rgba(159, 159, 159, 100);
		font-size: 12px;
	}

	.bottomUp>.rightup {
		width: 200upx;
		display: flex;
	}

	.bottomUp>.rightup image {
		width: 48upx;
		height: 48upx;
		margin-left: 12upx;
		display: inline-block;
	}


	.bottomUser {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.bottomUser>.userLeft {
		vertical-align: middle;
		margin: 0;
		padding: 0;
		border: 1px solid transparent !important;
		background: #fff !important;
		border-color: #fff !important;
	}

	.bottomUser>.userLeft>image {
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
	}

	.bottomUser>.userLeft>text {
		margin-left: 8upx;
		font-size: 28upx;
		vertical-align: middle;
	}

	.bottomUser>.userRight {
		width: 46%;
		vertical-align: middle;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}



	.userRight image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.userRight view {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.userRight .comment-group {
		background: #ffffff;
	}

	.userRight .praise-group {
		background: #ffffff;
	}

	.topicname {
		width: fit-content;
		width: -webkit-fit-content;
		width: -moz-fit-content;

		padding: 0 20upx;
		height: 24px;
		box-sizing: border-box;

		border-radius: 13px;
		background-color: rgba(221, 221, 221, 100);
		text-align: center;
		margin-top: 32upx;
		vertical-align: middle;
		margin-left: 20upx;
	}

	.topicname>.name {
		color: rgba(33, 109, 195, 100);
		font-size: 12px;
		margin-left: 8upx;
	}

	.recommend {
		width: 132upx;
		height: 36upx;
		line-height: 36upx;
		border-radius: 18upx;
		background-color: rgba(249, 194, 18, 100);
		color: rgba(16, 16, 16, 100);

		text-align: center;
		font-family: Arial;
		margin-left: 20upx;
		vertical-align: middle;
	}

	.recommend>image {
		width: 22upx;
		height: 22upx;
		vertical-align: middle;
	}

	.recommend>text {
		color: rgba(255, 255, 255, 100);
		font-size: 20upx;
		vertical-align: middle;
	}

	.offcial {
		width: 100%;
		padding-left: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.offcial>image {
		width: 40upx;
		height: 40upx;
	}

	.offcial>text {
		margin-left: 8upx;
		color: rgba(16, 16, 16, 100);
		font-size: 14px;

		font-family: SourceHanSansSC-regular;
		font-weight: bold;
	}

	.num {
		display: inline;
	}

	.wrap {
		background: #fff;
		height: auto;
		overflow: hidden;
		width: 100%;
	}

	.comentOut {
		width: 100%;
		height: auto;
		overflow: hidden;
		background-color: #f7f7f7;

		.comment {
			margin-top: 28rpx;
			background: #ffffff;
			display: flex;
			border-radius: 20rpx;
			//padding: 30rpx;
			//margin-top: 10rpx;

			padding: 20upx;
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
					// margin-left: 20rpx;
					// margin-top: 15rpx;
					// margin-bottom: 15rpx;
					// margin-right: 20rpx;
					width: 100%;
					height: auto;
					font-size: 28upx;
					padding: 20upx;
					line-height: 50upx;
					// box-sizing: border-box;
					// display: -webkit-box;
					// word-break: break-all;
					// -webkit-box-orient: vertical;
					// /* 要显示多少行就改变line-clamp的数据,此处折叠起来显示一行*/
					// -webkit-line-clamp: 3;
					// overflow: hidden;
					// text-overflow: ellipsis;




				}

				.full_text {
					color: rgba(59, 177, 155, 100);
					font-size: 14px;
					// float: right;
				}

				// .content>text {
				// 	width: 100%;
				// 	display: block;
				// 	margin-top: 10upx;
				// text-align: justify;
				// text-justify: newspaper;
				// word-break: break-all;

				// }

				// 		.content>.etc {
				// 			display: inline-block;

				// 			color: #ff5c5f;

				// 			overflow: hidden;
				// 		}

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

	}


	.tlist {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.top {
		width: 100%;
		margin-top: 30upx;

	}

	.top>text {
		font-weight: bold;
		color: #E1A32C;
		font-size: 32upx;
	}

	.tlist>.title {
		width: 100%;
		height: 120upx;
		background-color: #E1A32C;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 25upx;
	}

	.tlist>.title>.left {
		vertical-align: middle;
	}

	.tlist>.title>.left>image {
		width: 88upx;
		height: 88upx;
		vertical-align: middle;
	}

	.tlist>.title>.left>text {
		font-weight: bold;
		color: #fff;
		margin-left: 10upx;
	}

	.tlist>.title>.right {
		vertical-align: middle;
	}

	.tlist>.title>.right>text {
		font-weight: bold;
		color: #fff;
	}

	.list {
		margin-top: 14upx;
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.list-item {
		margin-top: 26upx;
	}

	.topic_name {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 19upx;
	}

	.topic_name>.left {
		vertical-align: middle;
	}

	.topic_name>.left>image {
		width: 38upx;
		height: 38upx;
		vertical-align: middle;
	}

	.topic_name>.left>text {
		font-size: 26upx;
		margin-left: 20upx;
	}

	.topic_name>.right>text {
		color: #A7A7A7;
	}

	.imgList {
		width: 100%;
		height: auto;
		flex-direction: row;
		white-space: nowrap;


	}


	.imgList image {


		display: inline-block;
		width: 200upx;
		height: 290upx;
		margin-right: 30upx;
		border-radius: 8px;
		margin-top: 20upx;
	}

	.imgList .videoImg {
		border: 1px solid #fff;

		display: inline-block;
		width: 200upx;
		height: 290upx;
		margin-right: 30upx;
		border-radius: 8px;
		margin-top: 20upx;
		position: relative;
	}

	.imgList .videoImg>.img {
		width: 100%;
		height: 100%;
	}

	.imgList .videoImg>.play {
		position: absolute;
		width: 80upx;
		height: 80upx;
		left: 50%;
		top: 50%;
		margin-left: -40upx;
		margin-top: -40upx;
	}

	.reply-video {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 20rpx;
		position: relative;
	}

	.reply-video>.play {
		position: absolute;
		width: 80upx;
		height: 80upx;
		left: 50%;
		top: 50%;
		margin-left: -40upx;
		margin-top: -40upx;
	}
</style>
