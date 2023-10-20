/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { VolumeSnapshots } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ElasticSanManagement } from "../elasticSanManagement";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  Snapshot,
  VolumeSnapshotsListByVolumeGroupNextOptionalParams,
  VolumeSnapshotsListByVolumeGroupOptionalParams,
  VolumeSnapshotsListByVolumeGroupResponse,
  VolumeSnapshotsCreateOptionalParams,
  VolumeSnapshotsCreateResponse,
  VolumeSnapshotsDeleteOptionalParams,
  VolumeSnapshotsGetOptionalParams,
  VolumeSnapshotsGetResponse,
  VolumeSnapshotsListByVolumeGroupNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing VolumeSnapshots operations. */
export class VolumeSnapshotsImpl implements VolumeSnapshots {
  private readonly client: ElasticSanManagement;

  /**
   * Initialize a new instance of the class VolumeSnapshots class.
   * @param client Reference to the service client
   */
  constructor(client: ElasticSanManagement) {
    this.client = client;
  }

  /**
   * List Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param options The options parameters.
   */
  public listByVolumeGroup(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeSnapshotsListByVolumeGroupOptionalParams
  ): PagedAsyncIterableIterator<Snapshot> {
    const iter = this.listByVolumeGroupPagingAll(
      resourceGroupName,
      elasticSanName,
      volumeGroupName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByVolumeGroupPagingPage(
          resourceGroupName,
          elasticSanName,
          volumeGroupName,
          options,
          settings
        );
      }
    };
  }

  private async *listByVolumeGroupPagingPage(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeSnapshotsListByVolumeGroupOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Snapshot[]> {
    let result: VolumeSnapshotsListByVolumeGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByVolumeGroup(
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByVolumeGroupNext(
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByVolumeGroupPagingAll(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeSnapshotsListByVolumeGroupOptionalParams
  ): AsyncIterableIterator<Snapshot> {
    for await (const page of this.listByVolumeGroupPagingPage(
      resourceGroupName,
      elasticSanName,
      volumeGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param options The options parameters.
   */
  private _listByVolumeGroup(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeSnapshotsListByVolumeGroupOptionalParams
  ): Promise<VolumeSnapshotsListByVolumeGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, elasticSanName, volumeGroupName, options },
      listByVolumeGroupOperationSpec
    );
  }

  /**
   * Create a Volume Snapshot.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param snapshotName The name of the volume snapshot within the given volume group.
   * @param parameters Snapshot object.
   * @param options The options parameters.
   */
  async beginCreate(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    parameters: Snapshot,
    options?: VolumeSnapshotsCreateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<VolumeSnapshotsCreateResponse>,
      VolumeSnapshotsCreateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<VolumeSnapshotsCreateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        parameters,
        options
      },
      spec: createOperationSpec
    });
    const poller = await createHttpPoller<
      VolumeSnapshotsCreateResponse,
      OperationState<VolumeSnapshotsCreateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a Volume Snapshot.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param snapshotName The name of the volume snapshot within the given volume group.
   * @param parameters Snapshot object.
   * @param options The options parameters.
   */
  async beginCreateAndWait(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    parameters: Snapshot,
    options?: VolumeSnapshotsCreateOptionalParams
  ): Promise<VolumeSnapshotsCreateResponse> {
    const poller = await this.beginCreate(
      resourceGroupName,
      elasticSanName,
      volumeGroupName,
      snapshotName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a Volume Snapshot.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param snapshotName The name of the volume snapshot within the given volume group.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeSnapshotsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        options
      },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a Volume Snapshot.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param snapshotName The name of the volume snapshot within the given volume group.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeSnapshotsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      elasticSanName,
      volumeGroupName,
      snapshotName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Get a Volume Snapshot.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param snapshotName The name of the volume snapshot within the given volume group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    snapshotName: string,
    options?: VolumeSnapshotsGetOptionalParams
  ): Promise<VolumeSnapshotsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        snapshotName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * ListByVolumeGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param elasticSanName The name of the ElasticSan.
   * @param volumeGroupName The name of the VolumeGroup.
   * @param nextLink The nextLink from the previous successful call to the ListByVolumeGroup method.
   * @param options The options parameters.
   */
  private _listByVolumeGroupNext(
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    nextLink: string,
    options?: VolumeSnapshotsListByVolumeGroupNextOptionalParams
  ): Promise<VolumeSnapshotsListByVolumeGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, elasticSanName, volumeGroupName, nextLink, options },
      listByVolumeGroupNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByVolumeGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/snapshots",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SnapshotList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.elasticSanName,
    Parameters.volumeGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/snapshots/{snapshotName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Snapshot
    },
    201: {
      bodyMapper: Mappers.Snapshot
    },
    202: {
      bodyMapper: Mappers.Snapshot
    },
    204: {
      bodyMapper: Mappers.Snapshot
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.elasticSanName,
    Parameters.volumeGroupName,
    Parameters.snapshotName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/snapshots/{snapshotName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.elasticSanName,
    Parameters.volumeGroupName,
    Parameters.snapshotName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/snapshots/{snapshotName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Snapshot
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.elasticSanName,
    Parameters.volumeGroupName,
    Parameters.snapshotName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByVolumeGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SnapshotList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.elasticSanName,
    Parameters.nextLink,
    Parameters.volumeGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
