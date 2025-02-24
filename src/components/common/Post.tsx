"use client";
import { Privacy } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { PostResponseModel } from "@/api/features/post/models/PostResponseModel";
import { useAuth } from "@/context/auth/useAuth";
import {
  Avatar,
  Card,
  Col,
  Row,
} from "antd";
import React from "react";
import {
  FaGlobe,
  FaLock,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getTimeDiff } from "@/utils/helper/DateTransfer";
import { RiAdvertisementLine } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import MediaView from "./MediaView";
import useColor from "@/global/hooks/useColor";


interface IPost {
  post?: PostResponseModel;
  isParentPost?: boolean;
  noFooter?: boolean;
  children?: React.ReactNode;
}

const Post: React.FC<IPost> = React.memo(
  ({ post, isParentPost = false, noFooter = false, children }) => {
    const router = useRouter();
    const { brandPrimary, brandPrimaryTap, lightGray, backgroundColor } =
      useColor();
    const { user } = useAuth();

    const renderPrivacyIcon = () => {
      switch (post?.privacy) {
        case Privacy.PUBLIC:
          return <FaGlobe size={12} color={brandPrimaryTap} />;
        case Privacy.FRIEND_ONLY:
          return <BsFillPeopleFill size={12} color={brandPrimaryTap} />;
        case Privacy.PRIVATE:
          return <FaLock size={12} color={brandPrimaryTap} />;
        default:
          return null;
      }
    };

    return (
      <Card
        style={{
          borderColor: isParentPost ? brandPrimary : "black",
          width: "100%",
          borderRadius: 10,
        }}
        title={
          <Row gutter={[8, 8]} className="m-2"
          >
            <Col
              xs={4}
              md={2}
              className="hover:cursor-pointer"
            >
              <Avatar src={post?.user?.avatar_url} shape="circle" />
            </Col>
            <Col xs={18} md={21}>
              <Row>
                <Col
                  span={24}
                  className="hover:cursor-pointer hover:underline"
                >
                  <span style={{ fontWeight: "bold", fontSize: 14 }}>
                    {post?.user?.family_name} {post?.user?.name}
                  </span>
                </Col>
                <Col span={24}>
                  {post?.is_advertisement ? (
                    <div className="flex flex-row items-center">
                      <span
                        style={{
                          color: brandPrimaryTap,
                          fontSize: 12,
                          opacity: 0.5,
                          marginRight: 10,
                        }}
                      >
                        {"Được tài trợ"}
                      </span>
                      <RiAdvertisementLine size={24} color={brandPrimaryTap} />
                    </div>
                  ) : (
                    <div className="flex flex-row items-center">
                      <span
                        style={{
                          color: brandPrimaryTap,
                          fontSize: 12,
                          opacity: 0.5,
                          marginRight: 10,
                        }}
                      >
                        {getTimeDiff(post?.created_at)}
                      </span>
                      {renderPrivacyIcon()}
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        }
      >
        <Row gutter={[8, 8]} className="mx-2 w-full">
          {!isParentPost && children ? (
            <Col span={24}>
              {post?.content && (
                <div className="mb-2">{post?.content}</div>
              )}
              {children}
            </Col>
          ) : post?.content && post?.parent_id ? (
            <div>
              <div className="mb-2">
                {post?.content}
              </div>
              <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                <div
                  style={{
                    padding: 10,
                    borderColor: "#000",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {"Không có nội dung"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <Col span={24}>
              {post?.content && (
                <div className="mb-2">{post?.content}</div>
              )}
              {post?.media && post?.media?.length > 0 && (
                <MediaView mediaItems={post?.media} />
              )}
            </Col>
          )}
        </Row>
      </Card>
    );
  }
);

export default Post;
