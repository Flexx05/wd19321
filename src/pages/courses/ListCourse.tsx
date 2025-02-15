import { useEffect, useState } from "react";
import ICourse from "../../interface/course";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ListCourse() {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/courses");
        setCourses(data);
      } catch (error) {
        toast.error((error as AxiosError).message);
      }
    };
    getAllCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn chắc chắn xóa không?")) {
      try {
        await axios.delete(`http://localhost:3000/courses/${id}`);
        toast.success("Xóa sản phẩm thành công");
        setCourses((prev: ICourse[]) => {
          return prev.filter((item) => {
            return item.id !== id;
          });
        });
      } catch (error) {
        toast.error((error as AxiosError).message);
      }
    }
  };
  return (
    <div>
      <h1>List Courses</h1>
      <Link to={`add`} className="btn btn-primary">
        Add
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Course Name</th>
            <th>Thumbnail</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((item: ICourse, index: number) => {
            return (
              <tr key={item.id}>
                <td scope="row"> {index + 1} </td>
                <td> {item.courseName} </td>
                <td>
                  <img src={item.thumbnail} width={150} />
                </td>
                <td> {item.category} </td>
                <td>
                  <Link to={`edit/${item.id}`} className="btn btn-warning">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListCourse;
