import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
import FilterPanel from './FilterPanel';
import ProductList from './ProductList';
import Spinner from './Spinner';

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  });
  const [loading, setLoading] = useState(false);

  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4002/products').then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = products;

    if (debouncedFilters.category) {
      result = result.filter((product) => product.category === debouncedFilters.category);
    }
    if (debouncedFilters.brand) {
      result = result.filter((product) =>
        product.brand.toLowerCase().includes(debouncedFilters.brand.toLowerCase())
      );
    }
    if (debouncedFilters.minPrice) {
      result = result.filter((product) => product.price >= parseFloat(debouncedFilters.minPrice));
    }
    if (debouncedFilters.maxPrice) {
      result = result.filter((product) => product.price <= parseFloat(debouncedFilters.maxPrice));
    }
    if (debouncedFilters.rating) {
      result = result.filter((product) => product.rating >= parseFloat(debouncedFilters.rating));
    }

    setFilteredProducts(result);
  }, [products, debouncedFilters]);

  // Update filters based on user input
  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return (
    <div className="product-catalog">
      <FilterPanel filters={filters} updateFilter={updateFilter} />
      {loading ? (
        <Spinner />
      ) : filteredProducts.length ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductCatalog;
