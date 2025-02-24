import { UserModel } from "../../authenticate/model/LoginModel"

export interface AdminListRequestModel {
  name?: string
  email?: string
  phone_number?: string
  identity_id?: string
  birthday?: string
  created_at?: string
  status?: boolean
  sort_by?: keyof UserModel
  is_descending?: boolean
  role?: boolean
  limit?: number
  page?: number
}
