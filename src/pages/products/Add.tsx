import { ProductInput } from "../../interface/product";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// const productInit: ProductInput = {
//   title: "",
//   thumbnail: "",
//   price: 0,
//   category: "smartphones",
//   description: "",
// };

function Add() {
  // const [product, setProduct] = useState<ProductInput>(productInit);

  // const handleChangeInput = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //   key: string
  // ) => {
  //   setProduct((prev: ProductInput) => {
  //     return {
  //       ...prev,
  //       [key]: e.target.value,
  //     };
  //   });
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:3000/products", product);
  //     toast.success("Adding product success");
  //   } catch (error) {
  //     toast.error((error as AxiosError).message);
  //   }
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>();
  const nav = useNavigate();
  const onSubmit = async (data: ProductInput) => {
    try {
      await axios.post("http://localhost:3000/products", data);
      toast.success("Adding product success");
      nav("/admin/product");
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };
  return (
    <div>
      <h1>Product Add</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="title" className="col-sm-1-12 col-form-label">
            Name:
          </label>
          <div className="col-sm-1-12">
            <input
              type="text"
              className="form-control"
              id="title"
              {...register("title", {
                required: "Tên sản phẩm không được để trống",
                minLength: {
                  value: 6,
                  message: "Tên sản phẩm tối thiểu 6 ký tự",
                },
              })}
            />
            {errors?.title && (
              <span className="text-danger">{errors?.title?.message}</span>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-sm-1-12 col-form-label">
            Description:
          </label>
          <div className="col-sm-1-12">
            <input
              type="text"
              className="form-control"
              id="description"
              {...register("description", {
                required: "Mô tả không được để trống",
              })}
            />
            {errors?.description && (
              <span className="text-danger">
                {errors?.description?.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="price" className="col-sm-1-12 col-form-label">
            Price:
          </label>
          <div className="col-sm-1-12">
            <input
              type="text"
              className="form-control"
              id="price"
              {...register("price", {
                required: "Giá sản phẩm không được để trống",
                min: {
                  value: 0,
                  message: "Giá sản phẩm lớn hơn hoặc bằng 0",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Giá sản phẩm phải là số",
                },
              })}
            />
            {errors?.price && (
              <span className="text-danger">{errors?.price?.message}</span>
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
                required: "Ảnh sản phẩm không được để trống",
                maxLength: {
                  value: 255,
                  message: "Đường dẫn ảnh không quá 255 ký tự",
                },
              })}
            />
            {errors?.thumbnail && (
              <span className="text-danger">{errors?.thumbnail?.message}</span>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="category" className="col-sm-1-12 col-form-label">
            Category:
          </label>
          <select
            className="form-control"
            id="category"
            {...register("category")}
          >
            <option value={"smartphones"}>Smartphone</option>
            <option value={"laptops"}>Laptop</option>
            <option value={"fragrances"}>Fragrances</option>
            <option value={"skincare"}>Skincare</option>
            <option value={"groceries"}>Groceries</option>
            <option value={"home-decoration"}>Home-decoration</option>
          </select>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary">
              Action
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
