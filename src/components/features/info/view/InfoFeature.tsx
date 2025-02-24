"use client"
import CardFeature from '@/components/common/CardFeature'
import { useAuth } from '@/context/auth/useAuth'
import { messageDisplay } from '@/utils/helper/MessageDisplay'
import { Col, Form, Row, Upload, Image, Button, Select, Input, DatePicker, App } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import InfoViewModal from '../viewModel/InfoViewModal'
import { defaultInfoRepo } from '@/api/features/info/InfoRepo'
import { IoCreateSharp } from 'react-icons/io5'

const InfoFeature = () => {
  const { user } = useAuth();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const {
    handleUpdateInfo,
    isEdit,
    loading,
    resultObject,
    setIsEdit,
  } = InfoViewModal(defaultInfoRepo);

  useEffect(() => {
    form.setFieldsValue({
      family_name: user?.family_name,
      name: user?.name,
      identity_id: user?.identity_id,
      email: user?.email,
      phone_number: user?.phone_number,
      birthday: dayjs(user?.birthday),
    })
  }, [user]);

  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <CardFeature
      title='Thông tin tài khoản'
    >
      <Form
        className='w-full mt-4'
        layout={isEdit ? 'vertical' : 'horizontal'}
        form={form}
        requiredMark={false}
        labelAlign={isEdit ? undefined : 'left'}
        labelCol={isEdit ? undefined : { span: 4 }}
        onFinish={(values) => {
          handleUpdateInfo(values);
        }}
      >
        <Row gutter={16}>
          {/* family_name */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>Họ</span>}
              name='family_name'
              rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
            >
              <Input
                placeholder='Họ'
                variant={isEdit ? 'outlined' : 'borderless'}
                readOnly={!isEdit}
              />
            </Form.Item>
          </Col>
          {/* name */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>Tên</span>}
              name='name'
              rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            >
              <Input
                placeholder='Tên'
                variant={isEdit ? 'outlined' : 'borderless'}
                readOnly={!isEdit}
              />
            </Form.Item>
          </Col>
          {/* identity_id */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>CCCD</span>}
              name='identity_id'
              rules={[
                { required: true, message: 'Vui lòng nhập CCCD' },
                { pattern: /^\d{12}$/, message: 'CCCD phải đủ 12 số' },
              ]}
            >
              <Input
                placeholder='CCCD'
                variant={isEdit ? 'outlined' : 'borderless'}
                readOnly={!isEdit}
              />
            </Form.Item>
          </Col>
          {/* email */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>Email</span>}
              name='email'
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input
                placeholder='Email'
                type='email'
                variant={isEdit ? 'outlined' : 'borderless'}
                readOnly
              />
            </Form.Item>
          </Col>
          {/* phone */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>SĐT</span>}
              name='phone_number'
              rules={[
                { required: true, message: 'Vui lòng nhập SĐT' },
                { pattern: /^\d{10}$/, message: 'SĐT phải đủ 10 số' },
              ]}
            >
              <Input
                placeholder='SĐT'
                variant={isEdit ? 'outlined' : 'borderless'}
                readOnly={!isEdit}
              />
            </Form.Item>
          </Col>
          {/* birthday */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>Ngày sinh</span>}
              name='birthday'
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
            >
              <DatePicker
                disabledDate={(current) => current && current > dayjs()}
                format='DD/MM/YYYY'
                placeholder='Ngày sinh'
                allowClear={false}
                className='w-full'
                variant={isEdit ? 'outlined' : 'borderless'}
                readOnly={!isEdit}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className='flex gap-2 justify-between flex-row'>
            {isEdit ? (
              <>
                <Form.Item>
                  <Button
                    icon={<IoCreateSharp />}
                    type='primary'
                    className='w-full'
                    htmlType='submit'
                    loading={loading}
                  >
                    Xác nhận
                  </Button>
                </Form.Item>
                <Button
                  type='primary'
                  ghost
                  className='w-full'
                  onClick={() => setIsEdit(false)}
                >
                  Hủy
                </Button>
              </>
            ) : (
              <>
                <Button
                  icon={<IoCreateSharp />}
                  type='primary'
                  className='w-full'
                  onClick={() => setIsEdit(true)}
                >
                  Cập nhật thông tin
                </Button>
              </>
            )}

          </Col>
        </Row>
      </Form>
    </CardFeature>
  )
}

export default InfoFeature