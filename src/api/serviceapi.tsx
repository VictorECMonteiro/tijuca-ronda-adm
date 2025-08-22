import axios from "axios";
import getCookie from "../utils/getCookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
let tokenHeader = {token: "", permissao: ""}
let cookies = getCookie("User")


// console.log(cookies)
if(cookies){
  tokenHeader = JSON.parse(cookies)
}

else if(cookies === ""){
  tokenHeader = {token: "", permissao: ""}
  
}


export const api = axios.create({
  baseURL: "http://192.168.9.249:9010",
  headers:{
    "x-auth-token": tokenHeader.token,
    "permissao": tokenHeader.permissao
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error.status === 401)
    if(error.status === 401){
      window.location.href = "/"
    }
    console.error("Erro na API:", error.response?.data || error.message);
  }
);