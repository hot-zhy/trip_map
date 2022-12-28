export default{
	state:{
		//登录状态
		userId:1
	},
	mutations:{
		//登录
		login(state,userId){
			state.userId=userId
		}
	}
}