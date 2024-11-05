import React from 'react';

function FilterPanel({ filters, updateFilter }) {
  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      <div>
        <label>Category</label>
        <select onChange={(e) => updateFilter('category', e.target.value)} value={filters.category}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Footwear">Footwear</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>
      <div>
        <label>Brand</label>
        <input
          type="text"
          onChange={(e) => updateFilter('brand', e.target.value)}
          value={filters.brand}
        />
      </div>
      <div>
        <label>Price Range</label>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) => updateFilter('minPrice', e.target.value)}
          value={filters.minPrice || ''}
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) => updateFilter('maxPrice', e.target.value)}
          value={filters.maxPrice || ''}
        />
      </div>
      <div>
        <label>Rating</label>
        <input
          type="number"
          step="0.1"
          max="5"
          min="0"
          onChange={(e) => updateFilter('rating', e.target.value)}
          value={filters.rating || ''}
        />
      </div>
    </div>
  );
}

export default FilterPanel;
