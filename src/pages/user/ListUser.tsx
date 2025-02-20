import { useEffect, useState } from "react";
import { IUser } from "../../interface/user";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

function ListUser() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getAllUsser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users`);
        setUsers(data);
      } catch (error) {
        toast.error((error as AxiosError).message);
      }
    };
    getAllUsser();
  }, []);
  const calculateAge = (birthdate: string) => {
    const currentYear = new Date().getFullYear();
    return currentYear - Number(birthdate.slice(0, 4));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn chắc chắn xóa không?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        setUsers((prev: IUser[]) => {
          return prev.filter((item: IUser) => {
            return item.id !== id;
          });
        });
        toast.success("Xóa thành công");
      } catch (error) {
        toast.error((error as AxiosError).message);
      }
    }
  };

  return (
    <div>
      <h1>List User</h1>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item: IUser, index: number) => {
            return (
              <tr key={item.id}>
                <td scope="row">{index + 1}</td>
                <td>{item.fullName}</td>
                <td>{calculateAge(item.birthday)}</td>
                <td>{item.gender === "male" ? "Nam" : "Nữ"}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="btn btn-danger"
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

export default ListUser;
