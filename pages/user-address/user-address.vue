<template>
	<view class="">
		<view class="" v-for="(item,index) in addressInfo" :key="index">
			<div class="test-component">
				<user-hm-friend-information :options="item"></user-hm-friend-information>

			</div>
		</view>
	</view>
</template>
<script>
	import userHmFriendInformation from '@/components/user-hm-friend-information/index.vue'

	export default {
		components: {
			userHmFriendInformation
		},
		data() {
			return {
				addressInfo: [],
				userId:0
			};
		},
		onLoad(options) {
			this.userId = options.userId
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
