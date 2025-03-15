import { ResultObject } from '@/api/baseApiResponseModel/baseApiResponseModel';
import { ReportPostDetailRequestModel, ReportPostListRequestModel, ReportPostListResponseModel } from '@/api/features/report/model/ReportModel';
import { IReportRepo } from '@/api/features/report/ReportRepo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ReportPostViewModel = (repo: IReportRepo) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<ReportPostListRequestModel>({
    type: 1,
    page: 1,
    limit: 10,
    from_date: dayjs().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
    to_date: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
  });
  const [reportedList, setReportedList] = useState<ReportPostListResponseModel[]>([]);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<ReportPostListResponseModel | undefined>(undefined);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<ReportPostListResponseModel | undefined>(undefined);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [activeLoading, setActiveLoading] = useState<boolean>(false);

  const getReportedPosts = async (queryParams: ReportPostListRequestModel) => {
    try {
      setIsLoading(true);
      const res = await repo.getPostList({
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

  const getReportDetail = async (params: ReportPostDetailRequestModel) => {
    try {
      setDetailLoading(true);
      const res = await repo.getPostDetail(params);
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

  const deleteReport = async (params: ReportPostDetailRequestModel) => {
    try {
      setDeleteLoading(true);
      const res = await repo.deletePostReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã từ chối thành công!",
        });
        await getReportedPosts({ ...query, page: 1 });
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

  const acceptReport = async (params: ReportPostDetailRequestModel) => {
    try {
      setAcceptLoading(true);
      const res = await repo.acceptPostReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã chấp nhận thành công!",
        });
        await getReportedPosts({ ...query, page: 1 });
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

  const activateReport = async (params: ReportPostDetailRequestModel) => {
    try {
      setActiveLoading(true);
      const res = await repo.activatePostReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã kích hoạt lại bài viết!",
        });
        await getReportedPosts({ ...query, page: 1 });
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
    getReportedPosts(query);
  }, [query]);

  useEffect(() => {
    if (detailModal && selectedRecord?.reported_post_id) {
      getReportDetail({
        type: 1,
        user_id: selectedRecord.user_id,
        reported_post_id: selectedRecord.reported_post_id,
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

export default ReportPostViewModel;