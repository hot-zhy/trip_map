import vue from 'vue'
import vuex from 'vuex'
import user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		user
	}
})