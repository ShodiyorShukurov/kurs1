import Admin from '../../components/Admin';
import MessageData from './data/MessageData';
import MessageModal from './components/MessageModal';
import useMessage from '../../hooks/useMessage';
import MoreInfo from './components/MoreInfo';

const MessagePage = () => {
  const {
    messagesData,
    setCurrentPage,
    currentPage,
    handleViewDetails,
    handleDeleteModal,
    isModalOpen,
    setIsModalOpen,
    selectedMessage,
    fetchMessages
  } = useMessage();
  return (
    <Admin>
      <MessageModal fetchMessages={fetchMessages}/>
      <MessageData
        messages={messagesData?.data || []}
        count={messagesData?.count || 0}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        handleDeleteModal={handleDeleteModal}
        handleViewDetails={handleViewDetails}
      />

      <MoreInfo
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedMessage={selectedMessage}
      />
    </Admin>
  );
};

export default MessagePage;
