import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//使用常量替代 Mutation 事件类型，多人协作的大型项目中，这会很有帮助。
const OPEN_PICTURE_VIEWER = 'switchPicViewer'
const CLOSE_PICTURE_VIEWER = 'closePicViewer'

//在发布环境下关闭严格模式，以避免性能损失：
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    switchPicViewer: false,
    viewTargetPicUrl: ''
  },
  mutations: {
    [OPEN_PICTURE_VIEWER](state, payload){
      console.log('OPEN PicViewer in store/index.js')
      state.switchPicViewer = true
      console.log('payload.targetPicUrl：' + payload.targetPicUrl)
      state.viewTargetPicUrl = payload.targetPicUrl
    },
    [CLOSE_PICTURE_VIEWER](state){
      console.log('close PicViewer in store/index.js')
      state.switchPicViewer = false
    }
  }
})
