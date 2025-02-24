import { ResultObject } from '@/api/baseApiResponseModel/baseApiResponseModel';
import { ReportAccountDetailRequestModel, ReportAccountListRequestModel, ReportAccountListResponseModel } from '@/api/features/reportAccount/model/ReportAccountListModel';
import { IReportAccountRepo } from '@/api/features/reportAccount/ReportAccountRepo'
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ReportAccountViewModel = (repo: IReportAccountRepo) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<ReportAccountListRequestModel>({
    page: 1,
    limit: 10,
    from_date: dayjs().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
    to_date: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
  });
  const [reportedList, setReportedList] = useState<ReportAccountListResponseModel[]>([]);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<ReportAccountListResponseModel | undefined>(undefined);
  const [selectedRecord, setSelectedRecord] = useState<ReportAccountListResponseModel | undefined>(undefined);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [activeLoading, setActiveLoading] = useState<boolean>(false);

  const getReportedAccounts = async (query: ReportAccountListRequestModel) => {
    try {
      setIsLoading(true);
      const res = await repo.getList({
        ...query,
        is_descending: true,
        sort_by: 'created_at',
      });
      if (res) {
        setReportedList(res?.data === null ? [] : res?.data);
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

  const getDetail = async (params: ReportAccountDetailRequestModel) => {
    try {
      setDetailLoading(true);
      const res = await repo.getDetail(params);
      if (res?.data) {
        setDetail(res?.data);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setDetailLoading(false);
    }
  }

  const deleteReport = async (params: ReportAccountDetailRequestModel) => {
    try {
      setDeleteLoading(true);
      const res = await repo.deleteReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã từ chối thành công!"
        })
        await getReportedAccounts({
          page: 1,
          limit: 10,
          from_date: dayjs().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          to_date: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
        });
        setDetailModal(false);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setDeleteLoading(false);
    }
  }

  const acceptReport = async (params: ReportAccountDetailRequestModel) => {
    try {
      setAcceptLoading(true);
      const res = await repo.acceptReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã chấp nhận thành công!"
        })
        await getReportedAccounts({
          page: 1,
          limit: 10,
          from_date: dayjs().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          to_date: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
        });
        setDetailModal(false);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setAcceptLoading(false);
    }
  }

  const activateReport = async (params: ReportAccountDetailRequestModel) => {
    try {
      setActiveLoading(true);
      const res = await repo.activateReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã kích hoạt lại tài khoản!"
        })
        await getReportedAccounts({
          page: 1,
          limit: 10,
          from_date: dayjs().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          to_date: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
        });
        setDetailModal(false);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',  
        message: "Lỗi hệ thống, vui nhập thử lại!"
      })
    } finally {
      setActiveLoading(false);
    }
  }

  useEffect(() => {
    getReportedAccounts(query);
  }, [query])

  useEffect(() => {
    if (detailModal && selectedRecord) {
      getDetail({
        user_id: selectedRecord?.user_id,
        reported_user_id: selectedRecord?.reported_user_id
      });
    }
  }, [detailModal, selectedRecord])

  return {
    reportedList,
    isLoading,
    resultObject,
    setQuery,
    handleTableChange,
    total,
    page,
    limit,
    detailModal,
    setDetailModal,
    detail,
    detailLoading,
    setSelectedRecord,
    deleteLoading,
    acceptLoading,
    activeLoading,
    deleteReport,
    acceptReport,
    activateReport
  }
}

export default ReportAccountViewModel