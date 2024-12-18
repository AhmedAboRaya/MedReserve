/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios"; 
import { Player } from '@lottiefiles/react-lottie-player';
import { login_api } from "../../apis/apis";
import SkeletonLoader from "./SkeletonLoader"; 
import { motion } from "framer-motion";
import { RingLoader } from "react-spinners"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  // Show form after skeleton loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIsFormVisible(true); 
    }, 2600); 

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const { data } = await axios.post(`${login_api}`, { email, password });
      localStorage.setItem("token", JSON.stringify(data.token));
      
      
      // Show the spinner for 1 second after successful login
      setTimeout(() => {
        setLoading(false);
        // You can navigate to another page here if needed
      }, 1000);
      
    } catch (err) {
      setError(err.response?.data?.msg || "Server Error");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          {/* <RingLoader loading={loading} size={100} color="#5aa7b9" /> */}
          <Player
            loop
            autoplay
            src="../../../public/loader.json"
            style={{ size: "100px", height: "100px" }}
            />
        </div>
      ) : (
        !isFormVisible ? ( 
          <SkeletonLoader />
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-light-bg px-10">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-8">
              {/* Login Form */}
              <h2 className="text-2xl font-bold text-center mb-8 text-light-text">
                Login
              </h2>
              {error && <p className="text-red-500">{error}</p>}
              
              {isFormVisible && ( 
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-light-text"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-light-primary rounded-md shadow-sm focus:outline-none focus:ring-light-primary focus:border-light-primary sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-light-text"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-light-primary rounded-md shadow-sm focus:outline-none focus:ring-light-primary focus:border-light-primary sm:text-sm"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-primary hover:bg-light-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent"
                      disabled={loading} 
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  
            {/* Lottie Animation */}
            <Player
              autoplay
              loop
              src="/loginImage.json"
              className="w-1/2 hidden md:block min-w-72"
            />
            </motion.form>
          </div>
        )
      )}
    </>
  );
};

export default Login;
