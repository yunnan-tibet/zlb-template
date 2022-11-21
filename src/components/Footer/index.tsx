import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import normalStyles from './normal.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';

const { ZWJSBridge }: any = window;

export default function Footer() {
  const styles = useStyle(normalStyles, elderStyles);
  // 拨打电话
  const handlePhone = () => {
    ZWJSBridge.onReady(() => {
      ZWJSBridge.phoneCall({ corpId: '0579-87621098' });
    });
  };
  return (
    <View className={styles.footer}>
      <View className={styles.text}>
        本服务由浙江政务服务网、武义建设局提供
      </View>
      <View className={styles.col}>
        <Text className={styles.colText}>服务咨询热线</Text>
        <Text className={styles.tel} onClick={handlePhone}>
          0579-87621098
        </Text>
      </View>
    </View>
  );
}
