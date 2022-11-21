import { View, Image, Picker, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { hookUtils } from '@szsk/utils';
import { getMBList } from '@/service/messageBoard';
import normalStyles from './normal.module.less';
import elderStyles from './elder.module.less';
import AmMessageListDom from './components/AmMessageListDom';
import { getMessageTypeList } from '@/service/common';
import './index.less';
import CertificationModal from '@/components/CertificationModal';
import BottomAction from '@/components/BottomAction';
import Footer from '@/components/Footer';
import { useStyle } from '@/utils/styleChoose';
import { getBottomLeft } from '@/utils/screen';
import { PAGE_SIZE } from '@/constants';
import PermissionView from '@/components/PermissionView';

const banner =
  'https://szzw001.oss-cn-hangzhou.aliyuncs.com/assetControl/app/banner-mb.png';

const tabList = [{ title: '留言广场' }, { title: '我的留言' }];
function MessageBoard(props) {
  const { store } = props;
  const userInfo = store?.user.userInfo;
  const styles = useStyle(normalStyles, elderStyles);
  const [current, setCurrent] = useState(0);
  const [params, setParams] = useState<any>({
    searchType: 0,
    userId: userInfo.id,
  });
  const [dataList, setDataList] = useState<any>([]);
  const [typeList, setTypeList] = useState<any>([]);
  const [typeValue, setTypeValue] = useState(0); // 类型选择
  const [dateValue, setDateValue] = useState(''); // 时间选择
  const [IsOpen, setIsOpen] = useState(false);
  const [top, setTop] = useState<number>(0);
  const [condition, setCondition] = useState<any>({
    pageSize: 20,
    pageNum: 1,
  });
  const { pageSize = 0, pageNum = 0 } = condition;
  const [total, setTotal] = useState<number>(0);
  // useInit(store);

  useEffect(() => {
    typeValue === 0 || dateValue === ''
      ? queryList({ ...params, messageType: undefined, time: undefined })
      : queryList(params);
  }, [condition]);
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '社区留言板' });
    let newParams = {};
    if (current == 1) {
      newParams = {
        ...params,
        searchType: 2,
      };
    }
    setParams(newParams);
    queryList(newParams);
  }, [current]);

  useDidShow(() => {
    queryList(params);
    // setParams(params);
    getMessageTypeList({ codeType: '009' }).then((res: any) => {
      res.unshift({ code: '', codeType: '', codeName: '全部类型' });
      setTypeList(res);
      Taro.setStorageSync('messageType', JSON.stringify(res));
    });
  });
  // 获取列表数据
  const queryList = (_params) => {
    Taro.showLoading({ title: 'Loading' });
    getMBList({ ..._params, userId: userInfo.id, ...condition }).then(
      (res: any) => {
        const { total, list } = res;
        if (pageNum === 1) {
          setDataList(list);
          setTop(top - 1);
        } else {
          setDataList([...dataList, ...list]);
        }
        setTotal(total);
        Taro.hideLoading();
      },
    );
  };
  // 跳转我要留言页面
  const handleMessage = () => {
    Taro.navigateTo({ url: '/pages/messageBoard/messageForm/index' });
  };

  const handleChangeTabs = (v) => {
    setCurrent(v);
    setTypeValue(0);
    setDateValue('');
    setCondition({ pageSize: PAGE_SIZE, pageNum: 1 });
  };

  // 类型切换
  const handleChangeType = (v) => {
    const vm = v.detail.value;
    setTypeValue(Number(vm));
    // Number(vm) == 0 ? undefined : (params.messageType = Number(vm - 1));
    setParams(params);
    queryList({
      ...params,
      messageType: Number(vm) == 0 ? undefined : Number(vm - 1),
    });
  };

  const onDateChange = (e: any) => {
    setDateValue(e.detail.value);
    const beginTime = moment(e.detail.value).format('YYYY-MM');
    const endTime = moment(e.detail.value).format('YYYY-MM-DD');
    params.time = beginTime;
    // params['endTime'] = endTime;
    queryList(params);
  };

  const obj = {
    current,
    dataList,
    typeList,
    setDataList,
  };

  const onParamChange = (_data: any) => {
    setCondition({ ...condition, ..._data });
  };

  // 上拉加载
  const onScrollToLower = hookUtils.useThrottle(() => {
    // 到达最大条数则不再去获取数据
    if (total > pageSize * pageNum) {
      onParamChange({ pageNum: pageNum + 1 });
    }
  }, 200);

  return (
    <ScrollView
      // scroll-top={top}
      scrollY
      // className={styles.list}
      style={{
        height: `calc(90vh )`,
      }}
      lowerThreshold={700}
      onScrollToLower={onScrollToLower}
    >
      <View className={styles.messageBoard}>
        <Image id="banner" src={banner} className={styles.images} />

        <AtTabs current={current} tabList={tabList} onClick={handleChangeTabs}>
          <>
            {tabList?.map((item: any, idx: number) => {
              return (
                <AtTabsPane key={idx} current={current} index={idx}>
                  {/* 顶部筛选 */}

                  <View
                    className={styles.row}
                    // style={{ justifyContent: 'space-around' }}
                  >
                    {/* <Picker
                    mode="selector"
                    range={typeList}
                    rangeKey="codeName"
                    onChange={handleChangeType}
                    value={typeValue}
                  >
                    <AtList hasBorder={false}>
                      <AtListItem
                        hasBorder={false}
                        arrow="right"
                        extraText={
                          typeValue == 0
                            ? '全部类型'
                            : typeList[typeValue]?.codeName
                        }
                      />
                    </AtList>
                  </Picker> */}

                    <Picker
                      style={{ fontSize: 20 }}
                      className={styles.selectDate}
                      mode="date"
                      onChange={onDateChange}
                      fields="month"
                      start={['2020', '01'].join('-')}
                    >
                      <AtList hasBorder={false}>
                        <AtListItem
                          arrow="right"
                          hasBorder={false}
                          extraText={dateValue == '' ? '选择时间' : dateValue}
                        />
                      </AtList>
                    </Picker>
                  </View>

                  <View style={{ height: 10, background: '#e6e9ee' }} />

                  <AmMessageListDom {...obj} />
                </AtTabsPane>
              );
            })}
          </>
        </AtTabs>
        <View className={styles.listBottom} />
        {userInfo?.id ? (
          <PermissionView>
            <BottomAction onClick={handleMessage} text="我要留言" />
          </PermissionView>
        ) : null}

        <Footer />
      </View>
    </ScrollView>
  );
}

export default inject('store')(observer(MessageBoard));
