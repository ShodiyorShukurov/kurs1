import { Popconfirm, Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { IAdmin } from '../../../types/interface';
import {
  DeleteOutlined,
  EditFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface AdminDataProps {
  adminData: IAdmin[];
  count: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleDeleteModal: (id: string | null) => void;
  handleOpenModal: (item: IAdmin) => void;
}

const AdminData = ({
  adminData,
  count,
  setCurrentPage,
  currentPage,
  handleDeleteModal,
  handleOpenModal,
}: AdminDataProps) => {
  const columns: ColumnsType<IAdmin> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (_, __, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Admin Email',
      dataIndex: 'admin_email',
      key: 'admin_email',
      align: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this branch?"
            description="This action cannot be undone."
            onConfirm={() => handleDeleteModal(record.admin_id)}
            onCancel={() => handleDeleteModal(null)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
            icon={<ExclamationCircleOutlined className="text-red-500" />}
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => handleOpenModal(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Users List
        </h2>
        <Table
          columns={columns}
          dataSource={adminData || []}
          rowKey="admin_id"
          pagination={{
            pageSize: 10,
            total: count,
            showTotal: (total) => `Total ${total} items`,
            onChange: (page) => {
              setCurrentPage(page);
            },
            current: currentPage,
          }}
          className="overflow-x-auto"
          bordered
        />
      </div>
    </div>
  );
};

export default AdminData;
