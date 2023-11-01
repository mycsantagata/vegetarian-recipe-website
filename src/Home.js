import React from 'react'
import Navbar from './Navbar'
import Recipe from './Recipe'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import './Recipe.css';
import './Home.css';
import './pagination.css';


function Home({api_key}) {
  

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState('');
  const [slicedRecipes, setSlicedRecipes] = useState([]);
  const perPage = 6;

const getRecipes = async () => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&diet=vegetarian&query=${query}`);
    if(response.data.results == null || response.data.results.length == 0){
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
      <Navbar 
      search={search}
      getSearch={handleSearch}
      updateSearch={updateSearch}
      />
    <div className='recipes'>
      {/*<Link to="/detail">
    <div className="recipe">
        <h2>Ricetta 1</h2>
        <img src='https://blog.giallozafferano.it/neltegamesulfuoco/wp-content/uploads/2017/11/IMG_2500focacciatest-500x385.jpg' alt='' />
    </div>
    </Link>

    <div className="recipe">
        <h2>Ricetta hguifhgy8eyv8evyhuevhguegv8etyve7wfyew79ufyefyefoefyuefyeyfuyf</h2>
        <img src='https://blog.giallozafferano.it/neltegamesulfuoco/wp-content/uploads/2017/11/IMG_2500focacciatest-500x385.jpg' alt='' />
    </div>

    <div className="recipe">
        <h2>Ricetta 1</h2>
        <img src='https://blog.giallozafferano.it/neltegamesulfuoco/wp-content/uploads/2017/11/IMG_2500focacciatest-500x385.jpg' alt='' />
    </div>

    <div className="recipe">
        <h2>Ricetta 1</h2>
        <img src='https://blog.giallozafferano.it/neltegamesulfuoco/wp-content/uploads/2017/11/IMG_2500focacciatest-500x385.jpg' alt='' />
    </div>

    <div className="recipe">
        <h2>Ricetta 1</h2>
        <img src='https://blog.giallozafferano.it/neltegamesulfuoco/wp-content/uploads/2017/11/IMG_2500focacciatest-500x385.jpg' alt='' />
    </div>*/}  
      {error != ''? (
    <h2>{error.message}</h2>
  ) : (
    slicedRecipes.map(recipe => (
      <Link to={`/detail/${recipe.id}`} key={recipe.id}>
        <Recipe key={recipe.id} title={recipe.title} img={recipe.image} />
      </Link>
    ))
  )}
    </div>

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