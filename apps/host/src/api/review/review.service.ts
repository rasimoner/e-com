import { baseService } from "@e-com/common";
import { ReviewModel } from "@interfaces/review";
import { Timestamp } from "firebase/firestore";

class ReviewService {
    readonly path = "reviews";
    addCollection = async () => {
        const model: ReviewModel = {
            comment: "",
            createdAt: Timestamp.now(),
            productId: "",
            rate: 0,
            user: "",
        };
        return baseService.addApiCollection(model, this.path);
    };
    saveReview = async (model: ReviewModel) =>
        await baseService.updateApiData({ model, path: this.path });

    getReviews = async (model?: ReviewModel): Promise<ReviewModel[]> =>
        await baseService.getDataFromApi({ model, path: this.path });
}

export const reviewService = () => new ReviewService();
