import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import MainHeader from '../../components/MainHeader';
import MainNav from '../../components/MainNav';

export default function RootLayoutAuth() {
  const { token } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // Valida se existe token, se não existir manda para o login
  React.useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    }
  }, [token]);

  return (
    <>
      <div className="grid grid-cols-[18rem_1fr] gap-10">
        <aside className="min-h-screen h-full bg-gray-200 p-5 flex flex-col gap-8">
          <MainHeader />
          <MainNav />
        </aside>
        <main className="py-5 pr-10">
          <Outlet />
        </main>
      </div>
    </>
  );
}
