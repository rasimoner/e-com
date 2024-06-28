import { firebaseService } from "@e-com/api-firebase";
import { ReviewModel } from "@interfaces/review";

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
        return firebaseService.addApiCollection(model, this.path);
    };
    saveReview = async (model: ReviewModel) =>
        await firebaseService.updateApiData({ model, path: this.path });

    getReviews = async (model?: ReviewModel): Promise<ReviewModel[]> =>
        await firebaseService.getDataFromApi({ model, path: this.path });
}

export const reviewService = () => new ReviewService();
