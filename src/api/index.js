/*
 * @Author: 崔佳俊
 * @Date: 2020-10-07 14:22:44
 * @LastEditors: 崔佳俊
 * @LastEditTime: 2020-10-07 14:45:48
 * @FilePath: /chainsdb/src/api/index.js
 */
import { ajax } from '@/libs';
import config from '@/confg';

// eslint-disable-next-line import/prefer-default-export
export const getEthdb = (data) => new Promise((resolve, reject) => {
  ajax({
    url: config.baseUrl,
    method: 'POST',
    data,
    success: (res) => {
      resolve(res);
    },
    error: (error) => {
      reject(error);
    },
  });
});
