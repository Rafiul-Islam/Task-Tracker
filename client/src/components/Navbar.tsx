import {useNavigate} from "react-router-dom";
import logout from "../services/auth/logout.ts";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  }
  
  return (
      <>
        Navbar
        <div style={{textAlign: "right"}}>
          <button type='button' style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</button>
        </div>
      </>
  );
};

export default Navbar;
