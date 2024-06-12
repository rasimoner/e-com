import { EnumRelationReferenceKey } from "@interfaces/photo/relation-reference-key.enum";
import { EntityModel } from "@e-com/common";

export interface PhotoModel extends EntityModel {
    referenceId: string;
    referenceType: EnumRelationReferenceKey;
    imageSrc: string;
    thumbnailSrc: string;
    alt: string;
    title?: string;
}
