import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';

const CourseCard = ({ course, height }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const rating = GetAvgRating(course.ratingAndReviews);
    setAvgRating(rating);
  }, [course]);

  console.log("courseeee", course);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="w-full max-w-[350px] mx-auto rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <img
          src={course?.thumbnail}
          alt={`${course?.courseName} thumbnail`}
          className={`${height} w-full object-cover rounded-xl`}
        />
        <div className="flex flex-col gap-2 px-1 py-3">
          <h3 className="text-xl text-richblack-5">{course?.courseName}</h3>
          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-5">{avgRating || 0}</span>
            <RatingStars Review_Count={avgRating} />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>
          <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
