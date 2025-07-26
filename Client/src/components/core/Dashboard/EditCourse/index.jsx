import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"
import Spinner from "../../../common/Spinner"; 

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(true) // Initialize as true
  const [error, setError] = useState(null)
  const { token } = useSelector((state) => state.auth)

  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getFullDetailsOfCourse(courseId, token)
      
      if (!result?.courseDetails) {
        throw new Error("Course details not found")
      }
      
      dispatch(setEditCourse(true))
      dispatch(setCourse(result.courseDetails))
    } catch (err) {
      console.error("Failed to fetch course details:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [courseId, token, dispatch])

  useEffect(() => {
    fetchCourseData()
  }, [fetchCourseData])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <Spinner /> {/* Reusable spinner component */}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid flex-1 place-items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}