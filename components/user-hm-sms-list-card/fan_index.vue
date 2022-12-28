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
			return {};
		},
		methods: {
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
