<template>
	<view class="container">
		<view class="" v-for="(item,index) in options.followInfo">
			<div class="test-component">
				<hm-sms-list-card :options="item" ></hm-sms-list-card>
			</div>
		</view>
	</view>
</template>

<script>
	import HmSmsListCard from '@/components/hm-sms-list-card/index.vue';
	export default {
		components: {
			HmSmsListCard
		},
		data() {
			return {
				options: {
					followInfo:[]
				}
			};
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			uni.request({
				url: 'http://192.168.1.33:8080/user/' + this.userId + '/follow/list',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.options.followInfo = res.data.data
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
			onClick(e) {
				console.log('执行click事件', e.data)
				uni.showToast({
					title: '点击反馈'
				});
			},
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none'
				});
			},
			userDetail(id) {
				console.log(id);
				console.log('点击');
			}
		}
	};
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;
}
</style>
