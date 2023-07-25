import axios from "@/axios.js";
import Utils from "@/composable/geoUtils";

export const signCurrentUserLocation =async (obj)=>{
  const{lng,lat} =obj
  return axios.post('/geo/save',{
    lng,
    lat,
  })
}