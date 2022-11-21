import { View } from '@tarojs/components';
import './index.less';
const SubmitButton = (props) => {
  const { text, bckColor,callBack } = props;
  return (
    <View  style={{ background: bckColor }} className="btnView" onClick={callBack}>
      {text}
    </View>
  );
};

export default SubmitButton;
