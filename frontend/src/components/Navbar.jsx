import { MessageSquare, Settings, LogOut, User } from "lucide-react"; // Ensure these are imported
import { Link, useNavigate  } from "react-router-dom"; // Import Link from react-router-dom
import { useAuthStore } from "../store/useAuthStore";
import Profile from "../pages/Profile";

const Navbar = () => {
    const { logout, authUser  } = useAuthStore();
    const navigate = useNavigate();
    const handleProfile = () =>{
        navigate("/profile");
    }

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 bg-primary/40">
            <div className="container mx-auto px-4 h-12">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Email-Talk</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                    <button
                            className="flex gap-2 items-center"
                         //    onClick={logout}
                            aria-label="Logout"
                        >
                            <Settings className="size-4  flex items-center justify-center" />
                            <span className="hidden sm:inline">Setting</span>
                        </button>

                        <button className="flex gap-2 items-center" aria-label="Profile" onClick={handleProfile}>
                         <User className="size-4  flex items-center justify-center" />
                         <span className="hidden sm:inline">Profile</span>

                        </button>

                        <button
                            className="flex gap-2 items-center"
                            onClick={logout}
                            aria-label="Logout"
                        >
                            <LogOut className="size-4  flex items-center justify-center"/>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;