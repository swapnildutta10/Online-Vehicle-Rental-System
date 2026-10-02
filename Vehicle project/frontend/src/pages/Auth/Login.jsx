import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { signIn, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUserState] = useState(null);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Set checkingAuth to false on mount
    useEffect(() => {
        setCheckingAuth(false);
    }, []);

    if (checkingAuth) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <span className="text-xl font-semibold">Loading...</span>
            </div>
        );
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Check users in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            setUser(foundUser); // <-- update global auth context
            setUserState(foundUser);
            setLoading(false);
            alert("Login successfully!");
            navigate("/"); // Redirect to home page
        } else {
            setError("Invalid email or password");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen px-3">
            <form onSubmit={handleLogin} className="w-[400px] border px-6 py-12 space-y-5 shadow-[0px_0px_10px_0px] shadow-gray-300 rounded-xl bg-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-center pb-4">Log In</h2>
                <div>
                    <p className="text-sm pb-1">Email address : </p>
                    <input type="email" name="email" defaultValue="admin@gmail.com" placeholder="Email" required className="border p-2 text-[15px] font-semibold text-gray-600 w-full outline-purple-400 bg-gray-200 rounded-lg" />
                </div>
                <div className="relative">
                    <p className="text-sm pb-1">Password : </p>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="********"
                        defaultValue="123456"
                        required
                        className="border p-2 text-[15px] font-semibold text-gray-600 w-full outline-purple-400 bg-gray-200 rounded-lg pr-10"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-9 cursor-pointer select-none text-xl text-gray-500"
                        style={{ userSelect: 'none' }}
                        tabIndex={0}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <div>
                    <button type="submit" className="p-2.5 text-[15px] font-semibold cursor-pointer hover:bg-purple-700 active:scale-[0.99] w-full bg-purple-600 text-white duration-200 rounded-lg">
                        {loading ? <span>Loading...</span> : <span>Login</span>}
                    </button>
                    <Link to='/login' className="text-sm hover:underline hover:text-purple-500">Forgot password ?</Link>
                </div>
                <hr />
                <p className="text-center">New here ? <span onClick={() => navigate('/register')} className="font-semibold hover:underline cursor-pointer text-black">Register</span></p>
            </form>
        </div>
    );
};

export default Login;