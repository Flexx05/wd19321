import { useEffect, useState } from "react";
import IProduct from "../interface/product";
import axios, { AxiosError } from "axios";
import ProductItem from "../components/ProductItem";
import Pagenation from "../components/Pagenation";
import toast from "react-hot-toast";

function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemPerPage = 8;

  useEffect(() => {
    const getProducts = async (page: number) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/products?_page=${page}&_per_page=${itemPerPage}`
        );

        const totalProducts = data.items;
        setProducts(data.data);
        setTotalPages(Math.ceil(totalProducts / itemPerPage));
        if (page <= 1) {
          setCurrentPage(1);
          return;
        }
        // if (page > totalPages) {
        //   setCurrentPage(totalPages);
        //   return;
        // }
      } catch (error) {
        toast.error((error as AxiosError).message);
      }
    };
    getProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Products</h1>
      <div className="row">
        {Array.isArray(products) &&
          products.map((product: IProduct) => (
            <div key={product.id} className="col-xl-3 col-md-4 col-6">
              <ProductItem {...product} />
            </div>
          ))}
      </div>
      <Pagenation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Product;
