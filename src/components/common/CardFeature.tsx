import { Card, ConfigProvider } from 'antd'
import React from 'react'

const CardFeature = (
  {
    children,
    title
  }: {
    children: React.ReactNode,
    title: string
  }
) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            borderRadiusLG: 0,
            boxShadowTertiary: "none"
          }
        }
      }}
    >
      <Card
        title={<span className='font-bold text-2xl'>{title}</span>}
        bordered={false}
        style={{ width: '100%', padding: 0, borderWidth: 0 }}
        styles={{
          header: { padding: 0 },
          body: { padding: 0 }
        }}
      >
        <div className='pt-4'>
          {children}
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default CardFeature