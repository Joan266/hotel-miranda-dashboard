import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { BookingFormInterface } from "../../interfaces/bookings"; 
import { Form, FormGrid, FormGroup, SubmitButton, Input, Label, Container, ValidationError } from '../../styles/form';
import { useDispatch, useSelector } from 'react-redux';
import { readOneThunk, updateOneThunk, createOneThunk } from "../../slices/BookingSlice/bookingThunks"; // Adjusted to use Booking thunks
import { AppDispatch, RootState } from '../../store';
import Swal from 'sweetalert2';

export const BookingForm: React.FC = () => {
  const { id: bookingId } = useParams<{ id: string }>(); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { single } = useSelector((state: RootState) => state.booking); 
  
  const [formData, setFormData] = useState<BookingFormInterface>({
    firstname: "",
    lastname: "",
    orderdate: new Date(),
    checkin: new Date(),
    checkout: new Date(),
    photourl: "",
    description: "",
    status: "pending",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (bookingId) {
      dispatch(readOneThunk(bookingId)); 
    }
  }, [bookingId, dispatch]);

  useEffect(() => {
    if (single && bookingId) {
      setFormData({
        firstname: single.firstname || "",
        lastname: single.lastname || "",
        orderdate: single.orderdate || new Date(),
        checkin: single.checkin || new Date(),
        checkout: single.checkout || new Date(),
        photourl: single.photourl || "",
        description: single.description || "",
        status: single.status || "pending",
      });
    }
  }, [single, bookingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstname) newErrors.firstname = 'First Name is required';
    if (!formData.lastname) newErrors.lastname = 'Last Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = { ...formData };
      if (bookingId) {
        dispatch(updateOneThunk({ id: bookingId, booking: dataToSubmit }))
          .unwrap()
          .then(() => {
            navigate("/bookings");
            Swal.fire({
              title: 'Booking Updated!',
              text: 'Booking has been updated successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.message || 'Failed to update booking. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      } else {
        dispatch(createOneThunk(dataToSubmit))
          .unwrap()
          .then(() => {
            navigate("/bookings");
            Swal.fire({
              title: 'Booking Created!',
              text: 'Booking has been created successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.message || 'Failed to create booking. Please try again.',
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
            <Label>First Name:</Label>
            <Input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder={bookingId ? single?.firstname || "" : "Enter first name"}
            />
            {errors.firstname && <ValidationError className="error">{errors.firstname}</ValidationError>}
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <Input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder={bookingId ? single?.lastname || "" : "Enter last name"}
            />
            {errors.lastname && <ValidationError className="error">{errors.lastname}</ValidationError>}
          </FormGroup>

          <FormGroup>
            <Label>Order Date:</Label>
            <Input
              type="date"
              name="orderdate"
              value={formData.orderdate.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Check-in Date:</Label>
            <Input
              type="date"
              name="checkin"
              value={formData.checkin.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Check-out Date:</Label>
            <Input
              type="date"
              name="checkout"
              value={formData.checkout.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Photo URL:</Label>
            <Input
              type="text"
              name="photourl"
              value={formData.photourl}
              onChange={handleChange}
              placeholder="Enter photo URL (optional)"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description:</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a description (optional)"
              rows={3}
            />
          </FormGroup>

          <FormGroup>
            <Label>Status:</Label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
              <option value="refund">Refund</option>
            </select>
          </FormGroup>

          <div>
            <SubmitButton type="submit">
              {bookingId ? "Update Booking" : "Create Booking"}
            </SubmitButton>
          </div>
        </FormGrid>
      </Form>
    </Container>
  );
};