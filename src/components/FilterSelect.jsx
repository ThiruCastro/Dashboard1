import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const FilterSelect = () => {
  const { filterType, setFilterType, setCurrentPage } = useContext(JobContext);

  const handleFilter = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1); // Reset to page 1
  };

  return (
    <select value={filterType} onChange={handleFilter} className="filter-select">
      <option value="">Filter by Completion Status</option>
      <option value="true">Completed</option>
      <option value="false">Not Completed</option>
    </select>
  );
};

export default FilterSelect;