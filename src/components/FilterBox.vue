<template>
  <div :class="`${filter} filter-item`" :style="`background-image: url(${url})`"> 
    <slot></slot> <!-- 부모가 보낸 데이터를 자식이 사용하는 방법 slot : 빵꾸뚫기-->
    <!-- 구멍 여러개 뚫고 싶을 때 -->
    <!-- <slot :name="a"></slot> 
    <slot :name="b"></slot>  -->
    <!-- 거꾸로 자식이 보낸 데이터를 부모가 받을 때 : slot props -->
    <!-- 자식 : <slot :보낼데이터명="보낼데이터명>", data return 부분에 데이터 선언 -->
    <!-- 부모 : <template v-slot:default="받을데이터명"> {{받을데이터명}} </template>-->
  </div> 
</template>

<script>
export default {
    name: 'filterBox',
    props : {
        url: String,
        filter: String,
    }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>