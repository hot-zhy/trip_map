<template>
	<view class="">
		<view class="py-1" v-for="(item,index) in addressInfo" :key="index">
			<hm-news-card :options="item"></hm-news-card>
		</view>
	</view>
</template>
<script>
	import hmNewsCard from '@/components/hm-news-card/index.vue';
	export default {
		components:{
			hmNewsCard
		},
		data() {
			return {
				addressInfo: []
			};
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			uni.request({
				url: 'http://192.168.1.33:8080/user/' + this.userId + '/post/collect/list',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.addressInfo = res.data.data
				},
				fail: () => {
					uni.showToast({
						title: '获取地点列表失败',
						icon: "error"
					});
				},
				complete: () => {}
			});
		},
		methods: {
			
			
		}
	};
</script>
<style>
	@import '../../components/hm-news-card/index.response.css';

	page {
		background-color: #f3f3f3;
	}
</style>
