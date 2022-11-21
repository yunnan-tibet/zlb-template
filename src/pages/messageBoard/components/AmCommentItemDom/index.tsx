import { View, Image, Text } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import { getTimeDuan } from '@/utils/utils';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';
import { getTimeFormat } from '@/utils/stringUtils';

interface Props {
  data: any;
  detailObj: any;
  callbackHuifu?: Function;
}
const AmCommentItemDom = (props: Props) => {
  const { data, callbackHuifu, detailObj } = props;
  const styles = useStyle(normalStyles, elderStyles);
  return (
    <View className={styles.amCommentItemDom}>
      <View
        className={styles.title}
      >{`全部评论(${detailObj.commentNum})`}</View>
      {data?.map((item) => {
        return (
          <>
            <View className={styles.comment} key={item?.id}>
              <View>
                <Image className={styles.img} src={item?.headUrl} />
              </View>

              <View className={styles.info}>
                <View className={styles.topView}>
                  <View className={styles.name}>{item?.nickname}</View>
                  <View className={styles.time}>
                    {getTimeFormat(item?.createTime)}
                  </View>
                </View>
                <View
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <View
                    className={styles.comment}
                    onClick={() => callbackHuifu && callbackHuifu(item?.id)}
                  >
                    {item?.comment}
                  </View>
                </View>
                {item?.list.length === 0 ? null : (
                  <>
                    {item?.list?.map((it) => {
                      return (
                        <>
                          <View className={styles.huifu}>
                            <Text className={styles.nickName}>
                              {`${it?.nickname}`}:
                              <Text
                                className={styles.replyDesc}
                              >{`${it?.comment}`}</Text>
                            </Text>
                          </View>
                        </>
                      );
                    })}
                  </>
                )}
              </View>
            </View>
            <AtDivider lineColor="#f6f7f8" />
          </>
        );
      })}
    </View>
  );
};

export default AmCommentItemDom;
