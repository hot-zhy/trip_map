<template>
	<uni-card :subTitle="item.intro" :title="item.postDesc"  :extra="item.time" :thumbnail="item.postImageList">{{item.intro}}</uni-card>
</template>

<script>
	import uniCard from '@/components/uni-card/components/uni-card/uni-card.vue';
	export default{
		props:['item'],
		components:{
			uniCard
		}
	}
</script>

<style>
</style>