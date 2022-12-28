<template>
	<view class="content">
		<map style="width: 100%;height: 100vh;" :layer-style='5' :show-location='true' :latitude="latitude"
			:longitude="longitude" :markers="marker" :scale="scale" @markertap="markertap" @callouttap='callouttap'>

		</map>
	</view>
</template>

<script>
	const map = new Array();
	map["辰山植物园"] = {
		latitude: 31.07529, //纬度
		longitude: 121.18142, //经度
	};
	map["上海植物园"] = {
		latitude: 31.14792, //纬度
		longitude: 121.43757, //经度
	};
	map["上海自然博物馆"] = {
		latitude: 121.462646,
		longitude: 31.234991
	};
	map["武康路"] = {
		latitude: 121.438303,
		longitude: 31.204366
	};
	map["甜爱路"] = {
		latitude: 121.484276,
		longitude: 31.269424
	};
	map["上海科技馆"] = {
		latitude: 121.541672,
		longitude: 31.218216
	};
	map["田子坊"] = {
		latitude: 121.468417,
		longitude: 31.208032
	};
	map["上海植物园"] = {
		latitude: 121.444115,
		longitude: 31.147095
	};
	map["上海世博园"] = {
		latitude: 121.468758,
		longitude: 31.175261
	};
	map["东方明珠广播电视塔"] = {
		latitude: 121.50161,
		longitude: 31.239862
	};
	map["1192弄老上海风情街"] = {
		latitude: 121.48941,
		longitude: 31.40527
	};
	map["世纪公园"] = {
		latitude: 121.552864,
		longitude: 31.216316
	};
	map["浦东图书馆"] = {
		latitude: 121.541512,
		longitude: 31.192097
	};
	map["静安寺"] = {
		latitude: 121.445297,
		longitude: 31.22344
	};

	map["长风公园"] = {
		latitude: 121.389404,
		longitude: 31.228651
	};

	map["旭辉天地"] = {
		latitude: 121.326241,
		longitude: 31.302874
	};

	map["外白渡桥"] = {
		latitude: 121.187004,
		longitude: 31.098671
	};

	map["辰山植物园"] = {
		latitude: 121.183037,
		longitude: 31.075001
	};
	map["欢乐谷"] = {
		latitude: 121.201813,
		longitude: 31.060471
	};
	map["锦江乐园"] = {
		latitude: 121.410843,
		longitude: 31.14134
	};
	map["泰晤士小镇"] = {
		latitude: 121.197433,
		longitude: 31.029135
	};
	map["四行仓库"] = {
		latitude: 121.471733,
		longitude: 31.240662
	};
	map["朱家角古镇"] = {
		latitude: 121.054642,
		longitude: 31.107811
	};
	map["迪士尼度假区"] = {
		latitude: 121.662743,
		longitude: 31.139929
	};
	map["中共一大会址"] = {
		latitude: 121.475227,
		longitude: 31.22014
	};
	map["共青国家森林公园"] = {
		latitude: 121.552193,
		longitude: 31.318802
	};
	map["顾村公园"] = {
		latitude: 121.376709,
		longitude: 31.341721
	};
	map["上海大世界"] = {
		latitude: 121.47439,
		longitude: 31.23026
	};
	map["南京路步行街"] = {
		latitude: 121.48506,
		longitude: 31.23779
	};
	map["上海乐高探索中心"] = {
		latitude: 121.395256,
		longitude: 31.222654
	};
	map["长风海洋世界-水族馆"] = {
		latitude: 121.389404,
		longitude: 31.228651
	};
	map["苏州河十八湾"] = {
		latitude: 121.379379,
		longitude: 31.220257
	};
	map["上海星空艺术馆"] = {
		latitude: 121.483742,
		longitude: 31.236649
	};
	map["外滩观光隧道"] = {
		latitude: 121.48941,
		longitude: 31.40527
	};
	map["上海动物园"] = {
		latitude: 121.36319,
		longitude: 31.192682
	};
	map["上海惊魂密境"] = {
		latitude: 121.484062,
		longitude: 31.236553
	};
	map["上海独角兽星空艺术馆"] = {
		latitude: 121.483742,
		longitude: 31.236649
	};
	map["魔都矩阵"] = {
		latitude: 121.498482,
		longitude: 31.246799
	};
	map["上海电影博物馆"] = {
		latitude: 121.438057,
		longitude: 31.186234
	};
	map["上海失恋博物馆"] = {
		latitude: 121.483528,
		longitude: 31.236805
	};
	map["M50创意园"] = {
		latitude: 121.448776,
		longitude: 31.24785
	};
	map["上海天文馆"] = {
		latitude: 121.925713,
		longitude: 30.911921
	};
	map["滴水湖"] = {
		latitude: 121.940918,
		longitude: 30.897409
	};

	export default {
		data() {
			return {
				latitude: 31.208032, //纬度
				longitude: 121.468417, //经度
				scale:11, //缩放级别
				bottomData: false,
				marker: [],
				placeList: []
			}
		},
		computed: {
			coverbottom() {
				let data = ''
				if (this.bottomData) {
					data = '20rpx'
				} else {
					data = '100rpx'
				}
				return data
			}
		},
		onShow() {
			uni.request({
				url: 'http://192.168.1.33:8080/address/recommend',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.placeList = res.data.data
					this.placeList = this.placeList.filter(obj => obj !== null)
					console.log(this.placeList);
					for (let i = 0; i < this.placeList.length; i++) {
						this.marker.push({
							id: this.placeList[i].placeId,
							longitude: map[this.placeList[i].placeAddress].latitude, //经度
							latitude: map[this.placeList[i].placeAddress].longitude, //纬度
							iconPath: '/static/images/location.png', //显示的图标        
							rotate: 0, // 旋转度数
							width: 20, //宽	
							height: 30, //高
							label:{
								content: map[this.placeList[i].placeAddress],
								color:'#272822'
							},
							title:map[this.placeList[i].placeAddress],
							// title: map[this.placeList[i].placeAddress], //标注点名
							alpha: 0.5, //透明度
							callout: { //自定义标记点上方的气泡窗口 点击有效  
								content: this.placeList[i].placeAddress, //文本
								color: '#ffffff', //文字颜色
								fontSize: 14, //文本大小
								borderRadius: 15, //边框圆角
								borderWidth: '10',
								bgColor: '#AB2AF1', //背景颜色
								display: 'ALWAYS', //常显
							},
						})
					}
					console.log(this.marker);
					
				},
				fail: (res) => {
					console.log(res);
				},
				complete: () => {}
			});
		},
		onLoad() {
			//获取推荐地点
		

		},
		methods: {
			//地图点击事件
			markertap(e) {
				console.log("===你点击了标记点===", e)
				console.log(e.target.markerId);
				let placeName="";
				// 查找该标记点的名字
				for(let i=0;i<this.placeList.length;i++){
					if(this.placeList[i].placeId==e.target.markerId){
						placeName=this.placeList[i].placeAddress
					}
				}
				//查询与该地点相关的帖子
				uni.request({
					url: 'http://192.168.1.33:8080/post/find/'+e.target.markerId+'/post',
					method: 'GET',
					success: res => {
						let item = encodeURIComponent(JSON.stringify(res.data.data))
						uni.showModal({
							title:'你点击了 '+placeName,
							content: '经度:'+e.target.latitude+'   纬度:'+e.target.longitude,
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
			//地图点击事件
			callouttap(e) {
				console.log('地图点击事件', e)
			}
		}
	}
</script>
