<template>
  <div>
    <!-- step = 0일때 보일 부분 : 피드 리스트 -->
    <div v-if="step == 0">
      <Post v-for="(post, i) in posts" :key="i" :i="i" :post="post" :filter="filter"/>
    </div>

    <!-- step = 1일때 보일 부분 : 사진 선택 후 필터 적용하는 화면 -->
    <div v-if="step == 1">
      <div :class="`${filter} upload-image`" :style="`background-image: url(${url})`"></div>
      <div class="filters">
        <FilterBox v-for="(filter, i) in filters" :key="i" :url="url" :filter="filter">
            {{ filter }} <!-- 자식 컴포넌트에서 slot으로 데이터를 받기 위해서 -->
           <!-- slot의 장점은 간단한 데이터 전송 및 html과 함께 전송할 때 -->
           <!-- <template v-slot:a> 데이터a </template>
           <template v-slot:b> 데이터b </template> -->
        </FilterBox>
      </div>
    </div>

    <!-- step = 2일때 보일 부분 : 내용 작성 페이지 -->
  <div v-if="step == 2">
    <div :class="`${filter} upload-image`" :style="`background-image: url(${url})`"></div>
      <div class="write">
        <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
      </div>
    </div>
  </div>

  <!-- step = 3일때 보일 부분 : MyPage--> 
  <div v-if="step == 3">
    <MyPage :one="1" :two="2"/>
  </div>

</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import MyPage from './MyPage.vue';

export default {
  name: "containerComponent",
  data() {
    return {
      filters: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
      filter: '',
    };
  },
  mounted() {
    console.log('Container.vue mounted 호출됨');
    this.emitter.on('setFilter', (e)=>{
      console.log(e);
      this.filter = e;
    });
  },
  props: {
    posts: Array,
    step: Number,
    url: Object,
  },
  methods: {},
  components: {
    Post: Post,
    FilterBox: FilterBox,
    MyPage,
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>