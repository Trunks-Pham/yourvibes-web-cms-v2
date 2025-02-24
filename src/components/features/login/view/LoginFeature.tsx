"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import yourvibesLogo from '@/global/images/yourvibes_black.png'
import { App, Button, Col, ConfigProvider, Form, Input, Row } from 'antd'
import useColor from '@/global/hooks/useColor'
import LoginViewModel from '../viewModel/LoginViewModel'
import { defaultAuthenRepo } from '@/api/features/authenticate/AuthenRepo'
import { messageDisplay } from '@/utils/helper/MessageDisplay'

const LoginFeature = () => {
  const { brandPrimary } = useColor();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { loading, login, resultObject } = LoginViewModel(defaultAuthenRepo);

  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: brandPrimary } }}
    >
      <div className='h-screen flex items-center justify-center'>
        <div className='md:w-[600px] w-5/6 h-[60vh] bg-white text-black rounded-lg px-2'>
          <div className='w-full h-fit py-8'>
            <Image
              src={yourvibesLogo}
              alt='yourvibesLogo'
              style={{ objectFit: 'contain', height: '80px', width: '100%' }}
            />
          </div>
          <div className='text-center text-2xl font-bold'>
            ĐĂNG NHẬP
          </div>
          <Form
            layout='vertical'
            form={form}
            requiredMark={false}
            onFinish={() => {
              form.validateFields()
                .then(() => {
                  login(form.getFieldsValue(true));
                });
            }}
          >
            <Row gutter={[0, 4]} className='w-full px-4'>
              <Col span={24}>
                <Form.Item
                  name={"email"}
                  label={<span className='font-bold text-md'>Nhập email</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập email' },
                    { type: 'email', message: 'Email không hợp lệ' },
                  ]}
                >
                  <Input
                    placeholder='Email'
                    type='email'
                    size='large'
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"password"}
                  label={<span className='font-bold text-md'>Nhập mật khẩu</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                  ]}
                >
                  <Input.Password
                    placeholder='Password'
                    type='password'
                    size='large'
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button
                    className='w-full'
                    type='primary'
                    htmlType='submit'
                    size='large'
                    loading={loading}
                  >
                    <span className='font-bold'>ĐĂNG NHẬP</span>
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default LoginFeature