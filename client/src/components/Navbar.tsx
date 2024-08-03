import {useNavigate} from "react-router-dom";
import logout from "../services/auth/logout.ts";
import useAuthStore from "../stores/authStore.ts";

const Navbar = () => {
  const navigate = useNavigate();
  const {currentUser} = useAuthStore()
  const handleLogout = () => {
    logout(navigate);
  }
  
  return (
      <>
        User: {currentUser.name}
        <div style={{textAlign: "right"}}>
          <button type='button' style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</button>
        </div>
      </>
  );
};

export default Navbar;
