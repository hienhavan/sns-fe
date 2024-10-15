import axios from '../../../utils/axiosClient';

const getNewUserByYear = async (year) => {
  const response = await axios.get(
    `/apihost/api/v1/users/new-users?year=${year}`,
  );
  return response.data;
};

const getNewUserByMonthAndYear = async (month, year) => {
  const response = await axios.get(
    `/apihost/api/v1/users/new-users?month=${month}&year=${year}`,
  );
  return response.data;
};

const filterUser = async (filter) => {
  let q = '';
  if (filter) q += `?name=${filter}`;
  const response = await axios.get(`/apihost/api/v1/users${q}`);
  return response.data;
};

const blockUser = async (user) => {
  const response = await axios.put(`/apihost/api/v1/users/${user.id}/block`);
  return response.data;
};

export default {
  blockUser,
  getNewUserByMonthAndYear,
  getNewUserByYear,
  filterUser,
};
