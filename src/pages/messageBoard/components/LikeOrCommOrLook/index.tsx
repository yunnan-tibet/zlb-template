import { View, Image, Text } from '@tarojs/components';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';

const look = require('@/assets/image/look.png');
const zan = require('@/assets/image/zan.png');
const nozan = require('@/assets/image/nozan.png');
const comm = require('@/assets/image/comm.png');

interface Props {
  likeFlag?: boolean;
  commFlag?: boolean;
  lookFlag?: boolean;
  callBackComm?: Function;
  callBackLike?: Function;
  data: any;
}
const LikeOrCommOrLook = (props: Props) => {
  const {
    callBackComm,
    callBackLike,
    data,
    likeFlag = false,
    commFlag = false,
    lookFlag = false,
  } = props;
  const styles = useStyle(normalStyles, elderStyles);

  return (
    <View className={styles.dff}>
      {lookFlag ? (
        <View className={styles.acc}>
          <Image className={styles.img} src={look} />
          <View className={styles.num}>{data.viewsNum}</View>
        </View>
      ) : null}

      {commFlag ? (
        <View
          className={styles.acc}
          onClick={() => callBackComm && callBackComm()}
        >
          <Image className={styles.img} src={comm} />
          <Text className={styles.num}>{data?.commentNum}</Text>
        </View>
      ) : null}
      {likeFlag ? (
        <View
          className={styles.acc}
          onClick={() => callBackLike && callBackLike()}
        >
          <Image className={styles.img} src={data.likesStatus == 0 ? nozan : zan} />
          <Text className={styles.num}>{data?.likesNum}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default LikeOrCommOrLook;
