<template>
  <div class='example-button'>
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

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@Component

export default class Button extends Vue {
  name: string = 'example-button'

  clickFunc (data: string): void {
    console.log('data')
  }
}

</script>
