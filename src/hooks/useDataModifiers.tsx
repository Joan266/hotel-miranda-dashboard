import { useMemo, useState } from 'react';

const getNestedProperty = (obj: any, propertyPath: string): any => {
  return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
};

interface UseDataModifiersReturn<T> {
  dataCurrentPage: T[];
  goToPage: (pageNumber: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  totalPages: number;
  page: number;
  dataLength: number;
}

export const useDataModifiers = <T,>(
  items: any[],
  itemsPerPage: number,
  activeStatus: string | boolean ,
  dateSorter: string,
  sorterProperty?: string
): UseDataModifiersReturn<T> => {
  const [page, setPage] = useState<number>(1);

  const { dataCurrentPage, totalPages, dataLength } = useMemo(() => {
    if (!items) return { dataCurrentPage: [], totalPages: 0, dataLength: 0 };

    const sortedData = sorterProperty ? [...items].sort((a, b) => {
      const dateA = new Date(getNestedProperty(a, sorterProperty));
      const dateB = new Date(getNestedProperty(b, sorterProperty));
      
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return 0;
      }
      
      return dateSorter === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    }) : items;

    const filteredData = activeStatus === 'all'  
      ? sortedData
      : sortedData.filter(item => item.status === activeStatus);
    
    const dataLength = filteredData.length;
    const totalPages = Math.ceil(dataLength / itemsPerPage);
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataCurrentPage = filteredData.slice(startIndex, endIndex);
  
    return { dataCurrentPage, totalPages, dataLength };
  }, [items, dateSorter, activeStatus, sorterProperty, itemsPerPage, page]);

  const goToPage = (pageNumber: number) => {
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
      dataCurrentPage: [],
      goToPage: () => {},
      goToNextPage: () => {},
      goToPrevPage: () => {},
      totalPages: 0,
      page: 0,
      dataLength: 0,
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
