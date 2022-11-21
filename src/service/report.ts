import Taro from '@tarojs/taro';
import { HOST } from '@/constants';
// 上传图片
export function uploadImage(data) {
  const { path } = data;
  // 图片多个上传
  if (Array.isArray(path)) {
    const promiseArr = path.map((src) => {
      return new Promise((resolve, reject) => {
        // objectUrl to blob
        const xhr0 = new XMLHttpRequest();
        xhr0.open('GET', src, true);
        xhr0.responseType = 'blob';
        xhr0.onload = function (e) {
          if (this.status === 200) {
            // file upload
            const blob = this.response;
            const xhr = new XMLHttpRequest();
            const _data = new FormData();
            _data.append('file', blob);
            xhr.withCredentials = false;
            xhr.onload = function () {
              if (xhr.status === 200) {
                const uploadData = JSON.parse(xhr.responseText);
                if (uploadData.code === 200) {
                  resolve(uploadData.data[0].attachPath);
                } else {
                  reject(uploadData);
                }
              } else {
                reject(xhr.responseText);
              }
            };
            xhr.open('post', `${HOST}/ossOpt/img/upload`, true);
            xhr.setRequestHeader(
              'user-id',
              sessionStorage.getItem('userId') as string,
            );
            xhr.send(_data);
          }
        };
        xhr0.send();
      });
    });
    return new Promise((resolve, reject) => {
      Promise.all(promiseArr)
        .then((res: string[]) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          Taro.showToast({
            title: '上传失败',
            icon: 'none',
          });
        });
    });
  }
}
