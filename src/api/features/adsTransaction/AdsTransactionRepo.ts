import { ApiPath } from "@/api/ApiPath";
import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import client from "@/api/client";
import { AdsTransactionListRequestModel, AdsTransactionListResponseModel } from "./models/AdsTransactionModel";

export interface AdsTransactionRepo {
  getList(params: AdsTransactionListRequestModel): Promise<BaseApiResponseModel<AdsTransactionListResponseModel[]>>;
  getDetail(advertise_id : string): Promise<BaseApiResponseModel<AdsTransactionListResponseModel>>
}

class AdsTransactionRepoImpl implements AdsTransactionRepo {
  getList(params: AdsTransactionListRequestModel): Promise<BaseApiResponseModel<AdsTransactionListResponseModel[]>> {
    return client.get(ApiPath.GET_ADS_TRANSACTION_LIST, params);
  }

  getDetail(advertise_id : string): Promise<BaseApiResponseModel<AdsTransactionListResponseModel>> {
    return client.get(`${ApiPath.GET_ADS_TRANSACTION_DETAIL}/${advertise_id}`);
  }
}

export const defaultAdsTransactionRepo = new AdsTransactionRepoImpl();