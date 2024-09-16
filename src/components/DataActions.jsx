import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { DataActionsContainer, EllipsisContainer, Menu, MenuItem } from '../styles/dataactions';
import React from 'react';

const DataActions = ({ DeletePopup, EditPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const containerRef = useRef(null);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu); 
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
    setShowMenu(false); 
  };

  const handleEditClick = () => {
    setShowEditPopup(true);
    setShowMenu(false); 
  };

  const closeDeletePopup = () => setShowDeletePopup(false);
  const closeEditPopup = () => setShowEditPopup(false);

  
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

      {showDeletePopup && <DeletePopup onClose={closeDeletePopup} />}
      {showEditPopup && <EditPopup onClose={closeEditPopup} />}
    </DataActionsContainer>
  );
};

export default DataActions;
