import { useMemo, useState } from 'react';

export const useDataModifiers = (items, itemsPerPage, activeStatus, dateSorter) => {
  const [ page, setPage ] = useState(1);
  const orderedData = useMemo(() => {
    console.log("orderedData")
    if(!items) return;
    setPage(1);
    return [...items].sort((a, b) => {
      if (dateSorter === 'newest') {
        return new Date(b.order_date.datetime) - new Date(a.order_date.datetime);
      } else {
        return new Date(a.order_date.datetime) - new Date(b.order_date.datetime);
      }
    });
  }, [dateSorter, items]);
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

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

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
