import { Picker, View, Text, Textarea } from '@tarojs/components';
import { useEffect, useState } from 'react';
import {
  AtInput,
  AtList,
  AtListItem,
  AtSwitch,
  AtMessage,
  AtTextarea,
} from 'taro-ui';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import ImageSelect from '@/components/PersonSelect/index';
import SubmitButton from '@/components/SubmitButton';
import { submitMB } from '@/service/messageBoard';
import { getGeo, isIos } from '@/utils/utils';
import { checkStringEmpty } from '@/utils/stringUtils';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';
import PermissionView from '@/components/PermissionView';
import BottomAction from '@/components/BottomAction';

const MessageForm = (props) => {
  const MESSAGE_TYPE = JSON.parse(Taro.getStorageSync('messageType') || '[]');
  MESSAGE_TYPE.shift();
  const { store } = props;
  const USER_INFO = store?.user.userInfo;

  const styles = useStyle(normalStyles, elderStyles);
  const [mapInfo, setMapInfo] = useState<any>({});
  const [pickerValue, setPickerValue] = useState<any>(); // 留言类型
  const [nickValue, setNickValue] = useState(USER_INFO.userName); // 社区达人
  const [messageValue, setMessageValue] = useState(''); // 问题留言
  const [reportPictures, setReportPictures] = useState([]); // 选择的照片
  const [switchValue, setSwitchValue] = useState(false); // 开关
  const [isShow, setIsShow] = useState(true);
  const [params, setParams] = useState<any>({
    createUser: USER_INFO.id,
    phone: USER_INFO.phoneNum,
    imgUrl: USER_INFO.imgUrl,
    nickname: nickValue,
  }); // 请求参数
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '我要留言' });
    window.ZWJSBridge.getLocation()
      .then((result) => {
        setMapInfo(result);
      })
      .catch((error) => {
        // Taro.showToast({
        //   title: '请检查定位功能是否开启',
        //   icon: 'none',
        // });
      });
  }, []);

  useEffect(() => {
    // 处理键盘弹起顶起底部按钮
    if (/Android/gi.test(navigator.userAgent)) {
      const innerHeight = window.innerHeight;
      window.addEventListener('resize', () => {
        const newInnerHeight = window.innerHeight;
        if (innerHeight > newInnerHeight) {
          setIsShow(false);
          // 键盘弹出事件处理
        } else {
          // 键盘收起事件处理
          setIsShow(true);
        }
      });
    } else {
      window.addEventListener('focusin', () => {
        // 键盘弹出事件处理
        setIsShow(false);
      });
      window.addEventListener('focusout', () => {
        // 键盘收起事件处理
        setIsShow(true);
      });
    }
  }, []);

  // 留言提交
  const handleSubmit = () => {
    // if (!checkStringEmpty(params.messageType)) {
    //   Taro.atMessage({
    //     message: '发布主题不能为空！',
    //     type: 'warning',
    //   });
    //   return;
    // }
    if (!checkStringEmpty(params.message)) {
      Taro.atMessage({
        message: '问题留言不能为空！',
        type: 'warning',
      });
      return;
    }
    submitMB({ ...params, location: mapInfo?.detailAddress }).then(
      (res: any) => {
        if (res.code === 200) {
          Taro.showToast({
            title: '留言成功！',
            icon: 'none',
          });
          Taro.navigateBack({ delta: 1 });
        }
      },
    );
  };

  const handleChangePicker = (v) => {
    const vm: number = Number(v.detail.value);
    setPickerValue(vm);
    setParams({ ...params, messageType: vm });
  };

  const handleSwitch = (v) => {
    setSwitchValue(v);
    setParams({ ...params, anonymous: v ? 1 : 0 });
  };
  // const handleChangeNick = (v) => {
  //   setNickValue(v);
  //   setParams({ ...params, nickname: v });
  // };
  // const handleChangeAddress = (v) => {
  //   setParams({ ...params, location: v });
  //   setAddrValue(v);
  // };

  // ?  图片上传回调
  const handleChangeImage = (imgList) => {
    if (imgList.length > 6) {
      Taro.showToast({
        title: '最多上传6张照片',
        icon: 'none',
      });
      return;
    }
    setReportPictures(imgList);
    setParams({ ...params, img: imgList.join(';') });
  };

  const handleDesc = (v) => {
    setParams({ ...params, message: v });
    setMessageValue(v);
  };
  return (
    <>
      <View className={styles.messageFormView}>
        <AtMessage />
        {/* <View className={styles.item}>
          <Picker
            mode="selector"
            range={MESSAGE_TYPE}
            rangeKey="codeName"
            onChange={handleChangePicker}
          >
            <AtList hasBorder={false}>
              <AtListItem
                hasBorder={false}
                title="留言类型"
                extraText={
                  MESSAGE_TYPE[pickerValue]?.codeName ?? '请选择留言类型'
                }
                arrow="right"
              />
            </AtList>
          </Picker>
        </View> */}

        <View className={styles.item}>
          <AtInput
            name="nickname"
            title="社区达人"
            placeholder="请输入你的达人昵称"
            border={false}
            type="text"
            disabled
            value={nickValue}
            // onChange={handleChangeNick}
          />
        </View>

        <View className={styles.item}>
          <AtInput
            name="location"
            title="您的位置"
            placeholder="请输入你的地址"
            border={false}
            disabled
            value={mapInfo?.detailAddress}
            type="text"
            // onChange={handleChangeAddress}
          />
        </View>

        <View className={styles.item}>
          <AtList hasBorder={false}>
            <AtListItem
              hasBorder={false}
              title="照片上传"
              // extraText="图片仅支持 .jpg .png .jpeg等格式。"
            />
          </AtList>
          <View style={{ marginLeft: 12 }}>
            <ImageSelect
              text="最多上传5张"
              imgList={reportPictures}
              limit={5}
              onChangeImage={handleChangeImage}
            />
          </View>
        </View>

        <View className={styles.desc}>
          <Text className={styles.detail}>问题留言</Text>
          <AtTextarea
            placeholderClass={styles.placeholderCommon}
            className={classNames(
              styles.atTextarea,
              isIos() ? styles.fIos : '',
            )}
            style={{ marginLeft: 10 }}
            value={messageValue}
            onChange={handleDesc}
            maxLength={300}
            count
            placeholder="请输入您的宝贵留言"
          />
        </View>

        <View className={styles.row}>
          <Text className={styles.title}>匿名留言</Text>
          <AtSwitch
            border={false}
            checked={switchValue}
            onChange={handleSwitch}
          />
        </View>
        {isShow ? (
          <PermissionView>
            <BottomAction onClick={handleSubmit} text="提交" />
          </PermissionView>
        ) : null}
      </View>
    </>
  );
};

export default inject('store')(observer(MessageForm));
