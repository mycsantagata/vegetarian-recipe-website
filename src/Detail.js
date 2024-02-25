import React from 'react'
import { useEffect, useState } from 'react';
import './css/Details.css'
import { Link, useParams } from 'react-router-dom'
import ApiClient from './ApiClient';
import Loader from './Loader';
import { Helmet } from 'react-helmet';

function Detail({api_key}) {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [nutritionData, setNutritionData] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const recipeResponse = await ApiClient.getRecipeInformation(id,api_key);
      setRecipeData(recipeResponse.data);
      const arrayNutrients= recipeResponse.data.nutrition.nutrients;
      setNutritionData([arrayNutrients[0],arrayNutrients[1],arrayNutrients[3],arrayNutrients[8]]); 
      setInstructions(recipeResponse.data.analyzedInstructions[0].steps);
      setIngredients(recipeResponse.data.extendedIngredients);
    } catch (error) {
      console.log(error);
      setError(error);     
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
    <Helmet>
      <title>Detail Recipe</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <>
        {error !== '' ? (
          <h2>{error.message}</h2>
        ) : (
          <>
            <h2 className="recipe-title">{recipeData.title}</h2>
            <div className="recipe-details">
              <div className="recipe-image">
                <img src={recipeData.image} alt={recipeData.title} />
              </div>
              <div className="recipe-details-right">
                <div className="recipe-details-item">
                  <h3>
                    Servings: <p>{recipeData.servings}</p>
                  </h3>
                </div>
                <div className="recipe-details-item">
                  <h3>
                    Total Time: <p>{recipeData.readyInMinutes}'</p>
                  </h3>
                </div>
                <div className="recipe-details-item">
                  <h3>Nutrients:</h3>
                  <ul>
                    {nutritionData.map(nutrition => (
                      <li key={nutrition.name}>
                        {nutrition.name}: <span>{nutrition.amount} {nutrition.unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='recipe-description'>
              <p dangerouslySetInnerHTML={{ __html: recipeData.summary }} />
            </div>
            <div className="recipe-ingredients">
              <h4>Ingredients:</h4>
              <ul>
                {ingredients.map(ingredient => (
                  <li key={ingredient.original}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
            <div className="recipe-instructions">
              <h4>Directions:</h4>
              <ul>
                {instructions.map(instruction => (
                  <li key={instruction.step}>
                    {instruction.step}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/">
              <div className="recipe-details-button">
                <button className="back-button">Back</button>
              </div>
            </Link>
          </>
        )}
      </>
    )}
  </>
);
}

export default Detail