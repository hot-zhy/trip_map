<template>
	<view class="">
		<div class="hm-news-card" @longtap="longtap(options.postId)" @click="openDetail(options.postId)">
			<div class="container">
				<div class="box">
					<image :src="options.postImageList" mode="" class="w-100" mode="aspectFill"></image>
					<view class="title">{{ options.postTitle }}</view>
					<view class="submain">
						<view class="author">{{options.userName }}</view>
						<view class="date">{{options.postLikeCount}}人赞过</view>
					</view>
					<view class="summary" >{{ options.postDesc }}</view>
				</div>
			</div>
		</div>
	</view>
</template>
<script>
	export default {
		name: 'HmNewsCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-news-card'
			},
			options: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {

			return {};
		},
		methods: {
			openDetail(postId) {
				console.log(postId);
				uni.request({
					url: 'http://192.168.1.33:8080/post/' + postId,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						let item = encodeURIComponent(JSON.stringify(res.data.data))
						uni.navigateTo({
							url: '/pages/note-desc/note-desc?item=' + item,
							animationType: 'zoom-out'
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			longtap(id) {
				console.log('长按');
				uni.showModal({
					title: '是否要取消收藏？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						console.log(res);
						if (res.confirm === true) {
							// 调用后端取消关注接口
							console.log('取消收藏帖子，调用API');
							uni.request({
								url: 'http://192.168.1.33:8080/post/cancel/' + id + '/collect',
								method: 'PUT',
								success: res => {
									console.log(res);
								},
								fail: () => {
									uni.showToast({
										title: '取消收藏帖子失败',
										icon: "error"
									});
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	};
</script>
<style>
	@import './index.response.css';
</style>
