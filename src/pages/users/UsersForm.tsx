import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateUser } from "../../interfaces/user";

// Styled Components
const Form = styled.form`
  padding: 2em 4em;
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 1px 5px black;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3em 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em 2em;
`;

const FormGroup = styled.div`
  margin-bottom: 1em;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* Prevents resizing the text area */
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: black;
  color: white;
  border: none;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  justify-self: end;

  &:hover {
    background-color: #0056b3;
  }
`;

export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateUser>({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    joindate: new Date(),
    status: false,
    jobdesk: "",
    photoUrl: "", // New field for photo URL
    description: "", // New field for description
  });

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
    console.log("User Data Submitted:", formData);
    // Handle form submission logic here
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
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <Input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number:</Label>
            <Input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Start Date:</Label>
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
            />
          </FormGroup>

          <FormGroup>
            <Label>Photo URL:</Label>
            <Input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Description:</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4} // Adjust the number of visible rows
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
           <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </FormGrid>
      </Form>
    </Container>
  );
};
