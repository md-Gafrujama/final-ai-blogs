import redis from "../../lib/config/redis.js";

  const cachedData = (key) => {

   return  async(req,res,next)=>{

    const data = await redis.get(key);

    if(data){
      console.log("response from redis");
           res.send(JSON.parse(data));
    }
    else 
    {
        next();
    }
  }
}

export default cachedData;