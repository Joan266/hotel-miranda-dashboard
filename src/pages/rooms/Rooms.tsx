import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText, StatusColor, LabelContainer, ArrowContainer, Triangle } from '../../styles/common';
import { CellContainer, ProfileImgContainer } from '../../styles/table';
import { readAllThunk } from '../../slices/RoomSlice/roomThunks';
import { TableComponent } from '../../components/Table';
import { RoomInterface } from '../../interfaces/rooms';
import { Column, Status } from '../../interfaces/common';
import roomDefault from '../../assets/img/default_room.webp';
import { AppDispatch, RootState } from '../../store';
import RoomActions from './RoomActions';
import { SortConfig, SearchConfig } from '../../interfaces/common';
import { LoaderComponent } from '../../components/Loader';
const searchConfig: SearchConfig = {
  query: "",
  param: "name",
};

const statuses: Status[] = [
  { label: 'All Rooms', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Booked', value: 'booked' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Unavailable', value: 'unavailable' },
];

export const Rooms = () => {
  const { items, status, error } = useSelector((state: RootState) => state.room);
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

  const Columns: Column<RoomInterface>[] = [
    {
      label: (
        <LabelContainer>
          Room Name
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "name" && sortConfig?.direction === 1}
              $isDirection={true}
              onClick={() => handleSortChange("name", "string", 1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "name" && sortConfig?.direction === -1}
              $isDirection={false}
              onClick={() => handleSortChange("name", "string", -1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (room) => (
        <CellContainer>
          <ProfileImgContainer>
            <img
              src={room.photourl ? room.photourl : roomDefault}
              alt="room"
            />
          </ProfileImgContainer>
          <div>
            <Text><strong>{room.name}</strong></Text>
            <SmallText>#{room._id}</SmallText>
          </div>
        </CellContainer>
      ),
    },
    {
      label: "Bed Type",
      display: (room) => (
        <Text>{room.bedtype}</Text>
      ),
    },
    {
      label: (
        <LabelContainer>
          Rate
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "rate" && sortConfig?.direction === -1}
              $isDirection={true}
              onClick={() => handleSortChange("rate", "number", -1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "rate" && sortConfig?.direction === 1}
              $isDirection={false}
              onClick={() => handleSortChange("rate", "number", 1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (room) => (
        <Text>${room.rate.toFixed(2)}</Text>
      ),
    },
    {
      label: (
        <LabelContainer>
          Offer
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "offer" && sortConfig?.direction === -1}
              $isDirection={true}
              onClick={() => handleSortChange("offer", "number", -1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "offer" && sortConfig?.direction === 1}
              $isDirection={false}
              onClick={() => handleSortChange("offer", "number", 1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (room) => (
        <Text>{room.offer}%</Text>
      ),
    },
    {
      label: "Facilities",
      display: (room) => (
        <Text>{room.facilities?.join(', ')}</Text>
      ),
    },
    {
      label: "Status",
      display: (room) => (
        <Text>
          <StatusColor $status={room.status}>{room.status.toUpperCase()}</StatusColor>
        </Text>
      )
    },
    {
      label: "",
      display: (room) => (
        <RoomActions roomId={room._id} />
      )
    },
  ];

  return (
    <Container>
      {status === 'loading' ? (
        <LoaderComponent />
      ) : (items.length > 0 && (
        <TableComponent
          pageSize={7}
          data={items}
          columns={Columns}
          statuses={statuses}
          sortConfig={sortConfig}
          searchConfig={searchConfig}
        />
      ))}
    </Container>
  );
};
