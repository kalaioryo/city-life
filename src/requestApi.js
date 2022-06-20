
import axios from "axios";

async function requestApi(query){
  try{
    let response = await axios.get(`https://api.teleport.org/api/urban_areas/slug:${query}/scores/`)
    let data = await response.data
    return {data}
  }
  catch (err) {
    console.error(err);
    return {err}
  }
  
}

export default requestApi