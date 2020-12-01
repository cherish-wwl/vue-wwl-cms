<template>
  <!-- 将原生事件绑定到组件 -->
  <div v-on="$listeners">
      <button>
        <slot></slot>
      </button>
  </div>
</template>
<script>
export default {
  name: 'WButton',
  data () {
    return {

    }
  }
}
</script>
