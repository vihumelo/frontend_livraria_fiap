import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayoutPublic from './pages/public-pages/RootLayoutPublic';
import Login from './pages/public-pages/Login';
import SignUp from './pages/public-pages/SignUp';
import RootLayoutAuth from './pages/auth-pages/RootLayoutAuth';
import Books from './pages/auth-pages/Books';
import Publishers from './pages/auth-pages/Publishers';
import Categories from './pages/auth-pages/Categories';
import Authors from './pages/auth-pages/Authors';
import AuthProvider from './providers/AuthProvider';
import { SWRConfig } from 'swr';
import api from './helpers/api';
import 'react-loading-skeleton/dist/skeleton.css';
import BookDetails from './pages/auth-pages/BookDetails';
import BookCreate from './pages/auth-pages/BookCreate';
import BookUpdate from './pages/auth-pages/BookUpdate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutAuth />,
    children: [
      {
        path: 'autores',
        element: <Authors />,
      },
      {
        path: 'categorias',
        element: <Categories />,
      },
      {
        path: 'editoras',
        element: <Publishers />,
      },
      {
        path: '/livros/novo',
        element: <BookCreate />,
      },
      {
        path: '/livros/:id/editar',
        element: <BookUpdate />,
      },
      {
        path: '/livros/:id',
        element: <BookDetails />,
      },
      {
        path: '',
        element: <Books />,
      },
    ],
  },
  {
    path: '/auth',
    element: <RootLayoutPublic />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'cadastro',
        element: <SignUp />,
      },
    ],
  },
]);

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher: api,
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SWRConfig>
  );
}
