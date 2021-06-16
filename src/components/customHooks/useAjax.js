import { useEffect, useState } from 'react'
import axios from 'axios'
// import { options } from 'superagent'


const useAjax = () => {
  const [options, request] = useState({})
  const [response, setResponse] = useState({})

  useEffect(() => {
    async function getData(){
      if(!options.url){
      return
    }
    try {
      let response = await axios({
        data: options.input,
        url: options.url,
        method: options.method,
        mode: options.mode,
        headers: options.headers,
        validateStatus: options.validateStatus,


      })
      setResponse(response.data)
    } catch (error) {
    }
  }
    getData()
 },[options])
return [response, request]
}

export default useAjax;

