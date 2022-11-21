import moment from 'moment';

import Taro from '@tarojs/taro';

const amapFile = require('./amap-wx.130');

// 获取当前星期几
export const getWeek = (week) => {
  switch (week) {
    case 1:
      return '周一';
    case 2:
      return '周二';
    case 3:
      return '周三';
    case 4:
      return '周四';
    case 5:
      return '周五';
    case 6:
      return '周六';
    case 0:
      return '周日';
    default:
      return '';
  }
};

// 图片预览
export const onImgPreview = (imgs: string[]) => {
  Taro.previewImage({
    urls: imgs,
  });
};

export const adapatMonth = (time: string) => {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (year === nowYear) {
    // 同一年
    if (nowMonth === month) {
      // 同一月
      return '本月';
    }
    return `${month}月`;
  }
  return `${year}年${month}月`;
};
export function getGeo(callBack) {
  const amapsdk = new amapFile.AMapWX({
    key: '37c5754b58db213ab3bea11b894dbb11',
  });
  amapsdk.getRegeo({
    success(data) {
      callBack(data);
    },
    fail(info) {
      // 失败回调
      console.log(info);
    },
  });
}
export const isBase64 = (str) => {
  if (str === '' || str.trim() === '') {
    return false;
  }
  const reg =
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
  return reg.test(str);
};

// 5月23日/周二
export const getMDW = (time) => {
  const myTime = new Date(time);
  const month = myTime.getMonth() + 1;
  const day = myTime.getDate();
  return `${month}月${day}日${getW(time)}`;
};

export const getW = (time) => {
  const myTime = new Date(time);
  const weList = ['一', '二', '三', '四', '五', '六', '日'];
  const we = myTime.getDay();
  return `周${weList[we]}`;
};

export const s_to_hs = (s) => {
  // 计算分钟
  // 算法：将秒数除以60，然后下舍入，既得到分钟数
  let h = '';
  h = `${Math.floor(s / 60)}`;
  // 计算秒
  // 算法：取得秒%60的余数，既得到秒数
  s %= 60;
  // 将变量转换为字符串
  h += '';
  s += '';
  // 如果只有一位数，前面增加一个0
  h = h.length == 1 ? `0${h}` : h;
  s = s.length == 1 ? `0${s}` : s;
  return `${h}:${s}`;
};
// 获取当前日期一个月后的日期
export function queryMonth() {
  const currentDate = new Date();
  let search_month = currentDate.getMonth();
  search_month += 1; // 如果获取后一个月就search_month + 1
  if (search_month > 11) {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    currentDate.setMonth(0);
  } else if (search_month < 0) {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    currentDate.setMonth(11);
  } else {
    currentDate.setMonth(search_month);
  }
  // 格式化日期（用的是moment插件）
  this.formData.beginTime = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
}

// 经纬度转换成三角函数中度分表形式。
function rad(d) {
  return (d * Math.PI) / 180.0;
}

// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function getDistance(lat1, lng1, lat2, lng2) {
  if (!lat1 || !lng1 || !lat2 || !lng2) return null;

  const radLat1 = rad(lat1);
  const radLat2 = rad(lat2);
  const a = radLat1 - radLat2;
  const b = rad(lng1) - rad(lng2);
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s *= 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; // 输出为公里

  return s.toFixed(1);
}
// 判断当前时间是否在时间段内
export function checkAuditTime(beginTime, endTime) {
  const nowDate = new Date();
  const beginDate = new Date(nowDate);
  const endDate = new Date(nowDate);
  const sub = beginTime.substring(0, 5);
  const sub1 = endTime.substring(0, 5);
  const beginIndex = sub.lastIndexOf(':');
  const beginHour = sub.substring(0, beginIndex);
  const beginMinue = sub.substring(beginIndex + 1, sub.length);
  beginDate.setHours(beginHour, beginMinue, 0, 0);

  const endIndex = sub1.lastIndexOf(':');
  const endHour = sub1.substring(0, endIndex);
  const endMinue = sub1.substring(endIndex + 1, sub1.length);
  endDate.setHours(endHour, endMinue, 0, 0);

  return (
    nowDate.getTime() - beginDate.getTime() >= 0 &&
    nowDate.getTime() <= endDate.getTime()
  );
}

