import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ActionsContainer, EllipsisContainer, Menu, MenuItem } from '../../styles/actions';
import { useDispatch } from 'react-redux';
import { deleteOneThunk } from "../../slices/UserSlice/userThunks"; 
import { AppDispatch } from '../../store';
import Swal from 'sweetalert2';

const Actions: React.FC<{ userId: string | undefined }> = ({ userId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleMenu = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleDeleteClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    if(!userId) return;
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
              text: 'Employee has been deleted successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/employees");
          })
          .catch(() => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete employee. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      }
    });
    setShowMenu(false);
  };

  const handleEditClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    setShowMenu(false);
    navigate(`/employees/${userId}/update`);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
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
          <MenuItem onClick={handleEditClick}>Update</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      )}
    </ActionsContainer>
  );
};

export default Actions;
