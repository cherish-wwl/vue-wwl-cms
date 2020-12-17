

// // 解决 不识别 vue 后缀
declare module '*.vue' {
  import Vue from 'vue'
//   // import { Vue } from 'vue-property-decorator'
  export default Vue
}

// $router: VueRouter // 这表示this下有这个东西
//     $route: Route
//     $axios: AxiosInstance

// import { AxiosInstance } from 'axios'

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
// declare module 'vue/types/vue' {


// import { VueRouter , Route } from 'vue-router/types/router'
// // // 3. 声明为 Vue 补充的东西
//   interface Vue {
//     $aaa: string,
//     $router: VueRouter
//   }
// }

declare module '*'
