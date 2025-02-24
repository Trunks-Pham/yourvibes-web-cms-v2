import { ResultObject } from '@/api/baseApiResponseModel/baseApiResponseModel';
import { IInfoRepo } from '@/api/features/info/InfoRepo'
import { UpdateInfoRequestModel } from '@/api/features/info/model/UpdateInfoModel';
import { useAuth } from '@/context/auth/useAuth';
import { useState } from 'react';
import dayjs from 'dayjs';

const InfoViewModal = (repo: IInfoRepo) => {
  const { onUpdateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);

  const handleUpdateInfo = async (data: any) => {
    try {
      setLoading(true);
      const params: UpdateInfoRequestModel = {
        birthday: dayjs(data?.birthday).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        family_name: data?.family_name,
        identity_id: data?.identity_id,
        name: data?.name,
        phone_number: data?.phone_number
      }
      const res = await repo.updateInfo(params);
      if (res?.data) {
        setResultObject({
          type: 'success',
          message: "Cập nhật thành công!"
        })
        onUpdateProfile(res?.data);
        setIsEdit(false);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    resultObject,
    handleUpdateInfo,
    isEdit,
    setIsEdit
  }
}

export default InfoViewModal