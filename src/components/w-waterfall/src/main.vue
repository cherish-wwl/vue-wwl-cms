<template>
  <div class="w_waterfall" ref="w_waterfall">
    <div class="loading" v-if="isPreloading">
      Loading
    </div>
    <ul>
      <li v-for="(item, index) in load_list" :key="item.id" >
        <div class="w_wf_card card_animation" :ref="'w_wf_'+index" :style="{
          top:item.top,
          left: item.left,
          width: imgBaseWidth + 'px'
        }">
          <div class="w_wf_inner">
            <div class="w_wf_image">
              <img :src="item.image" @load="imageOnload($event,item,index )" @error="imageOnload($event,item,index )"/>
            </div>
            <div class="w_wf_detail">
              <h3>{{item.title}}</h3>
              <p>{{item.content}}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>
<script>
export default {
  name: 'WWaterfall',
  props: {
    list: {
      type: Array,
      default () { return [] }
    },
    width: { // 容器宽度
      type: Number
    },
    gap: {
      type: Number,
      default: 15
    },
    mgap: {
      type: Number,
      default: 8
    },
    maxCols: {
      type: Number,
      default: 5
    },
    bgap: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      show_list: [],
      load_list: [],
      colsHeightArr: [],
      isPreloading: true,
      loadedImageCount: 0,
      cols: 0,
      isMobile: !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
    }
  },
  watch: {
    list (val) {
      this.preLoad()
    },
    cols (newV, oldV) {
      if (!oldV) return
      console.log('cols 变化')
      this.colsHeightArr = new Array(this.cols).fill(0)
      this.waterfall()
    }
  },
  computed: {
    imgBaseWidth () {
      return 270
    }
  },
  mounted () {
    this.calcuCols()
    this.colsHeightArr = new Array(this.cols).fill(0)
    this.bindEvents()
    this.preLoad()
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    bindEvents () {
      this.$on('preloaded', () => {
        this.isPreloading = false
        this.waterfall()
      })
    },
    imageOnload (e, item, index) {
      console.log('imageOnload', index, item)
      const h = this.$refs['w_wf_' + index][0]
      item.height = Math.round(this.imgBaseWidth / (h.scrollWidth / h.scrollHeight))
      item.width = h.scrollWidth
      this.loadedImageCount += 1
      if (this.loadedImageCount === this.list.length) {
        this.$emit('preloaded')
      }
    },
    preLoad () {
      const { list } = this
      const loadList = [...list]
      this.load_list = loadList
    },
    calcuCols () {
      var waterfallWidth = this.width || this.$refs.w_waterfall.scrollWidth || window.innerWidth
      var cols = parseInt(waterfallWidth / (this.imgBaseWidth + this.gap))
      cols = cols === 0 ? 1 : cols
      const r = this.isMobile ? 2 : (cols > this.maxCols ? this.maxCols : cols)
      this.cols = r
      return r
    },
    waterfall () {
      this.load_list.forEach((item, index) => {
        const minH = Math.min.apply(null, this.colsHeightArr)
        const minHIndex = this.colsHeightArr.indexOf(minH)
        this.colsHeightArr[minHIndex] += item.height
        item.top = minH + 'px'
        item.left = (this.imgBaseWidth + this.gap) * minHIndex + 'px'
        console.log(item.top, item.left)
      })
      this.load_list = [...this.load_list]
    },
    windowResize () {
      this.calcuCols()
    }
  }

}
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.w_waterfall{
  position: relative;
}
.w_wf_card{
  padding-bottom: 20px;
  position: absolute;
}
.w_wf_inner{
  background: #e3edf7;
  box-shadow: 7px 5px 14px 0px #d3e0ec, -7px -5px 15px 0px rgba(255, 255, 255, 0.53);
  border-radius: 20px;
  border-image: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(195, 211, 226, 0.38)) 1 1;
  overflow: hidden;
}
.w_wf_image img{
  width: 100%;
}
.w_wf_detail{
   padding: 22px 15px 15px;
}
.card_animation{
  animation: show-card 0.4s;
  transition: left 0.6s, top 0.6s;
  transition-delay: 0.1s;
}
@keyframes show-card {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
