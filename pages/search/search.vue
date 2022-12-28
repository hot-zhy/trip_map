<template>
	<view>
		<template v-if="searchList.length===0">
			<!-- 搜索历史 -->
			<uni-card title="搜索历史">
				<!-- 搜索历史列表 -->
				<view class="px-1 mb-2" v-if="list.length!==0">
					<view @click="clickSearchHistory(item)" hover-class="bg-light"
						class="px-2 py-1 border d-inline-block m-1" :style="getStyle" v-for="(item,index) in list.slice(0,20)" :key="index" style="border-radius: 20upx;">{{item}}</view>
				</view>
				<view v-if="list.length===0">
					还没有搜索历史~
				</view>
			</uni-card>
		</template>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue';
	import colorTag from '@/components/search/color-tag.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components:{
			card,colorTag,uniListItem
		},
		data() {
			return {
				searchText:"",
				scrollH:600,
				// 搜索历史
				list:[],
				// 搜索结果
				searchList:[],
				userResult:[],
				placeResult:[],
				postResult:[]
			}
		},
		onLoad() {
			if(this.list.length===0){
				this.list=JSON.parse(uni.getStorageSync('historySearchText'))
			}
		},
		onNavigationBarSearchInputChanged(e) {
			console.log(e);
			this.searchText=e.text
		},
		onNavigationBarButtonTap() {
			// 收起键盘
			uni.hideKeyboard()
			if(this.searchText!==""){
				// 加入搜索历史
				let index = this.list.findIndex(v => v === this.searchText)
				if (index !== -1) {
					if (index !== 0) {
						this.list.unshift(this.list.splice(index, 1)[0]);
					}
				} else {
					this.list.unshift(this.searchText)
				}
				// 保存到本地存储
				if(this.list.length!==0){
					uni.setStorageSync('historySearchText', JSON.stringify(this.list))
				}
				// 处于加载中状态
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				// 请求搜索
				uni.navigateTo({
					url: '/pages/search-list/search-list?searchText='+this.searchText,
					animationType:'zoom-out'
				});
			}else{
				uni.showToast({
					title: '请输入搜索内容',
					icon:'none'
				});
			}
		},
		computed:{
			getStyle(){
				let color={
					borderColor:['#eea6aa','#98d5d8','#9dbe93','#bccd99','#EAD6BC'],
					background:['#f8eae9','#e8f6f6','#e4f5e2','#f2f6e8','#FCE8CE'],
					
				}
				let index=Math.floor(Math.random()*color.borderColor.length)
				let borderColor=color.borderColor[index]
				let bgColor=color.background[index]
				return `background:${bgColor};border-color:${borderColor}`
			}
		},
		methods: {
			clickSearchHistory(item){
				// 处于加载中状态
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				this.searchText=item
				// 请求搜索
				uni.navigateTo({
					url: '/pages/search-list/search-list?searchText='+this.searchText,
					animationType:'zoom-out'
				});
			}
		}
	}
</script>

<style>

</style>
