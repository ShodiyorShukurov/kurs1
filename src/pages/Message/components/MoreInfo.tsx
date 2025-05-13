import { useState, useEffect } from 'react';
import { Modal, Spin, Image, Descriptions, Tag } from 'antd';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import api from '../../../api';
import type { IMessage } from '../../../types/interface';

interface MoreInfoProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedMessage: string | null;
}

const MoreInfo = ({
  isModalOpen,
  setIsModalOpen,
  selectedMessage,
}: MoreInfoProps) => {
  const [messageDetails, setMessageDetails] = useState<IMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMessageDetails = async () => {
    if (!selectedMessage) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/message/${selectedMessage}`);
      setMessageDetails(res.data.data);
    } catch (error) {
      console.error('Error fetching message details:', error);
      setError('Failed to load message details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen && selectedMessage) {
      getMessageDetails();
    }
    return () => {
      setMessageDetails(null);
      setError(null);
      setLoading(false);
    };
  }, [isModalOpen, selectedMessage]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setMessageDetails(null);
    setError(null);
  };

  return (
    <Modal
      title="Message Details"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="rounded-lg"
    >
      <div className="p-4">
        {loading && (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        )}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {messageDetails && !loading && !error && (
          <Descriptions
            column={1}
            bordered
            labelStyle={{ width: '30%' }}
            contentStyle={{ width: '70%' }}
            className="bg-white rounded-md"
          >
            <Descriptions.Item label="ID">
              {messageDetails.id}
            </Descriptions.Item>
            <Descriptions.Item label="Content">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(messageDetails.text),
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="File">
              {messageDetails.file_url && messageDetails.file_name ? (
                messageDetails.file_type === 'image/jpeg' ? (
                  <Image
                    src={messageDetails.file_url}
                    alt={messageDetails.file_name}
                    width={150}
                    className="rounded"
                    preview
                  />
                ) : (
                  <a
                    href={messageDetails.file_url}
                    download={messageDetails.file_name}
                    className="text-blue-500 hover:underline"
                  >
                    {messageDetails.file_name}
                  </a>
                )
              ) : (
                <Tag color="default">No File</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {format(new Date(messageDetails.created_at), 'PPP p')}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
    </Modal>
  );
};

export default MoreInfo;
