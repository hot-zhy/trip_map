<template>
	<view>
		<view class="cu-bar bg-transparent search">
			<view class="cu-avatar round " @click.stop="userDetail(desc.userId)">
				<image :src="desc.userAvatar" mode="widthFix" class="round"></image>
			</view>
			<view class="text-left padding" @click.stop="userDetail(desc.userId)">
				{{desc.userNickName}}
			</view>
			<view class="action" @click="followUser">
				<view class="padding-xs">
					<view class='cu-tag round light' :class="followed==true?'bg-grey':'bg-red'">{{follow}}</view>
				</view>
			</view>
		</view>
		<imgsBanner-tag :imgList='swiperList' autoplay duration='500' interval="5000" :isShowSmallImgs='true'
			customizeDisplayField='url'></imgsBanner-tag>
		<view style="padding: 40rpx;">
			<!-- 标题 -->
			<h2>{{desc.postTitle}}</h2>
			<!-- 主体内容 -->
			<view style="padding-top: 20rpx;line-height: 1.5;">{{desc.postDesc}}
			</view>
			<!-- 话题 -->
			<view style="display: flex;" v-for="(item,index) in topicList" :key="index">
				<view class="" style="color: blue;margin-bottom: 20rpx;margin-top: 20rpx;">#{{item.topicName}} </view>
			</view>
			<!-- 时间 地点 -->
			<view class="flex justify-between">
				<view style="font-size: 25rpx;color: darkgrey;">{{publishTime}}</view>
				<view class="iconfont icon-weizhi" style="line-height: 1.2;font-size: 25rpx;" @click="placePost">{{desc.recommendPlace}}
				</view>
			</view>
			<!-- 点赞 收藏帖子 收藏地点 -->
			<view class="flex justify-between" style="margin-top: 20rpx;">
				<view class="action" @click="likePost">
					<view class="padding-xs">
						<view class='cu-tag round light' :class="liked==true?'bg-grey':'bg-purple'">
							<view class="iconfont icon-shoucang" style="padding: 10rpx;font-size: 25rpx;">{{like}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="action" @click="collectPost">
					<view class="padding-xs">
						<view class='cu-tag round light' :class="collected==true?'bg-grey':'bg-purple'">
							<view class="iconfont icon-shoucang" style="padding: 10rpx;font-size: 25rpx;">{{collect}}
							</view>
						</view>
					</view>
				</view>


				<view class="action" @click="collectPlace">
					<view class="padding-xs">
						<view class='cu-tag round light' :class="placeCollected==true?'bg-grey':'bg-purple'">
							<view class="iconfont icon-didian" style="padding: 10rpx;font-size: 25rpx;">{{store}}
							</view>
						</view>
					</view>
				</view>



			</view>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 100rpx;"></view>
	</view>
</template>
<script>
	import data from '@/common/data/data.js'; // 数据
	import imgsBannerTag from '@/components/imgsBanner-tag/imgsBanner-tag.vue';
	export default {
		components: {
			imgsBannerTag
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				list: data.current_list,
				cardCur: 0,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				desc: [],
				publishTime: "",
				followed: false,
				follow: "关注",
				collected: false,
				collect:"收藏帖子",
				placeCollected: false,
				store: "收藏地点",
				liked: false,
				like:"已喜欢",
				postId: 0,
				topicList: [],
				userId: 0,
				placeId: 0
			}
		},
		onLoad(options) {
			this.TowerSwiper('swiperList');
			this.desc = JSON.parse(options.item)
			this.publishTime = this.desc.postPublishTime
			this.publishTime = this.dayjs(this.publishTime).format("YYYY-MM-DD HH:mm:ss");
			//生成图片列表
			var imageList = this.desc.postImageList.split(",").map(d => d.trim())
			this.imageList = imageList
			for (let i = 0; i < this.imageList.length; i++) {
				this.swiperList.push({
					imgSrc: imageList[i] + '?imageView2/2/w/540/image/webp.webp'
				})
			}
			// 该用户是否被本用户关注
			this.followed = this.desc.followed
			this.collected = this.desc.collected
			this.liked = this.desc.liked
			this.postId = this.desc.postId
			this.topicList = this.desc.topicList
			this.userId = this.desc.userId
			this.placeCollected = this.desc.placeCollected
			this.placeId = this.desc.recommendPlaceId
			// console.log(this.swiperList);
			if (this.followed) {
				this.follow = "已关注"
			} else {
				this.follow = "关注ta"
			}
			if (this.placeCollected) {
				this.store = "已收藏"
			} else {
				this.store = "收藏地点"
			}
			if (this.collected) {
				this.collect = "已收藏"
			} else {
				this.collect = "收藏帖子"
			}
			if (this.liked) {
				this.like = "已喜欢"
			} else {
				this.like = "喜欢"
			}
		},
		methods: {
			placePost(){
				uni.request({
					url: 'http://192.168.1.33:8080/post/find/'+this.placeId+'/post',
					method: 'GET',
					success: res => {
						let item = encodeURIComponent(JSON.stringify(res.data.data))
						uni.showModal({
							title:'你点击了: '+this.desc.recommendPlace,
							showCancel: true,
							cancelText: '关闭',
							confirmText: '查看相关帖子',
							success: res => {
								if(res.confirm==true){
									uni.navigateTo({
										url: '/pages/place-post/place-post?item='+item,
										animationType:"zoom-out"
									});
								}
							},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			userDetail(id) {
				console.log('进入详情');
				console.log(id);
				uni.navigateTo({
					url: '/pages/user_info/user_info?userId='+id,
					animationType:"zoom-out"
				});
			
			},
			collectPlace() {
				//原本是关注，要取消关注
				if (this.placeCollected == true) {
					uni.showModal({
						title: '确定要取消收藏吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消收藏
								uni.request({
									url: 'http://192.168.1.33:8080/address/cancel/' + this.placeId +
										'/collect',
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.placeCollected = !this.placeCollected
								this.store = "收藏地点"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没收藏，收藏
					uni.request({
						url: 'http://192.168.1.33:8080/address/' + this.placeId + '/collect',
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						},
						fail: () => {
							uni.showToast({
								title: '收藏失败',
								icon: "error"
							});
						},
						complete: () => {}
					});
					this.placeCollected = !this.placeCollected
					this.store = "已收藏"
				}
			},
			followUser() {
				//原本是关注，要取消关注
				if (this.followed == true) {
					uni.showModal({
						title: '确定要取消关注吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消关注
								uni.request({
									url: 'http://192.168.1.33:8080/user/cancel/follow/' + this.userId,
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.followed = !this.followed
								this.follow = "关注ta"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://192.168.1.33:8080/user/follow/' + this.userId,
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						},
						fail: () => {
							uni.showToast({
								title: '关注失败',
								icon: "error"
							});
						},
						complete: () => {}
					});
					this.followed = !this.followed
					this.follow = "已关注"
				}
			},
			likePost() {
				//原本是关注，要取消关注
				if (this.liked == true) {
					uni.showModal({
						title: '确定要取消喜欢吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消收藏
								uni.request({
									url: 'http://192.168.1.33:8080/post/cancel/' + this.postId+'/like',
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.liked = !this.liked
								this.like = "喜欢"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://192.168.1.33:8080/post/' + this.postId+'/like',
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						}
					});
					this.liked = !this.liked
					this.like = "已喜欢"
				}
				
			},
			collectPost() {
				//原本是关注，要取消关注
				if (this.collected == true) {
					uni.showModal({
						title: '确定要取消收藏吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消收藏
								uni.request({
									url: 'http://192.168.1.33:8080/post/cancel/' + this.postId+'/collect',
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.collected = !this.collected
								this.collect = "收藏帖子"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://192.168.1.33:8080/post/' + this.postId+'/collect',
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						}
					});
					this.collected = !this.collected
					this.collect = "已收藏"
				}
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style>
	@import '@/colorui/main.css';
	@import '@/colorui/icon.css';

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
