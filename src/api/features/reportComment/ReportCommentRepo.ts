import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { ReportCommentListRequestModel, ReportCommentListResponseModel, ReportCommentDetailRequestModel } from "./model/ReportCommentListModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IReportCommentRepo {
  getList(params: ReportCommentListRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel[]>>
  getDetail(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;
  deleteReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;
  acceptReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;
  activateReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>>;
}

class ReportCommentRepo implements IReportCommentRepo {
  async getList(params: ReportCommentListRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel[]>> {
    return client.get(ApiPath.GET_REPORTED_COMMENT_LIST, params);
  }

  async getDetail(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.get(`${ApiPath.GET_REPORTED_COMMENT_DETAIL}/${params.user_id}/${params.reported_comment_id}`);
  }

  async deleteReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.delete(`${ApiPath.GET_REPORTED_COMMENT_DETAIL}/${params.user_id}/${params.reported_comment_id}`);
  }

  async acceptReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.patch(`${ApiPath.GET_REPORTED_COMMENT_DETAIL}/${params.user_id}/${params.reported_comment_id}`);
  }

  async activateReport(params: ReportCommentDetailRequestModel): Promise<BaseApiResponseModel<ReportCommentListResponseModel>> {
    return client.patch(`${ApiPath.ACIVATE_REPORTED_COMMENT}/${params.comment_id}`);
  }
}

export const defaultReportCommentRepo = new ReportCommentRepo();