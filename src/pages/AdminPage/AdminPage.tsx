import Admin from '../../components/Admin';
import useAdmin from '../../hooks/useAdmin';
import AdminModal from './components/AdminModal';
import AdminData from './data/AdminData';

const AdminPage = () => {
  const {
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
  } = useAdmin();

  return (
    <Admin>
      <AdminModal
        getAdmin={getAdmin}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedAdmin={selectedAdmin}
        setSelectedAdmin={setSelectedAdmin}
      />
      <AdminData
      handleOpenModal={handleOpenModal}
        adminData={adminData?.data || []}
        count={adminData?.count || 0}
        handleDeleteModal={handleDeleteModal}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Admin>
  );
};

export default AdminPage;
