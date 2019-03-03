import axios from './axios';

const getReservations = async () => {
  const result = await axios.get('/admin/reservation');

  return result.data;
};

const addReservation = async (userId, serviceId, duration, dateReserved) => {
  const result = await axios.post('/admin/reservation', {
    user_id: userId,
    service_id: serviceId,
    duration,
    date_reserved: dateReserved,
    is_finished: true,
    is_confirmed: true,
  });

  return result.data;
};

const updateReservation = async (
  id,
  userId,
  serviceId,
  duration,
  dateReserved,
  isFinished,
  isConfirmed,
) => {
  const result = await axios.patch(`/admin/reservation/${id}`, {
    user_id: userId,
    service_id: serviceId,
    duration,
    date_reserved: dateReserved,
    is_finished: isFinished,
    is_confirmed: isConfirmed,
  });

  return result.data;
};


const deleteReservations = async (ids) => {
  const result = await axios.delete('/admin/reservation', {
    data: {
      ids,
    },
  });

  return result.data;
};

const approveReservations = async (id) => {
  const result = await axios.patch(`/admin/reservation/${id}/approve`);

  return result.data;
};

export default {
  getReservations,
  addReservation,
  updateReservation,
  deleteReservations,
  approveReservations,
};
