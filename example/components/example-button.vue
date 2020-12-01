<template>
  <div class="example-button">
    <w-button @click="clickFunc(123)">
      这是一个按钮
    </w-button>
    <w-button size="mid" @click="clickFunc('12')">
      这是一个按钮
    </w-button>
    <w-button size="small" @click="clickFunc('12312')">
      这是一个按钮
    </w-button>
  </div>
</template>

<script>
export default {
  name: 'example-button',
  methods: {
    clickFunc (data) {
      console.log('data')
    }
  }
}
</script>
