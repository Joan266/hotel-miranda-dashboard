import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const usePagination = (data, itemsPerPage, currentPage) => {
  const navigate = useNavigate();

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const validatedCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const dataCurrentPage = useMemo(() => {
    if(!data) return null;
    const startIndex = (validatedCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, itemsPerPage, validatedCurrentPage]);

  const goToPage = (pageNumber) => {
    const validPageNumber = Math.min(Math.max(pageNumber, 1), totalPages);
    navigate(`/bookings/${validPageNumber}`, { replace: true });
  };

  const goToNextPage = () => {
    if (validatedCurrentPage < totalPages) {
      navigate(`/bookings/${validatedCurrentPage + 1}`, { replace: true });
    }
  };

  const goToPrevPage = () => {
    if (validatedCurrentPage > 1) {
      navigate(`/bookings/${validatedCurrentPage - 1}`, { replace: true });
    }
  };

  if (!data) return {
    dataCurrentPage: null,
    goToPage: null,
    goToNextPage: null,
    goToPrevPage: null,
    totalPages: null,
  };

  return {
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
  };
};

export default usePagination;
