import { useState } from "react";
import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { TestModel } from "@/api/features/testFeature/model/testModel";
import { ITestRepo } from "@/api/features/testFeature/TestRepo";

const TestViewModel = (repo: ITestRepo) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>(undefined);

  const handle = async (
    fn: () => Promise<any>,
    successMsg = "Thành công!",
    errorMsg = "Đã có lỗi xảy ra!"
  ) => {
    try {
      setIsLoading(true);
      const res = await fn();
      console.log("Response:", res);

      if (typeof res === "object" && res !== null && "code" in res) {
        if (res.code >= 20000 && res.code < 30000) {
          setResultObject({
            type: "success",
            message: res.message || successMsg,
          });
        } else {
          setResultObject({
            type: "error",
            message: res.message || errorMsg,
          });
        }
      } else {
        console.error("Unexpected response format:", res);
        setResultObject({
          type: "error",
          message: errorMsg,
        });
      }
    } catch (err) {
      console.error("Error in handle:", err);
      setResultObject({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllCache = async () => {
    await handle(() => repo.clearAllCache(), "Đã xoá toàn bộ cache");
  };

  const clearCommentCache = async () => {
    await handle(() => repo.clearCommentCache(), "Đã xoá comment cache");
  };

  const clearPostCache = async () => {
    await handle(() => repo.clearPostCache(), "Đã xoá post cache");
  };

  const checkExpiryAdvertisement = async () => {
    await handle(() => repo.checkExpiryAdvertisement(), "Đã kiểm tra quảng cáo hết hạn");
  };

  const checkExpiryFeaturePost = async () => {
    await handle(() => repo.checkExpiryFeaturePost(), "Đã kiểm tra bài viết nổi bật hết hạn");
  };

  const updateCreatedPost = async (post_id: string) => {
    await handle(() => repo.updateCreatedPost(post_id), "Đã cập nhật post");
  };

  const expiryAdvertiseByPostId = async (post_id: string) => {
    await handle(() => repo.expiryAdvertiseByPostId(post_id), "Đã hết hạn quảng cáo theo post_id");
  };

  const pushAdvertiseToNewFeed = async (data: TestModel) => {
    await handle(() => repo.pushAdvertiseToNewFeed(data), "Đã đẩy quảng cáo vào NewFeed");
  };

  const pushFeaturePostToNewFeed = async (data: TestModel) => {
    await handle(() => repo.pushFeaturePostToNewFeed(data), "Đã đẩy post nổi bật vào NewFeed");
  };

  const updateLikeCommentStatisticCount = async (post_id: string) => {
    await handle(() => repo.updateLikeCommentStatisticCount(post_id), "Đã cập nhật thống kê like/comment");
  };

  return {
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
  };
};

export default TestViewModel;