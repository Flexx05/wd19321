import { Link } from "react-router-dom";
import IProduct from "../interface/product";

function ProductItem(props: IProduct) {
  return (
    <>
      <div className="card mb-4 p-2" style={{ width: "18rem" }}>
        <img
          src={props.thumbnail}
          height={300}
          style={{ objectFit: "contain" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title text-truncate">{props.title}</h5>
          <p className="card-text text-truncate">{props.description}</p>
          <div className="d-flex justify-content-between">
            <Link to={`/product/${props.id}`} className="btn btn-primary">
              Show Detail
            </Link>
            <Link to="/cart" className="btn btn-primary">
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
