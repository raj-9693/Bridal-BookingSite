import Apiaxios from "../apiclient";


 export const getDetaHome=async()=>{
    const BaseUrl="/Api/home/getDeta"
    console.log(`🚀 [API START] - Calling GET-Home  (Deta) | Endpoint: ${BaseUrl}`)
    try{
        const response= await Apiaxios.get(BaseUrl)
         console.log(`✅ [API SUCCESS] - HomeDeta Successful |  Success :${response.data?.success} |Status: ${response.status} 
        | message:${response.data?.message}`)

     console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2))
     console.log('All Response',response)
        return response

    }catch(err){
        
         if(err.response){
      console.error(`❌ [API ERROR] - HomeDeta Failed |  Success: ${err.response?.data?.success} |Status: ${err.response?.status} | message :${err.response?.data?.message}`)
      console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2))
    }else{
        console.error(`❌ [NETWORK ERROR] - Signup | ${err.message} || Check Network `)

    }
 throw err
    }

}