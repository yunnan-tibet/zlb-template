import Taro from '@tarojs/taro';

export const getBottomLeft = () => {
  if (process.env.TARO_ENV === 'weapp') {
    // 可滚动高度
    const { screenHeight, safeArea } = Taro.getSystemInfoSync();
    // 不包含底部的底部位置
    const { bottom } = safeArea;
    return screenHeight - bottom;
  }
  return 0;
};
