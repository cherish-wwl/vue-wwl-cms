<template>
<div class="w_waterfall" ref="w_waterfall" :style="{minHeight: WHeight+'px'}">
  <ul>
    <li v-for="(item, index) in list" :key="item[props.id]" :style="{opacity: !isPreloading || index < beginIndex  ? '' : 0, zIndex: !isPreloading || index < beginIndex  ? '' : -1}">
      <div :class="'w_wf_card card_animation ' + (cardClassName || '')"  :ref="'w_wf_'+index" @click="cardClick(index, item)"  :style="{
          width: CardWidth + 'px'
        }">
          <div class="w_wf_inner">
            <div class="w_wf_image">
              <template v-if="item[props.image]">
                <slot name="image" :item="item">
                   <img class="image" :src="item[props.image]" />
                </slot>
              </template>
              <template v-else-if="videoCover && item.coverImg">
                <slot name="image" :item="{...item,image:item.coverImg}">
                  <img class="cover" :src="item.coverImg" />
                </slot>
              </template>
              <template v-if="!!($scopedSlots.video && $scopedSlots.video())&&!item[props.image]&&item[props.video]&& !videoCover">
                <slot name="video" :item="item"></slot>
              </template>
              <video
                v-show="! ($scopedSlots.video && $scopedSlots.video())&&!item[props.image]&&item[props.video]&& !videoCover"
                x-webkit-airplay="allow"
                preload="auto"
                crossOrigin='Anonymous'
                @loadeddata="loadedVideo($event,item,index)"
                controls
                :src="item[props.video]" ></video>
            </div>
            <slot :item="item">
              <div class="w_wf_detail">
                <h3>{{item[props.title]}}</h3>
                <p>{{item[props.content]}}</p>
              </div>
            </slot>

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
    cardClassName: {
      type: String,
      defalut: ''
    },
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
      isPreloading: false,
      loadedImageCount: 0,
      cols: 0,
      isMobile: !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
    }
  },
  watch: {
    list (newV, oldV) {
      if (oldV.length === newV.length) return
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
      // console.log('loadedImageCount', val)
      if (val === this.list.length) {
        this.$emit('preloaded')
      }
    }
  },
  computed: {
    WHeight () {
      return Math.max.apply(null, this.colsHeightArr)
    },
    MinBottom () {
      return this.WHeight - Math.min.apply(null, this.colsHeightArr)
    },
    ColWidth () {
      if (this.isMobile) {
        const waterfallWidth = this.width || (this.$refs.w_waterfall && this.$refs.w_waterfall.scrollWidth) || window.innerWidth
        return waterfallWidth / 2
      } else {
        return this.CardWidth + this.gap
      }
    },
    CardWidth () {
      if (this.isMobile) {
        return this.ColWidth - this.mgap
      } else {
        return this.imgBaseWidth
      }
    }
  },
  mounted () {
    this.bindEvents()
    this.calcuCols()
    this.colsHeightArr = new Array(this.cols).fill(0)
    this.preLoad()
    window.addEventListener('resize', this.windowResize)
    console.log(this)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    cardClick (index, item) {
      this.$emit('cardClick', index, item)
    },
    bindEvents () {
      this.$on('preloaded', () => {
        this.waterfall()
      })
    },
    loadedVideo (video, item, index) {
      if (item[this.props.image]) return
      if (this.videoCover) {
        this.createCoverImg(video.target, item).then((dataUrl) => {
          this.$set(item, 'coverImg', dataUrl)
          const img = new Image()
          img.src = dataUrl
          img.onload = img.onerror = () => {
            this.loadedImageCount += 1
            // console.log('coverImg imgonload', this.loadedImageCount)
          }
        })
      } else {
        this.loadedImageCount += 1
        // console.log('video onload', this.loadedImageCount)
      }
    },
    preLoad () {
      this.isPreloading = true
      // debugger
      for (let index = this.beginIndex; index < this.list.length; index++) {
        const item = this.list[index]

        if (item[this.props.image]) {
          const img = new Image()
          img.src = item[this.props.image]
          img.onload = img.onerror = () => {
            this.loadedImageCount += 1
            // console.log('imgonload', this.loadedImageCount)
          }
          continue
        }
        // console.log('isVideo', !!item[this.props.video])
        if (!item[this.props.video]) {
          this.loadedImageCount += 1
        }
        // console.log('preLoad', this.loadedImageCount)
      }
    },
    createCoverImg (video, item) {
      return new Promise((resolve, reject) => {
        const scale = 0.8
        const canvas = document.createElement('canvas') // canvas画布
        canvas.width = video.videoWidth * scale
        canvas.height = video.videoHeight * scale
        canvas
          .getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height) // 画图
        const dataUrl = canvas.toDataURL('image/png')
        resolve(dataUrl)
      })
    },
    calcuCols () {
      var waterfallWidth = this.width || this.$refs.w_waterfall.scrollWidth || window.innerWidth
      var cols = parseInt(waterfallWidth / this.ColWidth)
      cols = cols === 0 ? 1 : cols
      const r = this.isMobile ? 2 : (cols > this.maxCols ? this.maxCols : cols)
      this.cols = r
      this.$refs.w_waterfall.style.marginLeft = (waterfallWidth - this.ColWidth * r) / 2 + 'px'
      return r
    },
    waterfall () {
      console.log('waterfall', this.beginIndex, this.list.length)
      for (let index = this.beginIndex; index < this.list.length; index++) {
        const minH = Math.min.apply(null, this.colsHeightArr)
        const minHIndex = this.colsHeightArr.indexOf(minH)
        const h = this.$refs['w_wf_' + index] && this.$refs['w_wf_' + index][0]
        if (!h) continue
        // console.log('waterfall', h, Math.round(this.imgBaseWidth / (h.scrollWidth / h.scrollHeight)))
        this.colsHeightArr[minHIndex] += Math.round(this.CardWidth / (h.scrollWidth / h.scrollHeight))
        this.$refs['w_wf_' + index][0].style.top = minH + 'px'
        this.$refs['w_wf_' + index][0].style.left = this.ColWidth * minHIndex + 'px'
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
