import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";
import { 
  ReportAccountDetailRequestModel, 
  ReportAccountListRequestModel, 
  ReportAccountListResponseModel, 
  ReportCommentListRequestModel, 
  ReportCommentListResponseModel, 
  ReportCommentDetailRequestModel, 
  ReportPostDetailRequestModel, 
  ReportPostListRequestModel, 
  ReportPostListResponseModel 
} from "@/api/features/report/model/ReportModel";

export interface IReportRepo {
  // Account
  getAccountList(params: ReportAccountListRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel[]>>;
  getAccountDetail(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;
  deleteAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;
  acceptAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;
  activateAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;

  // Comment
  getCommentList(params: ReportCommentListRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel[]>>;
  getCommentDetail(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;
  deleteCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;
  acceptCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;
  activateCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;

  // Post
  getPostList(params: ReportPostListRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel[]>>;
  getPostDetail(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
  deletePostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
  acceptPostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
  activatePostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
}

class ReportRepo implements IReportRepo {
  // Account
  async getAccountList(params: ReportAccountListRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel[]>> {
    return client.get(ApiPath.GET_REPORTED_ACCOUNT_LIST, params);
  }

  async getAccountDetail(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.get(`${ApiPath.GET_REPORTED_ACCOUNT_DETAIL}/${params.user_id}/${params.reported_user_id}`);
  }

  async deleteAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.delete(`${ApiPath.GET_REPORTED_ACCOUNT_DETAIL}/${params.user_id}/${params.reported_user_id}`);
  }

  async acceptAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.patch(`${ApiPath.GET_REPORTED_ACCOUNT_DETAIL}/${params.user_id}/${params.reported_user_id}`);
  }

  async activateAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.patch(`${ApiPath.ACTIVATE_REPORTED_USER}/${params.reported_user_id}`); // Sử dụng reported_user_id thay vì user_id
  }

  // Comment
  async getCommentList(params: ReportCommentListRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel[]>> {
    return client.get(ApiPath.GET_REPORTED_COMMENT_LIST, params);
  }

  async getCommentDetail(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.get(`${ApiPath.GET_REPORTED_COMMENT_DETAIL}/${params.user_id}/${params.reported_comment_id}`);
  }

  async deleteCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.delete(`${ApiPath.GET_REPORTED_COMMENT_DETAIL}/${params.user_id}/${params.reported_comment_id}`);
  }

  async acceptCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.patch(`${ApiPath.GET_REPORTED_COMMENT_DETAIL}/${params.user_id}/${params.reported_comment_id}`);
  }

  async activateCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.patch(`${ApiPath.ACTIVATE_REPORTED_COMMENT}/${params.reported_comment_id}`);
  }

  // Post
  async getPostList(params: ReportPostListRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel[]>> {
    return client.get(ApiPath.GET_REPORTED_POSTS_LIST, params);
  }

  async getPostDetail(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.get(`${ApiPath.GET_REPORTED_POST_DETAIL}/${params.user_id}/${params.reported_post_id}`);
  }

  async deletePostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.delete(`${ApiPath.GET_REPORTED_POST_DETAIL}/${params.user_id}/${params.reported_post_id}`);
  }

  async acceptPostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.patch(`${ApiPath.GET_REPORTED_POST_DETAIL}/${params.user_id}/${params.reported_post_id}`);
  }

  async activatePostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.patch(`${ApiPath.ACTIVATE_REPORTED_POST}/${params.reported_post_id}`);
  }
}

export const defaultReportRepo = new ReportRepo();