<template>
  <div>
    <Swiper :slideCount="this.banners.length">
      <SwiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "../../../components/common/swiper"

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    console.log(this.banners.length)
  }
}
</script>

<style scoped>

</style>
