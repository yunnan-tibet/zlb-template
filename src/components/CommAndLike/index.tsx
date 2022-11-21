import { View, Image, Text } from '@tarojs/components';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';
const zan = require('@/assets/image/zan.png');
const nozan = require('@/assets/image/nozan.png');
const comm = require('@/assets/image/comm.png');

interface Props {
  data: any;
  id: number;
  callBackComm: () => void;
  callBackLike: () => void;
}
const CommAndLikeDom = (props: Props) => {
  const { callBackComm, id, callBackLike, data } = props;
  const styles = useStyle(normalStyles, elderStyles);
  return (
    <View className={styles.commStyle}>
      <View className={styles.commStyle_item} onClick={() => callBackComm()}>
        <Image className={styles.img} src={comm} />
        <Text className={styles.label}>评论</Text>
      </View>
      <View className={styles.commStyle_item} onClick={callBackLike}>
        <Image className={styles.img} src={data?.likesStatus == 0 ? nozan : zan} />
        <Text className={styles.label}>点赞</Text>
      </View>
    </View>
  );
};

export default CommAndLikeDom;
