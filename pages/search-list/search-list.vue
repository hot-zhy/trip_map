<template>
	<view class="page">
		<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			@clickItem="onClickItem"></tabControl>
		<!-- 使用 swiper 配合 滑动切换 -->
		<!-- 帖子 -->
		<swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
			<swiper-item>
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="py-1" v-for="(item,index) in postResult" :key="index" v-if="postResult">
						<hm-news-card :options="item"></hm-news-card>
					</view>
					<view class="" v-if="postResult.length==0">
						<image src="../../static/images/nothing.png" mode="widthFix"
							style="justify-content: center;margin: 0 auto;display: block;width: 60%;"></image>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 用户 -->
			<swiper-item>
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" style="height: 100%;">
					<uni-section title="使用插槽" type="line">
						<view class="" v-if="userResult">
							<uni-list border-full v-for="(item,index) in userResult" :key="index">
								<view class="" @longtap="longtap(item.id)">
									<uni-list-item :title="item.userNickname" :note="item.userAccount" link border @click="userDetail(item.userId)">
										<template v-slot:footer>
											<image class="slot-image" :src="item.userAvatar" mode="widthFix"></image>
										</template>
									</uni-list-item>
								</view>
							</uni-list>
						</view>
						<view class="" v-if="userResult.length==0">
							<image src="../../static/images/nothing.png" mode="widthFix"
								style="justify-content: center;margin: 0 auto;display: block;width: 60%;"></image>
						</view>
					</uni-section>
				</scroll-view>
			</swiper-item>
			<!-- 地点 -->
			<swiper-item>
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" style="height: 100%;">

					<view class="" v-for="(item,index) in placeResult" :key="index" v-if="placeResult">
						<div class="test-component">
							<user-hm-friend-information-card :options="item"></user-hm-friend-information-card>
						</div>
					</view>
					<view class="" v-if="placeResult.length==0" style="width: 100%;">
						<image src="../../static/images/nothing.png" mode="widthFix"
							style="justify-content: center;margin: 0 auto;display: block;width: 60%;"></image>
					</view>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>


<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import uniListItem from '@/components/uni-list/components/uni-list-item/uni-list-item.vue';
	import userHmFriendInformationCard from '@/components/user-hm-friend-information/index.vue';
	import hmNewsCard from '@/components/hm-news-card/index.vue';
	export default {
		components: {
			tabControl,
			uniListItem,
			userHmFriendInformationCard,
			hmNewsCard
		},
		data() {
			return {
				items: ['帖子', '用户', '地点'],
				current: 0,
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
				userResult: [],
				placeResult: [],
				postResult: [],
				searchText: ""
			}
		},
		onLoad(options) {
			console.log(options.searchText);
			this.searchText = options.searchText
			setTimeout(() => {
				// 调用搜索接口
				uni.request({
					url: 'http://192.168.1.33:8080/search',
					method: 'GET',
					data: {
						"query": this.searchText,
						"type": 1
					},
					success: res => {
						this.userResult = res.data.data.user
					}
				});
				uni.request({
					url: 'http://192.168.1.33:8080/search',
					method: 'GET',
					data: {
						"query": this.searchText,
						"type": 2
					},
					success: res => {
						this.placeResult = res.data.data.place

					}
				});
				uni.request({
					url: 'http://192.168.1.33:8080/search',
					method: 'GET',
					data: {
						"query": this.searchText,
						"type": 0
					},
					success: res => {
						this.postResult = res.data.data.post
					}
				});
				uni.hideLoading()
			}, 1000)
		},
		methods: {
			userDetail(id){
				console.log('进入详情');
				console.log(id);
				uni.navigateTo({
					url: '/pages/user_info/user_info?userId='+id,
					animationType:"zoom-out"
				});
			}
			,
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e) {
				this.current = e.target.current
			},

			opendesc(id) {
				uni.navigateTo({
					url: '/pages/note-desc/note-desc',
					animationType: 'zoom-out'
				});
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.page {
		padding-top: 98rpx;
		height: 100%;
	}

	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>
