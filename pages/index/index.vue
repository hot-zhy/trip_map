<template>
	<view class="content">
		<zero-waterfall :list="dataList">
			<!--  #ifdef  MP-WEIXIN -->
			<view v-for="(item, index) of dataList" :key="index" slot="slot{{item.postId}}">
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<template v-slot:default="item">
			</template>
			<!-- #endif -->
		</zero-waterfall>
		<uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
				tabClick: false
			}
		},
		onShow() {
			console.log(uni.getStorageSync('userId'));
			// uni.removeStorageSync('userId')
			if (!uni.getStorageSync('userId')) {
				console.log("没有登录");
				uni.navigateTo({
					url: '/pages/login/login',
					animationType: "zoom-out"
				});
			}
			uni.request({
				url: 'http://192.168.1.33:8080/post/list',
				method: 'GET',
				success: (res) => {
					this.arr = res.data.data
					this.dataList = this.arr.slice(0, 5)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			this.loadMore()
		},
		onTabItemTap(e) {
			if (e.index == 0 && this.tabClick) {
				//双击事件
				console.log(e);
				uni.request({
					url: 'http://192.168.1.33:8080/post/list',
					method: 'GET',
					success: (res) => {
						uni.pageScrollTo({
							duration: 0,
							scrollTop: 0
						});
						this.arr = res.data.data
						this.dataList = this.arr.slice(0, 5)
						plus.runtime.restart();
					},
					fail: (error) => {
						console.log(error);
					},
					complete: () => {}
				});
			}
			this.tabClick = true
			setTimeout(() => {
				this.tabClick = false // 200ms 内没有第二次点击，就当作单击
			}, 200)
		},
		onLoad() {
			console.log(uni.getStorageSync('userId'));
			// uni.removeStorageSync('userId')
			if (!uni.getStorageSync('userId')) {
				console.log("没有登录");
				uni.navigateTo({
					url: '/pages/login/login',
					animationType: "zoom-out"
				});
			}
			uni.request({
				url: 'http://192.168.1.33:8080/post/list',
				method: 'GET',
				success: (res) => {
					this.arr = res.data.data
					this.dataList = this.arr.slice(0, 5)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			this.loadMore()
		},
		onReachBottom() {
			if (this.dataList.length >= this.arr.length) {
				this.loadingStatus = 'noMore'
			} else {
				this.loadStatus = 'more';
				setTimeout(() => {
					this.loadMore();
					this.loadStatus = 'loadmore';
				}, 1000)
			}

		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search',
				animationType: "zoom-out"
			});
		},
		methods: {
			// 模拟数据加载
			loadMore() {
				this.loadStatus = 'loading';
				this.page++
				this.dataList = this.dataList.concat(this.arr.slice(this.dataList.length, this.page * this.pageSize))
			}

		}
	}
</script>

<style lang="scss" scoped>
</style>
