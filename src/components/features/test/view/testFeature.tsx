"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Card,
  Typography,
  Space,
  Divider,
  message,
} from "antd";
import {
  ThunderboltOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import TestViewModel from "@/components/features/test/viewModel/testViewModel";
import { defaultTestRepo } from "@/api/features/testFeature/TestRepo";

const { Option } = Select;
const { Title, Text } = Typography;

const TestFeature = () => {
  const [postId, setPostId] = useState("");
  const [numUsers, setNumUsers] = useState("");
  const [action, setAction] = useState("");

  const {
    isLoading,
    resultObject,
    clearAllCache,
    clearCommentCache,
    clearPostCache,
    checkExpiryAdvertisement,
    checkExpiryFeaturePost,
    updateCreatedPost,
    expiryAdvertiseByPostId,
    pushAdvertiseToNewFeed,
    pushFeaturePostToNewFeed,
    updateLikeCommentStatisticCount,
  } = TestViewModel(defaultTestRepo);

  useEffect(() => {
    if (resultObject) {
      if (resultObject.type === "success") {
        message.success(resultObject.message);
      } else {
        message.error(resultObject.message);
      }
    }
  }, [resultObject]);

  const handleAction = async () => {
    if (!action) {
      message.warning("Vui lòng chọn một hành động");
      return;
    }

    const numUsersValue = numUsers === "" ? undefined : Number(numUsers);

    switch (action) {
      case "updateCreatedPost":
      case "expiryAdvertiseByPostId":
      case "updateLikeCommentStatisticCount":
        if (!postId) {
          message.warning("Vui lòng nhập Post ID");
          return;
        }
        break;
      case "pushAdvertiseToNewFeed":
      case "pushFeaturePostToNewFeed":
        if (!postId || numUsers === "") {
          message.warning("Vui lòng nhập cả Post ID và Number of users");
          return;
        }
        break;
      default:
        break;
    }

    switch (action) {
      case "clearAllCache":
        await clearAllCache();
        break;
      case "clearCommentCache":
        await clearCommentCache();
        break;
      case "clearPostCache":
        await clearPostCache();
        break;
      case "checkExpiryAdvertisement":
        await checkExpiryAdvertisement();
        break;
      case "checkExpiryFeaturePost":
        await checkExpiryFeaturePost();
        break;
      case "updateCreatedPost":
        await updateCreatedPost(postId);
        break;
      case "expiryAdvertiseByPostId":
        await expiryAdvertiseByPostId(postId);
        break;
      case "pushAdvertiseToNewFeed":
        await pushAdvertiseToNewFeed({
          post_id: postId,
          num_users: numUsersValue || 0,
        });
        break;
      case "pushFeaturePostToNewFeed":
        await pushFeaturePostToNewFeed({
          post_id: postId,
          num_users: numUsersValue || 0,
        });
        break;
      case "updateLikeCommentStatisticCount":
        await updateLikeCommentStatisticCount(postId);
        break;
      default:
        message.warning("Hành động không được hỗ trợ");
        break;
    }
  };

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card
        style={{ width: 500, borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
        bordered={false}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Title level={4}>
            <ThunderboltOutlined /> Test Feature Actions
          </Title>

          <Input
            placeholder="Post ID (optional)"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />

          <Input
            placeholder="Number of users (optional)"
            type="number"
            value={numUsers}
            onChange={(e) => setNumUsers(e.target.value)}
          />

          <Select
            placeholder="Select action"
            value={action}
            onChange={(value) => setAction(value)}
            style={{ width: "100%" }}
          >
            <Option value="clearAllCache">Clear All Cache</Option>
            <Option value="clearCommentCache">Clear Comment Cache</Option>
            <Option value="clearPostCache">Clear Post Cache</Option>
            <Option value="checkExpiryAdvertisement">Check Expiry Advertisement</Option>
            <Option value="checkExpiryFeaturePost">Check Expiry Feature Post</Option>
            <Option value="updateCreatedPost">Update Created Post</Option>
            <Option value="expiryAdvertiseByPostId">Expire Advertise by Post ID</Option>
            <Option value="pushAdvertiseToNewFeed">Push Advertise to New Feed</Option>
            <Option value="pushFeaturePostToNewFeed">Push Feature Post to New Feed</Option>
            <Option value="updateLikeCommentStatisticCount">Update Like/Comment Stats</Option>
          </Select>

          <Divider />

          <Button
            type="primary"
            icon={<SyncOutlined />}
            loading={isLoading}
            onClick={handleAction}
            block
            style={{ borderRadius: 6 }}
          >
            Execute Action
          </Button>

          <Text type="secondary" style={{ fontSize: 12 }}>
            * Một số hành động yêu cầu điền Post ID và/hoặc Number of users
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default TestFeature;