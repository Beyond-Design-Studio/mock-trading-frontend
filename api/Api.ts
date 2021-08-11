import * as qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios'
import router from 'next/router';

axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function loginRequest(identifier:string, password:string) {
  var data = qs.stringify({
    'identifier': identifier,
    'password': password 
  });
  var config:AxiosRequestConfig = {
    method: 'post',
    url: '/auth/local',
    data : data
  };
  
  axios(config)
  .then(function(response) {
    // console.log((response.data));
    localStorage.setItem("token", response.data.jwt)
    router.push("/home")
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}