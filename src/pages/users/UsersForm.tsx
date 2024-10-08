import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from 'react-router-dom';
import { UserFormInterface } from "../../interfaces/user";
import { Form, FormGrid, FormGroup, SubmitButton, Checkbox, TextArea, Input, Label, Container } from '../../styles/form';
import { useDispatch, useSelector } from 'react-redux';
import { readOneThunk, updateOneThunk, createOneThunk } from "../../slices/UserSlice/userThunks"; 
import { AppDispatch, RootState } from '../../store';
import Swal from 'sweetalert2';

export const UserForm: React.FC = () => {
  const { id:userId } = useParams<{ id: string }>(); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { single } = useSelector((state: RootState) => state.user); 
  
  const [formData, setFormData] = useState<UserFormInterface>({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    joindate: new Date(),
    status: false,
    jobdesk: "",
    photoUrl: "",
    description: "",
  });
  
  const parseDate = (dateString: Date | undefined) => {
    return dateString ? new Date(dateString) : new Date();
  };

  useEffect(() => {
    if (userId) {
      dispatch(readOneThunk(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (single && userId) {
      setFormData({
        firstname: single.firstname || "",
        lastname: single.lastname || "",
        email: single.email || "",
        phonenumber: single.phonenumber || "",
        password: "",
        joindate: parseDate(single.joindate),
        status: single.status || false,
        jobdesk: single.jobdesk || "",
        photoUrl: single.photoUrl || "",
        description: single.description || "",
      });
    }
  }, [single, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, joindate: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    if (!formData.password) {
      delete dataToSubmit.password;
    }
    
    if (userId) {
      dispatch(updateOneThunk({ id: userId, user: dataToSubmit }))
        .then(() => {
          navigate("/users");
          Swal.fire({
            title: 'User Updated!',
            text: 'User has been updated successfully.',
            icon: 'success',
            timer: 2000, 
            showConfirmButton: false, 
          });
        })
        .catch(error => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update user. Please try again.',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        });
    } else {
      dispatch(createOneThunk(dataToSubmit))
        .then(() => {
          navigate("/users");
          Swal.fire({
            title: 'User Created!',
            text: 'User has been created successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
        })
        .catch(error => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to create user. Please try again.',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        });
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
              placeholder={userId ? single?.firstname || "" : "Enter first name"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <Input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder={userId ? single?.lastname || "" : "Enter last name"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={userId ? single?.email || "" : "Enter email"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number:</Label>
            <Input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              placeholder={userId ? single?.phonenumber || "" : "Enter phone number"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </FormGroup>

          <FormGroup>
            <Label>Join Date:</Label>
            <DatePicker
              selected={formData.joindate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              customInput={<Input />}
            />
          </FormGroup>

          <FormGroup>
            <Label>Job Desk:</Label>
            <Input
              type="text"
              name="jobdesk"
              value={formData.jobdesk}
              onChange={handleChange}
              placeholder={userId ? single?.jobdesk || "" : "Enter job desk"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Photo URL:</Label>
            <Input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder={userId ? single?.photoUrl || "" : "Enter photo URL"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Description:</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={userId ? single?.description || "" : "Enter description"}
              rows={4}
            />
          </FormGroup>

          <FormGroup>
            <Label>Status:</Label>
            <Checkbox
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            Active
          </FormGroup>
          <div></div>
          <div>
            <SubmitButton type="submit">
              {userId ? "Update User" : "Create User"}
            </SubmitButton>
          </div>
        </FormGrid>
      </Form>
    </Container>
  );
};
