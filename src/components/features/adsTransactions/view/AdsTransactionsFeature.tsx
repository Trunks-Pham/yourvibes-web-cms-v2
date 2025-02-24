"use client"
import CardFeature from '@/components/common/CardFeature'
import useColor from '@/global/hooks/useColor'
import { CurrencyFormat } from '@/utils/helper/CurrencyFormat'
import { App, Button, Col, ConfigProvider, DatePicker, Form, Input, InputNumber, Row, Select, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { SiGoogledocs } from 'react-icons/si'
import AdsTransactionViewModel from '../viewModel/AdsTransactionViewModel';
import { defaultAdsTransactionRepo } from '@/api/features/adsTransaction/AdsTransactionRepo'
import { messageDisplay } from '@/utils/helper/MessageDisplay'
import { receiveMessageOnPort } from 'worker_threads'
import AdsTransactionDetailModel from './AdsTransactionDetailModal'
import AdsTransactionDetailModal from './AdsTransactionDetailModal'

const AdsTransactionsFeature = () => {
  const { green } = useColor();
  const { message } = App.useApp();
  const {
    handleTableChange,
    isLoading,
    limit,
    page,
    transList,
    resultObject,
    setQuery,
    total,
    detail,
    detailLoading,
    detailModal,
    setDetailModal,
    setSelectedRecord,
  } = AdsTransactionViewModel(defaultAdsTransactionRepo)

  const statusConst = [
    { label: "Tất cả", value: "", color: "" },
    { label: "Hoàn thành", value: true, color: green },
    { label: "Thất bại", value: false, color: "red" },
  ]
  
  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <CardFeature
      title='Lịch sử giao dịch quảng cáo'
    >
      <Form
        layout='vertical'
        className='w-full'
        onFinish={(values) => {
          setQuery({
            status: values?.status !== "" ? values?.status : undefined,
            post_id: values?.post_id !== "" ? values?.post_id : undefined,
            from_date: dayjs(values?.date[0]).format('YYYY-MM-DDTHH:mm:ss[Z]'),
            to_date: dayjs(values.date[1]).format('YYYY-MM-DDTHH:mm:ss[Z]'),
            from_price: values?.from_price !== "" ? values?.from_price : undefined,
            to_price: values?.to_price !== "" ? values?.to_price : undefined,
            user_email: values?.user_email !== "" ? values?.user_email : undefined,
            page: 1,
            limit: 10
          });
        }}
      >
        {/* filter */}
        <Row gutter={16}>
          {/* status */}
          <Col xs={24} lg={4}>
            <Form.Item
              label={<span className='font-bold'>Trạng thái</span>}
              name='status'
              initialValue={''}
            >
              <Select
                placeholder='Trạng thái'
                options={statusConst.map((item) => ({ label: item.label, value: item.value }))}
              />
            </Form.Item>
          </Col>
          {/* post ID */}
          <Col xs={24} lg={4}>
            <Form.Item
              label={<span className='font-bold'>ID bài viết</span>}
              name='post_id'
            >
              <Input
                placeholder='ID bài viết'
              />
            </Form.Item>
          </Col>
          {/* email */}
          <Col xs={24} lg={4}>
            <Form.Item
              label={<span className='font-bold'>Email</span>}
              name='user_email'
            >
              <Input
                placeholder='Email'
                type='email'
              />
            </Form.Item>
          </Col>
          {/* fromPrice */}
          <Col xs={24} lg={4}>
            <Form.Item
              label={<span className='font-bold'>Giá thấp nhấp</span>}
              name='from_price'
            >
              <InputNumber
                placeholder='Giá thấp nhấp'
                step={1000}
                min={1000}
                addonAfter="₫"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          {/* toPrice */}
          <Col xs={24} lg={4}>
            <Form.Item
              label={<span className='font-bold'>Giá cao nhất</span>}
              name='to_price'
            >
              <InputNumber
                placeholder='Giá cao nhất'
                step={1000}
                min={1000}
                addonAfter="₫"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          {/* date */}
          <Col xs={24} lg={4}>
            <ConfigProvider
              theme={{
                token: { colorPrimary: "#898989" },
              }}
            >
              <Form.Item
                label={<span className='font-bold'>Thời gian</span>}
                name={'date'}
                initialValue={[
                  dayjs().startOf('month'),
                  dayjs().endOf('month')
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  format='DD/MM/YYYY'
                  allowClear={false}
                />
              </Form.Item>
            </ConfigProvider>
          </Col>
          <Col xs={24}>
            <Form.Item
            >
              <Button
                icon={<IoIosSearch />}
                type='primary'
                className='w-full'
                htmlType='submit'
              >
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
            width: "6%"
          },
          {
            title: "ID giao dịch",
            align: "center",
            render: (_, record) => record?.bill?.id,
          },
          {
            title: "Email",
            align: "center",
            render: (_, record) => record?.user_email,
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            align: "center",
            render: (_, record) => {
              const status = statusConst.find((item) => item.value === record?.bill?.status);
              return <span style={{ color: status?.color }} className='font-bold'>{status?.label}</span>;
            }
          },
          {
            title: "Thời gian",
            dataIndex: "time",
            align: "center",
            render: (_, record) => dayjs(record?.bill?.created_at).format("DD/MM/YYYY HH:mm:ss"),
          },
          {
            title: "Tổng tiền",
            dataIndex: "price",
            align: "center",
            render: (_, record) => <span style={{ color: green }} className='font-bold'>{CurrencyFormat(record?.bill?.price || 0)}</span>,
          },
          {
            title: "Chi tiết",
            align: "center",
            render: (_, record) => <Button
              icon={<SiGoogledocs />}
              shape='circle'
              type='primary'
              ghost
              onClick={() => {
                setSelectedRecord(record);
                setDetailModal(true)
              }}
            />,
          }
        ]}
        dataSource={transList}
        rowKey='id'
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          showTotal: (total) => <div className='font-bold absolute left-0'>Tổng: {total}</div>,
          current: page,
          pageSize: limit,
          total: total,
        }}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
        loading={isLoading}
      />
      {detailModal &&
        <AdsTransactionDetailModal
          open={detailModal}
          onCancel={() => setDetailModal(false)}
          detail={detail}
          detailLoading={detailLoading}
        />
      }
    </CardFeature>
  )
}

export default AdsTransactionsFeature