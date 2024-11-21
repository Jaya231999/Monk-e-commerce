import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Edit icon
import all_Product from './productsdata';
import circles from './Assets/img.png'
import { FaSearch } from 'react-icons/fa'; // Importing the search icon
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


export const EditProduct = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '', discount: '', variants: [] },
    { id: 2, name: '', discount: '', variants: [] },
  ]);
  // Function to add a variant to a product
  const addVariant = (productId, variant) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, variants: [...product.variants, variant] };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const [selectedProduct, setSelectedProduct] = useState(null); // To manage the selected product for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [selectedVariants, setSelectedVariants] = useState([]); // To manage selected variants
  const [selectedProducts, setSelectedProducts] = useState([]); // To manage selected products
  const [isVisible, setIsVisible] = useState(true); // State to control visibility of the item
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on searchQuery
  const filteredProducts = all_Product.filter((product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const closevarinats = () => {
    setIsVisible(false); // Hides the item when the button is clicked
  };
  
  
  // Function to handle opening the modal and setting the selected product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setSelectedVariants(product.variants ? product.variants.map((v) => v.id) : []);
    setIsModalOpen(true); // Open modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Clear the selected product when closing
    setSelectedVariants([]); // Clear the selected variants
    setSelectedProducts([]); // Clear selected products
  };

 

  // Handle product selection checkbox
  const handleProductSelection = (e, productId) => {
    const isSelected = e.target.checked;
    setSelectedProducts((prev) => {
      if (isSelected) {
        // Add selected product
        return [...prev, productId];
      } else {
        // Remove unselected product
        return prev.filter((id) => id !== productId);
      }
    });
  };

 // Handle variant selection checkbox
const handleVariantSelection = (e, variantId, productId) => {
  const isSelected = e.target.checked;

  setSelectedVariants((prev) => {
    let updatedVariants;

    if (isSelected) {
      updatedVariants = [...prev, variantId];
    } else {
      updatedVariants = prev.filter((id) => id !== variantId);
    }

    // Automatically select the product if any variant is selected
    if (updatedVariants.length > 0) {
      if (!selectedProducts.includes(productId)) {
        setSelectedProducts((prev) => [...prev, productId]);
      }
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }

    return updatedVariants;
  });
};

// Add selected products to the products state
const handleAddProducts = () => {
  if (selectedProducts.length === 0) {
    alert("No products selected!");
    return;
  }

  // Log the selected variants and products for debugging
  console.log("Selected Variants:", selectedVariants);
  
  // Filter out the selected products based on selectedProduct ids
  const selectedProductDetails = all_Product.filter((product) =>
    selectedProducts.includes(product.id)
  );

  // Log the selected product details to check if it's correct
  console.log("Selected Product Details:", selectedProductDetails);

  // Map over each selected product to apply the selected variants
  const updatedProductDetails = selectedProductDetails.map((product) => {
    // Get the variants for this product based on the selected variant IDs
    const selectedProductVariants = selectedVariants.map((variantId) => {
      // Find the variant by ID
      const variant = product.variants.find((variant) => variant.id === variantId);
      // If the variant exists, return its details; otherwise, return null
      return variant ? {
        color: variant.color,  // Correctly map the color
        size: variant.size,    // Correctly map the size
        stock: variant.stock   // Correctly map the stock
      } : null;
    }).filter(variant => variant !== null); // Filter out null variants if not found

    // Return the updated product with selected variants
    return {
      id: product.id,
      name: product.name,
      discount: product.discount || '',
      variants: selectedProductVariants // Ensure multiple variants are selected
    };
  });

  // Update the state with the new product details
  setProducts((prev) =>
    prev.map((product) =>
      // Check if the product is selected and update it accordingly
      selectedProducts.includes(product.id)
        ? updatedProductDetails.find(updatedProduct => updatedProduct.id === product.id)
        : product
    )
  );

  closeModal();
}; 

    // Handle adding discount logic
    const handleAddDiscount = (index) => {
      setProducts((prev) =>
        prev.map((p, idx) => {
          if (idx === index) {
            return { ...p, showDropdown: true };
          }
          return p;
        })
      );
    };
     // State to track the visibility of product variants and the Add button
  const [visibleVariants, setVisibleVariants] = useState({});

  const toggleSummaryVisibility = (productId) => {
    setVisibleVariants((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle visibility
    }));
  };
  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "variants") {
      const productIndex = products.findIndex(
        (p) => p.id === parseInt(source.droppableId.split('-')[2])
      );
      const product = products[productIndex];

      const updatedVariants = Array.from(product.variants);
      const [movedVariant] = updatedVariants.splice(source.index, 1);
      updatedVariants.splice(destination.index, 0, movedVariant);

      const updatedProducts = [...products];
      updatedProducts[productIndex].variants = updatedVariants;
      setProducts(updatedProducts);
    }
  };
  
  const closeVariants = (productId, variantIndex) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              variants: product.variants.filter((_, index) => index !== variantIndex),
            }
          : product
      );
      console.log("Updated Products:", updatedProducts); // Debugging the updated state
      return updatedProducts;
    });
  };
  return (
    <div className="p-4 bg-gray-100  w-full max-w-full ">
       {/* Products Grid */}
     <DragDropContext onDragEnd={onDragEnd} >         
        <div className="space-y-4">
          <Droppable droppableId="droppable-products">
            {(provided) => (
              <div
                ref={provided.innerRef}  // To allow drag and drop functionality
                {...provided.droppableProps}  // Necessary props for Droppable
              >
                {products.map((product, index) => (
                   <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={product.id} className="flex items-start space-x-4 p-2">
                        
                        {/* Serial Number */}
                        <img src={circles} alt="circle" />
                        {/* Display Product Summary */}
                        <span className='font-bold'>{index + 1}.</span> {/* Normal serial number */}
                        {/* Search Bar with Edit Icon */}
                        <div className="relative flex items-center w-[500px]">
                          <div className="flex flex-col space-y-2 w-full">
                            {/* Search Bar */}
                            <div className="relative w-full">
                              <input
                                type="text"
                                value={product.name}
                                onChange={(e) => handleAddDiscount(index, e.target.value)}
                                placeholder="Search Product Name"
                                className="w-full p-2 pl-10 pr-12 border border-gray-300 rounded-lg bg-white"
                              />
                              {/* Edit Icon */}
                              <FaEdit
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                onClick={() => handleEditProduct(product)} // Toggle edit mode
                              />
                            </div>
                            {/* Toggle Link to Show/Hide Variants for this product */}
                            <DragDropContext onDragEnd={onDragEnd}>                          
                                <Droppable droppableId="droppable-variants" type="variant">
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                    >                                     
                                        <div key={product.id}>
                                          {/* Toggle Link to Show/Hide Variants */}
                                          <a
                                            href="#"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              toggleSummaryVisibility(product.id);
                                            }}
                                            className="text-blue-500 block mb-2"
                                          >
                                            {visibleVariants[product.id] ? 'Hide Variants' : 'Show Variants'}
                                          </a>
                                          {/* Conditionally render the product variants summary based on visibility */}
                                          {visibleVariants[product.id] && (
                                            <Droppable droppableId={`droppable-variants-${product.id}`} type="variant">
                                              {(provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                                  {product.variants.map((variant, variantIndex) => (
                                                    <Draggable
                                                      key={variantIndex}
                                                      draggableId={`variant-${variantIndex}`}
                                                      index={variantIndex}
                                                    >
                                                      {(provided) => (
                                                        <div
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}
                                                          className="flex items-center space-x-4"
                                                        >
                                                          <img src={circles} alt="circle" />
                                                          <p className="flex items-center border border-gray-300 bg-white rounded-full p-2 m-2 w-80 shadow-lg justify-between">                                                       
                                                            <span>
                                                              Color/ {variant.color} - Size/ {variant.size}
                                                            </span>
                                                          </p>
                                                          {/* Remove Variant Button */}
                                                          <button
                                                            className="ml-4 text-gray-500 hover:text-red-500 focus:outline-none"
                                                            onClick={() => closeVariants(product.id, variantIndex)}
                                                          >
                                                            ✕
                                                          </button>
                                                        </div>
                                                      )}
                                                    </Draggable>
                                                  ))}
                                                  {provided.placeholder}
                                                </div>
                                              )}
                                            </Droppable>
                                          )}
                                        </div>
                                    
                                    </div>
                                  )}
                                </Droppable>                           
                            </DragDropContext>
                          </div>
                        </div>
                        {/* Add Discount Button or Dropdown */}
                        {product.showDropdown ? (
                          <div className=" space-x-2">
                            <input
                              type="text"
                              value="0"
                              className="px-3 py-1 w-28 h-10 border-solid border-2 border-green-900  rounded"
                            />
                            <select
                              className="p-2 border border-gray-300 rounded-md"
                              value={product.discount}
                              onChange={(e) =>
                                setProducts((prev) =>
                                  prev.map((p, idx) => {
                                    if (idx === index) {
                                      return { ...p, discount: e.target.value };
                                    }
                                    return p;
                                  })
                                )
                              }
                            >
                              <option value="">% off</option>
                              <option value="flat off">Flat off</option>
                            </select>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddDiscount(index)}
                            className="px-3 py-1 bg-green-900 text-white rounded hover:bg-green-900"
                          >
                            Add Discount
                          </button>
                        )}
                        <div
                            key={product.id}                           
                          >
                            {/* Close/Delete Button */}
                            <button
                           
                              onClick={() => {
                                // Remove the product from the list
                                const updatedProducts = products.filter((_, i) => i !== index);
                                setProducts(updatedProducts);
                              }}
                            >
                              ✕
                            </button>
                          </div>

                          {/* Show Product Variants only if isEditing is true */}
                        {product.isEditing && (
                          <div className="flex space-x-4 mt-2">
                            {product.variants.map((variant, variantIndex) => (
                              <div key={variantIndex} className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm">Color:</label>
                                  <input
                                    type="text"
                                    value={variant.color}
                                    onChange={(e) => {
                                      const updatedVariants = [...product.variants];
                                      updatedVariants[variantIndex].color = e.target.value;
                                      setProducts((prev) =>
                                        prev.map((p) =>
                                          p.id === product.id
                                            ? { ...p, variants: updatedVariants }
                                            : p
                                        )
                                      );
                                    }}
                                    className="px-3 py-1 border border-gray-300 rounded"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm">Size:</label>
                                  <input
                                    type="text"
                                    value={variant.size}
                                    onChange={(e) => {
                                      const updatedVariants = [...product.variants];
                                      updatedVariants[variantIndex].size = e.target.value;
                                      setProducts((prev) =>
                                        prev.map((p) =>
                                          p.id === product.id
                                            ? { ...p, variants: updatedVariants }
                                            : p
                                        )
                                      );
                                    }}
                                    className="px-3 py-1 border border-gray-300 rounded"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm">Stock:</label>
                                  <input
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) => {
                                      const updatedVariants = [...product.variants];
                                      updatedVariants[variantIndex].stock = e.target.value;
                                      setProducts((prev) =>
                                        prev.map((p) =>
                                          p.id === product.id
                                            ? { ...p, variants: updatedVariants }
                                            : p
                                        )
                                      );
                                    }}
                                    className="px-3 py-1 border border-gray-300 rounded"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>                  
                ))}
                {provided.placeholder}  {/* This is necessary to render the placeholder */}
              </div>
            )}
          </Droppable>
        </div>
     </DragDropContext>           
            {/* Add Products Button */}
            <div className="text-center">
  <button
    onClick={() =>
      setProducts([
        ...products,
        { id: products.length + 1, name: '', discount: '', showDropdown: false },
      ])
    }
    className="mb-4 px-4 py-2 w-80 rounded hover:bg-green-900 hover:text-white border-solid border-2 border-green-900"
  >
    Add Products
  </button>

