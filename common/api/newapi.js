// export const 	baseUrl= 'http://192.168.10.18:9004'//本机开发测试地址

   export const 	baseUrl= 'https://www.jileaf.top:9004'
function getHeaders () {
    let token = uni.getStorageSync('token');  
    let header = {
        "Token":token,// 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
	return header
}

export default{
    get(url,param){
        return new Promise((resolve,reject) =>{ 
            uni.request({
                method:'GET',
                url: baseUrl+url,
                data: param,
                header:getHeaders()
            }).then(res=>{
				console.log(res[1])  
                // switch (res[1].flag) {
                //   case 200:
                //     resolve(res[1])
                //     break
                //   case 400:
                //     resolve(res[1])
                //     break
                //   case 401:
                //     resolve(res[1])
                //     break
                //   default:
                    resolve(res[1])
                // }    
            }).catch(
                (response) => {
                    reject(response)
                }
            )
        })
    },
    
    post(url,param){
        return new Promise((resolve,reject) =>{
            uni.request({
                method:'POST',
                url: baseUrl+url,
                data: param,
                header:getHeaders()
            }).then(res=>{
				console.log(res)
                // switch (res[1].code) {
                //   case 200:
                //     resolve(res[1])
                //     break
                //   case 400:
                //     resolve(res[1])
                //     break
                //   case 401:
                //       resolve(res[1])
                //       break                        
                //   default:
                    resolve(res[1])
                // }            
            }).catch(
                (response) => {
                    reject(response)
                }
            )
        })        
    },
}