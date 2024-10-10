import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { RoomFormInterface } from "../../interfaces/rooms";
import { Form, FormGrid, FormGroup, SubmitButton, Input, Label, Container, ValidationError } from '../../styles/form';
import { useDispatch, useSelector } from 'react-redux';
import { readOneThunk, updateOneThunk, createOneThunk } from "../../slices/RoomSlice/roomThunks"; 
import { AppDispatch, RootState } from '../../store';
import Swal from 'sweetalert2';

export const RoomForm: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { single } = useSelector((state: RootState) => state.room);
  
  const [formData, setFormData] = useState<RoomFormInterface>({
    name: "",
    bedtype: "",
    facilities: [],
    rate: 0,
    offer: 0,
    photourl: "",
    status: "available",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (roomId) {
      dispatch(readOneThunk(roomId));
    }
  }, [roomId, dispatch]);

  useEffect(() => {
    if (single && roomId) {
      setFormData({
        name: single.name || "",
        bedtype: single.bedtype || "",
        facilities: single.facilities || [],
        rate: single.rate || 0,
        offer: single.offer || 0,
        photourl: single.photourl || "",
        status: single.status || "available",
      });
    }
  }, [single, roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Room Name is required';
    if (!formData.bedtype) newErrors.bedtype = 'Bed Type is required';
    if (!formData.rate) newErrors.rate = 'Rate is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = { ...formData };
      if (roomId) {
        dispatch(updateOneThunk({ id: roomId, room: dataToSubmit }))
          .unwrap()
          .then(() => {
            navigate("/rooms");
            Swal.fire({
              title: 'Room Updated!',
              text: 'Room has been updated successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.message || 'Failed to update room. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      } else {
        dispatch(createOneThunk(dataToSubmit))
          .unwrap()
          .then(() => {
            navigate("/rooms");
            Swal.fire({
              title: 'Room Created!',
              text: 'Room has been created successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.message || 'Failed to create room. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label>Room Name:</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={roomId ? single?.name || "" : "Enter room name"}
            />
            {errors.name && <ValidationError className="error">{errors.name}</ValidationError>}
          </FormGroup>

          <FormGroup>
            <Label>Bed Type:</Label>
            <Input
              type="text"
              name="bedtype"
              value={formData.bedtype}
              onChange={handleChange}
              placeholder={roomId ? single?.bedtype || "" : "Enter bed type"}
            />
            {errors.bedtype && <ValidationError className="error">{errors.bedtype}</ValidationError>}
          </FormGroup>

          <FormGroup>
            <Label>Rate:</Label>
            <Input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              placeholder="Enter rate"
              min="0"
            />
            {errors.rate && <ValidationError className="error">{errors.rate}</ValidationError>}
          </FormGroup>

          <FormGroup>
            <Label>Offer (%):</Label>
            <Input
              type="number"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
              placeholder="Enter offer percentage"
              min="0"
            />
          </FormGroup>

          <FormGroup>
            <Label>Photo URL:</Label>
            <Input
              type="text"
              name="photourl"
              value={formData.photourl}
              onChange={handleChange}
              placeholder={roomId ? single?.photourl || "" : "Enter photo URL"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Status:</Label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </FormGroup>

          <div>
            <SubmitButton type="submit">
              {roomId ? "Update Room" : "Create Room"}
            </SubmitButton>
          </div>
        </FormGrid>
      </Form>
    </Container>
  );
};
