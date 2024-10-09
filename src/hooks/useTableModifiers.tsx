import { useMemo, useState } from 'react';
import { SortConfig } from '../interfaces/common';

const getNestedProperty = (obj: any, propertyPath: string): any => {
  return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
};


interface UseTableModifiersReturn<T> {
  dataCurrentPage: T[];
  goToPage: (pageNumber: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  totalPages: number;
  page: number;
  dataLength: number;
}

export const useTableModifiers = <T,>(
  items: any[],
  itemsPerPage: number,
  activeStatus: string | boolean,
  sortConfig: SortConfig 
): UseTableModifiersReturn<T> => {
  const [page, setPage] = useState<number>(1);

  const { dataCurrentPage, totalPages, dataLength } = useMemo(() => {
    if (!items) return { dataCurrentPage: [], totalPages: 0, dataLength: 0 };

    const sortedData = sortConfig 
      ? [...items].sort((a, b) => {
          const valueA = getNestedProperty(a, sortConfig.property);
          const valueB = getNestedProperty(b, sortConfig.property);

          if (sortConfig.type === 'date') {
            const dateA = new Date(valueA);
            const dateB = new Date(valueB);
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              return 0;
            }
            return (dateA.getTime() - dateB.getTime()) * sortConfig.direction; 
          } else if (sortConfig.type === 'number') {
            return (Number(valueA) - Number(valueB)) * sortConfig.direction; 
          } else if (sortConfig.type === 'string') {
            return (valueA.localeCompare(valueB)) * sortConfig.direction;
          }
          return 0; 
        })
      : items;

    const filteredData = activeStatus === 'all'
      ? sortedData
      : sortedData.filter(item => item.status === activeStatus);
    
    const dataLength = filteredData.length;
    const totalPages = Math.ceil(dataLength / itemsPerPage);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataCurrentPage = filteredData.slice(startIndex, endIndex);

    return { dataCurrentPage, totalPages, dataLength };
  }, [items, sortConfig, activeStatus, itemsPerPage, page]);

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
