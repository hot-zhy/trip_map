<script>
	export default {
		onLaunch: function() {
			// uni.removeStorageSync('isLogin')
			let session=uni.getStorageSync('isLogin')
			console.log(session);
			if(session===1){
				//存在则关闭启动页进入首页
				plus.navigator.closeSplashscreen();
				
			}else{
				//不存在跳转至登录页
				uni.reLaunch({
					url:'/pages/login/login',
					success: () => {
						plus.navigator.closeSplashscreen();
					}
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("@/static/fonts/iconfont.css");
	@import "uview-ui/index.scss";
	@import "/common/zcm-main.css";

</style>
