import { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login successful 🎉");

      setEmail("");
      setPassword("");

      // Immediately go into the app
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD FUNCTION
  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-center mb-4">Login</h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleResetPassword}
          className="text-blue-500 hover:underline mt-2"
        >
          Forgot Password?
        </button>

        <p>
  Don't have an account? <Link to="/signup">Sign up</Link>
</p>
      </form>
    </>
  );
}

export default Login;