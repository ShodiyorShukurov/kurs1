import React from 'react';
import api from '../api';
import type { IUser } from '../types/interface';

const useUserList = () => {
  interface IUserListResponse {
    data: IUser[];
    user_count: number;
    register_user_count: number;
  }
  const [users, setUsers] = React.useState<IUserListResponse | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [phone, setPhone] = React.useState<string>('');

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/users/list?limit=20&page=${currentPage}`);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await api.get(
        `/users/list?limit=10&page=${currentPage}&phone=${phone}`
      );
      setUsers(res.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  React.useEffect(() => {
    if (phone.length == 4) {
      handleSearch();
    } else {
      fetchUsers();
    }
  }, [currentPage, phone]);

  return {
    users,
    fetchUsers,
    setCurrentPage,
    currentPage,
    setPhone,
    handleSearch,
    phone,
  };
};

export default useUserList;
