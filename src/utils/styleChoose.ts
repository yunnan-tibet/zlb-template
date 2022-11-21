import { useState, useEffect } from 'react';

export const useStyle = (normalStyles, elderStyles) => {
  const [styles, setStyles] = useState(normalStyles);
  useEffect(() => {
    styleChoose(normalStyles, elderStyles, setStyles);
  }, []);

  return styles;
};

export const styleChoose = async (
  normalStyles: any,
  elderStyles: any,
  setStyles: any,
) => {
  window.ZWJSBridge.onReady(async () => {
    window.ZWJSBridge.getUiStyle({})
      .then((result) => {
        switch (result.uiStyle) {
          case 'normal':
            setStyles(normalStyles);
            break;
          case 'elder':
            setStyles(elderStyles);
            window.isElder = true;
            break;
          default:
        }
      })
      // 浙里办APP 6.11.0 版本以下版本标准模式兼容
      .catch(() => {
        setStyles(normalStyles);
      });
  });
};
