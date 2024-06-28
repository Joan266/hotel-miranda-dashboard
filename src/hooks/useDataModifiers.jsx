import { useEffect, useMemo, useState } from 'react';

export const useDataModifiers = (items, itemsPerPage, activeStatus, dateSorter, sorterProperty) => {
  const [ page, setPage ] = useState(1);
  const getNestedProperty = (obj, propertyPath) => {
    return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
  const { dataCurrentPage, totalPages } = useMemo(() => {
    if (!items) return { dataCurrentPage: [], totalPages: 0 };
  
    const sortedData = [...items].sort((a, b) => {
      const dateA = new Date(getNestedProperty(a, sorterProperty));
      const dateB = new Date(getNestedProperty(b, sorterProperty));
      return dateSorter === 'newest' ? dateB - dateA : dateA - dateB;
    });
  
    const filteredData = activeStatus === 'all'
      ? sortedData
      : sortedData.filter(booking => booking.status === activeStatus);
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataCurrentPage = filteredData.slice(startIndex, endIndex);
  
    return { dataCurrentPage, totalPages };
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
    };
  }

  return {
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
    page,
  };
};
