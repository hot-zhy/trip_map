<template>
	<div class="hm-friend-information-card" @click="placePost(options.placeId)">
		<div class="box">
			<image class="primary" src="../../static/images/map.png" />
			<div class="side">
				<div class="namClass">
					<text class="name">{{ options.placeProvince }}</text>
				</div>
				<text class="address">{{ options.placeArea }} {{options.placeAddress}}</text>
			</div>
<!-- 			<view class="" :style="isStored==true?'background-color:grey':'background-color:#AB2AF1'" style="text-align: center;padding: 10rpx;border-radius: 20rpx;color: white" @click.stop="storeChange(options.placeId)">{{store}}</view> -->
		</div>
	</div>
</template>
<script>
	export default {
		name: 'HmFriendInformationCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-friend-information-card'
			},
			options: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {
			return {
				isStored:true,
				// store:"已收藏"
			};
		},
		methods: {
			placePost(id){
				uni.request({
					url: 'http://192.168.1.33:8080/post/find/'+id+'/post',
					method: 'GET',
					success: res => {
						let item = encodeURIComponent(JSON.stringify(res.data.data))
						uni.showModal({
							title:'你点击了: '+this.options.placeAddress,
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
			// storeChange(id){
			// 	//原本是收藏，要取消收藏
			// 	if(this.isStored==true){
			// 		uni.showModal({
			// 			title: '确定取消收藏吗？',
			// 			showCancel: true,
			// 			cancelText: '取消',
			// 			confirmText: '确定',
			// 			success: res => {
			// 				console.log(res);
			// 				if(res.confirm==true){
			// 					//取消收藏
			// 					uni.request({
			// 						url: 'http://192.168.1.111:8080/address/cancel/'+id+'/collect',
			// 						method: 'PUT',
			// 						data: {},
			// 						success: res => {
			// 							console.log(res);
			// 						}
			// 					});
			// 					this.isStored=!this.isStored
			// 					this.store="收藏ta"
			// 				}
			// 			},
			// 			fail: () => {},
			// 			complete: () => {}
			// 		});
			// 	}else{
			// 		//原本没关注，关注
			// 		uni.request({
			// 			url: 'http://192.168.1.111:8080/address/'+id+'/collect',
			// 			method: 'PUT',
			// 			data: {},
			// 			success: res => {
			// 				console.log(res);
			// 			},
			// 			fail: () => {
			// 				uni.showToast({
			// 					title: '收藏失败',
			// 					icon:"error"
			// 				});
			// 			},
			// 			complete: () => {}
			// 		});
			// 		this.isStored=!this.isStored
			// 		this.store="已收藏"
			// 	}
			// }
		}
	};
</script>
<style>
	@import './index.response.css';
</style>
