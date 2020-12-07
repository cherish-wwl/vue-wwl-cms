<template>
<div class="w_waterfall" ref="w_waterfall" :style="{minHeight: WHeight+'px'}">
  <ul>
    <li v-for="(item, index) in list" :key="item[props.id]">
      <div class="w_wf_card card_animation" :ref="'w_wf_'+index" :style="{
          width: imgBaseWidth + 'px'
        }">
        <slot :item="item">
          <div class="w_wf_inner">
            <div class="w_wf_image">

              <img v-if="item[props.image]" :src="item[props.image]" />
              <img v-else-if="videoCover && item.coverImg" :src="item.coverImg" />
              <video
                v-show="!videoCover&&item[props.video]"
                preload
                @loadeddata="loadedVideo($event,item,index)"
                controls
                :src="item[props.video]" ></video>
            </div>
            <div class="w_wf_detail">
              <h3>{{item[props.title]}}</h3>
              <p>{{item[props.content]}}</p>
            </div>
          </div>
        </slot>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'WWaterfall',
  props: {
    videoCover: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    imgBaseWidth: {
      type: Number,
      default: 270
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
    },
    props: {
      type: Object,
      default () {
        return {
          id: 'id',
          title: 'title',
          content: 'content',
          image: 'image',
          video: 'video'
        }
      }
    }
  },
  data () {
    return {
      show_list: [],
      load_list: [],
      colsHeightArr: [],
      beginIndex: 0,
      isPreloading: true,
      loadedImageCount: 0,
      cols: 0,
      isMobile: !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
    }
  },
  watch: {
    list (newV, oldV) {
      this.beginIndex = oldV.length
      this.preLoad()
    },
    cols (newV, oldV) {
      if (!oldV) return
      this.colsHeightArr = new Array(this.cols).fill(0)
      this.beginIndex = 0
      this.waterfall()
    },
    loadedImageCount (val) {
      if (val === this.list.length) {
        this.$emit('preloaded')
      }
    }
  },
  computed: {
    WHeight () {
      return Math.max.apply(null, this.colsHeightArr)
    }
  },
  mounted () {
    this.bindEvents()
    this.calcuCols()
    this.colsHeightArr = new Array(this.cols).fill(0)
    this.preLoad()
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    bindEvents () {
      this.$on('preloaded', () => {
        this.waterfall()
      })
    },
    loadedVideo (video, item, index) {
      console.log(video, item)
      console.log('onloadeddata', this.videoCover)
      if (this.videoCover) {
        this.createCoverImg(video.target, item, () => {
          this.loadedImageCount += 1
        })
      } else {
        this.loadedImageCount += 1
      }
    },
    preLoad () {
      for (let index = this.beginIndex; index < this.list.length; index++) {
        const item = this.list[index]
        if (item[this.props.image]) {
          const img = new Image()
          img.src = item[this.props.image]
          img.onload = img.onerror = () => {
            this.loadedImageCount += 1
          }
        } else {
          this.loadedImageCount += 1
        }
      }
    },
    createCoverImg (video, item, cb) {
      const scale = 0.8
      const canvas = document.createElement('canvas') // canvas画布
      canvas.width = video.videoWidth * scale
      canvas.height = video.videoHeight * scale
      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height) // 画图
      const dataUrl = canvas.toDataURL('image/png')
      console.log('dataUrl', dataUrl)
      // item.coverImg = dataUrl
      this.$set(item, 'coverImg', dataUrl)
      cb && cb()
    },
    calcuCols () {
      var waterfallWidth = this.width || this.$refs.w_waterfall.scrollWidth || window.innerWidth
      var cols = parseInt(waterfallWidth / (this.imgBaseWidth + this.gap))
      cols = cols === 0 ? 1 : cols
      const r = this.isMobile ? 2 : (cols > this.maxCols ? this.maxCols : cols)
      this.cols = r
      this.$refs.w_waterfall.style.marginLeft = (waterfallWidth - (this.imgBaseWidth + this.gap) * r) / 2 + 'px'
      return r
    },
    waterfall () {
      for (let index = this.beginIndex; index < this.list.length; index++) {
        const minH = Math.min.apply(null, this.colsHeightArr)
        const minHIndex = this.colsHeightArr.indexOf(minH)
        const h = this.$refs['w_wf_' + index][0]
        this.colsHeightArr[minHIndex] += Math.round(this.imgBaseWidth / (h.scrollWidth / h.scrollHeight))
        this.$refs['w_wf_' + index][0].style.top = minH + 'px'
        this.$refs['w_wf_' + index][0].style.left = (this.imgBaseWidth + this.gap) * minHIndex + 'px'
      }
      this.colsHeightArr = [...this.colsHeightArr]
      this.isPreloading = false
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

.w_waterfall {
  position: relative;
}

.w_wf_card {
  padding-bottom: 20px;
  position: absolute;
}

.w_wf_inner {
  background: #e3edf7;
  box-shadow: 7px 5px 14px 0px #d3e0ec, -7px -5px 15px 0px rgba(255, 255, 255, 0.53);
  border-radius: 20px;
  border-image: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(195, 211, 226, 0.38)) 1 1;
  overflow: hidden;
}

.w_wf_image img, .w_wf_image video {
  width: 100%;
}

.w_wf_detail {
  padding: 22px 15px 15px;
}

.card_animation {
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
