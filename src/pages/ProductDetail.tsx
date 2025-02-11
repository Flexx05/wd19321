import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IProduct from "../interface/product";

function ProductDetail() {
  const { id } = useParams<string>();
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProductDetail = async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    };
    getProductDetail();
  }, [id]);

  useEffect(() => {
    const getProductByCategory = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/products?category=${product?.category}`
      );
      setRelatedProducts(data);
    };
    getProductByCategory();
  });
  return (
    <div>
      <h1>Product Detail</h1>
      <div className="row">
        <div className="col-xl-7 col-md-6 col-12 d-lg-flex justify-content-center">
          <img src={product?.thumbnail} alt={product?.title} height={500} />
        </div>
        <div className="col-xl-4 col-md-6 col-12 d-flex flex-column justify-content-between">
          <h1 className="border-bottom border-3 pb-2 border-danger">
            {product?.title}
          </h1>
          <p>{product?.description}</p>
          <div className="d-flex gap-5">
            <h4>
              Rate: <span className="text-warning">{product?.rating}</span>
            </h4>
            <h4>Brand: {product?.brand}</h4>
          </div>
          <div>
            <h3>Color</h3>
            <div className="d-flex justify-content-start gap-1">
              <div className="border border-2 bg-light p-4 rounded-circle"></div>
              <div className="border border-2 bg-primary p-4 rounded-circle opacity-50"></div>
              <div className="border border-2 bg-black p-4 rounded-circle"></div>
              <div className="border border-2 bg-danger p-4 rounded-circle opacity-25"></div>
              <div className="border border-2 bg-success p-4 rounded-circle opacity-25"></div>
            </div>
          </div>
          <h2 className="text-danger">${product?.price}</h2>
          <div className="d-flex gap-3">
            <button
              className="btn btn-danger p-3 px-4 rounded-4"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}
            >
              -
            </button>
            <button disabled className="btn border-0 p-3 px-4">
              {quantity}
            </button>
            <button
              className="btn btn-danger p-3 px-4 rounded-4"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="d-flex row mt-3">
            <button className="btn btn-danger fs-4 col-12 col-xl-8 col-md-8 py-3 rounded-4">
              Buy Now
            </button>
            <button className="btn btn-outline-danger fs-5 col-12 col-xl-4 col-md-4 rounded-4">
              Add to cart
            </button>
          </div>
        </div>
        <div className="col-xl-1"></div>
      </div>
      <h2 className="mt-5">Related Products</h2>
      <div className="row">
        {relatedProducts.map((product: IProduct) => {
          return (
            <div key={product.id} className="col-xl-3 col-md-4 col-6">
              <div className="card mb-4 p-2" style={{ width: "18rem" }}>
                <img
                  src={product.thumbnail}
                  height={300}
                  style={{ objectFit: "contain" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.title}</h5>
                  <p className="card-text text-truncate">
                    {product.description}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                    >
                      Show Detail
                    </Link>
                    <button className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductDetail;