export function isEmptyObject(obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

export function getTimeDuan(date: string) {
  let message = '';
  const now = new Date().getTime();
  const timeB = new Date(date?.replace(/-/g, '/')).getTime();
  const time_Hourse = timeB + 3600000;
  const time_Day = timeB + 86400000;

  if (now < time_Hourse) {
    return (message = '1小时内');
  }
  if (now > time_Day) {
    return (message = moment(date).format('YYYY-MM-DD HH:mm:ss'));
  }
  return `${Math.abs(
    Number(new Date(timeB).getHours() - new Date(now).getHours()),
  )}小时之前`;
}
// 获取字符串时间
export function getTimeString(date) {
  return moment(date).format('YYYY-MM-DD');
}

// 家头条  获取发布类型
export function getReleaseTypeName(idx) {
  if (idx == '0') {
    return '发图文';
  }
  if (idx == '1') {
    return '发视频';
  }
  return '发图文字';
}

// 处理当前年月
export function getMonth() {
  const month =
    new Date().getMonth() + 1 > 0
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1;
  return `${new Date().getFullYear()}-${month}`;
}
export function isDuringDate(beginDateStr, endDateStr) {
  const curDate = Date.now();
  const beginDate = Date.parse(beginDateStr);
  const endDate = Date.parse(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
    return true;
  }
  return false;
}

export function checkPhone(data) {
  const regExp = new RegExp('^1[3578]\\d{9}$');
  if (regExp.test(data)) {
    return true;
  }
  return false;
}

export function checkCardId(data) {
  const regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (regExp.test(data)) {
    return true;
  }
  return false;
}
export function checkNumber(data) {
  const regExp = /^\d+(\.\d+)?$/;
  if (regExp.test(data)) {
    return true;
  }
  return false;
}

export const handleSetDuration = (e) => {
  let vm: any = Math.trunc(e.detail.duration);
  if (vm < 60) {
    vm += 's';
  } else if (vm > 60 && vm < 3600) {
    vm = `${(vm / 60).toFixed(1)}min`;
  } else if (vm > 3600) {
    vm = `${(vm / (60 * 60)).toFixed(1)}h`;
  }

  return vm;
};

export const isAndroid = () => {
  const platform = Taro.getSystemInfoSync().platform;
  return platform === 'android';
};

export const isIos = () => {
  const platform = Taro.getSystemInfoSync().platform;
  return platform === 'ios';
};
// 获取文件后缀
export const getSuffixType = (v: string) => {
  const suff = v.substring(v.lastIndexOf('.'));
  return suff;
};
// 登录了才能跳转
export const permissionNav = (url: string) => {
  const userInfo = Taro.getStorageSync('userInfo');
  if (userInfo?.phoneNum) {
    Taro.navigateTo({ url });
  } else {
    Taro.showModal({
      title: '提示',
      content: '当前账号暂未登录，请先登录',
      confirmText: '去登录',
      success: (e) => {
        if (e.confirm) {
          Taro.navigateTo({ url: '/pages/authorizeIndex/index' });
        }
      },
    });
  }
};

/**
 * 权限判断
 * @param key
 */
export const power = (key: number) => {
  const { roles = [] } = Taro.getStorageSync('userInfo');
  let isPower = false;
  roles &&
    roles.map((v: any) => {
      switch (v.id) {
        case key:
          isPower = true;
          break;
        default:
          break;
      }
    });
  return isPower;
};

/**
 *  判断对象是否包含某个属性
 */

export function checkObjectByKey(obj: Object, key: string) {
  let flag = false;
  Object.keys(obj).map((item: any) => {
    if (item === key) {
      flag = true;
    }
  });
  return flag;
}

// 名字脱敏

export function desensitizedName(fullName) {
  if (!fullName) {
    return '';
  }
  const str = `*${fullName.substr(1, 2)}`;
  return str;
}
