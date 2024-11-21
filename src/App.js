import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList';


const App = () => {
  return (
   <div className='app'>
     
      <ProductList />
      
   </div>
  );
};

export default App;
