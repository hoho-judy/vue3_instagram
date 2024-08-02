<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="next">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>
  
  <!-- <h4>안녕 {{ $store.state.name }}</h4>
  <p>나이 : {{ $store.state.age }}</p> -->

  <!-- store.js에 정의된 함수 호출 -->
  <!-- <button @click="$store.commit('plusAge', 10)">버튼</button>  -->
  <!-- <button @click="doLike(10)">버튼</button>  -->
  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기버튼</button>
  
  <p>{{ myName }} {{age}} {{likes}} </p>

  <Container
    :posts="posts"
    :step="step"
    :url="url"
    :item="item"
    @write="item.content = $event"
  />

  <!-- 컴퓨티드 함수는 함수명만 표기 -->
  <!-- methods 함수는 함수명() 표기 -->
  <!-- <p>{{ now2 }} {{ count }}</p>
  <button @click="count++">버튼</button> -->

  <div v-if="step == 0" class="more-button">
    <button @click="viewMore">더보기</button>
  </div>

  <div class="footer">
    <ul class="footer-button-plus">
      <!-- input type file로 할 때 여러개 파일을 올리려면 multiple 속성을 축가. 없으면 기본 1개만 업로드 -->
      <!-- <input @change="upload" multiple accept="image" type="file" id="file" class="inputfile" />  -->
      <input @change="upload" type="file" id="file" class="inputfile" />
      <!-- 파일업로드할 인풋 -->
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- 탭ui 뼈대 -->
  <!-- 
  <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button> -->
</template>

<script>
import Container from "./components/Container.vue";
import datas from "./assets/data.js";
import axios from "axios";
import { mapMutations, mapState } from 'vuex';

export default {
  name: "App",
  data() {
    return {
      posts: datas,
      moreCnt: 0,
      step: 0,
      url: "",
      item: {},
      filter: "",
      count: 0,
    };
  },
  mounted() {
    // 자식이 보낸 emitter 수신
    this.emitter.on("setFilter", (e) => {
      console.log(`app.vue mounted : ${e}`);
      this.filter = e;
    });
  },
  methods: {
    // 더보기 버튼 클릭
    viewMore() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.moreCnt}.json`)
        .then((res) => {
          this.posts.push(res.data);
          this.moreCnt++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 파일업로드
    upload(e) {
      let files = e.target.files;
      console.log(files);
      this.url = URL.createObjectURL(files[0]);
      this.step++;
    },
    next() {
      this.step++;
    },

    // 입력한 내용을 오브젝트로 만들어서 posts에 unshift해서 맨 앞에 끼워넣기
    publish() {
      let myPost = {
        name: "judy",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.url,
        likes: 0,
        date: "July 31",
        liked: false,
        content: this.item.content,
        filter: this.filter,
      };
      console.log({myPost});
      this.posts.unshift(myPost);
      this.step = 0; // 메인 페이지로 돌아오기
    },
    // now() {
    //   return new Date();
    // },

    // vuex의 뮤테이션 함수들을 모두 가져오고 싶을 때
    ...mapMutations(['changeName', 'plusAge','doLike','setMore',]),
  },
  components: {
    Container: Container,
  },
 
  // 컴퓨티드 vs methods  
  // methods 안에 정의된 함수는 호출될 때마다 새로 읽는다.
  // 컴퓨티드 : 처음에만 실행하고 값을 간직하고 있음. ex) 계산된 결과를 최초에만 저장해놓고 계속 쓸 때 유리
  computed: {
    // now2() {
    //   return new Date();
    // }
    
    // 컴퓨티드 여러개 쓰면 쓰나마나니까 ...mapState([]) 로 내가 가져오고 싶은 state를 모두 가져온다.
    ...mapState(['name', 'age', 'likes', 'isLiked', 'more']),
    ...mapState({ myName: 'name', myAge: 'age', }), // 새로운 이름으로 가져다 쓰고 싶을 때 오브젝트 형태로 정의
    
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
.more-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
