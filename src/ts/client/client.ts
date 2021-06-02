

import axios from 'axios';

const url = process.env.REACT_APP_URL_API_USERS;

const SUCCESS_STATUS_LOG = 3;

export const client = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store , no-cache',
    Accept: 'application/json',
  },
});


client.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

client.interceptors.request.use(
  (config) => {
    config.url = `${url}${config.url}`;
    const sessionKey = getCookie('token');

    if (sessionKey) {
      if (!config.headers.token) {
        addHeaders(config.headers, {
          token: `${sessionKey}`,
        });
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);



client.interceptors.response.use(
  (response) => {

    const errorResponse =
      response.data &&
      Array.isArray(response.data.statusLog) &&
      response.data.statusLog[0].type !== SUCCESS_STATUS_LOG;

    if (response.data && response.data.token && response.data.accessToken) {
      
      addHeaders({
        token: `${response.data.token}`,
      });

      setCookie('token', response.data.token, 1260);
      setCookie('accessToken', response.data.accessToken, 1260);
    }

    return errorResponse
      ? Promise.reject(response)
      : Promise.resolve(response);
  },
  (error) => Promise.reject(error)
);

export const addHeaders = (headers: any, newHeaders?: any) => {
  headers = Object.assign(headers, newHeaders);
};

export const removeHeaders = (headerList: any) =>
  headerList.forEach((header: any) => delete client.defaults.headers[header]);

export const removeHeaderAuthorization = () => {
  client.defaults.headers.token = '';
  return true;
};

function setCookie(name: string, value: any, minutes: any) {
  var expires = '';
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
    console.log('expires', expires)
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}


export function getCookie(name: string) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}
