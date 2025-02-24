import { UserModel } from "../../authenticate/model/LoginModel"
import { CommentsResponseModel } from "../../post/models/CommentResponseModel"
import { PostResponseModel } from "../../post/models/PostResponseModel"

export interface ReportCommentListRequestModel {
  status?: boolean
  reason?: string
  from_date?: string
  to_date?: string
  sort_by?: string
  is_descending?: boolean
  limit?: number
  page?: number
  user_email?: string
  admin_email?: string
}

export interface ReportCommentDetailRequestModel {
  user_id?: string
  comment_id?: string
  reported_comment_id?: string
}

export interface ReportCommentListResponseModel {
  admin?: UserModel
  user_id?: string
  user?: UserModel
  reported_comment_id?: string
  admin_id?: string
  reason?: string
  status?: boolean
  created_at?: string
  updated_at?: string
  post?: PostResponseModel
  reported_comment?: CommentsResponseModel
}