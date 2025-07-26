import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import CourseCard from './Course_Card';

const CourseSlider = ({ Courses }) => {
  const courseList = Array.isArray(Courses)
    ? Courses
    : Array.isArray(Courses?.data?.courses)
    ? Courses.data.courses
    : [];

  if (courseList.length < 0) {
    return <p className="text-xl text-richblack-5">No Course Found</p>;
  }

  console.log("Courses:", Courses);
  console.log("Course List:", courseList);
  

  return (
    <Swiper
  slidesPerView={1}
  spaceBetween={16}
  loop={true}
  modules={[FreeMode, Pagination, Autoplay]}
  autoplay={{ delay: 3000 }}
  breakpoints={{
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
  className="!overflow-hidden w-full"
>
      {courseList.map((course, index) => (
        <SwiperSlide key={course._id || index}>
          <CourseCard course={course} height="h-[250px]" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseSlider;
