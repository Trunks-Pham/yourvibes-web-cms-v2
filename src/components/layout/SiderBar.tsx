import { useAuth } from '@/context/auth/useAuth';
import useColor from '@/global/hooks/useColor';
import { MenuProps, Image as AntdImage } from 'antd';
import { ConfigProvider, Menu, App, Row } from 'antd';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { BiSolidLogOut } from 'react-icons/bi';
import { BsFilePostFill } from 'react-icons/bs';
import { FaHistory, FaHome, FaInfoCircle, FaLock } from 'react-icons/fa';
import { IoIosPricetags } from 'react-icons/io';
import { MdAdminPanelSettings, MdInsertComment, MdReport, MdSwitchAccount } from 'react-icons/md';
import { RiUserSettingsFill } from 'react-icons/ri';
import yourvibesLogo from '@/global/images/yourvibes.png'
type MenuItem = Required<MenuProps>['items'][number];

const SiderBar = () => {
  const { brandPrimaryTap, backgroundColor, brandPrimary } = useColor();
  const { modal } = App.useApp();
  const { onLogout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const defaultOpenKeys = [`/${pathname.split("/")[1]}`];
  const defaultSelectedKeys = [pathname];

  const items: MenuItem[] = [
    {
      key: '/',
      label: 'Trang chủ',
      icon: <FaHome />,
    },
    {
      key: '/reports',
      label: 'Khiếu nại',
      icon: <MdReport />,
      children: [
        { key: '/reports/accounts', label: 'Tài khoản', icon: <MdSwitchAccount /> },
        { key: '/reports/posts', label: 'Bài viết', icon: <BsFilePostFill /> },
        { key: '/reports/comments', label: 'Bình luận', icon: <MdInsertComment /> },
      ],
    },
    {
      key: '/history',
      label: 'Lịch sử',
      icon: <FaHistory />,
      children: [
        { key: '/history/ads-transactions', label: 'Giao dịch quảng cáo', icon: <IoIosPricetags /> },
      ],
    },
    {
      key: '/root-admin',
      label: 'Quản trị viên',
      icon: <MdAdminPanelSettings />,
    },
    {
      key: '/account',
      label: 'Tài khoản',
      icon: <RiUserSettingsFill />,
      children: [
        { key: '/account/info', label: 'Thông tin', icon: <FaInfoCircle /> },
        { key: '/account/change-password', label: 'Đổi mật khẩu', icon: <FaLock /> },
        { key: 'logout', label: 'Đăng xuất', icon: <BiSolidLogOut /> },
      ],
    },
  ];

  const onMenuClick = (e: any) => {
    if (e.key === 'logout') {
      modal.confirm({
        centered: true,
        title: 'Bạn có muốn đăng xuất không?',
        okType: 'default',
        okText: 'Có',
        cancelText: 'Hủy',
        cancelButtonProps: { type: 'primary' },
        onOk: () => onLogout()
      })
    } else {
      router.push(e.key);
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: backgroundColor
        },
        components: {
          Menu: {
            subMenuItemBg: brandPrimary,
            darkItemBg: brandPrimary,
            darkItemSelectedBg: brandPrimaryTap,
            darkItemSelectedColor: backgroundColor,
            darkSubMenuItemBg: brandPrimary,
            darkItemDisabledColor: brandPrimaryTap
          }
        }
      }}
    >
      <div className='w-full px-2 pt-4'>
        <Image
          src={yourvibesLogo}
          alt='yourvibesLogo'
          style={{ objectFit: 'contain', height: '65px' }}
        />
      </div>
      <Menu
        onClick={onMenuClick}
        style={{ width: "100%" }}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        items={user?.role ? items : items.filter(item => item?.key !== '/root-admin')}
        theme='dark'
      />
    </ConfigProvider>
  )
}

export default SiderBar