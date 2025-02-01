import logout from "../services/auth/logout.ts";
import useAuthStore from "../stores/authStore.ts";
import {Link} from "react-router-dom";
import {FaUserLarge} from "react-icons/fa6";

const Navbar = () => {
    const {currentUser} = useAuthStore()
    const handleLogout = () => {
        logout();
    }

    return (

        <nav className="navbar text-white bg-success py-3 sticky-top">
            <div className="container d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                    <Link className="navbar-brand text-white fw-bold" to="/tasks">
                        Task Tracker
                    </Link>
                    <div className='d-flex align-items-center gap-2 ms-5'>
                        <FaUserLarge/>
                        <span className="text-white fst-italic">{currentUser.name}</span>
                    </div>
                </div>
                <div>
                    <button
                        className='bg-transparent border-0 text-white'
                        type='button'
                        style={{cursor: 'pointer'}}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;






