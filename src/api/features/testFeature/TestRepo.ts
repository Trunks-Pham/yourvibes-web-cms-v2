import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";
import { TestModel } from "./model/testModel";

export interface ITestRepo {
  clearAllCache(): Promise<BaseApiResponseModel<TestModel[]>>;
  clearCommentCache(): Promise<BaseApiResponseModel<TestModel[]>>;
  clearPostCache(): Promise<BaseApiResponseModel<TestModel[]>>;
  checkExpiryAdvertisement(): Promise<BaseApiResponseModel<TestModel[]>>;
  checkExpiryFeaturePost(): Promise<BaseApiResponseModel<TestModel[]>>;
  updateCreatedPost(post_id: string): Promise<BaseApiResponseModel<TestModel[]>>;
  expiryAdvertiseByPostId(post_id: string): Promise<BaseApiResponseModel<TestModel[]>>;
  pushAdvertiseToNewFeed(data: TestModel): Promise<BaseApiResponseModel<TestModel[]>>;
  pushFeaturePostToNewFeed(data: TestModel): Promise<BaseApiResponseModel<TestModel[]>>;
  updateLikeCommentStatisticCount(post_id: string): Promise<BaseApiResponseModel<TestModel[]>>;
}

class TestRepo implements ITestRepo {
  async clearAllCache(): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(ApiPath.CLEARCACHE);
  }

  async clearCommentCache(): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(ApiPath.CLEARCACHE_COMMENT);
  }

  async clearPostCache(): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(ApiPath.CLEARCACHE_POST);
  }

  async checkExpiryAdvertisement(): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(ApiPath.CHECK_EXPIRY_ADVARTISEMENT);
  }

  async checkExpiryFeaturePost(): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(ApiPath.CHECK_EXPORY_POST);
  }

  async updateCreatedPost(post_id: string): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(`${ApiPath.UPDATE_CREATED_POST}${post_id}`);
  }
 
  async expiryAdvertiseByPostId(post_id: string): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(`${ApiPath.EXPIRY_ADVETISE_BY_POST_ID}${post_id}`);
  }

  async pushAdvertiseToNewFeed(data: TestModel): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(ApiPath.PUSH_ADVERTISE_TO_NEWFEED, data);
  }

  async pushFeaturePostToNewFeed(data: TestModel): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(ApiPath.PUSH_FEATURE_POST_TO_NEWFEED, data);
  }
 
  async updateLikeCommentStatisticCount(post_id: string): Promise<BaseApiResponseModel<TestModel[]>> {
    return client.post(`${ApiPath.UPDATE_LIKE_COMMENT_STATISTIC_COUNT}${post_id}`);
  }
}

export const defaultTestRepo = new TestRepo();
