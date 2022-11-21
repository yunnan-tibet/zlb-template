import { View, Picker } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Taro from '@tarojs/taro';
import moment from 'moment';
import classNames from 'classnames';
import normalStyles from './normal.module.less';
import elderStyles from './elder.module.less';
import { INFO_TYPE } from '@/constants/handyPat';
import { useStyle } from '@/utils/styleChoose';

export default function HomeFilter(props) {
  const { onChange, params, hideBtn } = props;
  const styles = useStyle(normalStyles, elderStyles);
  const { time } = params || {};
  let { type } = params || {};
  type = typeof type === 'number' ? type + 1 : 0;

  const typeOnChange = (e) => {
    const v = +e.detail.value - 1;
    onChange({ type: v === INFO_TYPE.ALL ? '' : v });
  };

  const monthOnChange = (e) => {
    const _time = e.detail.value;
    onChange({
      time: _time,
      beginTime: moment(_time).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(_time).endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    });
  };

  const toMap = () => {
    Taro.navigateTo({ url: '/pages/map/index' });
  };

  return (
    <View className={styles.homeFilter}>
      <Picker
        mode="date"
        fields="month"
        className={classNames(styles.picker, styles.date)}
        onChange={monthOnChange}
        value={time || 0}
      >
        <View className={styles.type}>
          <View className={styles.typeText}>{time}</View>
          <AtIcon value="clock" className={styles.clockIcon} color="#808DA1" />
        </View>
      </Picker>
      <Picker
        mode="selector"
        key="type"
        className={styles.picker}
        range={INFO_TYPE.VALUES.map((key) => INFO_TYPE.toString(key))}
        onChange={typeOnChange}
        value={type || 0}
      >
        <View className={styles.type}>
          <View className={styles.typeText}>
            {typeof type == 'number' ? INFO_TYPE.toString(type - 1) : '类型'}
          </View>
          <AtIcon
            value="chevron-down"
            style={{ fontSize: 12 }}
            color="#808DA1"
          />
        </View>
      </Picker>

      {!hideBtn ? <View className={styles.mapBtn} onClick={toMap} /> : ''}
    </View>
  );
}
