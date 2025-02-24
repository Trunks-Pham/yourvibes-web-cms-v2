"use client"
import { Button, ConfigProvider, Drawer, Layout } from 'antd';
import SiderBar from './SiderBar';
import useColor from '@/global/hooks/useColor';
import { useState } from 'react';
import { RiMenuFold4Fill } from 'react-icons/ri';
const { Header, Sider, Content } = Layout;

const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { brandPrimary, backgroundColor } = useColor();
  const [open, setOpen] = useState(false);
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerPadding: 0
          },
          Drawer: {
            paddingLG: 0
          }
        }
      }}
    >
      <Layout className='h-screen'>
        <Header
          className='md:hidden block'
          style={{ background: backgroundColor, height: '40px' }}
        >
          <RiMenuFold4Fill
            style={{ color: 'black' }}
            onClick={() => setOpen(true)}
            className='hover:cursor-pointer h-10 text-xl ml-2'
          />
        </Header>
        <Drawer
          placement={'left'}
          closable={false}
          onClose={() => setOpen(false)}
          open={open}
          styles={{ body: { background: brandPrimary }, wrapper: { width: '250px' } }}
          size='default'
        >
          <SiderBar />
        </Drawer>
        <Layout>
          <Sider
            width="250px"
            style={{ background: brandPrimary }}
            className='md:block hidden'
          >
            <SiderBar />
          </Sider>
          <Content className='py-2 px-4 h-screen overflow-auto' style={{ background: backgroundColor, scrollbarWidth: 'none' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default MainLayout