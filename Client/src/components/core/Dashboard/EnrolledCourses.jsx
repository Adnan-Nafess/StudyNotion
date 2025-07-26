import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res)
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <div className="text-richblack-5">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Enrolled Courses</h1>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <p className="grid h-[10vh] w-full place-content-center text-2xl text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-4 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="flex rounded-t-lg bg-richblack-500 text-sm font-medium">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>

            {/* Table Body */}
            {enrolledCourses.map((course, i, arr) => (
              <div
                key={i}
                className={`flex items-start sm:items-center border border-richblack-700 ${
                  i === arr.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                {/* Course Info */}
                <div
                  className="flex w-[45%] cursor-pointer items-start sm:items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 min-w-[56px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-1 max-w-xs">
                    <p className="font-semibold text-sm sm:text-base">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="w-1/4 px-2 py-3 text-sm sm:text-base">
                  {course?.totalDuration}
                </div>

                {/* Progress */}
                <div className="flex w-1/5 flex-col gap-1 px-2 py-3 text-xs sm:text-sm">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    bgColor="#FFD60A"
                    baseBgColor="#333"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

