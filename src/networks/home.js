import {request} from "./request";
/*
  获取Home信息
**/
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

/*
  获取首页数据
*/
export function getHomeData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
