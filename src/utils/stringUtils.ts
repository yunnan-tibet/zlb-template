import moment from 'moment';

// 判断字符串是否非空
export function checkStringEmpty(v) {
  if (v === undefined || v === '' || v === null) {
    return false;
  }
  return true;
}

export function getTimeFormat(date: string) {
  return moment(date).format('YY-MM-DD HH:mm');
}
