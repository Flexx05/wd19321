import { useForm } from "react-hook-form";
import { CourseInput } from "../../interface/course";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditCourse() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseInput>();
  const nav = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const getCourseById = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/courses/${id}`
          );
          reset(data);
        } catch (error) {
          toast.error((error as AxiosError).message);
        }
      };
      getCourseById();
    }
  }, [id]);
  const onSubmit = async (data: CourseInput) => {
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, data);
      toast.success("Thêm sản phẩm thành công");
      nav("/admin/course");
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };
  return (
    <div>
      <h1>Edit Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="courseName" className="col-sm-1-12 col-form-label">
            Course Name:
          </label>
          <div className="col-sm-1-12">
            <input
              type="text"
              className="form-control"
              id="courseName"
              {...register("courseName", {
                required: "Tên khóa học không được để trống",
                minLength: {
                  value: 6,
                  message: "Tên khóa học chứa tối thiểu 6 ký tự",
                },
              })}
            />
            {errors?.courseName && (
              <span className="text-danger">{errors?.courseName?.message}</span>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="thumbnail" className="col-sm-1-12 col-form-label">
            Thumbnail:
          </label>
          <div className="col-sm-1-12">
            <input
              type="text"
              className="form-control"
              id="thumbnail"
              {...register("thumbnail", {
                required: "Hình ảnh không được để trống",
              })}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category" className="col-sm-1-12 col-form-label">
            Category:
          </label>
          <select
            className="form-control"
            id="category"
            {...register("category")}
          >
            <option value={`Javascript`}>Javascript</option>
            <option value={`PHP`}>PHP</option>
          </select>
        </div>
        <div className="form-group row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;
