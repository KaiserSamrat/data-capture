import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminRoute from "../../authBasedRoute/AdminRoute";
import AssignInstitute from "../../Components/AssignInstitute/AssignInstitute";
import Attendence from "../../Components/Attendence/Attendence";
import AddInstitute from "../../Components/CreateInstitute/AddInstitute";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Division from "../../Components/Division/Division";
import AddGeo from "../../Components/GeoInformation/AddGeo";
import InstituteList from "../../Components/InstituteList/InstituteList";
import Office from "../../Components/Office/Office";
import ParliamentarySeat from "../../Components/ParliamentarySeat/ParliamentarySeat";
import AddPjp from "../../Components/PJP/AddPjp";
import PJP from "../../Components/PJP/PJP";
import Product from "../../Components/Product/Product";
import AddRoute from "../../Components/RouteNav/AddRoute";
import RouteNav from "../../Components/RouteNav/RouteNav";
import SurveyMainInfo from "../../Components/Survey/SchoolSurvay/SurveyMainInfo";
import Survey from "../../Components/Survey/Survey";
import TargetSet from "../../Components/TargetSet/TargetSet";
import Upazila from "../../Components/Upazila/Upazila";
import UserList from "../../Components/UserList/UserList";
import AddUser from "../../Components/Users/AddUser";
import UserSetRouts from "../../Components/Users/UserSetRouts/UserSetRouts";
import District from "./../../Components/District/District";

const DashboardBodyRoute = () => {
  return (
    <div className="dashboard-route-main-area-gfhdjskyhdcn">
      <Switch>
        <AdminRoute exact path="/admindashboard">
          <Dashboard />
        </AdminRoute>
        <AdminRoute exact path="/admindashboard">
          <Dashboard />
        </AdminRoute>
        <AdminRoute exact path="/institute-list">
          <InstituteList />
        </AdminRoute>
        <AdminRoute exact path="/product">
          <Product />
        </AdminRoute>
        <AdminRoute exact path="/route">
          <RouteNav />
        </AdminRoute>{" "}
        <AdminRoute exact path="/create-route">
          <AddRoute />
        </AdminRoute>
        <AdminRoute exact path="/office">
          <Office />
        </AdminRoute>
        <AdminRoute exact path="/target-set">
          <TargetSet />
        </AdminRoute>
        <AdminRoute exact path="/PJP">
          <PJP />
        </AdminRoute>{" "}
        <AdminRoute exact path="/create-pjp">
          <AddPjp />
        </AdminRoute>
        <AdminRoute exact path="/attendence">
          <Attendence />
        </AdminRoute>{" "}
        <AdminRoute exact path="/create-user">
          <AddUser />
        </AdminRoute>
        <AdminRoute exact path="/set-routs">
          <UserSetRouts />
        </AdminRoute>
        <AdminRoute exact path="/survey">
          <Survey />
        </AdminRoute>{" "}
        <AdminRoute exact path="/create-geo">
          <AddGeo />
        </AdminRoute>{" "}
        <AdminRoute exact path="/create-geo">
          <AddGeo />
        </AdminRoute>{" "}
        <AdminRoute exact path="/create-institute">
          <AddInstitute />
        </AdminRoute>{" "}
        <AdminRoute path="/survay-details/">
          <SurveyMainInfo />
        </AdminRoute>{" "}
        <AdminRoute path="/division">
          <Division />
        </AdminRoute>{" "}
        <AdminRoute path="/district">
          <District />
        </AdminRoute>{" "}
        <AdminRoute path="/upazila">
          <Upazila />
        </AdminRoute>{" "}
        <AdminRoute path="/parliamentary-seat">
          <ParliamentarySeat />
        </AdminRoute>
        <AdminRoute exact path="/user-list">
          <UserList />
        </AdminRoute>{" "}
        <Route exact path="/assign-institute">
          <AssignInstitute />
        </Route>
      </Switch>
    </div>
  );
};

export default DashboardBodyRoute;
