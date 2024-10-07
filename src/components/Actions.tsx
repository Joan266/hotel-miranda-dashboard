/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { DataActionsContainer, EllipsisContainer, Menu, MenuItem } from '../styles/actions';
import { useDispatch } from 'react-redux';
import { deleteOneThunk } from "../slices/UserSlice/userThunks"; 
import { AppDispatch } from '../store';

const Actions = ({userId}) => { 
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev); 
  };

  const handleDeleteClick = () => {
    dispatch(deleteOneThunk(userId))
    .then(() => {
      alert("User deleted successfully!");
      navigate("/users"); 
    })
    .catch(error => {
      console.error("Failed to delete user", error);
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
