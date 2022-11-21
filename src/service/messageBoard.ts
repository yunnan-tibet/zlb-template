import { request } from '@/utils/request';

// 留言列表
export const getMBList = (data) => {
  return request({
    api: `mgop.secusoft.messageBoard.page`,
    data,
  });
};

// 提交留言
export const submitMB = (data) => {
  return request({
    api: `mgop.secusoft.messageBoard.add`,
    data,
  });
};
// 留言详情
export const getMessageDetail = (data) => {
  return request({
    api: `mgop.secusoft.messageBoard.detail`,
    data,
  });
};
// 留言评论详情
export const getCommentDetail = (data) => {
  return request({
    api: `mgop.secusoft.messageBoard.commentPage`,
    data,
  });
};
// 留言评论
export const commMessage = (data) => {
  return request({
    api: `mgop.secusoft.messageBoard.comment`,
    data,
  });
};
// 留言点赞
export const addLike = (data) => {
  return request({
    api: `mgop.secusoft.messageBoard.likes`,
    data,
  });
};
