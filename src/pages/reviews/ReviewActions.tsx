/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ActionsContainer, EllipsisContainer, Menu, MenuItem } from '../../styles/actions';
import { useDispatch } from 'react-redux';
import { deleteOneThunk, updateOneThunk } from "../../slices/ReviewSlice/reviewThunks"; 
import { AppDispatch } from '../../store';
import Swal from 'sweetalert2';

const Actions = ({ reviewId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleMenu = (event) => {
    event.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOneThunk(reviewId))
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Review has been deleted successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/reviews");
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete review. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      }
    });
    setShowMenu(false);
  };

  const handleArchiveClick = (event) => {
    event.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to archive this review.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, archive it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateOneThunk({ id:reviewId, review: {status: false} })) 
          .then(() => {
            Swal.fire({
              title: 'Archived!',
              text: 'Review has been archived successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/reviews");
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to archive review. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      }
    });
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  return (
    <ActionsContainer ref={containerRef}>
      <EllipsisContainer onClick={handleToggleMenu}>
        <FontAwesomeIcon icon={faEllipsisVertical} className="ellipsis-icon" />
      </EllipsisContainer>

      {showMenu && (
        <Menu>
          <MenuItem onClick={handleArchiveClick}>Archive</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      )}
    </ActionsContainer>
  );
};

export default Actions;
