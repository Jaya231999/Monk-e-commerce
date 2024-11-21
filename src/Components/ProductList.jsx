import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon
import review_icon from './Assets/videoreview.png';
import EditProduct from './EditProduct';

export const ProductList = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative w-[600px]">
                {/* Search Input */}
                <input 
                  type="search"  
                  className="w-full pl-12 pr-4 py-2 m-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Search"
                  
                />
                
                {/* Search Icon */}
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 " />
        </div>       
      </div>
        <div className='bg-gray-100'>
           {/* Video Reviews Section */}
          <div className='flex space-x-4 ml-8 p-6'>
              <img src={review_icon} alt=""/>
              <p className='text-lg font-semibold '>Video-Reviews</p>            
          </div>
          <hr className="border-b border-gray-600 w-full" />
          {/* Offer Funnel Section */}
          <div className='flex '>
              <h2 className='p-4 text-xl font-semibold ml-8'>Offer Funnel</h2>
              <div className='p-4 flex justify-center ml-[500px]'>
              <a className="border-b border-gray-400 w-auto text-gray-400">Support</a>
              <span className="border-l h-6 border-gray-400 ml-1 mr-1"></span>
              <a className="border-b border-gray-400 w-auto text-gray-400">Talk to an Expert</a></div>  
                                     
          </div>
          
          <hr className="border-b border-gray-600 w-[1430px] mx-auto" />

          <div className='ml-8 mt-4'>
                <h1 className="m-1 text-lg font-semibold">
                  Add Bundle Products (Max 4 Products)
                </h1>
                <p className="flex items-center space-x-2 text-gray-600 gap-2 mb-20">
                  {/* Circle with 'i' */}
                  <span className="flex justify-center items-center w-6 h-6 bg-yellow-600 text-white font-bold rounded-full">
                    i
                  </span>
                  {/* Text Content */}
                  Offer Bundle will be shown to the customer whenever any of the bundle products are added to the cart.
                </p>
          </div>
          <EditProduct/>
         
        </div>
    </>
  );
}

export default ProductList;
