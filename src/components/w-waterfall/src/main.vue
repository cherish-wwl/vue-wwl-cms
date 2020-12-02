<template>
  <div class="w_waterfall">
    <ul>
      <li v-for="item in list" :key="item.id">
        <div class="w_wf_card">
          <div class="w_wf_inner">
            <div class="w_wf_image">
              <img :src="item.image"/>
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
    }
  }

}
</script>
