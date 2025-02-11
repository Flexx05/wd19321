import axios from "axios";
import { useEffect, useState } from "react";

type UserType = {
  id: number;
  name: string;
  phone: string;
  website: string;
  email: string;
  username: string;
};

const UserInit: UserType = {
  id: 0,
  name: "",
  phone: "",
  website: "",
  email: "",
  username: "",
};

function MyUseEffect() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [id, setId] = useState<number>(0);
  const [user, setUser] = useState<UserType>(UserInit);

  useEffect(() => {
    const getAllData = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (data) {
        setUsers(data);
      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    if (id) {
      const getUserById = async () => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (data) {
          setUser(data);
        }
      };
      getUserById();
    }
  }, [id]);
  return (
    <>
      <h1>My use effect</h1>
      <table className="table container">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item: UserType) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setId(item.id);
                    }}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <br />
      <table className="table container">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {user.id} </td>
            <td> {user.name} </td>
            <td> {user.phone} </td>
            <td> {user.email} </td>
            <td> {user.website} </td>
            <td> {user.username} </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default MyUseEffect;
