<template>
  <div>
    <Post v-for="(post, i) in posts" :key="i" :post="post"/>
  </div>
</template>

<script>
import Post from './Post.vue';

export default {
    name: 'containerComponent',
    props: {
        posts: Array,
    },
    components:{
        Post: Post,
    }
};
</script>

<style>
</style>