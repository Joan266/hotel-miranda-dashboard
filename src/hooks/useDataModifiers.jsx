import { useEffect, useMemo, useState } from 'react';

export const useDataModifiers = (items, itemsPerPage, activeStatus, dateSorter, sorterProperty) => {
  useEffect(()=>{console.log("render"),[]})
  const [ page, setPage ] = useState(1);
  const getNestedProperty = (obj, propertyPath) => {
    return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
  const orderedData = useMemo(() => {
    if(!items) return;
    setPage(1);
    const sortedData = [...items].sort((a, b) => {
      const dateA = new Date(getNestedProperty(a, sorterProperty));
      const dateB = new Date(getNestedProperty(b, sorterProperty));
      if (dateSorter === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    return sortedData
  }, [dateSorter, items,sorterProperty]);
  const filteredData = useMemo(() => {
    console.log("filteredData")
    if(!orderedData) return;
    setPage(1);
    if (activeStatus === 'all') {
      return orderedData;
    } else {
      return orderedData.filter(booking => booking.status === activeStatus);
    }
  }, [activeStatus, orderedData]);

  const totalPages = useMemo(()=>{
    if(!filteredData) return null;
    return Math.ceil(filteredData.length / itemsPerPage)
  },[filteredData]);

  const validatedCurrentPage = Math.min(Math.max(page, 1), totalPages);
  const dataCurrentPage = useMemo(() => {
    console.log("dataCurrentPage")
    if(!filteredData) return null;
    const startIndex = (validatedCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, itemsPerPage, validatedCurrentPage]);

  const goToPage = (pageNumber) => {
    const validPageNumber = Math.min(Math.max(pageNumber, 1), totalPages);
    setPage(validPageNumber);
  };

  const goToNextPage = () => {
    if (validatedCurrentPage < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (validatedCurrentPage > 1) {
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
