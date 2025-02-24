import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { IDashboardRepo } from "@/api/features/dashboard/DashboardRepo"
import { ChartDataModel, StatsModel } from "@/api/features/dashboard/model/DashboardModel";
import { useEffect, useState } from "react"

const DashboardViewModel = (repo: IDashboardRepo) => {
  const [loading, setLoading] = useState(true);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);
  const [dashboardData, setDashboardData] = useState<ChartDataModel | undefined>(undefined);
  const [stats, setStats] = useState<StatsModel | undefined>(undefined);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const res = await repo.getChartData();
      if (res?.data) {
        setDashboardData(res?.data);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setLoading(false);
    }
  }

  const getStats = async () => {
    try {
      setLoading(true);
      const res = await repo.getStats();
      if (res?.data) {
        setStats(res?.data);
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: "Lỗi hệ thống, vui lòng thử lại!"
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDashboardData();
    getStats();
  }, [])

  return {
    loading,
    resultObject,
    dashboardData,
    stats
  }
}

export default DashboardViewModel