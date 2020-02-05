import apiconfig from "../ApiService/Api";

export default{
    async getCookingList(token)  {
        try {
            const res = await fetch(apiconfig.Base_url + apiconfig.CookingListApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':'Bearer ' +token
            },
         });
           return await res.json();
        } catch(e) {
         console.log(e)
       }
    },
    async login(email,password)  {
        try {
            const res = await fetch(apiconfig.Base_url + apiconfig.LoginApi, {
                method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      }, 
                      body: JSON.stringify({
                          "email":email,
                          "password":password
                        })
         });
           return await res.json();
        } catch(e) {
         console.log(e)
       }
    }
}