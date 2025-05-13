import { useState, useRef } from 'react';
import { Modal, Form, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import JoditEditor from 'jodit-react';
import api from '../../../api';

interface MessageModalProps {
  fetchMessages: () => void;
}

const MessageModal = ({ fetchMessages }: MessageModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [content, setContent] = useState<string>('');
  const editor = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const formData = new FormData();
      formData.append('text', content);
      formData.append('file', fileList[0] ? fileList[0] : '');

      await api.post('/message/send', formData);
      message.success('Form submitted successfully!');
      form.resetFields();
      setContent('');
      setFileList([]);
      fetchMessages();
      setIsModalOpen(false);
    } catch (info) {
      console.log('Validation Failed:', info);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setContent('');
    setFileList([]);
    setIsModalOpen(false);
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file: any) => {
      setFileList([file]);
      return false;
    },
    fileList,
    accept: '.jpg,.png,.pdf,.docx',
    multiple: false,
  };

  return (
    <div className="p-6">
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Send Message
      </Button>
      <Modal
        title="Create Content"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        width={800}
      >
        <Form form={form} layout="vertical" name="content_form">
          <Form.Item label="HTML Content" required>
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              config={{
                readonly: false,
                height: 300,
                toolbarSticky: false,
                buttons: [
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  '|',
                  'ul',
                  'ol',
                  '|',
                  'font',
                  'fontsize',
                  'paragraph',
                  '|',
                  'image',
                  'table',
                  'link',
                  '|',
                  'align',
                  'undo',
                  'redo',
                  'hr',
                  'eraser',
                  'copyformat',
                  'fullsize',
                  //   'source',
                ],
              }}
            />
          </Form.Item>

          <Form.Item name="fileList" label="Upload Files">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select Files</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MessageModal;
