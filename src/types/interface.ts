export interface IUser {
  id: number;
  chat_id: number;
  phone_number: string;
  create_at: string;
}

export interface IMessage {
  id: string;
  text: string;
  file_url: string;
  file_name: string;
  file_type: string;
  created_at: string;
}

export interface IAdmin {
  admin_id: string;
  admin_email: string;
  admin_password: string;
  admin_create_at: string;
  role: string;
}
