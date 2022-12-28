<template>
	<view class="p-2">
		<fui-button text="默认按钮" backgroundColor="#6A5DAC" height="50rpx" color="white" :isCounter="true"
			counterColor="white" placeholder="填写标题能获得更多赞哦~" :textareaBorder="true" borderColor="black"
			:borderBottom="true" v-model="title"></fui-button>
		<fui-button text="默认按钮" backgroundColor="#6A5DAC" color="white" :isCounter="true" counterColor="white"
			placeholder="请填写您的内容" v-model="desc" height="350rpx"></fui-button>

		<!-- 地点 -->
		<view
			style="display: flex;align-items: center;justify-items: center;justify-content: space-around;margin-top: 20rpx;">
			<view class="iconfont icon-didian">添加地点</view>
			<view class="">
				<superwei-combox :candidates="candidates" placeholder="请选择或输入一个地点" v-model="selectedItem">
				</superwei-combox>
			</view>
		</view>
		<view
			style="display: flex;align-items: center;justify-items: center;justify-content: space-around;margin-top: 20rpx;">
			<view class="iconfont icon-bianji">添加话题1</view>
			<view class="">
				<superwei-combox :candidates="candidateTopic" placeholder="请选择或输入话题" v-model="selectedTopic">
				</superwei-combox>
			</view>
		</view>
		<view
			style="display: flex;align-items: center;justify-items: center;justify-content: space-around;margin-top: 20rpx;">
			<view class="iconfont icon-bianji">添加话题2</view>
			<view class="">
				<superwei-combox :candidates="candidateTopic" placeholder="请选择或输入话题" v-model="selectedTopic2">
				</superwei-combox>
			</view>
		</view>
		<view
			style="display: flex;align-items: center;justify-items: center;justify-content: space-around;margin-top: 20rpx;">
			<view class="iconfont icon-bianji">添加话题3</view>
			<view class="">
				<superwei-combox :candidates="candidateTopic" placeholder="请选择或输入话题" v-model="selectedTopic3">
				</superwei-combox>
			</view>
		</view>
		<!-- 添加图片 -->
		<view class="" @tap="chooseImages" style="display: flex;flex-wrap: wrap;margin-top:20rpx">
			<image src="../../static/images/add.png" mode="widthFix" style="width: 150rpx;height: 150rpx;"></image>
			<view class="" v-for="(item,index) in imageList" :key="index">
				<image :src="item" mode="" style="width: 150rpx;height: 150rpx;border-radius: 20rpx;margin-left: 20rpx;"></image>
			</view>
		</view>
		<!-- 发布帖子 -->
		<button @tap="publish" style="margin-top: 20rpx;background-color: #6A5DAC;color: white;border-radius: 40rpx;width: 95%;">发布帖子</button>

	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/mmmm-image-tools/index.js';
	import fuiButton from "@/components/fui-textarea/fui-textarea.vue";
	export default {
		components: {
			fuiButton
		},
		data() {
			return {
				candidates: ['武康路', '上海自然博物馆', '甜爱路', '滴水湖', '上海天文馆',
					'M50创意园', '上海失恋博物馆', '上海电影博物馆', '	魔都矩阵', '上海独角兽星空艺术馆', '上海惊魂密境',
					'上海动物园', '外滩观光隧道', '上海星空艺术馆', '苏州河十八湾', '长风海洋世界-水族馆', '上海乐高探索中心', '南京路步行街', '上海大世界', '顾村公园',
					'共青国家森林公园', '中共一大会址', '迪士尼度假区', '朱家角古镇', '四行仓库', '泰晤士小镇', '锦江乐园', '欢乐谷', '辰山植物园', '外白渡桥', '旭辉天地',
					'长风公园', '静安寺', '浦东图书馆', '世纪公园', '1192弄老上海风情街', '东方明珠广播电视塔', '上海世博园', '上海植物园', '田子坊', '上海科技馆'
				],
				candidateTopic: [
					'美食',
					'拍照姿势不重样',
					'五一去哪玩',
					'夜景拍照',
					'压马路',
					'上海武康路',
					'美景'
				],
				selectedItem: '',
				selectedTopic: '',
				selectedTopic2: '',
				selectedTopic3: '',
				title: "",
				desc: "",
				place: "上海植物园",
				topicList: [{
						id: 0,
						name: "歌词"
					},
					{
						id: 1,
						name: "诗歌"
					}
				],
				imageList: [],
				topicList:[]
			}
		},
		methods: {
			publish(){
				console.log(this.title);
				console.log(this.desc);
				console.log(this.selectedItem);
				console.log(this.selectedTopic);
				console.log(this.selectedTopic2);
				console.log(this.selectedTopic3);
				console.log(this.imageList);
				if(this.selectedTopic!==''){
					this.topicList.push(this.selectedTopic)
				}
				if(this.selectedTopic2!==''){
					this.topicList.push(this.selectedTopic2)
				}
				if(this.selectedTopic3!==''){
					this.topicList.push(this.selectedTopic3)
				}
				uni.request({
					url: 'http://192.168.1.33:8080/post/publish',
					method: 'POST',
					data: {
						"postDesc":this.desc,
						"postImageList":this.imageList.join(","),
						"postTitle":this.title,
						"recommendPlace":this.selectedItem,
						"topicList":this.topicList
					},
					success:(res)=>{
						console.log(res);
						uni.navigateTo({
							url: '/pages/my-note/my-note',
							animationType:'zoom-out'
						});
					},
					fail: (error) => {
						console.log(error);
					},
					complete: () => {}
				});
			},
			chooseImages() {
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					success: res => {
						//上传图片
						for(let i =0;i<res.tempFilePaths.length;i++){
							uni.uploadFile({
								url:'http://192.168.1.33:8080/post/upload',
								filePath:res.tempFilePaths[i],
								name:'file',
								header:{
									'Content-Type':'multipart/form-data'
								},
								success: (res) => {
									console.log(JSON.parse(res.data).message);
									this.imageList.push(JSON.parse(res.data).message)
								},
								fail: (error) => {
									console.log(error);
								},
								complete: () => {
									if(this.imageList.length==res.tempFilePaths.length){
										// 发布帖子
										console.log('发布帖子');
										console.log(this.imageList.join(","));
										// uni.request({
										// 	url: 'http://192.168.1.33:8080/post/publish',
										// 	method: 'GET',
										// 	data: {},
										// 	success: res => {},
										// 	fail: () => {},
										// 	complete: () => {}
										// });
									}
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
