import { AdsTransactionListResponseModel } from "@/api/features/adsTransaction/models/AdsTransactionModel";
import Post from "@/components/common/Post";
import useColor from "@/global/hooks/useColor";
import { CurrencyFormat } from "@/utils/helper/CurrencyFormat";
import { Col, Modal, Row } from "antd";
import dayjs from "dayjs";

const AdsTransactionDetailModal = ({
  open,
  onCancel,
  detail,
  detailLoading,
}: {
  open: boolean,
  onCancel: () => void,
  detail?: AdsTransactionListResponseModel,
  detailLoading: boolean,
}) => {
  const { green } = useColor();
  const statusConst = [
    { label: "Tất cả", value: "", color: "" },
    { label: "Hoàn thành", value: true, color: green },
    { label: "Thất bại", value: false, color: "red" },
  ]

  const renderItem = (
    label: string,
    value: React.ReactNode,
    color = "black"
  ) => {
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
          <>
            {value && value !== "-" && value !== "Invalid Date"
              ? value
              : "Không có thông tin"}
          </>
        </span>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<span className='font-bold text-xl'>Chi tiết hóa đơn</span>}
      width={1200}
      centered
      footer={null}
      maskClosable={false}
      loading={detailLoading}
    >
      <Row gutter={[8, 32]} justify={"space-between"} className="mt-4 mb-10">
        <Col xs={24} lg={11}>
          {renderItem(
            "Thời gian tạo",
            dayjs(detail?.created_at).format("DD/MM/YYYY HH:mm:ss")
          )}
          {renderItem(
            "ID giao dịch",
            detail?.id
          )}
          {renderItem(
            "Email khách hàng",
            detail?.post?.user?.email
          )}
          {renderItem(
            "SĐT khách hàng",
            detail?.post?.user?.phone_number
          )}
          {renderItem(
            "Thời gian chiến dịch",
            `${dayjs(detail?.start_date).format("DD/MM/YYYY HH:mm:ss")} 
            - ${dayjs(detail?.end_date).format("DD/MM/YYYY HH:mm:ss")}`
          )}
          {renderItem(
            "Tổng tiền",
            CurrencyFormat(detail?.bill?.price || 0),
            "green"
          )}
          {renderItem(
            "Trạng thái",
            statusConst.find((item) => item.value === detail?.bill?.status)?.label,
            statusConst.find((item) => item.value === detail?.bill?.status)?.color
          )}
        </Col>
        <Col xs={24} lg={11} className="flex justify-center">
          <Post post={detail?.post}>
            {detail?.post?.parent_post && (
              <Post post={detail?.post?.parent_post} isParentPost />
            )}
          </Post>
        </Col>
      </Row>
    </Modal >
  )
}

export default AdsTransactionDetailModal