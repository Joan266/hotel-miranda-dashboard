import { useMemo, useState } from 'react';

export const useDataModifiers = (items, itemsPerPage, activeStatus, dateSorter, sorterProperty) => {
  const [ page, setPage ] = useState(1);
  const getNestedProperty = (obj, propertyPath) => {
    return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
  const { dataCurrentPage, totalPages, dataLength } = useMemo(() => {
    if (!items) return { dataCurrentPage: [], totalPages: 0 };
    
    const sortedData = sorterProperty ? [...items].sort((a, b) => {
      const dateA = new Date(getNestedProperty(a, sorterProperty));
      const dateB = new Date(getNestedProperty(b, sorterProperty));
      
      if (isNaN(dateA) || isNaN(dateB)) {
        return 0;
      }
      
      return dateSorter === 'newest' ? dateB - dateA : dateA - dateB;
    }) : items;

    const filteredData = activeStatus === 'all'  
    ? sortedData
    : sortedData.filter(booking => booking.status === activeStatus);
    
    const dataLength = filteredData.length;

    const totalPages = Math.ceil(dataLength  / itemsPerPage);
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataCurrentPage = filteredData.slice(startIndex, endIndex);
  
    return { dataCurrentPage, totalPages, dataLength };
  }, [items, dateSorter, activeStatus, sorterProperty, itemsPerPage, page]);

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (!items) {
    return {
      dataCurrentPage: null,
      goToPage: null,
      goToNextPage: null,
      goToPrevPage: null,
      totalPages: null,
      page:null,
      dataLength:null,
    };
  }

  return {
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
    page,
    dataLength,
  };
};
