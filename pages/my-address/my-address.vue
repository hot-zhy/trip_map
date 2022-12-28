<template>
	<view class="">
		<view class="" v-for="(item,index) in addressInfo" :key="index">
			<div class="test-component">
				<hm-friend-information-card :options="item"></hm-friend-information-card>

			</div>
		</view>
	</view>
</template>
<script>
	import HmFriendInformationCard from '@/components/hm-friend-information-card/index.vue'

	export default {
		components: {
			HmFriendInformationCard
		},
		data() {
			return {
				addressInfo: []
			};
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			uni.request({
				url: 'http://192.168.1.33:8080/user/' + this.userId + '/address/list',
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
			onClick: function(e) {
				console.log('onClick');
			}
		}
	};
</script>
<style>
	page {
		background: #f3f3f3;
	}
</style>
