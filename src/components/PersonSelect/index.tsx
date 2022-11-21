import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { API_PREFIX_IMAGE } from '@/constants/common';
import './index.less';
import { uploadImage } from '@/service/report';

const Delete = `${API_PREFIX_IMAGE}/delete.png`;
const Upload = `${API_PREFIX_IMAGE}/upload.png`;

type Props = {
  limit: number;
  imgList: Array<any>;
  text?: string;
  onChangeImage: (imgList: Array<string>) => void;
};

const PersonSelect = (props: Props) => {
  const { limit, onChangeImage, imgList = [], text } = props;
  const handleChangeImage = () => {
    const count = limit - imgList.length;
    if (count <= 0) {
      Taro.showToast({
        icon: 'none',
        title: '超过上传数量',
      });
    } else {
      Taro.chooseImage({
        count,
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > count) {
            Taro.showToast({
              icon: 'none',
              title: '超过上传数量',
            });
            return;
          }
          uploadImage({
            path: tempFilePaths,
          })?.then((_list: any) => {
            onChangeImage([...imgList, ..._list]);
          });
        },
      });
      // window.ZWJSBridge.chooseImage({
      //   upload: true,
      // })
      //   .then((result) => {
      //     const { picPath } = result;
      //     onChangeImage([...imgList, ...picPath]);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  const handleDeleteImage = (index) => {
    const _imageList = JSON.parse(JSON.stringify(imgList));
    _imageList.splice(index, 1);
    onChangeImage(_imageList);
  };

  return (
    <View className="imageSelect">
      <View className="imageList">
        {imgList.map((item, index) => {
          return (
            <View className="imageItem" key={index}>
              <Image src={item} className="upImage" />
              <Image
                onClick={() => handleDeleteImage(index)}
                src={Delete}
                className="deleteImage"
              />
            </View>
          );
        })}
        {imgList.length < limit ? (
          <View className="upload" onClick={handleChangeImage}>
            <Image src={Upload} className="UploadIcon" />
            <Text className="text">{text ?? '上传图片'}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default PersonSelect;
