import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dropdown.scss';

export const Dropdown: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortType, setSortType] = useState('');

  const updateUrlWithSortType = (type: string) => {
    if (type === 'alphabet') {
      navigate(``);
    } else if (type === 'count') {
      navigate(`?sortBy=count`);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortBy = searchParams.get('sortBy');
    if (sortBy) {
      setSortType(sortBy);
    } else {
      setSortType('alphabet');
      updateUrlWithSortType('alphabet');
    }
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);
    updateUrlWithSortType(selectedSortType);
  };

  return (
    <select 
      value={sortType} 
      onChange={handleSortChange}
      className="dropdown"
    >
      <option value="alphabet">Sort by alphabet</option>
      <option value="count">Sort by count</option>
    </select>
  );
};