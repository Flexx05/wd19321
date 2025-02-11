import { useEffect, useState } from "react";
import IProduct from "../../interface/product";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

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
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td scope="row">{product.id}</td>
                <td>{product.title}</td>
                <td>
                  <img src={product.thumbnail} width={100} />
                </td>
                <td>${product.price}</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Remove</button>
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
