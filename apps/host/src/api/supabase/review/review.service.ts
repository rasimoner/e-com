import { supabaseService } from "@e-com/api-supabase";
import { ReviewModel } from "@interfaces/review";

class ReviewService {
    readonly path = "Reviews";

    getReviews = async (model?: Partial<ReviewModel>): Promise<ReviewModel[]> =>
        await supabaseService.getDataFromApi<ReviewModel>({ model, path: this.path });
}

export const reviewService = () => new ReviewService();
