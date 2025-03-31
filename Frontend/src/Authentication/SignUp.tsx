import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import Signpng from "../assets/logo3.png";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormInputs = z.infer<typeof signUpSchema>;

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const handleError = (err: string) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg: string) =>
    toast.success(msg, { position: "bottom-right" });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post("http://localhost:8080/signup", data, {
        withCredentials: true,
      });

      const { success, message } = response.data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(message);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        handleError(error.response.data.message || "Registration failed. Please try again.");
      } else {
        handleError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container p-5">
      <div className="row p-5" style={{ marginTop: "15px" }}>
        <div className="col-6 p-5">
          <img src={Signpng} style={{ width: "110%" }} alt="Register" />
        </div>

        <div className="col-6 p-5">
          <h1 className="mb-2 fs-3 fw-bold">Register Now</h1>
          <p className="text-muted fs-5">Or track your existing application.</p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ margin: "30px" }}>
              <input
                style={{ width: "21rem", height: "40px", borderRadius: "5rem" }}
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <small style={{ color: "red", display: "block" }}>
                  {errors.email.message}
                </small>
              )}
            </div>

            <div style={{ margin: "30px" }}>
              <input
                style={{ width: "21rem", height: "40px", borderRadius: "5rem" }}
                type="text"
                placeholder="Enter your username"
                {...register("username")}
              />
              {errors.username && (
                <small style={{ color: "red", display: "block" }}>
                  {errors.username.message}
                </small>
              )}
            </div>

            <div style={{ margin: "30px" }}>
              <input
                style={{ width: "21rem", height: "40px", borderRadius: "5rem" }}
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <small style={{ color: "red", display: "block" }}>
                  {errors.password.message}
                </small>
              )}
            </div>

            <button
              style={{
                padding: "8px",
                color: "white",
                fontWeight: "bold",
                borderBottom: "1px solid #ddd",
                width: "8rem",
                marginLeft: "7rem",
                marginTop: "12px",
              }}
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            
            <br /><br />
            <span style={{ marginLeft: "5rem" }}>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
