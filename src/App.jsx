import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DetailPost from "./components/Post/DetailPost";
import Index from "./pages/subreddit/Index";
import DetailSubreddit from "./pages/subreddit/DetailSubreddit";
import NotFound from "./pages/NotFound";
import CreateSubreddit from "./pages/subreddit/CreateSubreddit";
import MyPost from "./pages/post/MyPost";
import MySubreddit from "./pages/subreddit/MySubreddit";
import MySubscribed from "./pages/subreddit/MySubscribed";
import UpdateSubreddit from "./pages/subreddit/UpdateSubreddit";
import Authenticate from "./middleware/Authenticate";

const Layout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      //   {
      //     path: "/u/:username/posts/:post",
      //     element: <DetailPost />,
      //   },
      {
        path: "/r",
        element: <Index />,
      },
      {
        path: "/r/:subreddit",
        element: <DetailSubreddit />,
      },
      {
        path: "/r/:subreddit/:post",
        element: <DetailPost />,
      },
      {
        path: "/r/create",
        element: (
          <Authenticate>
            <CreateSubreddit />
          </Authenticate>
        ),
      },
      {
        path: "/r/update/:subreddit",
        element: (
          <Authenticate>
            <UpdateSubreddit />
          </Authenticate>
        ),
      },
      {
        path: "/u/posts",
        element: (
          <Authenticate>
            <MyPost />
          </Authenticate>
        ),
      },
      {
        path: "/u/subreddits",
        element: (
          <Authenticate>
            <MySubreddit />
          </Authenticate>
        ),
      },
      {
        path: "/u/subscribed",
        element: (
          <Authenticate>
            <MySubscribed />
          </Authenticate>
        ),
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
