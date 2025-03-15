"use client";
import { defaultReportRepo } from '@/api/features/report/ReportRepo';
import CardFeature from '@/components/common/CardFeature';
import useColor from '@/global/hooks/useColor';
import { Form, Row, Col, Select, DatePicker, Button, Table, Input, App, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { SiGoogledocs } from 'react-icons/si';
import ReportAccountViewModel from '../viewModel/ReportAccountViewModel';
import { messageDisplay } from '@/utils/helper/MessageDisplay';
import ReportAccountDetailModal from './ReportAccountDetailModal';

const ReportAccountFeature = () => {
  const { green } = useColor();
  const { message } = App.useApp();
  const {
    handleTableChange,
    isLoading,
    limit,
    page,
    reportedList,
    resultObject,
    setQuery,
    total,
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
  } = ReportAccountViewModel(defaultReportRepo);

  const statusConst = [
    { label: "Tất cả", value: "", color: "" },
    { label: "Đã xử lý", value: true, color: green },
    { label: "Chưa xử lý", value: false, color: "red" },
  ];

  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <CardFeature title="Báo cáo tài khoản">
      <>
        <Form
          layout="vertical"
          className="w-full"
          onFinish={(values) => {
            setQuery({
              type: 0,
              status: values?.status !== "" ? values?.status : undefined,
              from_date: dayjs(values?.date[0]).format('YYYY-MM-DDTHH:mm:ss[Z]'),
              to_date: dayjs(values.date[1]).format('YYYY-MM-DDTHH:mm:ss[Z]'),
              admin_email: values?.admin_email || undefined,
              reported_user_email: values?.reported_user_email || undefined,
              page: 1,
              limit: 10,
            });
          }}
        >
          <Row gutter={16}>
            <Col xs={24} xl={6}>
              <Form.Item label={<span className="font-bold">Trạng thái</span>} name="status" initialValue="">
                <Select
                  placeholder="Trạng thái"
                  options={statusConst.map((item) => ({ label: item.label, value: item.value }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={6}>
              <Form.Item label={<span className="font-bold">Tài khoản bị báo cáo</span>} name="reported_user_email">
                <Input placeholder="Tài khoản bị báo cáo" type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} xl={6}>
              <Form.Item label={<span className="font-bold">Email admin</span>} name="admin_email">
                <Input placeholder="Email admin" type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} xl={6}>
              <ConfigProvider theme={{ token: { colorPrimary: "#898989" } }}>
                <Form.Item
                  label={<span className="font-bold">Thời gian</span>}
                  name="date"
                  initialValue={[dayjs().startOf('month'), dayjs().endOf('month')]}
                >
                  <DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" allowClear={false} />
                </Form.Item>
              </ConfigProvider>
            </Col>
            <Col xs={24}>
              <Form.Item>
                <Button icon={<IoIosSearch />} type="primary" className="w-full" htmlType="submit" loading={isLoading}>
                  Tra cứu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          columns={[
            {
              title: "STT",
              align: "center",
              render: (_, __, index) => page * limit - limit + index + 1,
              width: "6%",
            },
            {
              title: "Tài khoản bị báo cáo",
              dataIndex: ["reported_user", "email"],
              align: "center",
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              align: "center",
              render: (value: boolean) => {
                const status = statusConst.find((item) => item.value === value);
                return <span style={{ color: status?.color }} className="font-bold">{status?.label}</span>;
              },
            },
            {
              title: "Tài khoản báo cáo",
              dataIndex: ["user", "email"],
              align: "center",
            },
            {
              title: "Admin",
              dataIndex: ["admin", "email"],
              align: "center",
            },
            {
              title: "Thời gian",
              dataIndex: "created_at",
              align: "center",
              render: (time: string) => dayjs(time).format("DD/MM/YYYY HH:mm:ss"),
            },
            {
              title: "Chi tiết",
              align: "center",
              render: (_, record) => (
                <Button
                  icon={<SiGoogledocs />}
                  shape="circle"
                  type="primary"
                  ghost
                  onClick={() => {
                    setDetailModal(true);
                    setSelectedRecord(record);
                  }}
                />
              ),
            },
          ]}
          dataSource={reportedList}
          onChange={handleTableChange}
          rowKey={(record) => `${record.reported_user_id || record.created_at}`} // Sửa để đảm bảo key duy nhất
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            showTotal: (total) => <div className="font-bold absolute left-0">Tổng: {total}</div>,
          }}
          scroll={{ x: "max-content" }}
          loading={isLoading}
        />
        {detailModal && (
          <ReportAccountDetailModal
            open={detailModal}
            onCancel={() => setDetailModal(false)}
            detail={detail}
            detailLoading={detailLoading}
            acceptLoading={acceptLoading}
            deleteLoading={deleteLoading}
            activeLoading={activeLoading}
            deleteReport={deleteReport}
            acceptReport={acceptReport}
            activateReport={activateReport}
          />
        )}
      </>
    </CardFeature>
  );
};

export default ReportAccountFeature;