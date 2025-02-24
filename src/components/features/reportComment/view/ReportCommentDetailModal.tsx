import { ReportCommentListResponseModel, ReportCommentDetailRequestModel } from '@/api/features/reportComment/model/ReportCommentListModel'
import Comment from '@/components/common/Comment'
import Post from '@/components/common/Post'
import useColor from '@/global/hooks/useColor'
import { Button, Col, Modal, Row } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

const ReportCommentDetailModal = ({
  open,
  onCancel,
  detail,
  detailLoading,
  deleteLoading,
  acceptLoading,
  activeLoading,
  deleteReport,
  acceptReport,
  activateReport
}: {
  open: boolean,
  onCancel: () => void,
  detail?: ReportCommentListResponseModel,
  detailLoading: boolean,
  deleteLoading: boolean,
  acceptLoading: boolean,
  activeLoading: boolean,
  deleteReport: (params: ReportCommentDetailRequestModel) => Promise<void>,
  acceptReport: (params: ReportCommentDetailRequestModel) => Promise<void>,
  activateReport: (params: ReportCommentDetailRequestModel) => Promise<void>,
}) => {
  const { green } = useColor();
  const statusConst = [
    { label: "Tất cả", value: "", color: "" },
    { label: "Đã xử lý", value: true, color: green },
    { label: "Chưa xử lý", value: false, color: "red" },
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
      title={<span className='font-bold text-xl'>Chi tiết báo cáo</span>}
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
            "Trạng thái bình luận bị báo cáo",
            detail?.reported_comment?.status ? "Hoạt động" : "Khóa",
            detail?.reported_comment?.status ? "green" : "red"
          )}
          {renderItem(
            "Trạng thái",
            statusConst.find((item) => item.value === detail?.status)?.label,
            statusConst.find((item) => item.value === detail?.status)?.color
          )}
          {renderItem(
            "Tài khoản báo cáo",
            detail?.user?.email
          )}
          {renderItem(
            "Admin",
            detail?.admin?.email
          )}
          {renderItem(
            "Lý do",
            detail?.reason
          )}
          <div className='font-bold w-full my-2 text-lg'>Bình luận</div>
          <Comment
            comment={detail?.reported_comment}
          />
        </Col>
        <Col xs={24} lg={11} className="flex justify-center">
          <div className='font-bold w-full my-2 text-lg'>Bài viết</div>
          <Post post={detail?.post}>
            {detail?.post?.parent_post && (
              <Post post={detail?.post?.parent_post} isParentPost />
            )}
          </Post>
        </Col>
      </Row>
      <Row gutter={[8, 32]} justify={"space-between"}>
        {detail?.status === true ? (
          <>
            {!detail?.reported_comment?.status && (
              <Col xs={24}>
                <Button
                  type='primary'
                  className='w-full'
                  loading={activeLoading}
                  onClick={async () => await activateReport({
                    comment_id: detail?.reported_comment_id
                  })}
                >
                  Mở lại bình luận
                </Button>
              </Col>
            )}
          </>
        ) : (
          <>
            <Col xs={12}>
              <Button
                type='primary'
                ghost
                className='w-full'
                loading={deleteLoading}
                onClick={() => deleteReport({
                  user_id: detail?.user_id,
                  reported_comment_id: detail?.reported_comment_id
                })}
              >
                Từ chối
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                type='primary'
                className='w-full'
                loading={acceptLoading}
                onClick={() => acceptReport({
                  user_id: detail?.user_id,
                  reported_comment_id: detail?.reported_comment_id
                })}
              >
                Chấp nhận
              </Button>
            </Col>
          </>
        )}
      </Row >
    </Modal >
  )
}

export default ReportCommentDetailModal