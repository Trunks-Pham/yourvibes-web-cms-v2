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
    return client.get(`${ApiPath.GET_REPORTED_LIST}?report_type=0`);
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
    return client.patch(path);
  }

  async activateAccountReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    const path = `${ApiPath.ACIVATE_REPORTED}${params.report_id}`;
    return client.patch(path);
  }

  // Post
  async getPostList(): Promise<BaseApiResponseModel<ReportPostListResponseModel[]>> {
    return client.get(`${ApiPath.GET_REPORTED_LIST}?report_type=1`);
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
    return client.patch(path);
  }

  async activatePostReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    const path = `${ApiPath.ACIVATE_REPORTED}${params.report_id}`;
    return client.patch(path);
  }

  // Comment
  async getCommentList(params: ReportCommentListRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel[]>> {
    return client.get(`${ApiPath.GET_REPORTED_LIST}?report_type=2`);
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
    return client.patch(path);
  }

  async activateCommentReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    const path = `${ApiPath.ACIVATE_REPORTED}${params.report_id}`;
    return client.patch(path);
  }

}

export const defaultReportRepo = new ReportRepo();