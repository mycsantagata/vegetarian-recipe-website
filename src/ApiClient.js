import React from 'react'
import axios from 'axios';

const ApiClient =  {
    getRecipes: async (query, api_key) => {
        try{
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&diet=vegetarian&query=${query}`); 
            return response; 
        }catch(error){
            throw error;
        }

    },

    getRecipeInformation: async (id, api_key) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}&includeNutrition=true`);
            return response;
        }catch(error){
            throw error;
        }

    }
}


export default ApiClient