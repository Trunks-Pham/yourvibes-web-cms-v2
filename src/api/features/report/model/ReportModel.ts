import { UserModel } from "../../authenticate/model/LoginModel";
import { PostResponseModel } from "../../post/models/PostResponseModel";
import { CommentsResponseModel } from "../../post/models/CommentResponseModel";

// =================================================================================================
// Type: User (0)
// =================================================================================================

export interface ReportAccountListRequestModel {
  report_type: 0; // Thêm type để xác định loại báo cáo
  status?: boolean;
  reason?: string;
  from_date?: string;
  to_date?: string;
  sort_by?: string;
  is_descending?: boolean;
  limit?: number;
  page?: number;
  reported_user_email?: string;
  admin_email?: string;
  report_id?: string;
}

export interface ReportAccountDetailRequestModel { 
  report_type: 0;  
  report_id?: string;
}

export interface ReportAccountListResponseModel {
  user_id?: string;
  reported_user_id?: string;
  admin_id?: string;
  admin?: UserModel;
  reason?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  user?: UserModel;
  reported_user?: UserModel;
  report_id?: string;
}

// =================================================================================================
// Type: Post (1)
// =================================================================================================

export interface ReportPostListRequestModel {
  report_type: 1;
  status?: boolean;
  reason?: string;
  from_date?: string;
  to_date?: string;
  sort_by?: string;
  is_descending?: boolean;
  limit?: number;
  page?: number;
  user_email?: string;
  admin_email?: string;
  report_id?: string;
}

export interface ReportPostDetailRequestModel {
  report_type: Number; 
  report_id: string; 
}

export interface ReportPostListResponseModel {
  user_id?: string;
  user_email?: string;
  user?: UserModel;
  reported_post_id?: string;
  reported_post?: PostResponseModel;
  admin_id?: string;
  admin?: UserModel;
  reason?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  report_id?: string;
}

// =================================================================================================
// Type: Comment (2)
// =================================================================================================

export interface ReportCommentListRequestModel {
  report_type: 2;
  status?: boolean;
  reason?: string;
  from_date?: string;
  to_date?: string;
  sort_by?: string;
  is_descending?: boolean;
  limit?: number;
  page?: number;
  user_email?: string;
  admin_email?: string;
  report_id?: string;
}

export interface ReportCommentDetailRequestModel {
  report_type: 2; 
  report_id?: string;
}

export interface ReportCommentListResponseModel {
  admin?: UserModel;
  user_id?: string;
  user?: UserModel;
  reported_comment_id?: string;
  admin_id?: string;
  reason?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  post?: PostResponseModel;
  reported_comment?: CommentsResponseModel;
  report_id?: string;
}