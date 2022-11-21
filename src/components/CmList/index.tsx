import { View, Image } from '@tarojs/components';
import classNames from 'classnames';
import { TASK_STATUS } from '@/constants/handyPat';
import normalStyles from './normal.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';

interface Prop {
  title: string;
  text: string;
  type: string;
  img: string;
  status: number;
  handleClickDetail: () => void;
}

export default function CmList(props: Prop) {
  const { title, text, type, handleClickDetail, img, status } = props;
  const styles = useStyle(normalStyles, elderStyles);
  const handleDetail = () => {
    handleClickDetail();
  };

  return (
    <View className={styles.list} onClick={handleDetail}>
      {/* 图片 */}
      <View className={styles.imgWrapper}>
        <Image className={styles.cover} src={img} />
        <View
          className={classNames(
            styles.status,
            styles[`f-${TASK_STATUS.toKey(status)}`],
          )}
        >
          {TASK_STATUS.toString(status)}
        </View>
      </View>
      <View className={styles.leftList}>
        <View className={styles.row}>
          <View className={styles.title}>{title}</View>
        </View>
        <View className={styles.line}>{text}</View>
      </View>
      <View className={styles.rightTag}>{type}</View>
    </View>
  );
}
