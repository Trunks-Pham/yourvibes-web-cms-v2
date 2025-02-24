import { IChangePasswordRepo } from "@/api/features/changePassword/ChangePasswordRepo"
import { useState } from "react"
import { ResultObject } from '../../../../api/baseApiResponseModel/baseApiResponseModel';
import { ChangePasswordRequestModel } from "@/api/features/changePassword/model/ChangePasswordModel";

const ChangePasswordViewModel = (repo: IChangePasswordRepo) => {
  const [loading, setLoading] = useState(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);

  const handleChangePassword = async (params: ChangePasswordRequestModel) => {
    try {
      setLoading(true);
      const res = await repo.changePassword(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đổi mật khẩu thành công!"
        })
      } else if (res?.error) {
        setResultObject({
          type: 'error',
          message: res?.error?.message || "Đổi mật khẩu thất bại!"
        })
      }
    } catch (error: any) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: error?.message || error?.error?.message || "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    resultObject,
    handleChangePassword
  }
}

export default ChangePasswordViewModel