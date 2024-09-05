import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const DataActions = ({ DeletePopup, EditPopup }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const closeDeletePopup = () => setShowDeletePopup(false);
  const closeEditPopup = () => setShowEditPopup(false);

  return (
    <>
      <IconWrapper>
        <div onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </IconWrapper>

      {showDeletePopup && <DeletePopup onClose={closeDeletePopup} />}
      {showEditPopup && <EditPopup onClose={closeEditPopup} />}
    </>
  );
};

export default DataActions;
