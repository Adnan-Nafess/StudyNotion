import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data.data);
        const avg = data.data.reduce((acc, review) => acc + review.rating, 0) / data.data.length;
        setAverageRating(avg.toFixed(1));
      }
    })();
  }, []);

  const formatReviewText = (text) => {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    return sentences.map((sentence, i) => (
      <li key={i} className="text-sm">
        {sentence.trim()}
      </li>
    ));
  };

  return (
    <div className="text-white w-full max-w-3xl mx-auto my-12 px-4">
      
      {reviews.length > 0 ? (
        <>
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review._id} className="flex gap-4">
                {/* User Image */}
                <div className="flex-shrink-0">
                  <img
                    src={
                      review.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${review.user?.firstName || 'U'} ${review.user?.lastName || 'N'}`
                    }
                    alt={`${review.user?.firstName} ${review.user?.lastName}`}
                    className="h-12 w-12 rounded-full object-cover border-2 border-yellow-400"
                  />
                </div>

                {/* Review Content */}
                <div className="border-l-4 border-yellow-400 pl-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-1">
                    {review.user?.firstName || 'Anonymous'} {review.user?.lastName}
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-richblack-100">
                    {formatReviewText(review.review)}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="text-xl font-bold">{averageRating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-richblack-400'}`} 
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-richblack-200">Loading reviews...</p>
      )}
    </div>
  );
}

export default ReviewSlider;