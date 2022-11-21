import { View, Image, Text } from '@tarojs/components';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';

const kl_1 = require('@/assets/image/kl_1.png'); // 待审核
const kl_2 = require('@/assets/image/kl_2.png'); // 已下架
const kl_3 = require('@/assets/image/kl_3.png');
// 未通过
const AmTagCom = (props) => {
  const { data } = props;
  const { status, shelves, reason } = data;
  const styles = useStyle(normalStyles, elderStyles);
  function getView() {
    if (status == 0) {
      return (
        <View className={styles.tagView}>
          <View className={styles.tagTitle}>
            <Image className={styles.img} src={getImgUrl()} />

            <Text className={styles.label}>待审核</Text>
          </View>
          {status == 2 ? (
            <View className={styles.reson}>{reason ?? '未知'}</View>
          ) : null}
        </View>
      );
    }
    if (status == 2) {
      return (
        <View className={styles.tagView1}>
          <View className={styles.tagTitle}>
            <Image className={styles.img} src={getImgUrl()} />
            <Text className={styles.label}>未通过</Text>
          </View>
          {status == 2 ? (
            <View className={styles.reson}>{reason ?? '未知'}</View>
          ) : null}
        </View>
      );
    }
    if (shelves == 0) {
      return (
        <View className={styles.tagView2}>
          <View className={styles.tagTitle}>
            <Image className={styles.img} src={getImgUrl()} />
            <Text className={styles.label}>已下架</Text>
          </View>
          {status == 2 ? (
            <View className={styles.reson}>{reason ?? '未知'}</View>
          ) : null}
        </View>
      );
    }
  }

  function getImgUrl() {
    if (status == 0) {
      return kl_1;
    }
    if (status == 2) {
      return kl_3;
    }
    if (shelves == 0) {
      return kl_2;
    }
  }
  return <>{status !== 1 || shelves == 0 ? getView() : null}</>;
};

export default AmTagCom;
