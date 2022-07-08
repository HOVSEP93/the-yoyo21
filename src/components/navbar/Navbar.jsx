import React, { Fragment } from 'react';

// Styles
import './Navbar.scss';
// import Temple from '../.././assets/temple.svg';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { RiWechatPayFill } from 'react-icons/ri';

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          {/* <img src={Temple} alt="dojo logo" /> */}
          <RiWechatPayFill className="icon-logo" alt="dojo logo" />
          <span>YOYO21</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            {/* <li>Hello,{user.displayName}</li> */}

            <li>
              {!isPending && (
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              )}
              {isPending && (
                <button className="btn" onClick={logout} disabled>
                  Logging out...
                </button>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
