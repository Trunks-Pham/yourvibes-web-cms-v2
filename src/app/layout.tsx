import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { AuthProvider } from "@/context/auth/useAuth";
import useColor from "@/global/hooks/useColor";

export const metadata: Metadata = {
  title: "YourVibes CMS",
  description: "Quản lý nền tảng mạng xã hội YourVibes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { brandPrimary } = useColor();
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <App>
            <AuthProvider>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: brandPrimary,
                  },
                  components: {
                    Select: {
                      optionSelectedColor: "#fff",
                    }
                  }
                }}
              >
                {children}
              </ConfigProvider>
            </AuthProvider>
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}
