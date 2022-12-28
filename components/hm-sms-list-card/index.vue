<template>
	<div class="hm-sms-list-card" @click.stop="userDetail(options.userId)">
		<div class="box">
			<image class="xueshengdangan" :src="options.userNickname" />
			<image class="primary" :src="options.userAvatar" />
			<div class="sub">
				<div class="outer">
					<div class="wrap">
						<text class="paybak">{{ options.userNickname }}</text>
					</div>
				</div>
				<div class="block">
					<text class="desc">{{ options.userAccount }}</text>
				</div>
			</div>
			<view class="side" :style="isFollowed==true?'background-color:grey':'background-color:#AB2AF1'" @click.stop="changeFollow(options.userId)" style="text-align: center;padding: 10rpx;border-radius: 20rpx;color: white">{{follow}}</view>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'HmSmsListCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-sms-list-card'
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
				isFollowed:true,
				follow:"已关注"
			};
		},
		methods: {
			changeFollow(id){
				console.log(id);
				//原本是关注，要取消关注
				if(this.isFollowed==true){
					//取消关注
					uni.showModal({
						title: '确定取消关注吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if(res.confirm==true){
								uni.request({
									url: 'http://192.168.1.33:8080/user/cancel/follow/'+id,
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.isFollowed=!this.isFollowed;
								this.follow="关注ta"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					//原本没关注，关注
					uni.request({
						url: 'http://192.168.1.33:8080/user/follow/'+id,
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						},
						fail: () => {
							uni.showToast({
								title: '关注失败',
								icon:"error"
							});
						},
						complete: () => {}
					});
					this.isFollowed=!this.isFollowed;
					this.follow="已关注"
				}
			},
			userDetail(id) {
				console.log('进入详情');
				console.log(id);
				uni.navigateTo({
					url: '/pages/user_info/user_info?userId='+id,
					animationType:"zoom-out"
				});

			}
		}
	};
</script>
<style>
	@import './index.response.css';
</style>
