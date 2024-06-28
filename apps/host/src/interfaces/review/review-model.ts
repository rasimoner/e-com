import { EntityModel, TimestampModel } from "@e-com/common";

export interface ReviewModel extends EntityModel {
    comment: string;
    createdAt: TimestampModel;
    parentId?: string;
    productId: string;
    rate: number;
    user: string;
}
