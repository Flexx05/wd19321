import { useEffect, useState } from "react";
import IProduct from "../../interface/product";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import instance from "../../config/axiosConfig";

function List() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/products");
        setProducts(data);
      } catch (error) {
        toast.error((error as AxiosError).message);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn chắc chắn xóa chứ?")) {
      try {
        await instance.delete(`/products/${id}`);
        toast.success("Xóa sản phẩm thành công");
        setProducts((prev: IProduct[]) => {
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
      <h1>List Products</h1>
      <Link className="btn btn-primary" to={`add`}>
        Add
      </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: IProduct, index: number) => {
            return (
              <tr key={product.id}>
                <td scope="row">{index + 1}</td>
                <td>{product.title}</td>
                <td>
                  <img src={product.thumbnail} width={100} />
                </td>
                <td>${product.price}</td>
                <td>{product.category.toLocaleUpperCase()}</td>
                <td>
                  <Link to={`edit/${product.id}`} className="btn btn-warning">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(product.id);
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

export default List;
