/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { DataActionsContainer, EllipsisContainer, Menu, MenuItem } from '../styles/actions';
import { useDispatch } from 'react-redux';
import { deleteOneThunk } from "../slices/UserSlice/userThunks"; 
import { AppDispatch } from '../store';
import Swal from 'sweetalert2';

const Actions = ({ userId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOneThunk(userId))
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/users");
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete user. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      }
    });
    setShowMenu(false);
  };

  const handleEditClick = () => {
    setShowMenu(false);
    navigate(`/users/${userId}/update`);
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
    <DataActionsContainer ref={containerRef}>
      <EllipsisContainer onClick={handleToggleMenu}>
        <FontAwesomeIcon icon={faEllipsisVertical} className="ellipsis-icon" />
      </EllipsisContainer>

      {showMenu && (
        <Menu>
          <MenuItem onClick={handleEditClick}>Update</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      )}
    </DataActionsContainer>
  );
};

export default Actions;
