import {request} from "./request";
/*
  获取Home信息
**/
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}
