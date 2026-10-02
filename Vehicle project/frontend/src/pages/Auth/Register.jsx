import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (storedCurrentUser) {
            setUser(storedCurrentUser);
        }
    }, []);

    if (user) {
        return <Navigate to='/dashboard' />;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Get existing users or empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            setError("Email already registered");
            setLoading(false);
            return;
        }
        // Add new user
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        setUser(newUser);
        setLoading(false);
        // Optionally, redirect to dashboard or login
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center w-full h-screen px-3">
            <form onSubmit={handleRegister} className="w-[400px] border px-6 py-12 space-y-5 shadow-[0px_0px_10px_0px] shadow-gray-300 rounded-xl bg-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-center pb-4">Register</h2>
                <div>
                    <p className="text-sm pb-1">Email address : </p>
                    <input type="email" name="email" placeholder="Email" required className="border p-2 text-[15px] font-semibold text-gray-600 w-full outline-purple-400 bg-gray-200 rounded-lg" />
                </div>
                <div className="relative">
                    <p className="text-sm pb-1">Password : </p>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="********"
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
                        {loading ? <span>Loading...</span> : <span>Register</span>}
                    </button>
                    <Link to='/login' className="text-sm hover:underline hover:text-purple-500">Already have an account? Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;