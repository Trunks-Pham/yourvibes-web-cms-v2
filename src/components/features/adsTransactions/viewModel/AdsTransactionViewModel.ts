import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { AdsTransactionRepo } from "@/api/features/adsTransaction/AdsTransactionRepo"
import { AdsTransactionListRequestModel, AdsTransactionListResponseModel } from "@/api/features/adsTransaction/models/AdsTransactionModel";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const AdsTransactionViewModel = (repo: AdsTransactionRepo) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<AdsTransactionListRequestModel>({
    page: 1,
    limit: 10,
    from_date: dayjs().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
    to_date: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]'),
  });
  const [transList, setTransList] = useState<AdsTransactionListResponseModel[]>([]);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<AdsTransactionListResponseModel | undefined>(undefined);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<AdsTransactionListResponseModel | undefined>(undefined);

  const getTransList = async (query: AdsTransactionListRequestModel) => {
    try {
      setIsLoading(true);
      const res = await repo.getList({
        ...query,
        is_descending: true,
        sort_by: 'created_at',
      });
      if (res) {
        setTransList(res?.data === null ? [] : res?.data);
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

  const getTransDetail = async (advertise_id: string) => {
    try {
      setDetailLoading(true);
      const res = await repo.getDetail(advertise_id);
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

  useEffect(() => {
    if (detailModal && selectedRecord) {
      getTransDetail(selectedRecord?.id || '');
    }
  }, [detailModal, selectedRecord])

  useEffect(() => {
    getTransList(query);
  }, [query])

  return {
    transList,
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
  }
}

export default AdsTransactionViewModel