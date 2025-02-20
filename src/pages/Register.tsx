import { useForm } from "react-hook-form";
import { IRegister } from "../interface/user";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegister>();
  const nav = useNavigate();

  const onSubmit = async (data: IRegister) => {
    try {
      data.confirmPassword = undefined;
      await axios.post(`http://localhost:3000/register`, data);
      toast.success("Đăng ký thành công");
      nav("/login");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row">
            <label htmlFor="fullName" className="col-sm-12 col-form-label">
              Full name
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="fullName"
                {...register("fullName", {
                  required: "Tên không được để trống",
                })}
              />
              {errors?.fullName && (
                <span className="text-danger">{errors?.fullName?.message}</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-12 col-form-label">
              Email address
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="email"
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors?.email && (
                <span className="text-danger">{errors?.email?.message}</span>
              )}
            </div>
          </div>
          <div className="d-flex gap-2">
            <input
              type="radio"
              className="form-check-input"
              id="male"
              value={`male`}
              {...register("gender", {
                required: "Hãy chọn giới tính phù hợp",
              })}
            />
            <label htmlFor="male" className="form-check-label">
              Nam
            </label>
            <input
              type="radio"
              className="form-check-input"
              id="female"
              value={`female`}
              {...register("gender", {
                required: "Hãy chọn giới tính phù hợp",
              })}
            />
            <label htmlFor="female" className="form-check-label">
              Nữ
            </label>
            {errors?.gender && (
              <span className="text-danger">{errors?.gender?.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              className="form-control"
              {...register("birthday", {
                required: "Ngày sinh không được để trống",
              })}
            />
            {errors?.birthday && (
              <span className="text-danger">{errors?.birthday?.message}</span>
            )}
          </div>

          <div className="form-group row">
            <label htmlFor="password" className="col-sm-12 col-form-label">
              Password
            </label>
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu tối thiểu 6 ký tự",
                  },
                })}
              />
              {errors?.password && (
                <span className="text-danger">{errors?.password?.message}</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="confirmPassword"
              className="col-sm-12 col-form-label"
            >
              Confirm Password
            </label>
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Xác thực mật khẩu bắt buộc nhập",
                  validate: (value) => {
                    return value === watch("password") || "Mật khẩu không khớp";
                  },
                })}
              />
              {errors?.confirmPassword && (
                <span className="text-danger">
                  {errors?.confirmPassword?.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
