import React from "react";

const FilteringInput = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by room name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md"
        />

        <select
          value={capacityFilter}
          onChange={(e) => setCapacityFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Capacity</option>
          <option value="5">5+</option>
          <option value="10">10+</option>
          <option value="60">60+</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Price</option>
          <option value="50">Up to $50</option>
          <option value="100">Up to $100</option>
          <option value="200">Up to $200</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <button
          onClick={handleResetFilters}
          className="p-2 bg-gray-300 rounded-md"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilteringInput;
