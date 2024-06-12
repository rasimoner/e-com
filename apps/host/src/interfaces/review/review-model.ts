import { EntityModel } from "@e-com/common";
import { Timestamp } from "firebase/firestore";

export interface ReviewModel extends EntityModel {
    comment: string;
    createdAt: Timestamp;
    parentId?: string;
    productId: string;
    rate: number;
    user: string;
}
