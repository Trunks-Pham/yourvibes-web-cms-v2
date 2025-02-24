import useColor from '@/global/hooks/useColor';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import dayjs from 'dayjs';
import React from 'react'
import { IoMdPersonAdd } from 'react-icons/io';

const CreateAdminModal = ({
  open,
  onCancel,
  createLoading,
  handleCreateAdmin
}: {
  open: boolean,
  onCancel: () => void,
  createLoading: boolean,
  handleCreateAdmin: (values: any) => void
}) => {
  const { green } = useColor();

  const roleConst = [
    { label: "Admin", value: false, color: "black" },
    { label: "Root admin", value: true, color: "blue" },
  ]

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<span className='font-bold text-xl'>Thêm admin</span>}
      width={1000}
      centered
      footer={null}
      maskClosable={false}
    >
      <Form
        className='w-full mt-4'
        layout='vertical'
        requiredMark={false}
        onFinish={(values) => {
          handleCreateAdmin(values);
        }}
      >
        <Row gutter={16}>
          {/* family_name */}
          <Col xs={24} xl={6}>
            <Form.Item
              label={<span className='font-bold'>Họ</span>}
              name='family_name'
              rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
            >
              <Input
                placeholder='Họ'
              />
            </Form.Item>
          </Col>
          {/* name */}
          <Col xs={24} xl={6}>
            <Form.Item
              label={<span className='font-bold'>Tên</span>}
              name='name'
              rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            >
              <Input
                placeholder='Tên'
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
              />
            </Form.Item>
          </Col>
          {/* password */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>Mật khẩu</span>}
              name='password'
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { min: 8, message: 'Mật khẩu phải trên 8 ký tự' },
              ]}
            >
              <Input.Password
                placeholder='Mật khẩu'
                minLength={8}
              />
            </Form.Item>
          </Col>
          {/* confirm password */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>Xác nhận mật khẩu</span>}
              name='confirm_password'
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập xác nhận mật khẩu'));
                    }
                    if (value && value?.length < 8) {
                      return Promise.reject(new Error('Mật khẩu xác nhận phải trên 8 ký tự'));
                    }
                    if (value && getFieldValue('password') !== value) {
                      return Promise.reject(new Error('Mật khẩu xác nhận không hợp lệ'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder='Xác nhận mật khẩu'
                minLength={8}
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
                allowClear
                className='w-full'
              />
            </Form.Item>
          </Col>
          {/* role */}
          <Col xs={24} xl={12}>
            <Form.Item
              label={<span className='font-bold'>Role</span>}
              name='role'
              initialValue={false}
            >
              <Select
                placeholder='Role'
                options={roleConst.map((item) => ({ label: item.label, value: item.value }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
            >
              <Button
                icon={<IoMdPersonAdd />}
                type='primary'
                className='w-full'
                htmlType='submit'
                loading={createLoading}
              >
                Thêm Admin
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default CreateAdminModal