import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Bg from '../../../assets/img/bg.png';
import Logo from '../../../assets/img/gymnazu.png';
import SuccessModal from "../../modals/SuccessModal";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading, login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user && !isSubmitting) {
      navigate('/student-dashboard', { replace: true });
    }

  }, [user, authLoading, isSubmitting, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setIsSubmitting(true);

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      setIsSubmitting(false)
      return;
    }

    try {
      const result = await login(username, password);

      if (result.success) {
        setLoggedInUser(result.user.fullName);
        setShowSuccessModal(true);
        console.log('nicewan po');
        setTimeout(() => {
          navigate('/student-dashboard');
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        username={loggedInUser}
      />

      <div className="relative h-[85.4vh] w-full flex items-center justify-center pb-6">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Bg})` }}
        >
          <div className="absolute inset-0 bg-stone-900/60 dark:bg-black/70 z-0 transition-colors duration-300"></div>
        </div>

        <div className="relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl shadow-xl bg-stone-800/60 dark:bg-gray-900/70 border border-stone-700 dark:border-gray-600 backdrop-blur-sm transition-colors duration-300">

          <div className="flex flex-col items-center mb-6">
            <img
              src={Logo}
              alt="School Logo"
              className="w-20 h-20 mb-4 object-contain"
            />
            <h2 className="text-xl font-bold uppercase text-white tracking-wider">Student Login</h2>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="relative">
              <input
                type="text"
                placeholder="Student Number"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-amber-500 transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm text-sm disabled:opacity-50"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </span>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-amber-500 transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm text-sm disabled:opacity-50"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a3 3 0 106 0v-3a3 3 0 00-6 0v3z"></path></svg>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-xs text-gray-300 hover:text-amber-400 transition duration-300">Forgot Password?</Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-gray-900 font-semibold rounded-full bg-amber-400 hover:bg-amber-300 transition duration-300 shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6 text-xs text-gray-300">
            Need help? Contact the <Link to="/#contact-us" className="font-semibold text-amber-400 hover:underline">School Office</Link>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;