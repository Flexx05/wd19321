import { useForm } from "react-hook-form";
import { ILogin, IRegister } from "../interface/user";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();
  const nav = useNavigate();

  const onSubmit = async (dataInput: ILogin) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/login`,
        dataInput
      );
      localStorage.setItem("token", data.accessToken);
      toast.success("Đăng nhập thành công");
      nav("/");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
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

export default Login;
