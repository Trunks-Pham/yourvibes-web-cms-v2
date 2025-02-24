"use client"
import CardFeature from '@/components/common/CardFeature'
import { Button, Col, Form, Input, Row, App } from 'antd'
import React, { useEffect } from 'react'
import ChangePasswordViewModel from '../viewModel/ChangePasswordViewModel'
import { defaultChangePasswordRepo } from '@/api/features/changePassword/ChangePasswordRepo'
import { messageDisplay } from '@/utils/helper/MessageDisplay'

const ChangePasswordFeature = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const {
    loading,
    resultObject,
    handleChangePassword
  } = ChangePasswordViewModel(defaultChangePasswordRepo);

  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <CardFeature title="Đổi mật khẩu">
      <Form
        className='w-full'
        layout='vertical'
        requiredMark={false}
        form={form}
        onFinish={(values) => {
          handleChangePassword(values)
            .then(() => {
              if (resultObject?.type === 'success') {
                form.resetFields();
              }
            });
        }}
      >
        <Row gutter={32} justify={"center"} align={"middle"}>
          <Col xs={24} lg={18}>
            <Form.Item
              label={<span className='font-bold'>Mật khẩu cũ</span>}
              name={'old_password'}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
            >
              <Input
                placeholder="Mật khẩu cũ"
                type="password"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={18}>
            <Form.Item
              label={<span className='font-bold'>Mật khẩu mới</span>}
              name={'new_password'}
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { min: 8, message: 'Mật khẩu phải trên 8 ký tự' },
              ]}
            >
              <Input
                placeholder="Mật khẩu mới"
                type="password"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={18}>
            <Form.Item
              label={<span className='font-bold'>Xác nhận mật khẩu mới</span>}
              name={'confirm_new_password'}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập xác nhận mật khẩu'));
                    }
                    if (value && value?.length < 8) {
                      return Promise.reject(new Error('Mật khẩu xác nhận phải trên 8 ký tự'));
                    }
                    if (value && getFieldValue('new_password') !== value) {
                      return Promise.reject(new Error('Mật khẩu xác nhận không hợp lệ'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                placeholder="Xác nhận mật khẩu mới"
                type="password"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={18}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                Xác nhận
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CardFeature>
  )
}

export default ChangePasswordFeature