</div>
 
      {/* Modal for Editing Products */}
      {isModalOpen && (       
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">      
          <div
            className="bg-white p-6 rounded-md shadow-lg relative"
            style={{ width: '600px', height: 'auto' }} // Set a smaller fixed width here
          >
            {/* Top-right close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            {/* Search Bar */}
            <div className="relative">
              {/* Search Input */}
              <input 
                type="search"  
                className="w-full pl-12 pr-4 py-2 m-2 bg-gray-200 border border-gray-300 rounded-full focus:outline-none"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Search Icon */}
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>           
            <div className="h-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
              <div className="space-y-4">
                {all_Product.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product, index) => (
                  <div key={product.id} className="p-4 border rounded-md">
                    {/* Product Image and Checkbox */}
                    <div className="flex items-center mb-4">
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-md"
                      />

                      {/* Product Selection Checkbox */}
                      <label className="ml-4 flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          onChange={(e) => handleProductSelection(e, product.id)}
                          checked={selectedProducts.includes(product.id)}
                        />
                        <span className="font-medium">{product.name}</span>
                      </label>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-gray-700">{index + 1}.</span>

                      {/* Variants, Stock, Price Layout */}
                      <div className="mt-2 flex flex-col">
                        {product.variants.map((variant, variantIndex) => (
                          <div
                            key={variantIndex}
                            className="flex justify-between gap-16 p-4 border-b w-full"
                          >
                            {/* Variants */}
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) =>
                                  handleVariantSelection(e, variant.id, product.id)
                                }
                              />
                              <span className="font-medium">
                                {variant.color} - {variant.size}
                              </span>
                            </label>

                            <span>{`Available: ${variant.stock}`}</span>
                            <p className="text-gray-700">{`Price: ₹${product.price}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add and Close Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
            <p>Selected Products: {selectedProducts.length}</p>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddProducts}
              >
                Add
              </button>
             
            </div>
          </div>
          
        </div>
      )}
      <div>
      <span className="flex items-center space-x-2">
        <input type="checkbox" id="discount-checkbox"  />
        <p>
          Apply discount on compare price.
          <span className="inline-flex items-center justify-center w-4 h-4 bg-black text-white rounded-full text-center">
            ?
          </span>
        </p>
      </span>
      <p className='text-gray-500 text-sm'>Dicount will be applied on compare price of the product.Discount set inside the upsell offer should be more than or equal to the 
        discount set on a product in your store.
      </p>
      <h1 class="inline-block border-b-2 border-black w-auto text-xl font-bold mt-2">Advanced offers customizations</h1>
      <span className="flex items-center space-x-2 mt-8">
        <input type="checkbox" id="discount-checkbox"  />
        <p>
          Enable timer of this offer.
        </p>
      </span>
      </div>
        
    </div>
    
  );
};

export default EditProduct;
