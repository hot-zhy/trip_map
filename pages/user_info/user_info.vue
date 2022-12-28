<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<image :src="userInfo.userAvatar" style="width: 160rpx;height: 160rpx;" mode="widthFix">
							</image>
						</view>
						<view class="phone-number">{{userInfo.userNickname}} {{userInfo.userAccount}}</view>
					</view>
					<view class="box-bd">
						<view class="item" @click="followList">
							<view class="iconfont icon-wodeguanzhu" style="font-size: 50rpx;color: brown;"></view>
							<view class="text">关注{{userInfo.userFollowCount}}</view>
						</view>
						<view class="item" @click="fanList">
							<view class="iconfont icon-wode-wodefensi" style="font-size: 40rpx;color: brown"></view>
							<view class="text">粉丝{{userInfo.userFanCount}}</view>
						</view>
						<view class="item">
							<view class="iconfont icon-dianzan2" style="font-size: 45rpx;color: brown;"></view>
							<view class="text">获赞100</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<view class="li noborder" style="height: 70rpx;">
					<view class="text"
						style="display: flex;flex-direction: row;justify-content: space-evenly;justify-items: center;align-items: center;align-content: center;">
						<view class="iconfont icon-dingwei" style="font-size: 25rpx;">中国</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="li " @click="myNote">
					<view class="iconfont icon-wode" style="font-size: 35rpx;"></view>
					<view class="text">TA的帖子 {{userInfo.userPostCount}}</view>
					<image class="to" src="../../static/wkiwi-user/to.png"></image>
				</view>
				<view class="li " @click="myCollect">
					<view class="iconfont icon-daohangshoucangyishoucang" style="font-size: 35rpx;"></view>
					<view class="text">TA的收藏 {{userInfo.userCollectPostCount}}</view>
					<image class="to" src="../../static/wkiwi-user/to.png"></image>
				</view>
				<view class="li " @click="myAddress">
					<view class="iconfont icon-dingweixiao" style="font-size: 35rpx;"></view>
					<view class="text">TA的地点 {{userInfo.userCollectLocationCount}}</view>
					<image class="to" src="../../static/wkiwi-user/to.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userId: 0,
				userInfo: {}
			};
		},
		onLoad(options) {
			console.log(options.userId);
			this.userId = options.userId
			uni.request({
				url: 'http://192.168.1.33:8080/user/' + this.userId,
				method: 'GET',
				success: res => {
					console.log(res);
					this.userInfo = res.data.data
				},
				fail: () => {},
				complete: () => {}
			});

		},
		methods: {
			myNote() {
				uni.navigateTo({
					url: '/pages/user-note/user-note?userId=' + this.userId,
					animationType: "zoom-out"
				});
			},
			myCollect() {
				uni.navigateTo({
					url: '/pages/user-collect/user-collect?userId=' + this.userId,
					animationType: "zoom-out"
				})
			},
			followList() {
				uni.navigateTo({
					url: '/pages/user-follow-list/user-follow-list?userId=' + this.userId,
					animationType: "zoom-out"
				});
			},
			fanList() {
				uni.navigateTo({
					url: '/pages/user-fan-list/user-fan-list?userId=' + this.userId,
					animationType: "zoom-out"
				});
			},
			myAddress() {
				uni.navigateTo({
					url: '/pages/user-address/user-address?userId=' + this.userId,
					animationType: "zoom-out"
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.header {
		background: #fff;
		height: 290upx;
		padding-bottom: 110upx;

		.bg {
			width: 100%;
			height: 270upx;
			padding-top: 100upx;
			background-color: #6A5DAC;
		}
	}

	.box {
		width: 650upx;
		height: 280upx;
		border-radius: 20upx;
		margin: auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;
			}

			.phone-number {
				width: 100%;
				text-align: center;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60upx;
					height: 60upx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15upx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243, 243, 243);
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx;
			}
		}
	}
</style>
