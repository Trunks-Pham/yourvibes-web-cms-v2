import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { AdminListRequestModel } from "./model/AdminListModel";
import { UserModel } from "../authenticate/model/LoginModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";
import { CreateAdminRequestModel } from "./model/CreateAdminModel";
import { UpdateAdminRequestModel } from "./model/UpdateAdminModel";
import { ResetPasswordRequestModel } from "./model/ResetPasswordModel";

interface IAdminManagementRepo {
  getList(params: AdminListRequestModel): Promise<BaseApiResponseModel<UserModel[]>>;
  createAdmin(params: CreateAdminRequestModel): Promise<BaseApiResponseModel<UserModel>>;
  updateAdmin(params: UpdateAdminRequestModel): Promise<BaseApiResponseModel<UserModel>>;
  resetPassword(params: ResetPasswordRequestModel): Promise<BaseApiResponseModel<UserModel>>
}

export class AdminManagementRepo implements IAdminManagementRepo {
  async getList(params: AdminListRequestModel): Promise<BaseApiResponseModel<UserModel[]>> {
    return client.get(ApiPath.GET_ADMINS_LIST, params);
  }

  async createAdmin(params: CreateAdminRequestModel): Promise<BaseApiResponseModel<UserModel>> {
    return client.post(ApiPath.CREATE_ADMIN, params);
  }

  async updateAdmin(params: UpdateAdminRequestModel): Promise<BaseApiResponseModel<UserModel>> {
    return client.patch(ApiPath.UPDATE_ADMIN, params);
  }

  async resetPassword(params: ResetPasswordRequestModel): Promise<BaseApiResponseModel<UserModel>> {
    return client.post(ApiPath.RESET_PASSWORD, params);
  }
}

export const defaultAdminManagementRepo = new AdminManagementRepo();