import React from "react";
import "../../styles/register.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Register = () => {
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return (
    <div className="register-box">
      <h2>Người dùng mới ? Đăng kí tài khoản</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Logging in", values);
            setSubmitting(true);
          }, 5000);
        }}
        validationSchema={Yup.object().shape({
          fistname: Yup.string().required("Họ không được bỏ trống"),
          lastname: Yup.string().required("Tên không được bỏ trống"),
          phonenumber: Yup.string()
            .required("Số điện thoại không được bỏ trống")
            .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
          email: Yup.string()
            .email("Email phải là một email hợp lệ")
            .required("Email không được bỏ trống"),
          password: Yup.string()
            .required("Chưa nhập mật khẩu.")
            .min(8, "Mật khẩu quá ngắn - ít nhất phải 8 ký tự.")
            .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa nhất một số."),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu nhập lại không đúng")
            .required("Chưa nhập mật khẩu."),
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
            handleSubmit,
          } = props;
          return (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <h3 className="info-user">Thông tin khách hàng</h3>
                <div className="user-box">
                  <input
                    type="text"
                    name="fistname"
                    required
                    value={values.fistname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.fistname && touched.fistname && "error"}
                  />
                  <label>Họ</label>
                  {errors.fistname && touched.fistname && (
                    <div className="input-feedback">{errors.fistname}</div>
                  )}
                </div>
                <div className="user-box">
                  <input
                    type="text"
                    name="lastname"
                    required
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.lastname && touched.lastname && "error"}
                  />
                  <label>Tên</label>
                  {errors.lastname && touched.lastname && (
                    <div className="input-feedback">{errors.lastname}</div>
                  )}
                </div>
                <h3 className="info-user">Thông tin đăng nhập</h3>

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
                    type="text"
                    name="phonenumber"
                    value={values.phonenumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.phonenumber && touched.phonenumber && "error"
                    }
                    required
                  />
                  <label>Số điện thoại</label>
                  {errors.phonenumber && touched.phonenumber && (
                    <div className="input-feedback">{errors.phonenumber}</div>
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
                  <label>Mật khẩu </label>
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirm_password &&
                      touched.confirm_password &&
                      "error"
                    }
                    required
                  />
                  <label>Nhập lại mật khẩu</label>
                  {errors.confirm_password && touched.confirm_password && (
                    <div className="input-feedback">
                      {errors.confirm_password}
                    </div>
                  )}
                </div>
                <div className="checkbox-btn">
                  <label className="anim">
                    <input type="checkbox" className="checkbox" required />
                    <span>
                      {" "}
                      Tôi đồng ý với <b>điều khoản và điều kiện thành viên</b>
                    </span>
                  </label>
                  <label className="anim">
                    <input type="checkbox" className="checkbox" required />
                    <span>
                      Gửi email cho tôi ưu đãi và lời mời đặc biệt cho đợt giảm
                      giá và sự kiện
                    </span>
                  </label>
                </div>
                <div className="btn-button">
                  <button className="btn-login" disabled={isSubmitting}>
                    <span />
                    <span />
                    <span />
                    <span />
                    Đăng Kí
                  </button>
                  <div className="box-text">
                    <Link to="/login" className="btn-text">
                      Quay lại đăng nhập
                    </Link>
                  </div>
                </div>
              </form>
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
