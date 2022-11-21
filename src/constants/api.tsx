export const isDev = !window.location.href.includes('mapi.zjzwfw.gov.cn');
export const HOST = isDev
  ? 'http://192.168.8.88:8244'
  : 'https://www.xnwlsq.com:43013';
export const MOBILE_PATH = isDev ? '/mobile' : '';
export const MANAGE_PATH = isDev ? '/manage' : '';
