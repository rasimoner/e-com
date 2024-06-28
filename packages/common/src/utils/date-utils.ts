import { TimestampModel } from "../types";

class DateUtils {
    dateTimeFormatFromTimestamp = (date: TimestampModel) =>
        new Date(date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000)).toLocaleString(
            "tr-TR"
        );
}

export const dateUtils = new DateUtils();
