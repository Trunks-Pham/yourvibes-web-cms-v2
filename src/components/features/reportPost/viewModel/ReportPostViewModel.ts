import { ResultObject } from '@/api/baseApiResponseModel/baseApiResponseModel';
import { ReportPostDetailRequestModel, ReportPostListRequestModel, ReportPostListResponseModel } from '@/api/features/reportPost/model/ReportPostListModel';
import { IReportPostRepo } from '@/api/features/reportPost/ReportPostRepo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ReportPostViewModel = (repo: IReportPostRepo) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<ReportPostListRequestModel>({
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

  const getReportedPosts = async (query: ReportPostListRequestModel) => {
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

  const getReportDetail = async (params: ReportPostDetailRequestModel) => {
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

  const deleteReport = async (params: ReportPostDetailRequestModel) => {
    try {
      setDeleteLoading(true);
      const res = await repo.deleteReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã từ chối thành công!"
        })
        await getReportedPosts({
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

  const acceptReport = async (params: ReportPostDetailRequestModel) => {
    try {
      setAcceptLoading(true);
      const res = await repo.acceptReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã chấp nhận thành công!"
        })
        await getReportedPosts({
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

  const activateReport = async (params: ReportPostDetailRequestModel) => {
    try {
      setActiveLoading(true);
      const res = await repo.activateReport(params);
      if (res?.message === 'Success') {
        setResultObject({
          type: 'success',
          message: "Đã kích hoạt lại bài viết!"
        })
        await getReportedPosts({
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
    if (detailModal && selectedRecord) {
      getReportDetail({
        user_id: selectedRecord?.user_id,
        reported_post_id: selectedRecord?.reported_post_id
      });
    }
  }, [detailModal, selectedRecord])

  useEffect(() => {
    getReportedPosts(query);
  }, [query])

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
    activateReport
  }
}

export default ReportPostViewModel