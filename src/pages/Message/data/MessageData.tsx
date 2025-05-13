import { Table, Tag, Image, Button, Space, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import type { IMessage } from '../../../types/interface';
import {
  InfoCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface MessageDataProps {
  messages: IMessage[];
  count: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleDeleteModal: (id: string | null) => void;
  handleViewDetails: (id: string) => void;
}

const MessageData = ({
  messages,
  count,
  currentPage,
  setCurrentPage,
  handleDeleteModal,
  handleViewDetails,
}: MessageDataProps) => {
  const columns: ColumnsType<IMessage> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      render: (_, __, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Content',
      dataIndex: 'text',
      key: 'text',
      render: (text: string) => (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        />
      ),
      align: 'center',
    },
    {
      title: 'File',
      key: 'file',
      render: (_, record) => {
        if (!record.file_url || !record.file_name) {
          return <Tag color="default">No File</Tag>;
        }
        if (record.file_type === 'image/jpeg') {
          return (
            <Image
              src={record.file_url}
              alt={record.file_name}
              width={100}
              className="rounded"
              preview
            />
          );
        }
        return (
          <a
            href={record.file_url}
            download={record.file_name}
            className="text-blue-500 hover:underline"
          >
            {record.file_name}
          </a>
        );
      },
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => <span>{format(new Date(date), 'PPP p')}</span>,
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
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
            onConfirm={() => handleDeleteModal(record.id)}
            onCancel={() => handleDeleteModal(null)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
            icon={<ExclamationCircleOutlined className="text-red-500" />}
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            type="default"
            icon={<InfoCircleOutlined />}
            onClick={() => handleViewDetails(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Messages</h2>
        <Table
          columns={columns}
          dataSource={messages || []}
          rowKey="id"
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

export default MessageData;
