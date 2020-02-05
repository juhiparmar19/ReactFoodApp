import {AsyncStorage} from 'react-native';


export function storeData(key,val){
    async value => {
        try {
          await AsyncStorage.setItem(key, val);
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
    }
};

export function getData(key){
    async ()  => {
        try {
          
            const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            return value;
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
};
