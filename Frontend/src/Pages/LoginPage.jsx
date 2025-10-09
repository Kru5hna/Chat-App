import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, MessageCircleIcon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl md:h-[700px] h-[570px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-zinc-950 shadow-lg rounded-lg overflow-hidden">
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-zinc-700">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                  <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                    Sign In
                  </h2>
                  <p className="text-zinc-300">Sign In for the Existing Account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                 

                  <div>
                    <label className="block text-sm font-medium text-zinc-200 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-colors duration-200"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-200 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-colors duration-200"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      <span className="transition-transform ease-out duration-200 group-hover:scale-110">
                        Sign In
                      </span>
                    )}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <Link
                    to="/signup"
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                  >
                    Don't Have an Account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-purple-900/20 to-transparent">
              <div>
                <img
                  src="/login.jpeg"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain rounded-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-purple-400">
                    Connect Anytime, Anywhere!
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-0.5 text-sm font-medium text-purple-300">
                      Free
                    </span>
                    <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-0.5 text-sm font-medium text-purple-300">
                      Easy Setup
                    </span>
                    <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-0.5 text-sm font-medium text-purple-300">
                      Private
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};
export default LoginPage;

