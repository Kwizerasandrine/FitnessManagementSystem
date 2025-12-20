import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { history } from './helpers/history';

// Auth Pages
import SignUp from './newFront/signup/SignUp';
import Login from './newFront/login/SignIn';
import Verify2FA from './newFront/login/Verify2FA';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Main Pages
import Home from './newFront/home/Home.js';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './newFront/Profile/Profile';
import Unauthorized from './pages/Unauthorized';

// Members
import MembersList from './pages/Members/MembersList';
import AddMember from './pages/Members/AddMember';

// Locations
import LocationsList from './pages/Locations/LocationsList';
import AddLocation from './pages/Locations/AddLocation';

// Plans
import PlansList from './pages/Plans/PlansList';
import AddPlan from './pages/Plans/AddPlan';

// Trainers
import TrainersList from './pages/Trainers/TrainersList';
import AddTrainer from './pages/Trainers/AddTrainer';

// Inventory
import InventoryList from './pages/Inventory/InventoryList';
import AddInventory from './pages/Inventory/AddInventory';

// Feedback
import FeedbackList from './pages/Feedback/FeedbackList';
import AddFeedback from './pages/Feedback/AddFeedback';

// Diet
import DietList from './pages/Diet/DietList';
import AddDiet from './pages/Diet/AddDiet';

// MemberPlan
import MemberPlanList from './pages/MemberPlan/MemberPlanList';
import AddMemberPlan from './pages/MemberPlan/AddMemberPlan';

// User Pages
import UserDashboard from './pages/Dashboard/UserDashboard';
import UserPlans from './pages/User/UserPlans';
import UserDiets from './pages/User/UserDiets';
import UserDiet from './newFront/Profile/UserDiet'; // New Diet Recommendation Page
import UserTrainers from './pages/User/UserTrainers';
import UserLocation from './pages/User/UserLocation';

// Trainer Pages
import TrainerDashboard from './pages/Dashboard/TrainerDashboard';
import TrainerClasses from './pages/Trainer/TrainerClasses';
import TrainerMembers from './pages/Trainer/TrainerMembers';

// Protected Route
import ProtectedRoute from './components/common/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/verify-2fa" component={Verify2FA} />
        <Route exact path="/unauthorized" component={Unauthorized} />

        {/* Protected Routes - Admin Dashboard */}
        <ProtectedRoute exact path="/home" component={Home} roles={['admin', 'user', 'trainer']} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} roles={['admin']} />
        <ProtectedRoute exact path="/profile" component={Profile} roles={['admin', 'user', 'trainer']} />

        {/* User Dashboard and Self-Service Routes */}
        <ProtectedRoute exact path="/user-dashboard" component={UserDashboard} roles={['user']} />
        <ProtectedRoute exact path="/user/plans" component={UserPlans} roles={['user']} />
        <ProtectedRoute exact path="/user/diets" component={UserDiets} roles={['user']} />
        <ProtectedRoute exact path="/userdietplan" component={UserDiet} roles={['user']} />
        <ProtectedRoute exact path="/user/trainers" component={UserTrainers} roles={['user']} />
        <ProtectedRoute exact path="/user/location" component={UserLocation} roles={['user']} />

        {/* Trainer Dashboard and Routes */}
        <ProtectedRoute exact path="/trainer-dashboard" component={TrainerDashboard} roles={['trainer']} />
        <ProtectedRoute exact path="/trainer/classes" component={TrainerClasses} roles={['trainer']} />
        <ProtectedRoute exact path="/trainer/members" component={TrainerMembers} roles={['trainer']} />

        {/* Admin Only Routes - Members */}
        <ProtectedRoute exact path="/members" component={MembersList} roles={['admin']} />
        <ProtectedRoute exact path="/members/add" component={AddMember} roles={['admin']} />
        <ProtectedRoute exact path="/members/edit/:id" component={AddMember} roles={['admin']} />

        {/* Admin Only Routes - Locations */}
        <ProtectedRoute exact path="/locations" component={LocationsList} roles={['admin']} />
        <ProtectedRoute exact path="/locations/add" component={AddLocation} roles={['admin']} />
        <ProtectedRoute exact path="/locations/edit/:id" component={AddLocation} roles={['admin']} />

        {/* Admin Only Routes - Plans */}
        <ProtectedRoute exact path="/plans" component={PlansList} roles={['admin']} />
        <ProtectedRoute exact path="/plans/add" component={AddPlan} roles={['admin']} />
        <ProtectedRoute exact path="/plans/edit/:id" component={AddPlan} roles={['admin']} />

        {/* Admin Only Routes - Trainers */}
        <ProtectedRoute exact path="/trainers" component={TrainersList} roles={['admin']} />
        <ProtectedRoute exact path="/trainers/add" component={AddTrainer} roles={['admin']} />
        <ProtectedRoute exact path="/trainers/edit/:id" component={AddTrainer} roles={['admin']} />

        {/* Admin Only Routes - Inventory */}
        <ProtectedRoute exact path="/inventory" component={InventoryList} roles={['admin']} />
        <ProtectedRoute exact path="/inventory/add" component={AddInventory} roles={['admin']} />

        {/* Feedback Routes - Available to admin and users */}
        <ProtectedRoute exact path="/feedback" component={FeedbackList} roles={['admin', 'user']} />
        <ProtectedRoute exact path="/feedback/add" component={AddFeedback} roles={['admin', 'user']} />

        {/* Admin Only Routes - Diet */}
        <ProtectedRoute exact path="/diet" component={DietList} roles={['admin']} />
        <ProtectedRoute exact path="/diet/add" component={AddDiet} roles={['admin']} />
        <ProtectedRoute exact path="/diet/edit/:id" component={AddDiet} roles={['admin']} />

        {/* Admin Only Routes - MemberPlan */}
        <ProtectedRoute exact path="/memberplans" component={MemberPlanList} roles={['admin']} />
        <ProtectedRoute exact path="/memberplans/add" component={AddMemberPlan} roles={['admin']} />

        {/* Redirect to signin if no match */}
        <Route path="*">
          <Redirect to="/signin" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
