import { useState} from 'react'
import axios from 'axios'


const useAjax =()=>{
  const [data, setData] = useState({})
  const request = async(api,method, input) =>{
    let newItem = await axios({
      method:method,
      url:api,
      data:input,
    })
    setData(newItem.data)
    return newItem.data

  }
  return[
    data.results,
    request
  ]
  
}
export default useAjax;

