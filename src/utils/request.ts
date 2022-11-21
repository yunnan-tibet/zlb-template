import { mgop } from '@aligov/jssdk-mgop';

interface IOptions {
  api: string; // 正式
  host?: string;
  type?: string;
  data?: any;
  params?: any;
  sucCb?: any;
  errCb?: any;
}

export const request = ({ api, host, data, params }: IOptions) => {
  return new Promise((resolve, reject) => {
    mgop({
      api, // 必须
      host: host || 'https://mapi.zjzwfw.gov.cn/',
      appKey: '7f8aesa6+2001908361+lwraer', // 必须
      dataType: 'JSON',
      data: { ...(data || {}), ...(params || {}) },
      type: 'GET',
      onSuccess: (res) => {
        const { code } = res.data;
        if (code === 200) {
          resolve(res.data.data || res.data);
        } else {
          reject(res.data);
        }
      },
      onFail: (err) => {
        reject(err);
        console.log(err);
      },
    } as any);
  });
};
