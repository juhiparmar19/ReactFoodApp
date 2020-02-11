import Apiconfig from "../ApiService/Api";

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
           return await res.json();
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


onLogin = () => {
  // console.log('====================================');
  // console.log(this.state.email);
  // console.log(this.state.password);
  // console.log('====================================');

  this.setState({isLoading: true})
  //Note:- Provide valid URL
  fetch('http://35.160.197.175:3006/api/v1/user/login',
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'email': this.state.controls.email.value,
              'password': this.state.controls.password.value
          })
      }).then((response) => {
          if (response.status == 200) {
              return response.json()
          } else {
              
          }

          this.setState({isProgress: false})
      }).then((responseJSON) => {
          console.log(responseJSON);
          Alert.alert('Success', 'Logged in', [
              {
                  text: 'No',
                  style: 'cancel'
              },
              {
                  text: 'Yes',
                  style: 'destructive'
              },
          ])

          this.setState({isLoading: false})
      }).catch((error) => {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
          this.setState({isLoading: false})
      })
}