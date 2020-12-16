<template>
  <div>
    <h1>WInfiniteScroll</h1>
    <br />
    <h3>基础用法</h3>
    <br />
    <w-infiniteScroll style="height:200px;" @loadMore="loadingMore" :bottom="50">
      <ul>
        <li class="demo-item" v-for="i in count" :key="i">{{i}}</li>
      </ul>
    </w-infiniteScroll>
    <pre v-highlight="sourcecode.html"><code class="html"></code></pre>
    <br />
    <h3>禁用加载</h3>
    <br />
    <w-infiniteScroll style="height:200px;" disabled @loadMore="loadingMore1">
      <ul>
        <li class="demo-item demo2" v-for="i in count2" :key="i">{{i}}</li>
      </ul>
    </w-infiniteScroll>
    <br />
    <pre v-highlight="sourcecode.html1"><code class="html"></code></pre>
    <br />
    <h3>指令用法 (大于40条,禁用加载)</h3>
    <br />
    <h4>用法一：</h4>
    <br />
    <div v-infinite-scroll="loadingMore2" :data-infinite-disabled='disabled' data-infinite-bottom="20" style="height:200px; overflow-y:auto">
      <ul>
        <li class="demo-item" v-for="i in count3" :key="i">{{i}}</li>
      </ul>
    </div>
    <br />
    <pre v-highlight="sourcecode.html2"><code class="html"></code></pre>
    <br />
    <br />
     <h4>用法二：</h4>
     <br />
    <div v-infinite-scroll="loadingMore2" data-infinite-disabled='disabled' data-infinite-bottom="20" style="height:200px; overflow-y:auto">
      <ul>
        <li class="demo-item" v-for="i in count3" :key="i">{{i}}</li>
      </ul>
    </div>
    <br />
    <br />
    <pre v-highlight="sourcecode.html3"><code class="html"></code></pre>
    <h3>Attributes</h3>
    <br />
    <table class="explain_table">
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
      <tr v-for="item in attrList" :key="item.attr">
       <td>{{item.attr}}</td>
       <td>{{item.desrc}}</td>
       <td>{{item.type}}</td>
       <td>{{item.optional}}</td>
       <td>{{item.default}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { infinteScroll } from './example-code.ts'

export default {
  name: 'example-infinteScroll',
  data () {
    return {
      sourcecode: infinteScroll,
      count: 20,
      count2: 20,
      count3: 20,
      attrList: [
        {
          attr: 'bottom',
          desrc: '距离底部多高，才触发加载数据',
          type: 'number',
          optional: '-',
          default: '0'
        },
        {
          attr: 'disabled',
          desrc: '禁用加载',
          type: 'boolean',
          optional: '-',
          default: 'false'
        }
      ]
    }
  },
  computed: {
    disabled () {
      return this.count3 >= 40
    }
  },
  mounted () {

  },
  methods: {
    loadingMore () {
      this.count += 20
    },
    loadingMore1 () {
      this.count2 += 20
    },
    loadingMore2 () {
      this.count3 += 20
    }

  }
}
</script>
<style scoped>
.demo-item{
  list-style: none;
  background-color: aliceblue;
  line-height: 30px;
  margin-bottom: 10px;
  padding: 10px 0;
  text-align: center;
}
.demo2{
  background-color:bisque;
}
</style>
