import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Account created successfully 🎉");

      setEmail("");
      setPassword("");

      // ✅ go to dashboard immediately
      navigate("/dashboard");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-center mb-4">Signup</h3>

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
        {loading ? "Creating account..." : "Sign Up"}
      </button>
<p style={{ textAlign: "left" }}>
      Already have an account?{" "}
      <Link to="/login">Login</Link>
  </p>


    </form>
  );
}

export default Signup;