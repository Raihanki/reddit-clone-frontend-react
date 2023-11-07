import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();
  let pageTitle;
  switch (location.pathname) {
    case "/":
      pageTitle = "Home Page";
      break;
    case "/login":
      pageTitle = "Login Page";
      break;
    case "/register":
      pageTitle = "Register Page";
      break;
    case "/r":
      pageTitle = "Subreddit Page";
      break;
    case "/u/posts":
      pageTitle = "My Post";
      break;
    case "/u/subreddits":
      pageTitle = "My Subreddits";
      break;
    case "/u/subscribed":
      pageTitle = "My Subscribed";
      break;
    default:
      pageTitle = "Reddit Clone";
      break;
  }
  return (
    <header className="w-full px-10 py-7 border-b overflow-auto">
      <div>
        <h1 className="text-3xl font-medium text-slate-900">{pageTitle}</h1>
      </div>
    </header>
  );
}
