/*
 * @Author: 崔佳俊
 * @Date: 2020-10-07 14:18:34
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-09 16:30:13
 * @FilePath: /sr2/src/libs/index.js
 */
import { Loading } from 'element-ui';
// eslint-disable-next-line import/prefer-default-export
export const ajax = (setting) => {
  const loadingInstance = Loading.service({ fullscreen: true });
  // 设置参数的初始值
  const opts = {
    method: (setting.method || 'GET').toUpperCase(), // 请求方式
    url: setting.url || '', // 请求地址
    async: setting.async || true, // 是否异步
    dataType: setting.dataType || 'json', // 解析方式
    data: setting.data || '', // 参数
    success: setting.success || function () { }, // 请求成功回调
    error: setting.error || function () { }, // 请求失败回调
  };

  // 参数格式化
  // eslint-disable-next-line camelcase
  function params_format(obj) {
    let str = '';
    for (const i in obj) {
      str += `${i}=${obj[i]}&`;
    }
    return str.split('').slice(0, -1).join('');
  }

  // 创建ajax对象
  const xhr = new XMLHttpRequest();

  // 连接服务器open(方法GET/POST，请求地址， 异步传输)
  if (opts.method == 'GET') {
    xhr.open(opts.method, `${opts.url}?${params_format(opts.data)}`, opts.async);
    xhr.send();
  } else {
    xhr.open(opts.method, opts.url, opts.async);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(opts.data));
  }

  /*
  ** 每当readyState改变时，就会触发onreadystatechange事件
  ** readyState属性存储有XMLHttpRequest的状态信息
  ** 0 ：请求未初始化
  ** 1 ：服务器连接已建立
  ** 2 ：请求已接受
  ** 3 : 请求处理中
  ** 4 ：请求已完成，且相应就绪
  */
  xhr.onreadystatechange = function () {
    loadingInstance.close();
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      switch (opts.dataType) {
        case 'json':
          var json = JSON.parse(xhr.responseText);
          opts.success(json);
          break;
        case 'xml':
          opts.success(xhr.responseXML);
          break;
        default:
          opts.success(xhr.responseText);
          break;
      }
    }
  };

  xhr.onerror = function (err) {
    loadingInstance.close();
    opts.error(err);
  };
};
function transformObject(keyArr, valueArr) {
  const obj = {};
  keyArr.map((v, i) => {
    obj[keyArr[i]] = valueArr[i];
  });
  return obj;
}
