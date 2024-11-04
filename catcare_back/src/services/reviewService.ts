import prisma from "../client";

interface review {
  userId: number;
  rate: number;
  review: string;
  userReviewedId: number;
}

class ReviewService {
  prisma = prisma;

  async addReview(body: review) {
    const { userId, rate, review, userReviewedId } = body;
    const ratingData = await this.prisma.review.create({
      data: {
        userId,
        rate,
        review,
        userReviewedId,
      },
    });

    const averageRating = await this.prisma.review.aggregate({
      where: { userId: userId },
      _avg: {
        rate: true,
      },
    });

    await this.prisma.user.update({
      where: { id: userReviewedId },
      data: {
        overallRating: averageRating._avg.rate ?? 0,
      },
    });

    return averageRating._avg.rate;
  }

  async getReviews(userId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { userReviewedId: userId },
    });

    return reviews;
  }
}

export default new ReviewService();
