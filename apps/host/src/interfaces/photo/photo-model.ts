import { EnumPhotoReferenceKey } from "@interfaces/photo/photo-reference-key.enum";
import { EntityModel } from "@e-com/common";

export interface PhotoModel extends EntityModel {
    referenceId: string;
    referenceKey: EnumPhotoReferenceKey;
    imageSrc: string;
    thumbnailSrc: string;
    alt: string;
    title?: string;
}
