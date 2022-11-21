import { View, Image, Text } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import Taro from '@tarojs/taro';
import { desensitizedName, getTimeDuan } from '@/utils/utils';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import LikeOrCommOrLook from '../LikeOrCommOrLook';
import AmTagCom from '../AmTagCom';
import Empty from '@/components/Empty';
import { useStyle } from '@/utils/styleChoose';
import { getTimeFormat } from '@/utils/stringUtils';

interface Props {
  current: any;
  dataList: any;
  typeList: any;
}
const avatar = require('@/assets/image/avatar.png');

const AmMessageListDom = (props: Props) => {
  const { dataList, typeList, current } = props;
  const styles = useStyle(normalStyles, elderStyles);

  const handleDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/messageBoard/messageDetail/index?id=${id}`,
    });
  };

  return (
    <>
      <View className={styles.helpListView}>
        {dataList?.length === 0 ? (
          <Empty />
        ) : (
          <>
            {dataList?.map((item: any) => {
              const {
                id,
                imgUrl,
                nickname,
                anonymous,
                createTime,
                status,
                shelves,
                message,
              } = item;
              return (
                <>
                  <View
                    className={styles.item}
                    onClick={() => handleDetail(id)}
                  >
                    <View className={styles.itemView}>
                      <View className={styles.itemView_left}>
                        <Image
                          className={styles.img}
                          src={imgUrl && imgUrl != '' ? imgUrl : avatar}
                        />
                        <View className={styles.info}>
                          <Text className={styles.name}>
                            {anonymous === 1
                              ? '匿名'
                              : desensitizedName(nickname)}
                          </Text>
                          <Text className={styles.time}>
                            {getTimeFormat(createTime)}
                          </Text>
                        </View>
                      </View>

                      <View className={styles.row}>
                        {/* {current == 1 && item?.status != 1 ? (
                      <View
                        className={
                          item?.status == 2 ? styles.tagView1 : styles.tagView
                        }
                      >
                        {MESSAGE_STATUS[item?.status]?.label}
                      </View>
                    ) : null}

                    {item.shelves == 0 && current == 1 && item?.status == 1 ? (
                      <View className={styles.tagView2}>已下架</View>
                    ) : null} */}

                        {/* <View className={styles.tagView}>
                          {typeList[item?.messageType + 1]?.codeName}
                        </View> */}
                      </View>
                    </View>
                    <View className={styles.itemView_bottom}>
                      <Text className={styles.title}>{message}</Text>
                    </View>

                    <AmTagCom data={item} />

                    {status == 1 && shelves === 1 ? (
                      <>
                        <AtDivider lineColor="#f6f7f8" />
                        <LikeOrCommOrLook
                          data={item}
                          likeFlag
                          lookFlag
                          commFlag
                        />
                      </>
                    ) : null}
                  </View>

                  {/* <View style={{ height: '2px', background: 'red' }} /> */}
                </>
              );
            })}
          </>
        )}
      </View>
      {/* <View className={styles.seatView} /> */}
    </>
  );
};

export default AmMessageListDom;
