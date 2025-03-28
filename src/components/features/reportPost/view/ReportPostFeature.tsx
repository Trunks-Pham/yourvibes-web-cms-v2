"use client";
import CardFeature from '@/components/common/CardFeature';
import useColor from '@/global/hooks/useColor';
import { Form, Row, Col, Select, DatePicker, Button, Table, Input, App, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { SiGoogledocs } from 'react-icons/si';
import ReportPostViewModel from '../viewModel/ReportPostViewModel';
import { defaultReportRepo } from '@/api/features/report/ReportRepo';
import { messageDisplay } from '@/utils/helper/MessageDisplay';
import ReportPostDetailModal from './ReportPostDetailModal';

const ReportPostFeature = () => {
  const { green } = useColor();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const {
    handleTableChange,
    isLoading,
    limit,
    page,
    reportedList,
    resultObject,
    setQuery,
    total,
    detail,
    detailLoading,
    detailModal,
    setDetailModal,
    setSelectedRecord,
    deleteLoading,
    acceptLoading,
    activeLoading,
    deleteReport,
    acceptReport,
    activateReport,
  } = ReportPostViewModel(defaultReportRepo);

  const statusConst = [
    { label: "Tất cả", value: "all", color: "" },
    { label: "Đã xử lý", value: true, color: green },
    { label: "Chưa xử lý", value: false, color: "red" },
  ];

  useEffect(() => {
    form.setFieldsValue({
      status: "all", // Giá trị mặc định là "all"
      date: [dayjs().startOf('month'), dayjs().endOf('month')],
    });
  }, [form]);

  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <CardFeature title="Báo cáo bài viết">
      <>
        <Form
          form={form}
          layout="vertical"
          className="w-full"
          onFinish={(values) => {
            const query: any = {
              report_type: 1,
              from_date: dayjs(values?.date[0]).format('YYYY-MM-DDTHH:mm:ss[Z]'),
              to_date: dayjs(values.date[1]).format('YYYY-MM-DDTHH:mm:ss[Z]'),
              user_email: values?.user_email || undefined,
              admin_email: values?.admin_email || undefined,
              page: 1,
              limit: 10,
            };

            // Chỉ thêm status nếu không phải "all"
            if (values?.status !== "all") {
              query.status = values.status;
            }

            console.log("Query gửi đi:", query);
            setQuery(() => query);
          }}
        >
          <Row gutter={16}>
            <Col xs={24} xl={6}>
              <Form.Item label={<span className="font-bold">Trạng thái</span>} name="status">
                <Select
                  placeholder="Trạng thái"
                  options={statusConst.map((item) => ({ label: item.label, value: item.value }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={6}>
              <Form.Item label={<span className="font-bold">Email báo cáo</span>} name="user_email">
                <Input placeholder="Email báo cáo" type="email" />
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
              title: "Email báo cáo",
              dataIndex: "user_email",
              align: "center",
              render: (email: string) => email || "N/A",
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
              title: "Admin",
              dataIndex: "admin_email",
              align: "center",
              render: (email: string) => email || "N/A",
            },
            {
              title: "ID bài viết bị báo cáo",
              dataIndex: "reported_post_id",
              align: "center",
              render: (id: string) => id || "N/A",
            },
            {
              title: "Thời gian",
              dataIndex: "created_at",
              align: "center",
              render: (time: string) => (time ? dayjs(time).format("DD/MM/YYYY HH:mm:ss") : "N/A"),
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
                    setSelectedRecord(record);
                    setDetailModal(true);
                  }}
                />
              ),
            },
          ]}
          dataSource={reportedList}
          rowKey={(record) => record.report_id ?? `${record.reported_post_id || record.created_at}`}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            showTotal: (total) => <div className="font-bold absolute left-0">Tổng: {total}</div>,
            current: page,
            pageSize: limit,
            total: total,
          }}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
          loading={isLoading}
        />
        {detailModal && (
          <ReportPostDetailModal
            open={detailModal}
            onCancel={() => setDetailModal(false)}
            detail={detail}
            detailLoading={detailLoading}
            deleteLoading={deleteLoading}
            acceptLoading={acceptLoading}
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

export default ReportPostFeature;