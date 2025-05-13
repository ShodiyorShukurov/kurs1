import { Modal, Form, Button, message, Input, Select } from 'antd';
import api from '../../../api';
import type { IAdmin } from '../../../types/interface';
import { useEffect } from 'react';

interface AdminModalProps {
  getAdmin: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedAdmin: (admin: IAdmin | null) => void;
  selectedAdmin: IAdmin | null;
}

const AdminModal = ({
  getAdmin,
  isModalOpen,
  setIsModalOpen,
  setSelectedAdmin,
  selectedAdmin,
}: AdminModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedAdmin) {
      form.setFieldsValue({
        admin_email: selectedAdmin.admin_email,
        role: selectedAdmin.role,
      });
    }
  }, [selectedAdmin]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data: {
        admin_email: string;
        admin_password?: string;
        role: string;
        admin_id?: string;
      } = {
        admin_email: values.admin_email,
        admin_password: values.admin_password,
        role: values.role,
      };
      if(selectedAdmin && selectedAdmin.admin_id) {
        data.admin_id = selectedAdmin.admin_id;
        await api.put('/admin/edit', data);
      }
      await api.post('/admin/register', data);
      message.success('Form submitted successfully!');
      form.resetFields();
      getAdmin();
      setIsModalOpen(false);
    } catch (info) {
      console.log('Validation Failed:', info);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedAdmin(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Add Admin
      </Button>
      <Modal
        title="Create Content"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="content_form">
          <Form.Item
            name="admin_email"
            label="Admin Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="admin_password"
            label="Admin Password"
            rules={selectedAdmin ? [] : [{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please input your role!' }]}
          >
            <Select
              placeholder="Select a role"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'superadmin', label: 'Super Admin' },
              ]}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminModal;
