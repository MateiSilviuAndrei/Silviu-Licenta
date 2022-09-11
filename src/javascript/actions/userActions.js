import {DEV_API} from '../utils/config';
import {calls} from '../utils/calls';
import axios from 'axios';
import {setKeyInStorage} from '../utils/utils';

export const onSignIn = data => {
  return new Promise((resolve, reject) => {
    return axios(calls.onSignIn(DEV_API, data))
      .then(res => {
        setKeyInStorage('token', res?.data?.token);
        return resolve(res);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const onValidateToken = token => {
  return new Promise((resolve, reject) => {
    return axios(calls.onValidateToken(DEV_API, token))
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const onGetAllTicketsByUserId = (token, id) => {
  return new Promise((resolve, reject) => {
    return axios(calls.onGetAllTicketsByUserId(DEV_API, token, id))
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
