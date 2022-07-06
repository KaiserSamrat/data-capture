import { Redirect } from 'react-router-dom';
import Login from '../Components/Authentication/Login';

import Dashboard from '../Components/Dashboard/Dashboard';

import AddProduct from '../Components/Product/AddProduct';
import Product from '../Components/Product/Product';
import AddUser from '../Components/User/AddUser';
import User from '../Components/User/User';
import AddBrand from '../Components/Info/Brand/AddBrand';
import Brand from '../Components/Info/Brand/Brand';
import AddCategory from '../Components/Info/Category/AddCategory';
import Category from '../Components/Info/Category/Category';
const openRoute = [
  // { path: "/logout", component: Logout },
  { path: '/login', component: Login },

  // { path: "/register", component: Register },
];

const protectedRoute = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/admin-dashboard" />,
    roles: ['SUPERADMIN', 'CENTRALWAREHOUSE', 'HUB', 'ADMIN', "VIEWADMIN"],
  },
  {
    path: '/admin-dashboard',
    component: Dashboard,
    exact: true,
    roles: ['SUPERADMIN', 'CENTRALWAREHOUSE', 'HUB', 'ADMIN', "VIEWADMIN"],
  },




 


  {
    path: '/user',
    component: User,
    exact: true,
    roles: ['SUPERADMIN', 'CENTRALWAREHOUSE', 'HUB', 'ADMIN', "VIEWADMIN"],
  },
  {
    path: '/user/add-user',
    component: AddUser,
    exact: true,
    roles: ['SUPERADMIN'],
  },

  {
    path: '/user/edit-user/:id',
    component: () => <AddUser edit />,
    exact: true,
    roles: ['SUPERADMIN'],
  },
  {
    path: '/product',
    component: Product,
    exact: true,
    roles: ['SUPERADMIN', 'CENTRALWAREHOUSE', 'HUB', 'ADMIN', "VIEWADMIN"],
  },
  {
    path: '/product/update-product/:id',
    component: () => <AddProduct edit />,
    exact: true,
    roles: ['SUPERADMIN'],
  },
  {
    path: '/product/add-product',
    component: AddProduct,
    exact: true,
    roles: ['SUPERADMIN'],
  },
  {
    path: '/brand',
    component: Brand,
    exact: true,
    roles: ['SUPERADMIN', 'CENTRALWAREHOUSE', 'ADMIN', "VIEWADMIN"],
  },
  {
    path: '/brand/add-brand',
    component: AddBrand,
    exact: true,
    roles: ['SUPERADMIN'],
  },

  {
    path: '/brand/update-brand/:id',
    component: () => <AddBrand edit />,
    exact: true,
    roles: ['SUPERADMIN'],
  },
  {
    path: '/category',
    component: Category,
    exact: true,
    roles: ['SUPERADMIN', 'CENTRALWAREHOUSE', 'ADMIN', "VIEWADMIN"],
  },
  {
    path: '/category/update-category/:id',
    component: () => <AddCategory edit />,
    exact: true,
    roles: ['SUPERADMIN'],
  },
  {
    path: '/category/add-category',
    component: AddCategory,
    exact: true,
    roles: ['SUPERADMIN'],
  },
  
];

export { openRoute, protectedRoute };
