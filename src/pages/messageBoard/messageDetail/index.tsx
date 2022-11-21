/* eslint-disable no-shadow */
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import {
  addLike,
  commMessage,
  getCommentDetail,
  getMessageDetail,
} from '@/service/messageBoard';
import { useStyle } from '@/utils/styleChoose';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import SwiperComponent from '@/components/Swiper';
import AmCommentItemDom from '../components/AmCommentItemDom';
import CommAndLikeDom from '@/components/CommAndLike';
import InputCom from '@/components/InputCom';
import { desensitizedName } from '@/utils/utils';

const MessageDetail = (props) => {
  const styles = useStyle(normalStyles, elderStyles);
  const MESSAGE_TYPE = JSON.parse(Taro.getStorageSync('messageType') || '[]');
  const { store } = props;
  const userInfo = store?.user.userInfo;
  const router = useRouter();
  const id = Number(router.params.id); // 留言id
  const [detailObj, setDetailObj] = useState<any>({});
  const [commList, setCommList] = useState([]); // 评论集合
  const [fatherId, setFatherId] = useState(0); // 回复评论的父ID
  const [isOpen, setIsOpen] = useState(false); // 评论input
  const [params] = useState<any>({
    createUser: userInfo.id,
    phone: userInfo.phoneNum,
    nickname: userInfo.nickName,
    headUrl: userInfo.imgUrl,
    status: 1,
  });
  const [pageParams] = useState({ pageNum: 1, pageSize: 10 });

  const inputObj = {
    isOpen,
    setIsOpen,
  };
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '留言详情' });
    getDetailData({ id, userId: userInfo.id, status: 1 });
  }, []);

  function getDetailData(params) {
    getMessageDetail(params).then((res) => {
      setDetailObj(res);
      getCommentDetail({ ...pageParams, id }).then((el: any) => {
        setCommList(el.list);
      });
    });
  }

  // 回复留言
  const handleHuiFuMessage = () => {
    setIsOpen(true);
    setFatherId(0);
  };
  // 回复评论
  const handleHuiFuComm = (e) => {
    setIsOpen(true);
    setFatherId(e);
  };
  const handleComment = (e) => {
    params.messageId = Number(id);
    params.comment = e;
    params.commentId = fatherId;
    params.commentType = fatherId == 0 ? 0 : 1;
    params.firstCommentId = fatherId == 0 ? 0 : fatherId;
    commMessage(params).then((res: any) => {
      if (res.code === 200) {
        Taro.showToast({
          title: '评论成功',
          icon: 'none',
          // duration: 3000,
        });
        getDetailData({ id, userId: userInfo.id, status: 0 });
      }
    });
    setIsOpen(false);
  };

  // 点赞
  const handelLike = () => {
    addLike({ id, userId: userInfo?.id }).then((res: any) => {
      if (res.code === 200) {
        getDetailData({ id, userId: userInfo.id, status: 0 });
      }
    });
  };

  const {
    messageType,
    nickname,
    location,
    message,
    reason,
    likesNum,
    viewsNum,
    img = '',
    status,
    anonymous,
  } = detailObj;
  return (
    <>
      <View id="messageDetail" className={styles.messageDetailView}>
        <View
          className={isOpen ? 'mask' : ''}
          onClick={() => {
            setIsOpen(false);
          }}
        />

        <InputCom {...inputObj} callBackInput={handleComment} />
        {img === '' || img === null ? null : (
          <SwiperComponent pic={img?.split(';')} />
        )}
        <View className={styles.info}>
          <View className={styles.row}>
            <View className={styles.label}>留言类型</View>
            <View className={styles.value}>
              {MESSAGE_TYPE[messageType + 1]?.codeName}
            </View>
          </View>
          <View className={styles.row}>
            <View className={styles.label}>社区达人</View>
            <View className={styles.value}>
              {anonymous === 1 ? '匿名' : desensitizedName(nickname)}
            </View>
          </View>
          <View className={styles.row}>
            <View className={styles.label}>留言地址</View>
            <View className={styles.value}>{location}</View>
          </View>
          <View className={styles.row}>
            <View className={styles.label}>问题留言</View>
            <View className={styles.value}>{message}</View>
          </View>
          {status == 2 ? (
            <View className={styles.row}>
              <View className={styles.label}>审核不通过原因</View>
              <View className={styles.value}>{reason}</View>
            </View>
          ) : null}

          {status == 1 && detailObj.shelves === 1 ? (
            <View className={styles.dff}>
              <View className={styles.acc}>
                <Text className={styles.label}>赞</Text>
                <Text className={styles.num}>{likesNum}</Text>
              </View>

              <View className={styles.acc}>
                {/* <Image src={look} /> */}
                <Text className={styles.label}>浏览</Text>
                <Text className={styles.num}>{viewsNum}</Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* 留言区域 */}
        {commList.length === 0 ? null : (
          <View className={styles.commentView}>
            <AmCommentItemDom
              detailObj={detailObj}
              data={commList}
              callbackHuifu={handleHuiFuComm}
            />
          </View>
        )}
      </View>
      {/* <View className={styles.lastBottom}>{}</View> */}

      {/* 底部评论点赞 */}
      {status === 1 && detailObj.shelves === 1 ? (
        <CommAndLikeDom
          data={detailObj}
          id={Number(id)}
          callBackLike={handelLike}
          callBackComm={handleHuiFuMessage}
        />
      ) : null}
    </>
  );
};

export default inject('store')(observer(MessageDetail));
