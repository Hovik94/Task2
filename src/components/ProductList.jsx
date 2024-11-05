import React from 'react';

function ProductList({ products }) {
  return (
    <div className="list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.imageUrl} alt={product.name} />
          <h4>{product.name}</h4>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
