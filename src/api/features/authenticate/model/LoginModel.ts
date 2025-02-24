export interface LoginRequestModel {
  email?: string
  password?: string
}

export interface LoginResponseModel {
  access_token?: string
  admin?: UserModel
}

export interface UserModel {
  id?: string,
  family_name?: string,
  name?: string,
  email?: string,
  avatar_url?: string,
  phone_number?: string,
  birthday?: string,
  status?: boolean,
  role?: boolean,
  created_at?: string,
  updated_at?: string,
  identity_id?: string
}