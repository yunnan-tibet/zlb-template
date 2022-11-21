export const INFINITE_PAGE_SIZE = 100000000;
export const API_PREFIX_IMAGE =
  'http://111.0.123.139:38245/manage/ossOpt/img?key=img';
export const PAGE_SIZE = 20;
export const IS_WEAPP =
  window.navigator.userAgent.toLowerCase().includes('miniprogram/wx') ||
  window.__wxjs_environment === 'miniprogram';
const sUserAgent = window.navigator.userAgent.toLowerCase();
export const IS_ALIPAY =
  sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
export const PAGE_TYPE = {
  HOME: 1,
  DETAIL: 2,
};

export const SOURCE_TYPE = {
  PC: 0,
  WEAPP: 1,
};

export const POLITICAL_TYPE = {
  NO_ONE: 2,
  PARTY: 1,
};

export const APP_CODE = {
  SQGJ: 1, // 社区管家
  YJHJ: 2, // 一键呼叫
  BSBX: 3, // 报事报修
  WYJN: 4, // 物业缴纳
  LLB: 5, // 邻里帮
  WHYJ: 6, // 文化E家
  LYZX: 7, // 旅游咨询
  JTT: 8, // 家头条
  JFDH: 9, // 积分兑换
  SQGY: 10, // 社区公约
  GXKJ: 11, // 共享空间
  CSGS: 12, // 城市供水
  XXCG: 13, // 学习场馆
  YJSW: 14, // e家书屋
  JTG: 15, // 金托管
  XYD: 16, // 享优待
  YFW: 17, // 约服务
  ZSH: 18, // 智守护
  JKCG: 19, // 健康场馆
  SXMP: 20, // 舒心慢跑
  YQXX: 21, // 疫情信息
  JKDA: 22, // 健康档案
  YSDA: 23, // 医生档案
  JKSJ: 24, // 健康数据
  YYZN: 25, // 营养指南
  ZXZP: 26, // 智配直享
  CYZD: 27, // 创业指导
  YBG: 28, // 约办公
  GXTC: 29, // 共享停车
  WGZF: 30, // 无感支付
  ZHCX: 31, // 智慧出行
  BJKD: 32, // 便捷快递
  JJYJB: 33, // 交通e键办
  LJFL: 34, // 垃圾分类
  AXFX: 35, // 爱心奉献
  YGWY: 36, // 阳光物业
  AFWS: 37, // 安防卫士
  WXY: 38, // 微心愿
  DJHD: 39, // 党建活动
  MSSS: 40, // 民生实事
  ZYHD: 41, // 志愿活动
  DWZX: 42, // 党务咨询
  SQLY: 43, // 社区留言
  SSP: 44, // 随手拍
  ZXYA: 45, // 在线议案
  toPath: (v) => {
    switch (v) {
      case APP_CODE.SQGJ:
        return 'pages/community/index';
      case APP_CODE.YJHJ:
        return 'pages/housekeeper/index';
      case APP_CODE.BSBX:
        return 'pages/reportRepairs/index';
      case APP_CODE.WYJN:
        return 'pages/packageA/feePay/index';
      case APP_CODE.LLB:
        return 'pages/packageA/neighborhoodHelp/index';
      case APP_CODE.WHYJ:
        return 'pages/packageA/cultureHomeE/index';
      case APP_CODE.LYZX:
        return 'pages/packageA/travelInformation/index';
      case APP_CODE.JTT:
        return 'pages/packageA/homeHeader/index';
      case APP_CODE.JFDH:
        return 'pages/packageA/pointMall/index';
      case APP_CODE.SQGY:
        return 'pages/packageA/socialPact/index';
      case APP_CODE.GXKJ:
        return 'pages/spaces/index';
      case APP_CODE.CSGS:
        return 'CSGS';
      case APP_CODE.XXCG:
        return 'pages/packageA/studyVen/index';
      case APP_CODE.YJSW:
        return 'YJSW';
      case APP_CODE.JTG:
        return 'pages/packageA/hosting/index';
      case APP_CODE.XYD:
        return 'XYD';
      case APP_CODE.YFW:
        return 'YFW';
      case APP_CODE.ZSH:
        return 'ZSH';
      case APP_CODE.JKCG:
        return 'pages/packageA/healthVen/index';
      case APP_CODE.SXMP:
        return 'SXMP';
      case APP_CODE.YQXX:
        return 'pages/packageA/epidemicPrevent/index';
      case APP_CODE.JKDA:
        return 'JKDA';
      case APP_CODE.YSDA:
        return 'pages/packageA/doctorFile/index';
      case APP_CODE.JKSJ:
        return 'pages/packageA/healthFile/index';
      case APP_CODE.YYZN:
        return 'YYZN';
      case APP_CODE.ZXZP:
        return 'ZXZP';
      case APP_CODE.CYZD:
        return 'pages/packageA/entrepreneurship/index';
      case APP_CODE.YBG:
        return 'pages/packageA/workVen/index';
      case APP_CODE.GXTC:
        return 'pages/packageA/sharedParking/index';
      case APP_CODE.WGZF:
        return 'WGZF';
      case APP_CODE.ZHCX:
        return 'pages/packageA/smartTravel/index';
      case APP_CODE.BJKD:
        return 'pages/packageA/smartLogistics/index';
      case APP_CODE.JJYJB:
        return 'JJYJB';
      case APP_CODE.LJFL:
        return 'pages/packageA/garbageSite/index';
      case APP_CODE.AXFX:
        return 'pages/packageA/loveDedication/index';
      case APP_CODE.YGWY:
        return 'pages/packageA/sunshineProperty/index';
      case APP_CODE.AFWS:
        return 'pages/packageA/safetyGuard/index';
      case APP_CODE.WXY:
        return 'pages/packageA/littleWish/index';
      case APP_CODE.DJHD:
        return 'pages/packageA/partyBuildActivity/index';
      case APP_CODE.MSSS:
        return 'pages/packageA/livelihood/index';
      case APP_CODE.ZYHD:
        return 'pages/packageA/volunteerService/index';
      case APP_CODE.DWZX:
        return 'pages/packageA/partyNews/index';
      case APP_CODE.SQLY:
        return 'pages/messageBoard/index';
      case APP_CODE.SSP:
        return 'pages/packageA/handyPat/index';
      case APP_CODE.ZXYA:
        return 'pages/packageA/onlineMotion/index';
      default:
        return 'other';
    }
  },
};
