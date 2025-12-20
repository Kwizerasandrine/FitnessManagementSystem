import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AllMeembers from "./components/MembersComponenets/AllMembers";
import AdminProfile from "./components/AdminProfile";
import Trainer from "./components/MembersComponenets/Trainer";
import Plans from "./components/MembersComponenets/Plans";
import DietPlan from "./components/MembersComponenets/Diet";
import GymEuipments from "./components/MembersComponenets/GymEquipment";
import GetFeedback from "./components/Feedback";

import memberIcon from "./Icons/memberIcon.svg";
import profileIcon from "./Icons/profileIcon.svg";
import trainerIcon from "./Icons/trainerIcon.svg";
import planIcon from "./Icons/plansIcon.svg";
import dietPlanIcon from "./Icons/dietPlanIcon.svg";
import equipmentsIcon from "./Icons/equipmentsIcon.svg";
import feedbackIcon from "./Icons/feedbackIcon.svg";
import Navbar from "./components/navbar/Navbar";

import "./Dashboard.css";

// Search bar component
function GlobalSearchInline({ query, setQuery, onSearch }) {
  return (
    <form onSubmit={onSearch} className="searchbar-global">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Members, Trainers, or Plans"
        className="search-input"
      />
      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}

// Component to show search results
function SearchResults({ results }) {
  if (!results.length) return <p>No results found.</p>;
  return (
    <div className="search-results">
      {results.map((item) => (
        <div key={item.id} className="result-card">
          <strong>{item.name}</strong> - {item.role}
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  const LinkStyle = { color: "black" };

  // Sample Data (you can replace this with actual API results or props)
  const sampleData = [
    { id: 1, name: "Celine", role: "Member" },
    { id: 2, name: "KORODE", role: "Trainer" },
    { id: 3, name: "Alice Johnson", role: "Member" },
    { id: 4, name: "Bob Brown", role: "Trainer" },
    { id: 5, name: "Beginner Plan", role: "Plan" },
  ];

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = query.trim().toLowerCase();

    const filtered = sampleData.filter((item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.role.toLowerCase().includes(keyword)
    );

    setSearchResults(filtered);
  };

  return (
    <Router>
      <Navbar />
      <div className="innerContainer">
        <GlobalSearchInline query={query} setQuery={setQuery} onSearch={handleSearch} />
        
        {query && <SearchResults results={searchResults} />}

        <div className="sidenavbar">
          <div className="sidenavbarItem">
            <div className="NavBarContaineritem">
              <Link className="dashboardsidelink" style={LinkStyle} to="/dashboard/members"><img src={memberIcon} alt="icon" /> Members</Link>
            </div>
            <div className="NavBarContaineritem">
              <Link className="dashboardsidelink" style={LinkStyle} to="/dashboard/adminprofile"><img src={profileIcon} alt="icon" /> Profile</Link>
            </div>
            <div className="NavBarContaineritem">
              <Link className="dashboardsidelink" style={LinkStyle} to="/dashboard/admintrainer"><img src={trainerIcon} alt="icon" /> Trainer</Link>
            </div>
            <div className="NavBarContaineritem">
              <Link className="dashboardsidelink" style={LinkStyle} to="/dashboard/adminplans"><img src={planIcon} alt="icon" /> Plans</Link>
            </div>
            <div className="NavBarContaineritem">
              <Link className="dashboardsidelink" style={LinkStyle} to="/dashboard/dietplan"><img src={dietPlanIcon} alt="icon" /> Diet Plan</Link>
            </div>
            <div className="NavBarContaineritem">
              <Link className="dashboardsidelink" style={LinkStyle} to="/dashboard/gymequipments"><img src={equipmentsIcon} alt="icon" /> Equipments</Link>
            </div>
            <div className="NavBarContaineritem">
              <Link className="dashboardsidelink" style={LinkStyle} to="/dashboard/getfeedback"><img src={feedbackIcon} alt="icon" /> Feedback</Link>
            </div>
          </div>

          <div className="sidebarcontainer">
            <Switch>
              <Route path="/dashboard/members" component={AllMeembers}></Route>
              <Route path="/dashboard/adminprofile" component={AdminProfile}></Route>
              <Route path="/dashboard/admintrainer" component={Trainer}></Route>
              <Route path="/dashboard/adminplans" component={Plans}></Route>
              <Route path="/dashboard/dietplan" component={DietPlan}></Route>
              <Route path="/dashboard/gymequipments" component={GymEuipments}></Route>
              <Route path="/dashboard/getfeedback" component={GetFeedback}></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
