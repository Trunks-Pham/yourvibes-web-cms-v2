import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { ChangePasswordRequestModel } from "./model/ChangePasswordModel";
import { UserModel } from "../authenticate/model/LoginModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IChangePasswordRepo {
  changePassword: (params: ChangePasswordRequestModel) => Promise<BaseApiResponseModel<UserModel>>;
}

class ChangePasswordRepo implements IChangePasswordRepo {
  async changePassword(params: ChangePasswordRequestModel): Promise<BaseApiResponseModel<UserModel>> {
    return client.patch(ApiPath.CHANGE_PASSWORD, params);
  }
}

export const defaultChangePasswordRepo = new ChangePasswordRepo;