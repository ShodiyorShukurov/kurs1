import { useEffect, useState } from 'react';
import api from '../api';
import type { IAdmin } from '../types/interface';
import { message } from 'antd';

const useAdmin = () => {
  interface AdminDataProp {
    data: IAdmin[];
    count: number;
  }

  const [adminData, setAdminData] = useState<AdminDataProp | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdmin | null>(null);

  const handleOpenModal = (item: IAdmin) => {
    setSelectedAdmin(item);
    setIsModalOpen(true);
  };

  const getAdmin = async () => {
    try {
      const res = await api.get(`/admin/list?limit=10&page=${currentPage}`);
      setAdminData(res.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw new Error('Failed to load admin data.');
    }
  };

  const handleDeleteModal = async (id: string | null) => {
    if (!id) return;
    const data = {
      admin_id: id,
    };

    try {
      const res = await api.delete(`/admin/delete`, { data });
      if (res.data.status === 200) {
        getAdmin();
        message.success('Message deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      message.error('Failed to delete message');
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return {
    adminData,
    handleDeleteModal,
    isModalOpen,
    handleOpenModal,
    setIsModalOpen,
    currentPage,
    setCurrentPage,
    getAdmin,
    selectedAdmin,
    setSelectedAdmin,
  };
};

export default useAdmin;
