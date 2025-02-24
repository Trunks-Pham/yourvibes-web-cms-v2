import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { ReportAccountDetailRequestModel, ReportAccountListRequestModel, ReportAccountListResponseModel } from "./model/ReportAccountListModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IReportAccountRepo {
  getList(params: ReportAccountListRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel[]>>;
  getDetail(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;
  deleteReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;
  acceptReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;
  activateReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>>;
}

class ReportAccountRepo implements IReportAccountRepo {
  async getList(params: ReportAccountListRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel[]>> {
    return client.get(ApiPath.GET_REPORTED_ACCOUNT_LIST, params);
  }

  async getDetail(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.get(`${ApiPath.GET_REPORTED_ACCOUNT_DETAIL}/${params.user_id}/${params.reported_user_id}`);
  }

  async deleteReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.delete(`${ApiPath.GET_REPORTED_ACCOUNT_DETAIL}/${params.user_id}/${params.reported_user_id}`);
  }

  async acceptReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.patch(`${ApiPath.GET_REPORTED_ACCOUNT_DETAIL}/${params.user_id}/${params.reported_user_id}`);
  }

  async activateReport(params: ReportAccountDetailRequestModel): Promise<BaseApiResponseModel<ReportAccountListResponseModel>> {
    return client.patch(`${ApiPath.ACIVATE_REPORTED_USER}/${params.user_id}`);
  }

}

export const defaultReportAccountRepo = new ReportAccountRepo();