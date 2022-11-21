import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import { AtIcon } from 'taro-ui';
import { API_PREFIX_IMAGE } from '@/constants/common';
import normalStyles from './index.module.less';

const PlayRound = `${API_PREFIX_IMAGE}/jx.png`;

let innerAudioContext = Taro.createInnerAudioContext();
const AudioPlay = ({ serviceRefuseAudioTime = 0, serviceRefuseAudio = '' }) => {
  useEffect(() => {
    return () => {
      innerAudioContext.destroy();
    };
  }, []);
  const handlePlay = () => {
    if (serviceRefuseAudio) {
      innerAudioContext.destroy();
      innerAudioContext = Taro.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = serviceRefuseAudio;
      innerAudioContext.onPlay(() => {});
      innerAudioContext.onError((res) => {});
    }
  };

  return (
    <View className={normalStyles.button} onClick={handlePlay}>
      <Image className={normalStyles.image} src={PlayRound} />
      <Text className={normalStyles.audioTime}>
        <AtIcon value="volume-plus" size="20" color="#fff" />
        {serviceRefuseAudioTime}s
      </Text>
    </View>
  );
};
export default AudioPlay;
