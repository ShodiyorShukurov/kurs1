import Admin from '../../components/Admin';
import useUserList from '../../hooks/useUserList';
import UsersData from './data/UsersData';
import { Card, Input, Button, Typography } from 'antd';
const { Text } = Typography;
import { SearchOutlined } from '@ant-design/icons';

const UsersPage = () => {
  const { users, setCurrentPage, currentPage, setPhone, handleSearch, phone } =
    useUserList();

  return (
    <Admin>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Users List
      </h2>
      <div className="flex gap-2 mb-4 justify-between items-center">
        <div className="flex gap-2">
          <Input
            className="max-w-xs"
            placeholder="Telefon raqamni kiriting"
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              setPhone(value.trim());
            }}
            size="large"
            allowClear
            type="text"
            inputMode="numeric"
            pattern="\d*"
            onKeyDown={(e) => {
              const allowedKeys = [
                'Backspace',
                'Enter',
                'ArrowLeft',
                'ArrowRight',
                'Tab',
              ];

              if (e.ctrlKey || e.metaKey || e.altKey) {
                return;
              }

              if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={handleSearch}
          >
            Qidirish
          </Button>
        </div>

        <div className='flex gap-2'>
          <Card
            style={{
              background: '#f0f2f5',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Text strong>Total register users: </Text>
            <Text type="success">{users?.register_user_count}</Text>
          </Card>
          <Card
            style={{
              background: '#f0f2f5',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Text strong>Total users: </Text>
            <Text type="success">{users?.user_count}</Text>
          </Card>
        </div>
      </div>

      <UsersData
        users={users?.data || []}
        count={users?.user_count || 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Admin>
  );
};

export default UsersPage;
