import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state(){
    return {
      name: 'judy',
      age: 20,
      likes: [10,34,26,193,9],
      isLiked: [false,false,false,false,false],
      more: {}, // 더보기 게시물
    }   
  },

  // 데이터 수정 방법 정의 : mutations 하위에 데이터 변경 함수들 정의
  mutations : {
    changeName(state) {
      state.name = 'judyjudyjudy';
    },
    // 파라미터 보낼 때는 payload 이런식으로 파라미터를 전달
    plusAge(state, payload) {
      state.age += payload;
    },
    // 좋아요, 좋아요취소 기능
    doLike(state, payload) {
      if(!state.isLiked[payload]){
        state.likes[payload]++;
        state.isLiked[payload] = true;
      } else {
        state.likes[payload]--;
        state.isLiked[payload] = false;
      }
    },

    // actions안에서 사용한 ajax 호출 후 후처리 할 함수는 뮤테이션 안에 정의
    setMore(state, payload) {
        state.more = payload;
    },
  },

  // vuex에서 ajax를 요청할 때 actions에 기술
  // state를 바꿀 때 mutaions안에 ajax 요청하면 안돼? 응 안돼
  // 코드가 순차적으로 된다는 보장이 없음
  actions: {
    getData(context) {
        axios.get(`https://codingapple1.github.io/vue/more0.json`)
        .then(res =>{
           context.commit('setMore', res.data); // 결국 데이터 변경은 뮤테이션 함수가 해야함
        }).catch(e =>{
           console.log(e);
        })
    },
  },
})

export default store;