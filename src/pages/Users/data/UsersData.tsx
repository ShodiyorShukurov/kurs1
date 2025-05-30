import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import type { IUser } from '../../../types/interface';

interface UsersDataProps {
  users: IUser[];
  count: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const UsersData = ({ users, count, setCurrentPage, currentPage }: UsersDataProps) => {
  const columns: ColumnsType<IUser> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
      render: (_, __, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Chat ID',
      dataIndex: 'chat_id',
      key: 'chat_id',
      render: (chat_id: number) => <Tag color="blue">{chat_id}</Tag>,
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (phone: string) => (
        <a href={`tel:${phone}`} className="text-blue-500 hover:underline">
          {phone}
        </a>
      ),
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'create_at',
      key: 'create_at',
      render: (date: string) => <span>{format(new Date(date), 'PPP p')}</span>,
      sorter: (a, b) =>
        new Date(a.create_at).getTime() - new Date(b.create_at).getTime(),
      align: 'center',
    },
  ];

  return (
    <div className='h-screen'>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          columns={columns}
          dataSource={users || []}
          rowKey="id"
          pagination={{
            pageSize: 20,
            total: count,
            onChange: (page) => {
              setCurrentPage(page);
            },
            current: currentPage
          }}
          className="overflow-x-auto"
          bordered
        />
      </div>
    </div>
  );
};

export default UsersData;
