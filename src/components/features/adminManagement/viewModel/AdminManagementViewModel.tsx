import { ResultObject } from '@/api/baseApiResponseModel/baseApiResponseModel'
import { AdminManagementRepo } from '@/api/features/adminManagement/AdminManagementRepo'
import { AdminListRequestModel } from '@/api/features/adminManagement/model/AdminListModel'
import { CreateAdminRequestModel } from '@/api/features/adminManagement/model/CreateAdminModel'
import { ResetPasswordRequestModel } from '@/api/features/adminManagement/model/ResetPasswordModel'
import { UpdateAdminRequestModel } from '@/api/features/adminManagement/model/UpdateAdminModel'
import { UserModel } from '@/api/features/authenticate/model/LoginModel'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const AdminManagementViewModel = (repo: AdminManagementRepo) => {
  const [admins, setAdmins] = useState<UserModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<AdminListRequestModel>({
    page: 1,
    limit: 10
  });
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState<boolean>(false);

  const getAdminsList = async (query: any) => {
    try {
      setIsLoading(true);
      const res = await repo.getList({
        ...query,
        is_descending: true,
        sort_by: 'created_at',
      });
      if (res) {
        setAdmins(res?.data === null ? [] : res?.data);
        setTotal(res?.paging?.total);
        setLimit(res?.paging?.limit);
        setPage(res?.paging?.page);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setIsLoading(false);
    }
  }

  const handleTableChange = (pagination?: any) => {
    setPage(pagination?.current);
    setLimit(pagination?.pageSize);
    setQuery({
      ...query,
      page: pagination?.current,
      limit: pagination?.pageSize,
    });
  };

  const handleCreateAdmin = async (values: any) => {
    try {
      setCreateLoading(true);
      const params: CreateAdminRequestModel = {
        birthday: dayjs(values?.birthday).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        email: values?.email,
        family_name: values?.family_name,
        identity_id: values?.identity_id,
        name: values?.name,
        password: values?.password,
        phone_number: values?.phone_number,
        role: values?.role,
      }
      const res = await repo.createAdmin(params);
      if (res?.data) {
        setResultObject({
          type: 'success',
          message: "Tạo admin thành công!"
        })
        setShowCreateModal(false);
        getAdminsList({
          page: 1,
          limit: 10
        });
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setCreateLoading(false);
    }
  }

  const handleUpdateAdmin = async (values: UpdateAdminRequestModel, type: "role" | "status") => {
    try {
      setUpdateLoading(true);
      const params: UpdateAdminRequestModel = {
        admin_id: values?.admin_id,
        role: type === "role" ? !values?.role : undefined,
        status: type === "status" ? !values?.status : undefined,
      }
      const res = await repo.updateAdmin(params);
      if (res?.data) {
        setResultObject({
          type: 'success',
          message: "Cập nhật thành công!"
        })
        getAdminsList({
          page: 1,
          limit: 10
        })
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setUpdateLoading(false);
    }
  }

  const handleResetPassword = async (values: ResetPasswordRequestModel) => {
    try {
      setResetPasswordLoading(true);
      const res = await repo.resetPassword(values);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Cập nhật thành công!"
        })
        getAdminsList({
          page: 1,
          limit: 10
        })
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui liệu thử lại!"
      })
    } finally {
      setResetPasswordLoading(false);
    }
  }

  useEffect(() => {
    getAdminsList(query)
  }, [query])

  return {
    admins,
    isLoading,
    resultObject,
    query,
    setQuery,
    handleTableChange,
    total,
    page,
    limit,
    showCreateModal,
    setShowCreateModal,
    createLoading,
    handleCreateAdmin,
    handleUpdateAdmin,
    updateLoading,
    handleResetPassword,
    resetPasswordLoading
  }
}

export default AdminManagementViewModel