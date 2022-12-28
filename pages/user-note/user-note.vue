<template>
	<view class="">
		  <view class="py-1" v-for="(item,index) in noteInfo" :key="index" @click="openDetail(item.postId)">
			  <div class="hm-news-card">
			    <div class="container">
			      <div class="box">
			        <image :src="item.postImageList" mode="" class="w-100" mode="aspectFill"></image>
			        <span class="title">{{ item.postTitle }}</span>
			        <div class="submain">
			          <span class="author">{{item.userName }}</span>
			          <span class="date">{{item.postLikeCount}}人赞过</span>
			        </div>
			        <span class="summary">{{ item.postDesc }}</span>
			      </div>
			    </div>
			  </div>
		  </view>
	</view>
</template>

<script>	
	import uniCard from '@/components/uni-card/components/uni-card/uni-card.vue';
	import noteList from '@/components/common/note-list.vue';
	export default {
		components:{
			uniCard,noteList
		},
		data() {
			return {
				noteInfo:[
				],
				userId:0
			}
		},
		onLoad(options) {
			this.userId=options.userId
			uni.request({
				url: 'http://192.168.1.33:8080/user/'+this.userId+'/post/list',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.noteInfo=res.data.data
				},
				fail: () => {
					uni.showToast({
						title: '获取帖子列表失败',
						icon:"error"
					});
				},
				complete: () => {}
			});
		},
		methods: {
			openDetail(postId){
				console.log(postId);
				uni.request({
					url: 'http://192.168.1.33:8080/post/'+postId,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						let item=encodeURIComponent(JSON.stringify(res.data.data))
						uni.navigateTo({
							url: '/pages/note-desc/note-desc?item='+item,
							animationType:'zoom-out'	
						});
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	@import '../../components/hm-news-card/index.response.css';
page{
	background-color: #f3f3f3;
}
</style>
