import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios'
import router from 'next/router';

axios.defaults.baseURL = 'https://bodhi-stock-cms.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function loginRequest(identifier:string, password:string): string | void {
  let jwt = "";
  
  const data = qs.stringify({
    "identifier": identifier,
    "password": password 
  });

  const config:AxiosRequestConfig = {
    method: 'post',
    url: '/auth/local',
    data : data
  };
  
  axios(config)
    .then((response) => {
      jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      router.push("/home")
      return jwt;
    })
    .catch(function (error) {
      console.log(error.response.data);
      return jwt;
    });

  console.log(jwt);
}