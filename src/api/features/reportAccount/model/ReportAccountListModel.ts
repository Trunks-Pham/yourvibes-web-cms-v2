import { UserModel } from "../../authenticate/model/LoginModel"

export interface ReportAccountListRequestModel {
  status?: boolean
  reason?: string
  from_date?: string
  to_date?: string
  sort_by?: string
  is_descending?: boolean
  limit?: number
  page?: number
  reported_user_email?: string
  admin_email?: string
}

export interface ReportAccountDetailRequestModel {
  user_id?: string
  reported_user_id?: string
}

export interface ReportAccountListResponseModel {
  user_id?: string
  reported_user_id?: string
  admin_id?: string
  admin?: UserModel
  reason?: string
  status?: boolean
  created_at?: string
  updated_at?: string
  user?: UserModel
  reported_user?: UserModel
}