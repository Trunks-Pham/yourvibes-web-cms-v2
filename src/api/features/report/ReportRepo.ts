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
  ReportPostListResponseModel,
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
    const queryParams = {
      report_type: "0",
      ...(params.status !== undefined && { status: params.status.toString() }),
      ...(params.reason && { reason: params.reason }),
      ...(params.from_date && { from_date: params.from_date }),
      ...(params.to_date && { to_date: params.to_date }),
      ...(params.sort_by ? { sort_by: params.sort_by } : { sort_by: "created_at" }), // Mặc định sắp xếp theo created_at
      ...(params.is_descending !== undefined ? { is_descending: params.is_descending.toString() } : { is_descending: "true" }), // Mặc định giảm dần
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.page && { page: params.page.toString() }),
      ...(params.reported_user_email && { reported_user_email: params.reported_user_email }),
      ...(params.admin_email && { admin_email: params.admin_email }),
      ...(params.report_id && { report_id: params.report_id }),
    };
    const query = new URLSearchParams(queryParams).toString();
    return client.get(`${ApiPath.GET_REPORTED_LIST}?${query}`);
  }

  async getAccountDetail(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    const path = ApiPath.GET_REPORTED_DETAIL.replace("{report_id}", params.report_id!) + "?report_type=0";
    return client.get(path);
  }

  async deleteAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    const path = `${ApiPath.DELETE_REPORTED}${params.report_id}?report_type=0`;
    return client.delete(path);
  }

  async acceptAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    const path = `${ApiPath.HANDLE_REPORTED}${params.report_id}`;
    return client.patch(path, { report_type: 0 });
  }

  async activateAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    const path = `${ApiPath.ACIVATE_REPORTED}${params.report_id}`;
    return client.patch(path, { report_type: 0 });
  }

  // Post
  async getPostList(params: ReportPostListRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel[]>> {
    const queryParams = {
      report_type: "1",
      ...(params.status !== undefined && { status: params.status.toString() }),
      ...(params.reason && { reason: params.reason }),
      ...(params.from_date && { from_date: params.from_date }),
      ...(params.to_date && { to_date: params.to_date }),
      ...(params.sort_by ? { sort_by: params.sort_by } : { sort_by: "created_at" }), // Mặc định sắp xếp theo created_at
      ...(params.is_descending !== undefined ? { is_descending: params.is_descending.toString() } : { is_descending: "true" }), // Mặc định giảm dần
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.page && { page: params.page.toString() }),
      ...(params.user_email && { user_email: params.user_email }),
      ...(params.admin_email && { admin_email: params.admin_email }),
      ...(params.report_id && { report_id: params.report_id }),
    };
    const query = new URLSearchParams(queryParams).toString();
    return client.get(`${ApiPath.GET_REPORTED_LIST}?${query}`);
  }

  async getPostDetail(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    const path = ApiPath.GET_REPORTED_DETAIL.replace("{report_id}", params.report_id!) + "?report_type=1";
    return client.get(path);
  }

  async deletePostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    const path = `${ApiPath.DELETE_REPORTED}${params.report_id}?report_type=1`;
    return client.delete(path);
  }

  async acceptPostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    const path = `${ApiPath.HANDLE_REPORTED}${params.report_id}`;
    return client.patch(path, { report_type: 1 });
  }

  async activatePostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    const path = `${ApiPath.ACIVATE_REPORTED}${params.report_id}`;
    return client.patch(path, { report_type: 1 });
  }

  // Comment
  async getCommentList(params: ReportCommentListRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel[]>> {
    const queryParams = {
      report_type: "2",
      ...(params.status !== undefined && { status: params.status.toString() }),
      ...(params.reason && { reason: params.reason }),
      ...(params.from_date && { from_date: params.from_date }),
      ...(params.to_date && { to_date: params.to_date }),
      ...(params.sort_by ? { sort_by: params.sort_by } : { sort_by: "created_at" }), // Mặc định sắp xếp theo created_at
      ...(params.is_descending !== undefined ? { is_descending: params.is_descending.toString() } : { is_descending: "true" }), // Mặc định giảm dần
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.page && { page: params.page.toString() }),
      ...(params.user_email && { user_email: params.user_email }),
      ...(params.admin_email && { admin_email: params.admin_email }),
      ...(params.report_id && { report_id: params.report_id }),
    };
    const query = new URLSearchParams(queryParams).toString();
    return client.get(`${ApiPath.GET_REPORTED_LIST}?${query}`);
  }

  async getCommentDetail(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    const path = ApiPath.GET_REPORTED_DETAIL.replace("{report_id}", params.report_id!) + "?report_type=2";
    return client.get(path);
  }

  async deleteCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    const path = `${ApiPath.DELETE_REPORTED}${params.report_id}?report_type=2`;
    return client.delete(path);
  }

  async acceptCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    const path = `${ApiPath.HANDLE_REPORTED}${params.report_id}`;
    return client.patch(path, { report_type: 2 });
  }

  async activateCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    const path = `${ApiPath.ACIVATE_REPORTED}${params.report_id}`;
    return client.patch(path, { report_type: 2 });
  }
}

export const defaultReportRepo = new ReportRepo();