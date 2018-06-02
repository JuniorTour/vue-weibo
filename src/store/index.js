import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//使用常量替代 Mutation 事件类型，多人协作的大型项目中，这会很有帮助。
const OPEN_PICTURE_VIEWER = 'openPicViewer'
const CLOSE_PICTURE_VIEWER = 'closePicViewer'

//在发布环境下关闭严格模式，以避免性能损失
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    switchPicViewer: false,
    viewTargetPicUrl: '',
    pagePos: 0,
    isBodyScrollDisabled: false
  },
  mutations: {
    [OPEN_PICTURE_VIEWER](state, payload){
      state.switchPicViewer = true
      state.viewTargetPicUrl = payload.targetPicUrl
    },
    [CLOSE_PICTURE_VIEWER](state){
      state.switchPicViewer = false
    },
    storePagePos(state) {
      state.pagePos = document.documentElement.scrollTop ||
                                     window.pageYOffset || document.body.scrollTop;
    },
    restorePagePos(state) {
      window.scrollTo(0, state.pagePos);
    },
    enableBodyScroll(state) {
      state.isBodyScrollDisabled = false;
      document.body.classList.remove('scroll-disabled');
    },
    disableBodyScroll(state) {
      state.isBodyScrollDisabled = true;
      document.body.classList.add('scroll-disabled');
    }
  }
})
