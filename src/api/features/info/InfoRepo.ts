import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { UserModel } from "../authenticate/model/LoginModel";
import { UpdateInfoRequestModel } from "./model/UpdateInfoModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IInfoRepo {
  updateInfo(data: UpdateInfoRequestModel): Promise<BaseApiResponseModel<UserModel>>
}

class InfoRepo implements IInfoRepo {
  async updateInfo(data: UpdateInfoRequestModel): Promise<BaseApiResponseModel<UserModel>> {
    return client.patch(ApiPath.UPDATE_INFO, data);
  }
}

export const defaultInfoRepo = new InfoRepo();