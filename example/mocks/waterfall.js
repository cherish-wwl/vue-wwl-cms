import Mock from 'mockjs'
Mock.setup({
  timeout: '500-1000'
})
const data = Mock.mock({
  'list|20-60': [
    {
      id: '@increment(1)',
      title: '@ctitle',
      content: '@cparagraph',
      create_time: '@date(yyyy-MM-dd hh:mm:ss)',
      'image|1': ['@dataImage()', ''],
      'video|1': [
        '',
        'http://192.168.1.205:8201/media/thread/8/video/c7j35k6evuqkezquka.mp4'
      ]
    }
  ]
})

// 含有分页的数据列表,有需要接受的参数要使用正则匹配
// /mock/waterfall?pagenum=1&pagesize=10
Mock.mock(/\/mock\/waterfall/, 'get', options => {
  console.log(options)
  // 获取传递的参数pageindex
  const pagenum = getQuery(options.url, 'pagenum') || 1
  // 获取传递的参数pagesize
  const pagesize = getQuery(options.url, 'pagesize') || 10
  // console.log('++++++++++++++++++++++++', pagesize, pagenum)
  // 截取数据的起始位置
  const start = (pagenum - 1) * pagesize
  // 截取数据的终点位置
  const end = pagenum * pagesize
  // 计算总页数
  const totalPage = Math.ceil(data.list.length / pagesize)
  // 数据的起始位置：(pageindex-1)*pagesize  数据的结束位置：pageindex*pagesize
  const list = pagenum > totalPage ? [] : data.list.slice(start, end)

  return {
    status: 200,
    message: 'success',
    data: list,
    total: data.list.length
  }
})

Mock.mock(/\/mock\/waterfall\/video/, 'get', options => {
  console.log(options)
  // 获取传递的参数pageindex
  const pagenum = getQuery(options.url, 'pagenum') || 1
  // 获取传递的参数pagesize
  const pagesize = getQuery(options.url, 'pagesize') || 10
  // console.log('++++++++++++++++++++++++', pagesize, pagenum)
  // 截取数据的起始位置
  const start = (pagenum - 1) * pagesize
  // 截取数据的终点位置
  const end = pagenum * pagesize
  // 计算总页数
  const totalPage = Math.ceil(data.list.length / pagesize)
  // 数据的起始位置：(pageindex-1)*pagesize  数据的结束位置：pageindex*pagesize
  const list = pagenum > totalPage ? [] : data.list.slice(start, end)

  return {
    status: 200,
    message: 'success',
    data: list,
    total: data.list.length
  }
})

const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (var i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')
      // console.log(itemArr)
      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}

export default Mock
