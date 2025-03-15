import { ResultObject } from '@/api/baseApiResponseModel/baseApiResponseModel';
import { ReportCommentListRequestModel, ReportCommentListResponseModel, ReportCommentDetailRequestModel } from '@/api/features/report/model/ReportModel';
import { IReportRepo } from '@/api/features/report/ReportRepo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ReportCommentViewModel = (repo: IReportRepo) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<ReportCommentListRequestModel>({
    type: 2,
    page: 1,
    limit: 10,
    from_date: dayjs().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
    to_date: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
  });
  const [reportedList, setReportedList] = useState<ReportCommentListResponseModel[]>([]);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<ReportCommentListResponseModel | undefined>(undefined);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<ReportCommentListResponseModel | undefined>(undefined);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [activeLoading, setActiveLoading] = useState<boolean>(false);

  const getReportedComments = async (queryParams: ReportCommentListRequestModel) => {
    try {
      setIsLoading(true);
      const res = await repo.getCommentList({
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

  const getReportDetail = async (params: ReportCommentDetailRequestModel) => {
    try {
      setDetailLoading(true);
      const res = await repo.getCommentDetail(params);
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

  const deleteReport = async (params: ReportCommentDetailRequestModel) => {
    try {
      setDeleteLoading(true);
      const res = await repo.deleteCommentReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã từ chối thành công!",
        });
        await getReportedComments({ ...query, page: 1 });
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

  const acceptReport = async (params: ReportCommentDetailRequestModel) => {
    try {
      setAcceptLoading(true);
      const res = await repo.acceptCommentReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã chấp nhận thành công!",
        });
        await getReportedComments({ ...query, page: 1 });
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

  const activateReport = async (params: ReportCommentDetailRequestModel) => {
    try {
      setActiveLoading(true);
      const res = await repo.activateCommentReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã kích hoạt lại bình luận!",
        });
        await getReportedComments({ ...query, page: 1 });
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
    getReportedComments(query);
  }, [query]);

  useEffect(() => {
    if (detailModal && selectedRecord?.reported_comment_id) {
      getReportDetail({
        type: 2,
        user_id: selectedRecord.user_id,
        reported_comment_id: selectedRecord.reported_comment_id,
      });
    }
  }, [detailModal, selectedRecord]);

  return {
    reportedList,
    isLoading,
    resultObject,
    query,
    setQuery,
    handleTableChange,
    total,
    page,
    limit,
    detailLoading,
    detail,
    detailModal,
    setDetailModal,
    setSelectedRecord,
    deleteLoading,
    acceptLoading,
    activeLoading,
    deleteReport,
    acceptReport,
    activateReport,
  };
};

export default ReportCommentViewModel;