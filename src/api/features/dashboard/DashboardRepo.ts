import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { ChartDataModel, StatsModel } from "./model/DashboardModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IDashboardRepo {
  getChartData(): Promise<BaseApiResponseModel<ChartDataModel>>;
  getStats(): Promise<BaseApiResponseModel<StatsModel>>
}

class DashboardRepo implements IDashboardRepo {

  async getChartData(): Promise<BaseApiResponseModel<ChartDataModel>> {
    return client.get(ApiPath.GET_CHART_DATA);
  }

  async getStats(): Promise<BaseApiResponseModel<StatsModel>> {
    return client.get(ApiPath.GET_STATS);
  }
}

export const defaultDashboardRepo = new DashboardRepo();