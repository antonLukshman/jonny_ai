import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../Common/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to log in: " + error.message);
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Failed to log in with Google: " + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo.svg"
            alt="Jonny AI Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-primary">
            Welcome to Jonny AI
          </h2>
          <p className="text-gray-400">Log in to start chatting</p>
        </div>

        <div className="bg-background-light rounded-xl shadow-lg p-6">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full bg-background-lighter text-white rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-background-lighter text-white rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="my-4 flex items-center justify-between">
            <hr className="w-full border-gray-600" />
            <p className="text-gray-400 px-3">OR</p>
            <hr className="w-full border-gray-600" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-black rounded-lg p-3 flex items-center justify-center font-medium transition-all duration-200 hover:bg-gray-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary-light"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
