import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { lookAppPoints, touchAppPoints } from '@/service/pointMall';
import styles from './index.module.less';
import { APP_CODE, LOOK_TASK_TYPES } from '@/constants';

interface IProps {
  store?: IStore;
}

const TouchAppPoints = ({ store }: IProps) => {
  const router = useRouter();
  const userInfo = Taro.getStorageSync('userInfo');
  const { lookTasks } = store.enum;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pointNum, setPointNum] = useState<number>(1);
  const { path } = router;
  useEffect(() => {
    touchApp();
  }, []);

  // 浏览拿积分
  useEffect(() => {
    let moduleKey;
    let moduleNumber;
    // 找到当前的key，可能匹配不到
    LOOK_TASK_TYPES.KEYS.forEach((key: string) => {
      if (path.includes(key)) {
        moduleNumber = LOOK_TASK_TYPES.toNumber(moduleKey);
        if (
          lookTasks?.filter((item) => item.pointTypeValue === moduleNumber)
            .length
        ) {
          moduleKey = key;
        }
      }
    });
    let timer: any = setTimeout(() => {
      moduleKey &&
        lookAppPoints({
          userId: userInfo?.id,
          taskType: LOOK_TASK_TYPES.toNumber(moduleKey),
        });
    }, 15000);
    return () => {
      clearTimeout(timer);
      timer = null;
    };
  }, [path]);

  // 进入第一次拿积分
  const touchApp = () => {
    let _appType;
    Object.keys(APP_CODE).forEach((key) => {
      if (typeof APP_CODE[key] === 'function') {
        return;
      }
      const code = APP_CODE[key];
      if (APP_CODE.toPath(code) && path.includes(APP_CODE.toPath(code))) {
        _appType = code;
      }
    });
    if (_appType) {
      touchAppPoints({ userId: userInfo?.id, appType: _appType }).then(
        (res) => {
          if (!res.code && res.isFirst) {
            setShowModal(true);
            setPointNum(res.point);
          }
        },
      );
    }
  };
  return showModal ? (
    <View className={styles.pointGetModal}>
      <View className={styles.mask} />
      <View className={styles.content}>
        <View className={styles.round}>
          <View className={styles.num}>
            <View className={styles.addIcon}>+</View>
            <View className={styles.txt}>{pointNum}</View>
          </View>
        </View>
        <View className={styles.tit}>签到成功</View>
        <View className={styles.desc}>恭喜您获得{pointNum}积分</View>
        <View className={styles.btn} onClick={() => setShowModal(false)}>
          知道了
        </View>
        <View className={styles.tip}>
          每日首次登录各应用可获得{pointNum}积分
        </View>
      </View>
    </View>
  ) : (
    <></>
  );
};

export default inject('store')(observer(TouchAppPoints));
