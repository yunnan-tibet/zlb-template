import { request } from '@/utils/request';

// 获取房档树接口
export function getHouseLevelTree(id: string) {
  return request({
    api: `/message_board/v2/page`,
  });
}
// 获取社区留言板类型
export function getMessageTypeList(data) {
  return request({
    api: `mgop.secusoft.sysCode.readCode`,
    data,
  });
}

// 获取首页党建活动与社区公约列表
export function getHotList(data: number) {
  return request({
    api: `/message_board/v2/page`,
    data,
  });
}
