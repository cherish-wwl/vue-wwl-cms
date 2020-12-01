import camelCase from 'lodash/camelCase'
const files = require.context('./', false, /\.vue$/i)
const modules = {}

files.keys().forEach((item) => {
  const name = camelCase(item.slice(2, -3))
  const fileModule = files(item).default
  if (!fileModule) return
  modules[name] = fileModule
})
console.log(modules)
export default modules
