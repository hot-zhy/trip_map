<template>
	<view class="container" style="background-image: url(../../static/images/bg8.png);">
		<view class="waterfall_left">
			<view class="waterfall_item" v-for="(item,index) in listLeft" :key="index" @click="openDetail(item.postId)">
				<view class="item_img" v-if="item.postImageList">
					<!-- <image :src="item.url" mode="widthFix" @load="considerPush"></image> -->
					<zero-lazy-load :image="item.postImageList+'?imageView2/2/w/540/image/webp.webp'" :imgMode='imgMode'
						@load='considerPush' @error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info">
					<view class="item_info_title">{{item.postTitle}}</view>
					<view class="item_info_note">{{item.postDesc}}</view>
					<!--  #ifdef  MP-WEIXIN -->
					<slot name="slot{{item.postId}}" />
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<slot v-bind="item" />
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="waterfall_right">
			<view class="waterfall_item" v-for="(item,index) in listRight" :key="index" @click="openDetail(item.postId)">
				<view class="item_img" v-if="item.postImageList">
					<!-- <image :src="item.url" mode="widthFix" @load="considerPush"></image> -->
					<zero-lazy-load :image="item.postImageList+'?imageView2/2/w/540/image/webp.webp'" :imgMode='imgMode'
						@load='considerPush' @error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info">
					<view class="item_info_title">{{item.postTitle}}</view>
					<view class="item_info_note">{{item.postDesc}}</view>
					<!--  #ifdef  MP-WEIXIN -->
					<slot name="slot{{item.postId}}" />
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<slot v-bind="item" />
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		name: "zero-waterfall",
		props: {
			// 需要在使用页面 onPageScroll 传进来
			list: {
				type: Array,
				required: true,
				default: []
			},
			// 图片裁剪模式
			imgMode: {
				type: String,
				default: 'widthFix'
			},
		},
		data() {
			return {
				listLeft: [],
				listRight: [],
				newList: [],
			}
		},
		watch: {
			list(newValue, oldValue) {
				this.newList = newValue.slice(oldValue.length);
				this.considerPush()
			},
		},
		mounted() {
			this.init()
		},

		methods: {
			openDetail(postId){
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
			// 触发重新排列
			init() {
				this.newList = [...this.list];
				this.listLeft = [];
				this.listRight = [];
				if (this.newList.length != 0) {
					this.listLeft.push(this.newList.shift()); //触发排列
					// this.listRight.push(this.newList[1]); //触发排列
				}

			},
			// 清空数据列表
			clear() {
				this.listLeft = [];
				this.listRight = [];
				// 同时清除父组件列表中的数据
				this.$emit('clear', []);
				this.newList = [];
			},

			// 计算排列
			considerPush() {
				if (this.newList.length == 0) return; //没有数据了
				let leftH = 0,
					rightH = 0; //左右高度
				var query = uni.createSelectorQuery().in(this);

				query.selectAll('.waterfall_left').boundingClientRect()
				query.selectAll('.waterfall_right').boundingClientRect()
				query.exec(res => {
					// console.log('结果',res)
					leftH = res[0].length != 0 ? res[0][0].height : 0; //防止查询不到做个处理
					rightH = res[1].length != 0 ? res[1][0].height : 0;
					// console.log('结果',leftH,rightH)
					if (leftH == rightH || leftH < rightH) {
						// 相等 || 左边小  
						this.listLeft.push(this.newList.shift());
					} else {
						// 右边小
						this.listRight.push(this.newList.shift());
					}
				});

			},

		}

	}
</script>
<style lang="scss" scoped>
	.container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: flex-start;
		padding: 10rpx;
	}

	.waterfall_left,
	.waterfall_right {
		width: 47%;
	}

	.waterfall_item {
		width: 100%;
		margin-bottom: 25rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;

		.item_img {
			width: 100%;

			image {
				width: 100%;
				overflow: hidden;
			}
		}

		.item_info {
			padding: 10rpx 20rpx;

			.item_info_title {
				font-size: 32rpx;
				padding: 10rpx 0;
				line-height:1.5;
			}

			.item_info_note {
				color: #666666;
				font-size: 28rpx;
				overflow: hidden;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				line-height: 1.5;
				padding-bottom: 10rpx;

			}
		}

	}
</style>
