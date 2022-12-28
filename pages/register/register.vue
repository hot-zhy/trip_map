<!-- 蓝色登录页面2 -->
<template>
	<view>
		<view class="img-a">
			<view class="t-b">
				<br />
				欢迎注册TripMap
			</view>
		</view>
		<view class="login-view" style="">
			<view class="t-login">
				<form class="cl">
					<view class="t-a">
						<text class="txt">昵称</text>
						<input type="text" v-model="nickName" placeholder="请输入你的昵称" maxlength="11"/>
					</view>
					<view class="t-a">
						<text class="txt">手机号</text>
						<input type="number" v-model="phone" placeholder="请输入您的手机号" maxlength="11"/>
					</view>
					<view class="t-a">
						<text class="txt">密码</text>
						<input type="password" v-model="password" maxlength="18" placeholder="请输入您的密码"/>
					</view>
					<view class="t-a">
						<text class="txt">密码确认</text>
						<input type="password" v-model="passwordAgain" maxlength="18" placeholder="请您再输入一遍密码"/>
					</view>
					<button @click="register">注册</button>
					<view class="reg" @click="goLogin">已有账号？去登录</view>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			nickName:"",
			phone:"",
			password:"",
			passwordAgain:""
		}
	},
	onLoad() {},
	methods: {
		goLogin(){
			uni.navigateTo({
				url: '/pages/login/login',
				animationType:"zoom-out"
			});
		},
		register(){
			var that = this;
			if(!that.nickName){
				uni.showToast({
					title:'请输入您的昵称',
					icon:"none"
				})
			}
			if (!that.phone) {
				uni.showToast({ title: '请输入您的手机号', icon: 'none' });
				return;
			}
			if (!that.password) {
				uni.showToast({ title: '请输入您的密码', icon: 'none' });
				return;
			}
			if(!that.passwordAgain){
				uni.showToast({ title: '请再次输入您的密码', icon: 'none' });
				return;
			}
			if(that.password!==that.passwordAgain){
				uni.showToast({ title: '两次输入密码不一致！', icon: 'none' });
				return;
			}
			uni.request({
				url: 'http://192.168.1.33:8080/user/register',
				method: 'POST',
				sslVerify:false,
				data: {
					"userAccount":this.phone,
					"userNickname":this.nickName,
					"userPassword":this.password
				},
				success: res => {
					console.log(res);
				},
				fail: (res) => {
					console.log(res);
				},
				complete: () => {}
			});
			uni.showToast({ title: '注册成功！', icon: 'none' });
			uni.navigateTo({
				url: '/pages/login/login',
				animationType:"zoom-out"
			});
			
		}
	}
};
</script>
<style>
.txt {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}
.img-a {
	width: 100%;
	height: 530rpx;
	background-image: url(../../static/images/bg6.jpg);
	background-size: 100%;
}
.reg {
	font-size: 28rpx;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
	background: #f5f6fa;
	color: #000000;
	text-align: center;
	margin-top: 30rpx;
}

.login-view {
	width: 100%;
	position: relative;
	margin-top: -120rpx;
	background-color: #ffffff;
	border-radius: 8% 8% 0% 0;
}

.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	padding-top: 80rpx;
}

.t-login button {
	font-size: 28rpx;
	background: #6A5DAC;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
}

.t-login input {
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	border-bottom: 1px solid #e9e9e9;
	font-size: 28rpx;
}

.t-login .t-a {
	position: relative;
}

.t-b {
	text-align: left;
	font-size: 42rpx;
	color: #ffffff;
	padding: 200rpx 0 0 70rpx;
	font-weight: bold;
	line-height: 70rpx;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 150rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
