import { ResultObject } from '@/api/baseApiResponseModel/baseApiResponseModel';
import { ReportAccountDetailRequestModel, ReportAccountListRequestModel, ReportAccountListResponseModel } from '@/api/features/report/model/ReportModel';
import { IReportRepo } from '@/api/features/report/ReportRepo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ReportAccountViewModel = (repo: IReportRepo) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<ReportAccountListRequestModel>({
    report_type: 0,
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

  const getReportedAccounts = async (queryParams: ReportAccountListRequestModel) => {
    try {
      setIsLoading(true);
      const res = await repo.getAccountList({
        ...queryParams,
        is_descending: true,
        sort_by: 'created_at',
      });
      if (res?.data) {
        setReportedList(res.data);
        setTotal(res.paging?.total ?? 0);
        setLimit(res.paging?.limit ?? 10);
        setPage(res.paging?.page ?? 1);
      } else {
        setReportedList([]);
        setTotal(0);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTableChange = (pagination?: any) => {
    const newPage = pagination?.current || 1;
    const newLimit = pagination?.pageSize || 10;
    setPage(newPage);
    setLimit(newLimit);
    setQuery((prev) => ({
      ...prev,
      page: newPage,
      limit: newLimit,
    }));
  };

  const getDetail = async (params: ReportAccountDetailRequestModel) => {
    try {
      setDetailLoading(true);
      const res = await repo.getAccountDetail({ report_type: 0, report_id: params.report_id });
      setDetail(res?.data ?? undefined);
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!",
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const deleteReport = async (params: ReportAccountDetailRequestModel) => {
    try {
      setDeleteLoading(true);
      const res = await repo.deleteAccountReport({ report_type: 0, report_id: params.report_id });
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã từ chối thành công!",
        });
        await getReportedAccounts({ ...query, page: 1 });
        setDetailModal(false);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const acceptReport = async (params: ReportAccountDetailRequestModel) => {
    try {
      setAcceptLoading(true);
      const res = await repo.acceptAccountReport({ report_type: 0, report_id: params.report_id });
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã chấp nhận thành công!",
        });
        await getReportedAccounts({ ...query, page: 1 });
        setDetailModal(false);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!",
      });
    } finally {
      setAcceptLoading(false);
    }
  };

  const activateReport = async (params: ReportAccountDetailRequestModel) => {
    try {
      setActiveLoading(true);
      const res = await repo.activateAccountReport({ report_type: 0, report_id: params.report_id });
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã kích hoạt lại tài khoản!",
        });
        await getReportedAccounts({ ...query, page: 1 });
        setDetailModal(false);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!",
      });
    } finally {
      setActiveLoading(false);
    }
  };

  useEffect(() => {
    getReportedAccounts(query);
  }, [query]);

  useEffect(() => {
    if (detailModal && selectedRecord?.report_id) {
      getDetail({
        report_type: 0,
        report_id: selectedRecord.report_id,
      });
    }
  }, [detailModal, selectedRecord]);

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
    activateReport,
  };
};

export default ReportAccountViewModel;