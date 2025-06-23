import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function isExpired(token: string){
    try{
      const { exp } = jwtDecode<{exp: number}>(token);
      return Date.now() >= exp * 1000;
    }catch(e){
      console.log("Error while Checking if the Token is expired or not - ", e);
      return true;
    }
};

type ErrRes = {
  error: string;
};

type FinalRes = {
  accessToken: string;
};

type MyRes = ErrRes | FinalRes;

export async function refreshAccessToken(accessToken: string, refreshToken: string){
    try{
      const response = await axios.post<MyRes>("https://tnp-recruitment-challenge.manitvig.live/refresh", {
        refreshToken : refreshToken
        },{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
    if("accessToken" in response.data){
        return response.data.accessToken;
    }
    return null;
  }catch(e){
    console.log("Error while refreshing ", e);
    return null;
  }
};
