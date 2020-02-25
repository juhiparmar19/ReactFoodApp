import Apiconfig from "./Api";

export default {
  async getFeedList(token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.FeedListApi, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
      });
      return res;
    } catch (e) {
      console.log(e)
    }
  },

  async getCookingList(token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.CookingListApi, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
      });
      return res;
    } catch (e) {
      console.log(e)
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.LoginApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        })
      })
      return res;
    } catch (e) {
      console.log(e)
    }
  },
  async addRecipeApi(name, preparationTime, serves, complexity, metaTags, ytUrl,token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.AddRecipeApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify({
          "name": name,
          "preparationTime": preparationTime,
          "serves": serves,
          "complexity": complexity,
          "metaTags": metaTags,
          "ytUrl": ytUrl
        })
      })
      return res;
    } catch (e) {
      console.log(e)
    }
  },
  async addInstruction(recipeId, instruction,token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.AddInstructionApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify({
          'instruction': instruction,
          'recipeId': recipeId
        })
      })
      return res;
    } catch (e) {
      console.log(e)
    }
  },
  async addIngredient(recipeId, ingredient,token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.AddIngredientsApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify({

          "ingredient": ingredient,
          "recipeId": recipeId
        })
      })
      return res;
    } catch (e) {
      console.log(e)
    }
  },
  async likeRecipe(recipeId, token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.RecipeLikeApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify({
          "recipeId": recipeId
        })
      })
      return res;
    } catch (e) {
      console.log(e)
    }
  },
  async dislikeRecipe(recipeId, token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.RecipeDisLikeApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify({
          "recipeId": recipeId
        })
      })
      return res;
    } catch (e) {
      console.log(e)
    }
  },
  async addRecipeImageApi(recipeId, imageUri,token) {
    try {
      const res = await fetch(Apiconfig.Base_url + Apiconfig.AddRecipeImageApi, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: this.createFormData(imageUri,recipeId)
      })
      return res;
    } catch (e) {
      console.log(e)
    }
  },

  async getRecipeDetail(token,id) {
    try {
      const res = await fetch(Apiconfig.Base_url + 'recipe/'+id+'/details', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });
      return res;
    } catch (e) {
      console.log(e)
    }
  },
  createFormData  (imageUri,id)  {
    const data = new FormData();
    var photo = {
      uri: imageUri,
      type: 'image/png',
      name: 'photo.png',
    };
    data.append("photo", photo);
    data.append("recipeId", id)
    return data;
  }

}
