<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物车</div>
    </NavBar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {getHomeMultiData} from "../../networks/home";
import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners: null,
      dKeyWords: null,
      keyWords: null,
      recommends: null
    }
  },
  created() {
    getHomeMultiData().then(res => {
      // console.log(res)
      this.banners = res.data.banner.list
      this.dKeyWords = res.data.dKeyword.list
      this.keyWords = res.data.keywords.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
