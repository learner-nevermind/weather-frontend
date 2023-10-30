import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { appRoutes } from "./constants";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: appRoutes.signIn,
    element: <SignIn />,
  },
  {
    path: appRoutes.signUp,
    element: <SignUp />,
  },
  {
    path: appRoutes.dashboard,
    element: <Dashboard />,
  },
  {
    path: appRoutes.profile,
    element: <Profile />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
