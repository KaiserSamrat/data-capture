import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './assests/scss/style.scss';
// Import scss
import './assests/scss/theme.scss';
// import DashboardMainNavbar from './DashboardCommonFile/DashboardNav/DashboardMainNavbar';
import AuthLayout from './Layout/AuthLayout';
import AuthMiddleware from './Routes/Middleware/AuthMiddleware';
import { openRoute, protectedRoute } from './Routes/Routes';

toast.configure();
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {openRoute.map((route, idx) => (
            <Route
              exact
              path={route.path}
              component={route.component}
              key={idx}
            />
          ))}
          {protectedRoute.map((route, idx) => (
            <AuthMiddleware
              exact={route.exact}
              path={route.path}
              key={idx}
              roles={route.roles}
              component={route.component}
              layout={AuthLayout}
              isAuthProtected
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
