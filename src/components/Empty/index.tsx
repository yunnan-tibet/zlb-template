import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import IEmpty from "@/assets/image/empty.png";
import styles from "./index.module.less";

export default function Empty() {
  return (
    <View className={styles.empty}>
      <Image src={IEmpty} className={styles.imgSrc} />
      <View className={styles.tips}>很抱歉，暂无数据</View>
    </View>
  );
}
