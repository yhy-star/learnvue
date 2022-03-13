<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物车</div>
    </NavBar>
    <TabControl class="tab-control"
                :titles="['流行', '新款', '精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabShow"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <FeatureView/>
      <TabControl :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"/>
      <GoodsList :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBCTop"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import BackTop from "../../components/content/backTop/BackTop";

import {
  getHomeMultiData,
  getHomeData
} from "../../networks/home";

import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";
import FeatureView from "./childComponents/FeatureView";
import Scroll from "../../components/common/scroll/Scroll";

import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";

import {debounce} from "../../common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: null,
      dKeyWords: null,
      keyWords: null,
      recommends: null,
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      isShowBCTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
      saveY: 0
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultiData()

    //  2.请求商品数据
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')


  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.dKeyWords = res.data.dKeyword.list
        this.keyWords = res.data.keywords.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1
      getHomeData(type, page).then(res => {
        this.goods[type].list.push(...(res.data.list))
        this.goods[type].page++
        // this.$refs.scroll.finishPullU()
        // console.log(res)
      })
    },
    tabClick(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
      // console.log(this.$refs.scroll)
    },
    contentScroll(position) {
      // console.log(position)
      this.isShowBCTop = -position.y > 1000 ? true : false

      this.isTabShow = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeData(this.currentType)
      this.$refs.scroll.finishPullU()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  mounted() {
    // 防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    // 3.进行bus对item图片加载更新事件监听
    this.$bus.$on('itemImageUpload', () => {
      refresh()
    })
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll ? this.$refs.scroll.scroll.y : 0
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.fixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
</style>
