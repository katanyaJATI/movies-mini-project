import {
  ToastAndroid
} from 'react-native';

class Api {

  static host = 'https://api.themoviedb.org/3'
  static hostImg200 = 'https://image.tmdb.org/t/p/w200'
  static hostImgOri = 'https://image.tmdb.org/t/p/original'

  static headers() {
    return {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    }
  }

  static get(route, params) {
    return this.xhr(route, params, 'GET')
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

    let parameter = '';
    if ( verb=="GET" ) {
      if ( params !== undefined ){
        for (let key in params) {
          parameter += "&";
          parameter += key + "=" + params[key];
        }
      }
    }

    const url = `${this.host}/${route}?api_key=529ae25c5cdadee493d5fe38b674e0d2${parameter}`
    let options = Object.assign({ method: verb }, verb != 'GET' && params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    console.log('url', url, options)

    var timeOut = new Promise(function (resolve, reject) {
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
          resolve(res)
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error);
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