<template>
	<view class="container">
		<view class="" v-for="(item,index) in options.fanInfo">
			<div class="test-component">
				<fanList :options="item" @click="userDetail(item.id)"></fanList>
			</div>
		</view>
	</view>
</template>

<script>
	import fanList from '@/components/user-hm-sms-list-card/fan_index.vue';
	export default {
		components: {
			fanList
		},
		data() {
			return {
				options: {
					fanInfo:[],
					userId:0
				}
			};
		},
		onLoad(options) {
			this.options.userId=options.userId
			uni.request({
				url: 'http://192.168.1.33:8080/user/' + this.options.userId + '/fan/list',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.options.fanInfo = res.data.data
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
