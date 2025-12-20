import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../common/URL';

const Plans = () => {
    const [planID, setPlanID] = useState('');
    const [membershipPlanName, setMembershipPlanName] = useState('');
    const [duration, setDuration] = useState('');
    const [starthour, setStartHour] = useState('');
    const [endhour, setEndHour] = useState('');
    const [price, setPrice] = useState('');
    const [trainername, setTrainerName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [plansPerPage] = useState(1); // Changed to 1 plan per page

    const [allplanlist, setAllPlanList] = useState([]);
    const [alltrainerlist, setAllTrainerList] = useState([]);

    const onChangeMembershipPlanName = (e) => {
        setMembershipPlanName(e.target.value);
    };
    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    };
    const onChangeStartHour = (e) => {
        setStartHour(e.target.value);
    };
    const onChangeEndHour = (e) => {
        setEndHour(e.target.value);
    };
    const onChangePrice = (e) => {
        setPrice(e.target.value);
    };
    const onChangeTrainerName = (e) => {
        setTrainerName(e.target.value);
    };
    const onChangeSearchQuery = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const cleareAll = () => {
        setMembershipPlanName('');
        setDuration('');
        setStartHour('');
        setEndHour('');
        setPrice('');
        setTrainerName('');
    };

    const inputstyle = {
        color: 'black',
        background: 'transparent',
    };

    useEffect(() => {
        axios.get(API_URL + 'getAllPlans').then((response) => {
            setAllPlanList(response.data.data);
            axios.get(API_URL + 'getAllTrainers').then((response) => {
                setAllTrainerList(response.data.data);
            });
        });
    }, []);

    const handleMemberINFO = () => {
        axios
            .post(API_URL + 'createPlan', {
                membershipPlanName,
                duration,
                startHour: starthour,
                endHour: endhour,
                price,
                trainerName: trainername,
            })
            .then(() => {
                cleareAll();
                alert('Plan Added');
                axios.get(API_URL + 'getAllPlans').then((response) => {
                    setAllPlanList(response.data.data);
                });
            });
    };

    const deleteDietPlan = (planID) => {
        axios.post(API_URL + 'deletePlan', { id: planID }).then(() => {
            alert('Subscription Plan Deleted');
            axios.get(API_URL + 'getAllPlans').then((response) => {
                setAllPlanList(response.data.data);
            });
        });
    };

    const setplanupdateID = (planID) => {
        setPlanID(planID);
    };

    const handleUpdatePlan = () => {
        axios
            .post(API_URL + 'updatePlan', {
                id: planID,
                membershipPlanName,
                duration,
                startHour: starthour,
                endHour: endhour,
                price,
                trainerName: trainername,
            })
            .then(() => {
                alert('Plan Updated');
                axios.get(API_URL + 'getAllPlans').then((response) => {
                    setAllPlanList(response.data.data);
                });
            });
    };

    // Filter plans based on search query
    const filteredPlans = allplanlist.filter(
        (plan) =>
            plan.membershipPlanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plan.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastPlan = currentPage * plansPerPage;
    const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
    const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
    const totalPages = Math.ceil(filteredPlans.length / plansPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="header">
                <h1>Subscription Plans</h1>
            </div>
            <hr />
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Plan Name or Trainer Name"
                    value={searchQuery}
                    onChange={onChangeSearchQuery}
                    style={inputstyle}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary mb-3"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                Add Plans
            </button>

            {/* Add Plan Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="addmembersform">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="membershipPlanName">Plan Name</label>
                                            <input
                                                style={inputstyle}
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="membershipPlanName"
                                                value={membershipPlanName}
                                                onChange={onChangeMembershipPlanName}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="duration">Duration</label>
                                            <input
                                                style={inputstyle}
                                                type="number"
                                                className="form-control form-control-sm"
                                                name="duration"
                                                value={duration}
                                                onChange={onChangeDuration}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="starthour">Start Hour</label>
                                            <input
                                                style={inputstyle}
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="starthour"
                                                placeholder="11 AM"
                                                value={starthour}
                                                onChange={onChangeStartHour}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="endhour">End Hour</label>
                                            <input
                                                style={inputstyle}
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="endhour"
                                                value={endhour}
                                                onChange={onChangeEndHour}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="price">Price</label>
                                            <input
                                                style={inputstyle}
                                                type="number"
                                                className="form-control form-control-sm"
                                                name="price"
                                                value={price}
                                                onChange={onChangePrice}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="trainername">Trainer Name</label>
                                            <select
                                                style={inputstyle}
                                                className="form-control form-control-sm"
                                                name="trainername"
                                                value={trainername}
                                                onChange={onChangeTrainerName}
                                            >
                                                <option value="">Select Trainer</option>
                                                {alltrainerlist.map((val) => (
                                                    <option key={val.trainerName} value={val.trainerName}>
                                                        {val.trainerName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleMemberINFO}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Plan Modal */}
            <div
                className="modal fade"
                id="exampleModal1"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="addmembersform">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="membershipPlanName">Plan Name</label>
                                            <input
                                                style={inputstyle}
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="membershipPlanName"
                                                value={membershipPlanName}
                                                onChange={onChangeMembershipPlanName}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="duration">Duration</label>
                                            <input
                                                style={inputstyle}
                                                type="number"
                                                className="form-control form-control-sm"
                                                name="duration"
                                                value={duration}
                                                onChange={onChangeDuration}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="starthour">Start Hour</label>
                                            <input
                                                style={inputstyle}
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="starthour"
                                                placeholder="11 AM"
                                                value={starthour}
                                                onChange={onChangeStartHour}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="endhour">End Hour</label>
                                            <input
                                                style={inputstyle}
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="endhour"
                                                value={endhour}
                                                onChange={onChangeEndHour}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="price">Price</label>
                                            <input
                                                style={inputstyle}
                                                type="number"
                                                className="form-control form-control-sm"
                                                name="price"
                                                value={price}
                                                onChange={onChangePrice}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="trainername">Trainer Name</label>
                                            <select
                                                style={inputstyle}
                                                className="form-control form-control-sm"
                                                name="trainername"
                                                value={trainername}
                                                onChange={onChangeTrainerName}
                                            >
                                                <option value="">Select Trainer</option>
                                                {alltrainerlist.map((val) => (
                                                    <option key={val.trainerName} value={val.trainerName}>
                                                        {val.trainerName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleUpdatePlan}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plans Table */}
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Plan Name</th>
                        <th>Duration</th>
                        <th>Start Hour</th>
                        <th>End Hour</th>
                        <th>Price</th>
                        <th>Trainer Name</th>
                        <th>Update</th>
                        <th>Delete Plan</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPlans.length > 0 ? (
                        currentPlans.map((val) => (
                            <tr key={val.id}>
                                <td>{val.membershipPlanName}</td>
                                <td>{val.duration}</td>
                                <td>{val.startHour}</td>
                                <td>{val.endHour}</td>
                                <td>{val.price}</td>
                                <td>{val.trainerName}</td>
                                <td>
                                    <button
                                        onClick={() => setplanupdateID(val.id)}
                                        type="button"
                                        className="btn btn-outline-info"
                                        data-toggle="modal"
                                        data-target="#exampleModal1"
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteDietPlan(val.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No Plans Found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Plans;