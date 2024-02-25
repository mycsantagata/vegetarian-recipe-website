import React from 'react'
import Navbar from './Navbar'
import Recipe from './Recipe'
import { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import './css/Recipe.css';
import './css/Home.css';
import './css/pagination.css';
import ApiClient from './ApiClient';
import Loader from './Loader'
import { Helmet } from 'react-helmet';

function Home({api_key}) {
  

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState('');
  const [slicedRecipes, setSlicedRecipes] = useState([]);
  const perPage = 6;

const getRecipes = async () => {
  try {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await ApiClient.getRecipes(query, api_key);
    if(response.data.results == null || response.data.results.length === 0){
      throw Error('No results found');
    }
    const startIndex = currentPage * perPage;
    const endIndex = startIndex + perPage;
    const slicedRecipes = response.data.results.slice(startIndex, endIndex);
    setSlicedRecipes(slicedRecipes);
    setRecipes(response.data.results);
  } catch (error) {
    console.log(error);
      setError(error);

  } finally{
    setLoading(false);
  }
}

useEffect(() => {
  getRecipes();
},[query, currentPage]);

const updateSearch = e =>{
  setSearch(e.target.value);
  console.log(search);
}


const handleSearch = (e) => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
  setError('');
}

const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};

  return (
    
  <div className='home'>
    <Helmet>
    <title>Vegetarian Recipes</title>
    </Helmet>
      <Navbar 
      search={search}
      getSearch={handleSearch}
      updateSearch={updateSearch}
      />

      {loading ? ( <Loader/>
        ): (
        <>
          <div className='recipes'>
          {error !== ''? (
            <h2>{error.message}</h2>
          ) : (
            slicedRecipes.map(recipe => (
              <Link to={`/detail/${recipe.id}`} key={recipe.id}>
                <Recipe key={recipe.id} title={recipe.title} img={recipe.image} />
              </Link>
          ))
        )}
          </div>
      </>)
      }

<ReactPaginate
        activeClassName={'active '}
        breakClassName={'break-me '}
        breakLabel={'...'}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={"next "}
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={Math.ceil(recipes.length / perPage)}
        pageClassName={'pagination-page '}
        pageRangeDisplayed={3}
        previousClassName={"previous"}
        previousLabel="<"
      />
  </div>
  )
}

export default Home