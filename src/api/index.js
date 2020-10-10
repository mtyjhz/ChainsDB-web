/*
 * @Author: 崔佳俊
 * @Date: 2020-10-07 14:22:44
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-10 16:51:29
 * @FilePath: /sr2/src/api/index.js
 */
import { ajax } from '@/libs';
import config from '@/confg';

// eslint-disable-next-line import/prefer-default-export
export const getEthdb = (data) => new Promise((resolve, reject) => {
  ajax({
    url: `${config.baseUrl}/sqlQuery`,
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
// eslint-disable-next-line import/prefer-default-export
export const getquery = (data) => new Promise((resolve, reject) => {
  ajax({
    url: `${config.baseUrl}/query`,
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

export const getdbTable = (data) => new Promise((resolve, reject) => {
  ajax({
    url: `${config.baseUrl}/index`,
    method: 'get',
    data,
    success: (res) => {
      resolve(res);
    },
    error: (error) => {
      reject(error);
    },
  });
});

export const getCidlist = (data) => new Promise((resolve, reject) => {
  ajax({
    url: `${config.baseUrl}/cid`,
    method: 'get',
    data,
    success: (res) => {
      resolve(res);
    },
    error: (error) => {
      reject(error);
    },
  });
});
