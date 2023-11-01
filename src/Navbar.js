import React from 'react'
import './Navbar.css';


function Navbar({getSearch,updateSearch, search}) {

  return (
    <form onSubmit={getSearch} className='search-form'>
        <input className='search-text' type='text' onChange={updateSearch} value={search} placeholder='ricerca ricette..'/>
        <button  className= 'search-button' type='submit'>
          Search
        </button>
      </form>
  )
}

export default Navbar