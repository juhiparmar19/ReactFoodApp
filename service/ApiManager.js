import Apiconfig from "./Api";

export default{
    async getCookingList(token)  {
        try {
            const res = await fetch(Apiconfig.Base_url + Apiconfig.CookingListApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':'Bearer ' +token
            },
         });
           return res;
        } catch(e) {
         console.log(e)
       }
    },
    async login(email,password)  {
        try {
            const res = await fetch(Apiconfig.Base_url + Apiconfig.LoginApi, {
                method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      }, 
                      body: JSON.stringify({
                          'email':email,
                          'password':password
                        })
         })
            return res;
        } catch(e) {
         console.log(e)
       }
    }
}
