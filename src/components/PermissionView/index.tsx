import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { inject, observer } from 'mobx-react';
import styles from './normal.module.less';
import CertificationModal from '@/components/CertificationModal';

interface IProps {
  children: React.ReactNode;
  store?: IStore;
}
function PermissionView(props: IProps) {
  const { children, store } = props;
  const userInfo = store?.user.userInfo;
  const [isOpened, setIsOpen] = useState<boolean>(false);
  const ele = useRef<any>(null);

  const clickFunc = useCallback(
    function (e) {
      if (!userInfo?.id) {
        e.stopPropagation();
        setIsOpen(true);
      }
    },
    [userInfo?.id],
  );
  useEffect(() => {
    ele.current = document.getElementById('permissionView');
    ele.current?.addEventListener('click', clickFunc, true);
    return () => {
      ele.current.removeEventListener('click', clickFunc, true);
    };
  }, []);
  return (
    <>
      <View
        id="permissionView"
        hoverStopPropagation
        className={styles.permissionView}
      >
        {children}
      </View>
      <CertificationModal isOpened={isOpened} setIsOpened={setIsOpen} />
    </>
  );
}
export default inject('store')(observer(PermissionView));
