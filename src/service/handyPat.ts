import { request } from '../utils/request';

// 获取随手拍列表
export const getHandyPatList = (data) => {
  return request({
    api: 'mgop.secusoft.sspPConveniently.page',
    data,
  });
};

// 提交随手拍
export const addHandyPat = (data) => {
  return request({
    api: 'mgop.secusoft.sspPConveniently.add',
    data,
  });
};

export const checkTicket = (data) => {
  return request({
    api: 'mgop.secusoft.yywycheck.ticket',
    data,
  });
};

// 授权校验微信小程序-浙里办
export const checkTicketWX = (data) => {
  return request({
    api: 'mgop.secusoft.check.token',
    data,
  });
};
