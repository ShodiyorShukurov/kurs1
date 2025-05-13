import React from 'react';
import api from '../api';
import type { IMessage } from '../types/interface';
import { message } from 'antd';

const useMessage = () => {
  interface IMessageProp {
    data: IMessage[];
    count: number;
  }
  const [messagesData, setMessagesData] = React.useState<IMessageProp | null>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState<string | null>(
    null
  );

  const handleViewDetails = (id: string) => {
    setSelectedMessage(id);
    setIsModalOpen(true);
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/list?limit=10&page=${currentPage}`);
      setMessagesData(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteModal = async (id: string | null) => {
    try {
      const res = await api.delete(`/message/delete/${id}`);
      if (res.data.status === 200) {
        fetchMessages();
        message.success('Message deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      message.error('Failed to delete message');
    }
  };

  React.useEffect(() => {
    fetchMessages();
  }, [currentPage]);

  return {
    messagesData,
    fetchMessages,
    setCurrentPage,
    currentPage,
    handleViewDetails,
    handleDeleteModal,
    isModalOpen,
    setIsModalOpen,
    selectedMessage,
  };
};

export default useMessage;
