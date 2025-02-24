import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { ReportPostDetailRequestModel, ReportPostListRequestModel, ReportPostListResponseModel } from "./model/ReportPostListModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IReportPostRepo {
  getList(params: ReportPostListRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel[]>>;
  getDetail(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
  deleteReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
  acceptReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
  activateReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>>;
}

class ReportPostRepo implements IReportPostRepo {
  async getList(params: ReportPostListRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel[]>> {
    return client.get(ApiPath.GET_REPORTED_POSTS_LIST, params);
  }

  async getDetail(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.get(`${ApiPath.GET_REPORTED_POST_DETAIL}/${params.user_id}/${params.reported_post_id}`);
  }

  async deleteReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.delete(`${ApiPath.GET_REPORTED_POST_DETAIL}/${params.user_id}/${params.reported_post_id}`);
  }

  async acceptReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.patch(`${ApiPath.GET_REPORTED_POST_DETAIL}/${params.user_id}/${params.reported_post_id}`);
  }

  async activateReport(params: ReportPostDetailRequestModel): Promise<BaseApiResponseModel<ReportPostListResponseModel>> {
    return client.patch(`${ApiPath.ACIVATE_REPORTED_POST}/${params.post_id}`);
  }
}

export const defaultReportPostRepo = new ReportPostRepo();