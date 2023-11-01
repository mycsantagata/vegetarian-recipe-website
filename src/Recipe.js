import React from 'react';
import './Recipe.css';

function Recipe({ title, img }) {
  return (
    <div className="recipe">
      <h2>{title}</h2>
      <img src={img} alt={title} />
    </div>
  );
}

export default Recipe;