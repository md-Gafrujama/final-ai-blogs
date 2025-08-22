
import redis from "../config/redis.js"
const cachedData = ({key}) =>{

    return async(req , resp , next) =>
    {
         const data = redis.get(key);

         if(data)
         {
            console.log('response from redis');
             resp.send(JSON.stringify(data));
         }

         else{
            next();
         }
    }
}

export default cachedData ;