import employeesData from '../data/employees.json';
import { Table, TableCell, TableHeader, TableRow } from '../styles/table';
import { Container } from '../styles/common';

export const Employees = () => {
  const limitedData = employeesData.slice(0, 8);
  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Job Desk</TableHeader>
            <TableHeader>Schedule</TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {limitedData.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
              <TableCell>{employee.job_desk}</TableCell>
              <TableCell>{`${employee.schedule.days} ${employee.schedule.hours}`}</TableCell>
              <TableCell>{employee.phone_number}</TableCell>
              <TableCell>{employee.status ? "ACTIVE" : "INACTIVE"}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
