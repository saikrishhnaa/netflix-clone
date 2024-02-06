import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout";
import Browse from "./pages/browse";
import Login from "./pages/login";
import { AuthProvider, useAuth } from "./common/auth";
import Profile from "./pages/profile";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Outlet />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="ManageProfiles" element={<Profile edit></Profile>} />
          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="latest" element={<Layout />}>
            <Route index element={<h1>Latest</h1>} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
