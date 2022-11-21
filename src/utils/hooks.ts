import { useEffect } from 'react';
import { IS_ALIPAY, IS_WEAPP } from '@/constants';

export const useInit = (store: any) => {
  useEffect(() => {
    dealGoBack();
    if (IS_WEAPP || IS_ALIPAY) {
      // 微信小程序
      excuteBridge();
      const ticketId = getQueryValue('ticketId');
      store.user.getUserInfoWX(ticketId, '2001908361', setZwlog);
    } else {
      getAuthentication();
    }
  }, []);

  const setZwlog = (_data: any) => {
    const zwlog = new window.ZwLog({
      _user_id: _data.userId,
      _user_nick: _data.userName,
    });

    // onReady表示zwlog加载完成后的函数，它接收一个匿名函数，而sendPV与record方法均要在匿名函数内调用。eg:
    zwlog.onReady(() => {
      // PV日志
      zwlog.sendPV({
        miniAppId: '2001908361',
        log_status: '2001908361',
      });
    });
  };

  // ? 获取默认值参数
  const getAuthentication = () => {
    const ticketString = getQueryValue('ticket');
    if (ticketString) {
      excuteBridge();
      store.user.getUserInfo(ticketString);
      setZwaplus();
    } else {
      window.location.replace(
        'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_651e1332a214a6aa821d18459a99f4e6&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001908361/reserved/index.html',
        // 'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_651e1332a214a6aa821d18459a99f4e6&redirectUrl=http://localhost:10086',
      );
    }
  };

  // 解析url中票据
  const getQueryValue = (key: string) => {
    let qs = '';
    const urlParam = window.location.search;
    if (urlParam.indexOf(key) > -1) {
      urlParam.split('&').forEach((item) => {
        if (item.indexOf(key) > -1) {
          qs = item.slice(item.indexOf('=') + 1);
        }
      });
    }
    return qs;
  };

  // 基础信息埋点
  const setZwaplus = () => {
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['aplus-waiting', 'MAN'],
    });
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn'],
    });
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn'],
    });
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['appId', '60506758'],
    });
    aplus_queue.push({
      action: 'aplus.sendPV',
      arguments: [
        {
          is_auto: false,
        },
        {
          miniAppId: '2001908361',
          miniAppName: '社区留言板',
        },
      ],
    });
  };

  // ? 处理二次回退的问题
  const dealGoBack = () => {
    const sUserAgent = window.navigator.userAgent.toLowerCase();
    const dtdreamweb = sUserAgent.indexOf('dtdreamweb') > -1;
    if (dtdreamweb) {
      // ? 浙里办app
      window.addEventListener(
        'pageshow',
        (event) => {
          if (
            event.persisted ||
            (window.performance && window.performance.navigation.type === 2)
          ) {
            excuteBridge();
            window.ZWJSBridge.close();
          }
        },
        false,
      );
    }
  };
  const excuteBridge = () => {
    window.ZWJSBridge.onReady(() => {
      console.log('jsBridge  finished');
    });
  };
};
