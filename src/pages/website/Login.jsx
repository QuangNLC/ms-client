import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../../styles/login.css";

const Login = () => (
  <div className="login-box">
    <h2>Đăng Nhập</h2>
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setSubmitting(true);
        }, 5000);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email phải là một email hợp lệ")
          .required("Email không được bỏ trống"),
        password: Yup.string()
          .required("Chưa nhập mật khẩu.")
          .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự.")
          .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số."),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          // handleSubmit,
        } = props;
        const handleSubmit = (event) => {
          if (errors.email == null && errors.password == null) {
            console.log(values, "data login");
          }
        };
        return (
          <React.Fragment>
            <form onSubmit={handleSubmit()}>
              <div className="user-box">
                <input
                  type="text"
                  name="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email && "error"}
                />
                <label>Địa chỉ email / Số điện thoại </label>
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>
              <div className="user-box">
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password && "error"}
                  required
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
                <label>Mật Khẩu</label>
              </div>
              <div className="btn-button">
                <button className="btn-login" disabled={isSubmitting}>
                  <span />
                  <span />
                  <span />
                  <span />
                  Đăng Nhập
                </button>
                <div className="box-text">
                  <p className="btn-text">Quên mật khẩu ?</p>
                  <p className="btn-text">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="btn-register">
                      {" "}
                      Đăng kí{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </form>
            <p className="text-noti">
              Nếu Quý khách có vấn đề gì thắc mắc hoặc cần hỗ trợ gì thêm có thể
              liên hệ : <br /> Hotline: 0346.410.666 <br /> để được support
              nhanh nhất.{" "}
            </p>
          </React.Fragment>
        );
      }}
    </Formik>
  </div>
);

export default Login;
