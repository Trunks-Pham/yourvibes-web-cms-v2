"use client";
import CardFeature from "@/components/common/CardFeature"
import useColor from "@/global/hooks/useColor"
import { CurrencyFormat } from "@/utils/helper/CurrencyFormat"
import { Col, Row, App, Spin, Card, Statistic } from "antd"
import type { StatisticProps } from 'antd';
import ReactApexChart from "react-apexcharts"
import DashboardViewModel from "../viewModel/DashboardViewModel"
import { defaultDashboardRepo } from "@/api/features/dashboard/DashboardRepo"
import { useEffect, useMemo } from "react"
import { messageDisplay } from "@/utils/helper/MessageDisplay"
import dayjs from "dayjs"
import CountUp from 'react-countup'

const DashboardFeature = () => {
  const { brandPrimary, green } = useColor();
  const { message } = App.useApp();
  const {
    loading,
    resultObject,
    dashboardData,
    stats
  } = DashboardViewModel(defaultDashboardRepo);

  const options: ApexCharts.ApexOptions = useMemo(() => {
    return {
      title: {
        text: `Doanh thu ${dayjs().subtract(1, 'year').format('MM/YYYY')} - ${dayjs().format('MM/YYYY')}`
      },
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
        selection: {
          enabled: true,
        }
      },
      colors: [brandPrimary],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: dashboardData?.month_list || [],
      },
      yaxis: {
        title: {
          text: '(VNĐ)'
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return CurrencyFormat(val)
          }
        }
      },
    }
  }, [brandPrimary, dashboardData]);

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <CardFeature
      title="Tổng quan"
    >
      <Row gutter={[32, 48]}>
        <Col xs={24} lg={6}>
          <Card className="h-full w-full" loading={loading}>
            <Statistic
              title={<span className="font-bold text-black text-md">Doanh thu tháng trước {dayjs().subtract(1, 'month').format('[(]MM/YYYY[)]')}</span>}
              value={stats?.previous_months_revenue || 0}
              valueStyle={{ color: green, fontWeight: 'bold' }}
              formatter={formatter}
              suffix=" VNĐ"
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card className="h-full w-full" loading={loading}>
            <Statistic
              title={<span className="font-bold text-black text-md">Doanh thu hôm qua {dayjs().subtract(1, 'day').format('[(]DD/MM/YYYY[)]')}</span>}
              value={stats?.previous_days_revenue || 0}
              valueStyle={{ color: green, fontWeight: 'bold' }}
              formatter={formatter}
              suffix=" VNĐ"
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card className="h-full w-full" loading={loading}>
            <Statistic
              title={<span className="font-bold text-black text-md">Tổng tài khoản</span>}
              value={stats?.total_count_of_users || 0}
              valueStyle={{ color: "blue", fontWeight: 'bold' }}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card className="h-full w-full" loading={loading}>
            <Statistic
              title={<span className="font-bold text-black text-md">Tổng bài viết</span>}
              value={stats?.total_count_of_posts || 0}
              valueStyle={{ color: "blue", fontWeight: 'bold' }}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={24}>
          {loading ? (
            <div className="h-[600px] w-full flex items-center justify-center">
              <Spin
                spinning
                size="large"
                percent={"auto"}
              />
            </div>
          ) : (
            <ReactApexChart
              options={options}
              series={[{
                name: 'Doanh thu',
                data: dashboardData?.revenue_list || []
              }]}
              type="bar"
              height={600}
            />
          )}
        </Col>
      </Row>
    </CardFeature>
  )
}

export default DashboardFeature