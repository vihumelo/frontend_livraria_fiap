import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  RiBookFill,
  RiUserFill,
  RiStickyNoteFill,
  RiArticleFill,
  RiLogoutBoxRFill,
} from 'react-icons/ri';
import useAuth from '../hooks/useAuth';

function MainNavItem({ icon: Icon, to, children }) {
  return (
    <Link
      to={to}
      className="flex gap-2 items-center p-2 w-full rounded font-bold hover:bg-gray-900/[0.06] transition-all duration-200 ease-in-out"
    >
      <Icon />
      {children}
    </Link>
  );
}

MainNavItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
};

export default function MainNav() {
  const { logout } = useAuth();

  return (
    <nav className="grid gap-4">
      <MainNavItem to="/" icon={RiBookFill}>
        Livros
      </MainNavItem>
      <MainNavItem to="/autores" icon={RiUserFill}>
        Autores
      </MainNavItem>
      <MainNavItem to="/categorias" icon={RiStickyNoteFill}>
        Categorias
      </MainNavItem>
      <MainNavItem to="/editoras" icon={RiArticleFill}>
        Editoras
      </MainNavItem>
      <button
        onClick={() => {
          logout();
        }}
        className="flex gap-2 items-center p-2 w-full rounded font-bold hover:bg-gray-900/[0.06] transition-all duration-200 ease-in-out"
      >
        <RiLogoutBoxRFill />
        Sair
      </button>
    </nav>
  );
}
