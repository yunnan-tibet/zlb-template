import { Button, Form, Input, Textarea, View } from '@tarojs/components';
import { Fragment } from 'react';
import normalStyles from './index.module.less';
import elderStyles from './elder.module.less';
import { useStyle } from '@/utils/styleChoose';

interface Props {
  callBackInput?: Function;
  setIsOpen: Function;
  isOpen: boolean;
}
const InputCom = (props: Props) => {
  const { callBackInput, isOpen, setIsOpen } = props;
  const styles = useStyle(normalStyles, elderStyles);
  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    callBackInput && callBackInput(e.detail.value.textarea);
  };
  return (
    <>
      {isOpen ? (
        <Form onSubmit={handleSubmit}>
          <View className={styles.input_section}>
            <Textarea
              name="textarea"
              className={styles.input_input}
              autoFocus
              cursor={20}
              placeholder="请评论"
              onConfirm={(e) => callBackInput && callBackInput(e)}
              onBlur={handleBlur}
            />
            <View className={styles.btnView}>
              <Button formType="submit" className={styles.btn}>
                发送
              </Button>
            </View>
          </View>
        </Form>
      ) : null}
    </>
  );
};

export default InputCom;
