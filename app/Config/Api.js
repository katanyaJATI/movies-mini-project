import {
  ToastAndroid
} from 'react-native';

class Api {

  static host = 'https://api.themoviedb.org/3'
  static hostImg500 = 'https://image.tmdb.org/t/p/original'
  static hostImgOri = 'https://image.tmdb.org/t/p/w500'

  static headers() {
    return {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      // 'Authorization' : `Bearer ${token}`
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET')
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const url = `${this.host}/${route}?api_key=529ae25c5cdadee493d5fe38b674e0d2`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    console.log('url', url, options)

    var timeOut = new Promise(function (resolve, reject) {
      // console.log('reject',reject)
      setTimeout(() => reject({ "status": false, status_message: 'Connection Timeout (30s)', url: url, httpStatus: 500  }), 30000);
    });

    var fetcher = new Promise(function (resolve, reject) {
      
      fetch(url, options)
        .then((response) => 
          response.json().then(data => ({
            data: data,
            status: true,
            httpStatus: response.status
          }))
        )
        .then((res) => {
          // console.log('respone', res)
          resolve(res)
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error);
          // reject({ status: false, status_message: error.message, url: url, httpStatus: 500 });
          if (error == 'TypeError: Network request failed') {
            reject({ status: false, status_message: 'Connection Timeout (30s)', url: url, httpStatus: 500 });
          }else {
            reject({ status: false, status_message: 'Error Response API', url: url, httpStatus: 500 });
          }
        })
    });

    return Promise.race([fetcher, timeOut])
    .then(function (res) {
      console.log('success', res);
      return res
    })
    .catch(function (error) {
      console.log('error', error);
      return { status: false, status_message: error.message, url: url, httpStatus: 500 };
      throw error;      
    });
  }

}

export default Api