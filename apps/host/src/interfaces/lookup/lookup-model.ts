import { EntityModel } from "@e-com/common";
import { EnumLookupType } from "@interfaces/lookup/lookup-type.enum";

export interface LookupModel extends EntityModel {
    typeId: EnumLookupType;
    text: string;
    value: string;
}
