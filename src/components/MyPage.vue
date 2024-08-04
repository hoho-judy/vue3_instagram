<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="사용자 검색" @input="search" />
    <div v-for="follower in followers" :key="follower.id">
      <div class="post-header">
        <div
          class="profile"
          :style="`background-image: url(${follower.image})`"
        ></div>
        <span class="profile-name">{{ follower.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { computed, onMounted, reactive, ref, toRefs, watch } from "vue";
import { onMounted, ref } from "vue";
import axios from "axios";
// import {useStore} from 'vuex';

export default {
  name: "MyPage",
  props: {
    one: Number,
    two: Number,
  },

  // composition api 사용하려면 setup() 정의해야함
  // data, methods, computed, watcher, hoook 모두 가능
  // 1. props 받고 싶으면 setup 첫번째 파라미터로 줌(두번째는 context를 보냄)
  //   setup(props) {
  //     // ref 함수를 항시 사용해야함. 모든 데이터를 reference data type으로 감싸야 데이터가 바뀌어도 화면에 실시간 반영 가능
  //     let followers = ref([]);

  //     // ref()와 동일한 기능을 하는데 reactive는 보통 array, object를 넣음 / ref는 그 나머지 자료형을 집어넣음(숫자, 문자, 불린 등)
  //     let test = reactive({name: 'judy'});
  //     let { one, two } = toRefs(props);

  //     console.log(test.value, one.value, two.value);

  //     // 2. setup 안에서 watch 사용 법
  //     // watch할 데이터, 콜백함수
  //     watch( one , ()=> {
  //         console.log(one);
  //     })

  //     // 3. computed 쓰는 법
  //     let result = computed(() => {
  //         return followers.value.length;
  //     })
  //     // 0이 나오는 이유 : ajax 호출보다 실행되기 때문에.
  //     console.log(result.value);

  //     // 4. vuex store 쓰는 법
  //     // 위에 임포트 먼저 해라
  //     // 단, mapState 쓸 수 없음(vuex5 버전 이상에서는 나올수도 있음)
  //     let store = useStore();
  //     console.log(store.state.name);

  //     // 5. setup 안에서 hook 쓰는 법
  //     onMounted(() => {
  //         axios.get('./follower.json')
  //         .then(res => {
  //             followers.value = res.data;
  //             // console.log(followers.value);
  //             // console.log(followers);
  //         }).catch(err =>
  //             console.log(err)
  //         );
  //     })

  //     return { followers };
  //   },

  // composion API 사용하기
  setup() {
    let followers = ref([]);
    let originFollowers = ref([]); // 백스페이스 눌러서 지웠을 때 원상복구할 데이터

    onMounted(() => {
      axios
        .get("./follower.json")
        .then((res) => {
          followers.value = res.data;
          originFollowers.value = res.data;
          // console.log(followers.value); -> array임
          // console.log(followers);
        })
        .catch((err) => console.log(err));
    });

    // 6. 함수 만들어 쓰는 법
    function search(e) {
      console.log(e.target.value);
      if (e.target.value !== '') {
        followers.value = followers.value.filter((item) => {
          return item.name.includes(e.target.value);
        });
      } else {
        followers.value = originFollowers.value;
      }
    }

    // setup에서 선언한 데이터, 함수 등 바깥에서 써야하는 것들은 모두 return 한다.
    return { followers, search };
  },

  data() {
    return {};
  },
};
</script>

<style>
</style>