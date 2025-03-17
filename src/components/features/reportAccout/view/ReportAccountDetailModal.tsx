import { ReportAccountDetailRequestModel, ReportAccountListResponseModel } from '@/api/features/report/model/ReportModel';
import useColor from '@/global/hooks/useColor';
import { Button, Col, Modal, Row } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const ReportAccountDetailModal = ({
  open,
  onCancel,
  detail,
  detailLoading,
  deleteLoading,
  acceptLoading,
  activeLoading,
  deleteReport,
  acceptReport,
  activateReport,
}: {
  open: boolean;
  onCancel: () => void;
  detail?: ReportAccountListResponseModel;
  detailLoading: boolean;
  deleteLoading: boolean;
  acceptLoading: boolean;
  activeLoading: boolean;
  deleteReport: (params: ReportAccountDetailRequestModel) => Promise<void>;
  acceptReport: (params: ReportAccountDetailRequestModel) => Promise<void>;
  activateReport: (params: ReportAccountDetailRequestModel) => Promise<void>;
}) => {
  const { green } = useColor();
  const statusConst = [
    { label: "Tất cả", value: "", color: "" },
    { label: "Đã xử lý", value: true, color: green },
    { label: "Chưa xử lý", value: false, color: "red" },
  ];

  const renderItem = (label: string, value: React.ReactNode, color = "black") => {
    return (
      <div className="flex justify-between w-full my-2">
        <span className="font-bold">{label}:</span>
        <span
          style={{
            color: color,
            fontWeight: color !== "black" ? "bold" : "",
            textAlign: "right",
          }}
          className="overflow-visible text-ellipsis"
        >
          {label?.includes("Tài khoản bị báo cáo") ? (
            <a
              href={`${process.env.NEXT_PUBLIC_CLIENT_ENDPOINT!}/user/${detail?.reported_user?.id}`}
              target="_blank"
            >
              {value && value !== "-" && value !== "Invalid Date" ? value : "Không có thông tin"}
            </a>
          ) : (
            <>{value && value !== "-" && value !== "Invalid Date" ? value : "Không có thông tin"}</>
          )}
        </span>
      </div>
    );
  };

  const handleAction = (action: (params: ReportAccountDetailRequestModel) => Promise<void>) => {
    if (detail?.report_id) {
      action({
        report_type: 0,
        report_id: detail.report_id,
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<span className="font-bold text-xl">Chi tiết báo cáo tài khoản</span>}
      width={600}
      centered
      footer={null}
      maskClosable={false}
      loading={detailLoading}
    >
      <Row gutter={[8, 32]} justify="space-between" className="mt-4 mb-10">
        <Col xs={24}>
          {renderItem("Thời gian tạo", dayjs(detail?.created_at).format("DD/MM/YYYY HH:mm:ss"))}
          {renderItem("Tài khoản bị báo cáo", detail?.reported_user?.email)}
          {renderItem(
            "Trạng thái tài khoản bị báo cáo",
            detail?.reported_user?.status ? "Hoạt động" : "Khóa",
            detail?.reported_user?.status ? "green" : "red"
          )}
          {renderItem(
            "Trạng thái",
            statusConst.find((item) => item.value === detail?.status)?.label,
            statusConst.find((item) => item.value === detail?.status)?.color
          )}
          {renderItem("Tài khoản báo cáo", detail?.user?.email)}
          {renderItem("Admin", detail?.admin?.email)}
          {renderItem("Lý do", detail?.reason)}
        </Col>
      </Row>
      <Row gutter={[8, 32]} justify="space-between">
        {detail?.status === true ? (
          <>
            {detail?.reported_user?.status === false && (
              <Col xs={24}>
                <Button
                  type="primary"
                  className="w-full"
                  loading={activeLoading}
                  onClick={() => handleAction(activateReport)}
                >
                  Mở lại tài khoản
                </Button>
              </Col>
            )}
          </>
        ) : (
          <>
            <Col xs={12}>
              <Button
                type="primary"
                ghost
                className="w-full"
                loading={deleteLoading}
                onClick={() => handleAction(deleteReport)}
              >
                Từ chối
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                type="primary"
                className="w-full"
                loading={acceptLoading}
                onClick={() => handleAction(acceptReport)}
              >
                Chấp nhận
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Modal>
  );
};

export default ReportAccountDetailModal;