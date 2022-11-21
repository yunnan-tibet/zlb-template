import { action, observable } from 'mobx';
import Taro from '@tarojs/taro';
import { checkTicket, checkTicketWX } from '@/service/handyPat';

class UserStore {
  // 用户信息
  @observable userInfo: any = { id: 0 };
  // @observable userInfo: any = {
  //   pageNum: 1,
  //   pageSize: 20,
  //   id: 2268,
  //   userName: '晓彤',
  //   phoneNum: '15684109634',
  //   isFrozen: 0,
  //   roleType: 0,
  //   districtCode: '19',
  //   districtName: '江南明珠小区',
  //   weChatId: 'oc2m34sle5gW-FoaI8Vq-aUEx-t8',
  //   buildingNum: '39',
  //   buildingNumName: '5幢',
  //   buildingInfo: '1-5-1-702',
  //   createTime: '2022-03-30 07:00:18',
  //   updateTime: '2022-07-25 06:08:51',
  //   valid: 1,
  //   political: 2,
  //   imgUrl:
  //     'https://thirdwx.qlogo.cn/mmopen/vi_32/d6Py7fftiaNvfOQsiasMno0Wcu6mlFHyLzTDibFa5ibiaOP8gGZNuEiaPicEA61JHnQrJ3rWibwsXiccLZ0C9K3Vk7bianfQ/132',
  //   nickName: '23点59分',
  //   roles: [
  //     {
  //       id: 0,
  //       roleName: '社区人员',
  //       createUser: 1,
  //       createTime: '2022-07-26T08:47:12.000+00:00',
  //       modifiedTime: '2022-07-26T08:47:31.000+00:00',
  //       modifiedUser: null,
  //       valid: 1,
  //     },
  //   ],
  //   degree: null,
  //   national: null,
  // };

  @action
  getUserInfo(st) {
    Taro.showLoading({
      title: '加载中',
    });
    checkTicket({
      ticket: st,
    })
      .then((res: any) => {
        this.userInfo = res;
        Taro.setStorageSync('userInfo', res);
        Taro.hideLoading();
        Taro.redirectTo({ url: '/pages/messageBoard/index' });
      })
      .catch(() => {
        Taro.hideLoading();
        Taro.redirectTo({ url: '/pages/messageBoard/index' });
      });
  }

  // 微信获取用户信息
  @action
  getUserInfoWX = (st, appId, setZwlog) => {
    Taro.showLoading({
      title: '加载中',
    });
    checkTicketWX({
      ticket: st,
      appId,
    })
      .then((res: any) => {
        this.userInfo = res;
        setZwlog(res);
        Taro.setStorageSync('userInfo', res);
        Taro.hideLoading();
        Taro.redirectTo({ url: '/pages/messageBoard/index' });
      })
      .catch(() => {
        Taro.hideLoading();
        Taro.redirectTo({ url: '/pages/messageBoard/index' });
      });
  };
}

export default new UserStore();
