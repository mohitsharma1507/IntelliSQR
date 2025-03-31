
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


type LoginFormInputs = z.infer<typeof loginSchema>;

function Login(){
  const navigate = useNavigate();
  
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

 
  const handleError = (err: string) =>
    toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg: string) =>
    toast.success(msg, { position: "bottom-left" });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        data,
        { withCredentials: true }
      );
      
      const { success, message } = response.data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
      handleError("User not Found .Try Again");
    }
  };

  return (
    <div
      className="form_container"
      style={{
        marginTop: "12rem",
        marginLeft: "32rem",
        backgroundColor: "#fff",
        padding: "2rem 3rem",
        borderRadius: "0.5rem",
        width: "100%",
        height: "23em",
        maxWidth: "470px",
        boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
        background:
          "linear-gradient(90deg, rgba(2, 0, 36, 1), rgba(143, 187, 204, 1) 35%, rgba(0, 212, 255, 1) 100%)",
      }}
    >
      <h2 style={{ fontWeight: "bold" }}>Login Account</h2>
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
          type="submit"
          style={{
            padding: "8px",
            color: "white",
            fontWeight: "bold",
            borderBottom: "1px solid #ddd",
            width: "8rem",
            marginLeft: "7rem",
            marginTop: "12px",
          }}
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <span style={{ marginLeft: "6rem" }}>
          Don't have an account?{" "}
          <Link to={"/signup"} style={{ color: "black" }}>
            Register
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
