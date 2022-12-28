<template>
	<view>
		<view class="py-1" v-for="(item,index) in postList" :key="index">
			<hm-news-card :options="item"></hm-news-card>
		</view>
	</view>
</template>

<script>
	import hmNewsCard from '@/components/hm-news-card/index.vue';
	export default {
		components:{
			hmNewsCard
		},
		data() {
			return {
				postList: []
			}
		},
		onLoad(options) {

			this.postList = JSON.parse(options.item)
			console.log(this.postList);

		},
		methods: {

		}
	}
</script>

<style>
	@import '../../components/hm-news-card/index.response.css';
</style>
