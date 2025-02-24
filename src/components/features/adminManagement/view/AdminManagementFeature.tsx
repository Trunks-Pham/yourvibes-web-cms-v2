"use client"
import { defaultAdminManagementRepo } from '@/api/features/adminManagement/AdminManagementRepo';
import CardFeature from '@/components/common/CardFeature';
import useColor from '@/global/hooks/useColor';
import { Form, Row, Col, Select, Button, Table, Input, App, Tooltip, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { IoIosSearch, IoMdPersonAdd } from 'react-icons/io';
import { IoCreateSharp } from 'react-icons/io5';
import AdminManagementViewModel from '../viewModel/AdminManagementViewModel';
import { messageDisplay } from '@/utils/helper/MessageDisplay';
import CreateAdminModal from './CreateAdminModal';
import { FaUserSlash, FaUserCheck } from 'react-icons/fa';
import { MdOutlineLockReset } from "react-icons/md";

const AdminManagementFeature = () => {
  const { green } = useColor();
  const [form] = Form.useForm();
  const { message, modal } = App.useApp();
  const {
    admins,
    resultObject,
    isLoading,
    setQuery,
    handleTableChange,
    limit,
    page,
    total,
    showCreateModal,
    setShowCreateModal,
    createLoading,
    handleCreateAdmin,
    handleUpdateAdmin,
    updateLoading,
    handleResetPassword,
    resetPasswordLoading
  } = AdminManagementViewModel(defaultAdminManagementRepo)

  const statusConst = [
    { label: "Tất cả", value: "", color: "" },
    { label: "Kích hoạt", value: true, color: green },
    { label: "Chặn", value: false, color: "red" },
  ]

  const roleConst = [
    { label: "Tất cả", value: "", color: "" },
    { label: "Admin", value: false, color: "black" },
    { label: "Root admin", value: true, color: "blue" },
  ]

  useEffect(() => {
    messageDisplay(resultObject, message);
  }, [resultObject]);

  return (
    <CardFeature
      title='Quản trị viên'
    >
      <Form
        layout='vertical'
        className='w-full'
        form={form}
        onFinish={(values) => {
          setQuery({
            status: values?.status !== "" ? values?.status : undefined,
            role: values?.role !== "" ? values?.role : undefined,
            name: values?.name !== "" ? values?.name : undefined,
            identity_id: values?.identity_id !== "" ? values?.identity_id : undefined,
            email: values?.email !== "" ? values?.email : undefined,
            phone_number: values?.phone_number !== "" ? values?.phone_number : undefined,
            page: 1,
            limit: 10
          })
        }}
      >
        {/* filter */}
        <Row gutter={16}>
          {/* status */}
          <Col xs={24} xl={4}>
            <Form.Item
              label={<span className='font-bold'>Trạng thái</span>}
              name='status'
              initialValue={""}
            >
              <Select
                placeholder='Trạng thái'
                options={statusConst.map((item) => ({ label: item.label, value: item.value }))}
              />
            </Form.Item>
          </Col>
          {/* role */}
          <Col xs={24} xl={4}>
            <Form.Item
              label={<span className='font-bold'>Role</span>}
              name='role'
              initialValue={""}
            >
              <Select
                placeholder='Role'
                options={roleConst.map((item) => ({ label: item.label, value: item.value }))}
              />
            </Form.Item>
          </Col>
          {/* name */}
          <Col xs={24} xl={4}>
            <Form.Item
              label={<span className='font-bold'>Họ tên</span>}
              name='name'
            >
              <Input
                placeholder='Họ tên'
                allowClear
              />
            </Form.Item>
          </Col>
          {/* identity_id */}
          <Col xs={24} xl={4}>
            <Form.Item
              label={<span className='font-bold'>CCCD</span>}
              name='identity_id'
            >
              <Input
                placeholder='CCCD'
                allowClear
              />
            </Form.Item>
          </Col>
          {/* email */}
          <Col xs={24} xl={4}>
            <Form.Item
              label={<span className='font-bold'>Email</span>}
              name='email'
            >
              <Input
                placeholder='Email'
                type='email'
                allowClear
              />
            </Form.Item>
          </Col>
          {/* phone */}
          <Col xs={24} xl={4}>
            <Form.Item
              label={<span className='font-bold'>SĐT</span>}
              name='phone_number'
            >
              <Input
                placeholder='SĐT'
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
            >
              <Button
                icon={<IoIosSearch />}
                type='primary'
                className='w-full'
                htmlType='submit'
                loading={isLoading}
              >
                Tra cứu
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
            >
              <Button
                icon={<IoMdPersonAdd />}
                type='primary'
                ghost
                className='w-full'
                onClick={() => setShowCreateModal(true)}
              >
                Thêm Admin
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
            title: "Họ tên",
            dataIndex: "name",
            align: "center",
          },
          {
            title: "Email",
            dataIndex: "email",
            align: "center",
          },
          {
            title: "SĐT",
            dataIndex: "phone_number",
            align: "center",
          },
          {
            title: "CCCD",
            dataIndex: "identity_id",
            align: "center",
          },
          {
            title: "Ngày sinh",
            dataIndex: "birthday",
            align: "center",
            render: (time: string) => dayjs(time).format("DD/MM/YYYY"),
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            align: "center",
            render: (value: string) => {
              const status = statusConst.find((item) => item.value === value);
              return <span style={{ color: status?.color }} className='font-bold'>{status?.label}</span>;
            }
          },
          {
            title: "Role",
            dataIndex: "role",
            align: "center",
            render: (value: string) => {
              const role = roleConst.find((item) => item.value === value);
              return <span style={{ color: role?.color }} className='font-bold'>{role?.label}</span>;
            }
          },
          {
            title: "Hành động",
            align: "center",
            width: "12%",
            render: (_, record) => <div className='flex justify-evenly'>
              <Tooltip title={record?.role === true ? 'Cập nhật sang role "Admin"' : 'Cập nhật sang role "Root Admin"'}>
                <Button
                  icon={<IoCreateSharp />}
                  shape='circle'
                  type='primary'
                  ghost
                  onClick={() => {
                    const confirmModal = modal.confirm({
                      title: `Cập nhật role của tài khoản "${record?.name}" thành ${record?.role === true ? 'Admin' : 'Root Admin'}?`,
                      okText: 'Cập nhật',
                      okType: 'primary',
                      cancelText: 'Hủy',
                      centered: true,
                      onOk: async () => {
                        handleUpdateAdmin({
                          ...record,
                          admin_id: record?.id,
                        }, 'role')
                          .then(() => {
                            form.resetFields();
                            confirmModal.destroy();
                          });
                      },
                      okButtonProps: {
                        loading: updateLoading
                      }
                    })
                  }}
                />
              </Tooltip>
              <ConfigProvider
                theme={{ token: { colorPrimary: record?.status === true ? 'red' : green } }}
              >
                <Tooltip title={record?.status === true ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}>
                  <Button
                    icon={record?.status === true ? <FaUserSlash /> : <FaUserCheck />}
                    shape='circle'
                    type='primary'
                    ghost
                    onClick={() => {
                      const confirmModal = modal.confirm({
                        title: `${record?.status === true ? 'Khóa tài khoản' : 'Mở khóa tài khoản'} "${record?.name}"?`,
                        okText: 'Có',
                        okType: record?.status === true ? 'danger' : 'primary',
                        cancelText: 'Không',
                        centered: true,
                        onOk: async () => {
                          handleUpdateAdmin({
                            ...record,
                            admin_id: record?.id,
                          }, 'status')
                            .then(() => {
                              form.resetFields();
                              confirmModal.destroy();
                            });
                        },
                        okButtonProps: {
                          loading: updateLoading
                        }
                      })
                    }}
                  />
                </Tooltip>
              </ConfigProvider>
              <ConfigProvider
                theme={{ token: { colorPrimary: 'blue' } }}
              >
                <Tooltip title={'Đặt lại mật khẩu'}>
                  <Button
                    icon={<MdOutlineLockReset />}
                    shape='circle'
                    type='primary'
                    ghost
                    onClick={() => {
                      const confirmModal = modal.confirm({
                        title: `Đặt lại mật khẩu cho tài khoản: "${record?.name}"?`,
                        content: "Mật khẩu mặc định: 12345678",
                        okText: 'OK',
                        okType: 'primary',
                        cancelText: 'Hủy',
                        centered: true,
                        onOk: async () => {
                          handleResetPassword({
                            email: record?.email,
                            new_password: '12345678'
                          })
                            .then(() => {
                              form.resetFields();
                              confirmModal.destroy();
                            });
                        },
                        okButtonProps: {
                          loading: resetPasswordLoading
                        }
                      })
                    }}
                  />
                </Tooltip>
              </ConfigProvider>
            </div>,
          }
        ]}
        dataSource={admins}
        rowKey='id'
        onChange={handleTableChange}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          showTotal: (total) => <div className='font-bold absolute left-0'>Tổng: {total}</div>,
          pageSize: limit,
          total: total,
          current: page,
        }}
        scroll={{ x: "max-content" }}
        loading={isLoading}
      />
      {showCreateModal && (
        <CreateAdminModal
          open={showCreateModal}
          onCancel={() => setShowCreateModal(false)}
          createLoading={createLoading}
          handleCreateAdmin={handleCreateAdmin}
        />
      )}
    </CardFeature>
  )
}

export default AdminManagementFeature