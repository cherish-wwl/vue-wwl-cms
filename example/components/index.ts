
import camelCase from 'lodash/camelCase'

const files: any = require.context('./', false, /\.vue$/i)
const modules: any = {}

files.keys().forEach((item: any) => {
  console.log('item',item)
  const name = camelCase(item.slice(2, -3))
  const fileModule = files(item).default
  if (!fileModule) return
  modules[name] = fileModule
})

export default modules


