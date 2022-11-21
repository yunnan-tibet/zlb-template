import { View } from '@tarojs/components';
import { inject, observer } from 'mobx-react';
import { useStyle } from '@/utils/styleChoose';
import styles1 from './index.module.less';
import styles2 from './old.module.less';
import { useInit } from '@/utils/hooks';

interface IProps {
  store?: IStore;
}

function Home(props: IProps) {
  const styles = useStyle(styles1, styles2);
  const { store } = props;
  useInit(store);

  return <View className={styles.info}>正在获取用户信息...</View>;
}

export default inject('store')(observer(Home));
