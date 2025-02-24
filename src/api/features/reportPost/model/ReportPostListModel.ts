import { UserModel } from "../../authenticate/model/LoginModel"
import { PostResponseModel } from "../../post/models/PostResponseModel"

export interface ReportPostListRequestModel {
  status?: boolean
  reason?: string
  from_date?: string
  to_date?: string
  sort_by?: string
  is_descending?: boolean
  limit?: number
  page?: number,
  user_email?: string
  admin_email?: string
}

export interface ReportPostDetailRequestModel {
  user_id?: string
  post_id?: string
  reported_post_id?: string
}

export interface ReportPostListResponseModel {
  user_id?: string
  user_email?: string
  user?: UserModel
  reported_post_id?: string
  reported_post?: PostResponseModel
  admin_id?: string
  admin?: UserModel
  reason?: string
  status?: boolean
  created_at?: string
  updated_at?: string
}