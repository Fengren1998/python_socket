import axios from './axios';

const getReservations = async () => {
  const result = await axios.get('/user/reservation');

  return result.data;
};

const addReservation = async (serviceId, duration, dateReserved) => {
  const result = await axios.post('/user/reservation', {
    service_id: serviceId,
    duration,
    date_reserved: dateReserved,
  });

  return result.data;
};


export default {
  getReservations,
  addReservation,
};
