import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText, StatusColor, LabelContainer, ArrowContainer, Triangle } from '../../styles/common';
import { CellContainer, ProfileImgContainer } from '../../styles/table';
import { readAllThunk } from '../../slices/BookingSlice/bookingThunks';
import { TableComponent } from '../../components/Table';
import { BookingInterface } from '../../interfaces/bookings';
import { Column, Status } from '../../interfaces/common';
import bookingDefault from '../../assets/img/default_room.webp';
import { AppDispatch, RootState } from '../../store';
import BookingActions from './BookingActions';
import { SortConfig, SearchConfig } from '../../interfaces/common';
import { LoaderComponent } from '../../components/Loader';
const searchConfig: SearchConfig = {
  query: "",
  param: "lastname",
};

const statuses: Status[] = [
  { label: 'All Bookings', value: 'all' },
  { label: 'Booked', value: 'booked' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Pending', value: 'pending' },
  { label: 'Refund', value: 'refund' },
];

export const Bookings = () => {
  const { items, status, error } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch<AppDispatch>();
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSortChange = (property: string, type: 'date' | 'number' | 'string', direction: 1 | -1) => {
    let newDirection = direction;

    if (sortConfig?.property === property && sortConfig?.direction === direction) {
      newDirection = sortConfig.direction === 1 ? -1 : 1;
    }

    setSortConfig({
      property,
      direction: newDirection,
      type
    });
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(readAllThunk());
    }
    console.log(items, status, error);
  }, [status, dispatch]);

  const Columns: Column<BookingInterface>[] = [
    {
      label: (
        <LabelContainer>
          Customer Name
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "firstname" && sortConfig?.direction === 1}
              $isDirection={true}
              onClick={() => handleSortChange("firstname", "string", 1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "firstname" && sortConfig?.direction === -1}
              $isDirection={false}
              onClick={() => handleSortChange("firstname", "string", -1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (booking) => (
        <CellContainer>
          <ProfileImgContainer>
            <img
              src={booking.photourl ? booking.photourl : bookingDefault} 
              alt="booking"
            />
          </ProfileImgContainer>
          <div>
            <Text><strong>{booking.firstname} {booking.lastname}</strong></Text>
            <SmallText>#{booking._id}</SmallText>
          </div>
        </CellContainer>
      ),
    },
    {
      label: (
        <LabelContainer>
          Check-in
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "checkin" && sortConfig?.direction === -1}
              $isDirection={true}
              onClick={() => handleSortChange("checkin", "date", -1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "checkin" && sortConfig?.direction === 1}
              $isDirection={false}
              onClick={() => handleSortChange("checkin", "date", 1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (booking) => (
        <Text>{new Date(booking.checkin).toDateString()}</Text>
      ),
    },
    {
      label: (
        <LabelContainer>
          Check-out
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "checkout" && sortConfig?.direction === -1}
              $isDirection={true} 
              onClick={() => handleSortChange("checkout", "date", -1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "checkout" && sortConfig?.direction === 1}
              $isDirection={false} 
              onClick={() => handleSortChange("checkout", "date", 1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (booking) => (
        <Text>{new Date(booking.checkout).toDateString()}</Text> 
      ),
    },
    {
      label: (
        <LabelContainer>
          Order Date
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "orderdate" && sortConfig?.direction === -1}
              $isDirection={true}
              onClick={() => handleSortChange("orderdate", "date", -1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "orderdate" && sortConfig?.direction === 1}
              $isDirection={false}
              onClick={() => handleSortChange("orderdate", "date", 1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (booking) => (
        <Text>{new Date(booking.orderdate).toDateString()}</Text> 
      ),
    },
    {
      label: "Status",
      display: (booking) => (
        <Text>
          <StatusColor $status={booking.status}>{booking.status.toUpperCase()}</StatusColor> 
        </Text>
      ),
    },
    {
      label: "",
      display: (booking) => (
        <BookingActions bookingId={booking._id} /> 
      )
    },
  ];

  return (
    <Container>
    {status === 'loading' ? (
      <LoaderComponent />
    ) : (
      items.length > 0 && (
        <TableComponent
          pageSize={7} 
          data={items}
          columns={Columns}
          statuses={statuses}
          sortConfig={sortConfig}
          searchConfig={searchConfig}
        />
      )
    )}
  </Container>
  );
};
