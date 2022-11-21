import { Button, View } from '@tarojs/components';
import { AtModal, AtModalAction, AtModalContent } from 'taro-ui';
import Taro from '@tarojs/taro';
import styles from './index.module.less';

interface IProps {
  isOpened: boolean;
  setIsOpened: any;
}

const CertificationModal = (props: IProps) => {
  const { isOpened, setIsOpened } = props;

  return (
    <AtModal isOpened={isOpened} className={styles.modal}>
      <AtModalContent>
        <View className={styles.content}>
          <View className={styles.tit}>您尚完成业主认证</View>
          <View className={styles.desc}>请先联系管理员完成业主身份认证</View>
          <View className={styles.phoneNum}>0579-87621098</View>
        </View>
      </AtModalContent>
      <AtModalAction>
        <Button onClick={() => setIsOpened(false)}>取消</Button>{' '}
        <Button
          onClick={() => {
            ZWJSBridge.onReady(() => {
              ZWJSBridge.phoneCall({ corpId: '0579-87621098' });
            });
          }}
        >
          确认呼出
        </Button>
      </AtModalAction>
    </AtModal>
  );
};

export default CertificationModal;
