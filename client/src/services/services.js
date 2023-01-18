import {create} from 'axios';
import {HTTP_METHODS} from './api-constants';

/**
 * axios object
 */
const API = create({
  timeout: 60000,
});

/**
 * To perform api from class where this function/method is imported,
 * and send back completion in resolve or reject based on api response.
 */
export const request = (url, httpMethod, params, isWithToken, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenObj = isWithToken
        ? {
            Authorization: `Bearer 92272C13D94AFA77597BFF237EB821B6AB195779C594AB38EA103975AA65B76C` /*the token is a variable which holds the token */,
          }
        : {};
      const configObj = {
        headers: {
          ...tokenObj,
        },
      };

      switch (httpMethod) {
        // GET
        case HTTP_METHODS.GET:
          doGet(url, resolve, reject, configObj);
          break;

        // POST
        case HTTP_METHODS.POST:
          doPost(url, params, resolve, reject, configObj);
          break;

        // PUT
        case HTTP_METHODS.PUT:
          doPut(url, params, resolve, reject, configObj);
          break;

        // DELETE
        case HTTP_METHODS.DELETE:
          doDelete(url, params, resolve, reject, configObj);
          break;
      }
    } catch (error) {
      reject(error);
    }
  });

/**
 *  This function is used to parse response and send completion to handle resolve and reject value for parent Promise.
 * We can consider it as a child promise
 * @param {*} response
 */
export const parseResponse = response =>
  new Promise(parsedResponse => {
    const isSuccess = response.status === 200 ? true : false; // 202 is used for Knet-checkout
    if (isSuccess) {
      parsedResponse({isSuccess: true, response: response});
    } else {
      parsedResponse({isSuccess: false, message: response});
    }
  });

/***
 * This function is used for service request with GET as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doGet = (url, resolve, reject, config = {}) => {
  API.get(url, config)
    .then(response => {
      console.log('url:UD', url);
      console.log('response:UD', response);
      parseResponse(response).then(parsedResponse => {
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      console.log('ERROR GET 1--> ', error, url);
      console.log(`doGet ERROR: URL : ${url}, ERROR MESSAGE : ${error}`);
      reject(error);
    });
};

/***
 * This function is used for service request with POST as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPost = (url, params, resolve, reject, config = {}) => {
  API.post(url, params, config)
    .then(response => {
      console.log('url:UD', url);
      console.log('response:UD', response);
      parseResponse(response).then(parsedResponse => {
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      console.log(
        `doPost ERROR: URL : ${url},  PARAMS: ${JSON.stringify(
          params,
        )}, ERROR MESSAGE : ${error}`,
      );
      reject(error);
    });
};

/***
 * This function is used for service request with PUT as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPut = (url, params, resolve, reject, config = {}) => {
  API.put(url, params, config)
    .then(response => {
      console.log('url:UD', url);
      console.log('response:UD', response);
      parseResponse(response).then(parsedResponse => {
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      console.log(
        `doPut ERROR: URL : ${url}, PARAMS: ${JSON.stringify(
          params,
        )}, ERROR MESSAGE : ${error}`,
      );
      reject(error);
    });
};

/***
 * This function is used for service request with DELETE as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doDelete = (
  url,
  params,
  resolve,
  reject,
  config = {},
  isfromCart = false,
) => {
  API.delete(url, config)
    .then(response => {
      parseResponse(response).then(parsedResponse => {
        // console.log(`url ${url} response => ${JSON.stringify(response)}`);
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse);
        }
      });
    })
    .catch(error => {
      console.log(
        `doDelete ERROR: URL : ${url}, PARAMS: ${JSON.stringify(
          params,
        )}, ERROR MESSAGE : ${error}`,
      );
      reject(error);
    });
};
