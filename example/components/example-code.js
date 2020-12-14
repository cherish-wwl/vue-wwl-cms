const html = `
<w-infiniteScroll style="height:200px;" @loadMore="loadingMore" :bottom="50">
  <ul>
    <li class="demo-item" v-for="i in count" :key="i">{{i}}</li>
  </ul>
</w-infiniteScroll>

`
const html1 = `
<w-infiniteScroll style="height:200px;" disabled @loadMore="loadingMore1">
  <ul>
    <li class="demo-item demo2" v-for="i in count2" :key="i">{{i}}</li>
  </ul>
</w-infiniteScroll>

`
const html2 = `
<div v-infinite-scroll="loadingMore2" :data-infinite-disabled='disabled' data-infinite-bottom="20" style="height:200px; overflow-y:auto">
  <ul>
    <li class="demo-item" v-for="i in count3" :key="i">{{i}}</li>
  </ul>
</div>

`
const html3 = `
<div v-infinite-scroll="loadingMore2" data-infinite-disabled='disabled' data-infinite-bottom="20" style="height:200px; overflow-y:auto">
  <ul>
    <li class="demo-item" v-for="i in count3" :key="i">{{i}}</li>
  </ul>
</div>

`
const infinteScroll = {
  html,
  html1,
  html2,
  html3
}

export {
  infinteScroll
}
