import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../common/URL'
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import './UserDiet.css'; // Import custom styles

const UserDiet = () => {
    const history = useHistory();
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [allDietPlan, setAllDietPlan] = useState([])
    const [BMIPLAN, setBMIPLAN] = useState('')
    const [dietname, setdietname] = useState('')

    // State for manual overrides
    const [manualHeight, setManualHeight] = useState('');
    const [manualWeight, setManualWeight] = useState('');

    const id = localStorage.getItem("id");

    useEffect(() => {
        axios.get(`${API_URL}getAllInfo/${id}`)
            .then((response) => {
                if (response.data && response.data.data) {
                    setHeight(response.data.data.height)
                    setWeight(response.data.data.weight)
                }
            })
            .catch(error => console.error("Error fetching user info:", error));

        axios.get(API_URL + "getAllDietItems")
            .then((response) => {
                if (response.data && response.data.data) {
                    setAllDietPlan(response.data.data)
                }
            })
            .catch(error => console.error("Error fetching diet plan:", error));
    }, [id])

    // Calculate BMI whenever height, weight, or manual overrides change
    useEffect(() => {
        const heightToUse = manualHeight || height;
        const weightToUse = manualWeight || weight;

        if (heightToUse && weightToUse) {
            const m = heightToUse / 100;
            const bmiValue = weightToUse / (m * m);
            calculateBMIStatus(bmiValue);
        }
    }, [height, weight, manualHeight, manualWeight]);

    const calculateBMIStatus = (bmiValue) => {
        const bmi = parseFloat(bmiValue.toPrecision(3));

        if (bmi <= 0) {
            setBMIPLAN('Fill Profile Details')
            setdietname('')
        }
        else if (bmi < 18.5) {
            setBMIPLAN('UNDERWEIGHT')
            setdietname('Weight Gain')
        }
        else if (bmi >= 18.5 && bmi < 24.9) {
            setBMIPLAN('NORMAL')
            setdietname('Balanced')
        }
        else if (bmi >= 25 && bmi < 29.9) {
            setBMIPLAN('OVERWEIGHT')
            setdietname('Weight Loss')
        }
        else {
            setBMIPLAN('OBESE')
            setdietname('Weight Loss')
        }
    }

    const currentHeight = manualHeight || height;
    const currentWeight = manualWeight || weight;
    const m = currentHeight / 100;
    const currentBMI = (currentHeight && currentWeight) ? (currentWeight / (m * m)).toPrecision(3) : "0";

    // Improved filtering: Check if diet name contains keywords or matches loosely
    const filteredPlans = allDietPlan.filter(val => {
        if (!dietname) return false;
        const targetName = dietname.toLowerCase();
        const planName = (val.dietName || '').toLowerCase();
        const planType = (val.dietType || '').toLowerCase();

        // Flexible matching logic
        if (targetName === 'weight gain') {
            return planName.includes('gain') || planName.includes('bulk') || planType.includes('gain');
        }
        if (targetName === 'weight loss') {
            return planName.includes('loss') || planName.includes('cut') || planName.includes('keto') || planType.includes('loss');
        }
        if (targetName === 'balanced') {
            return planName.includes('balanced') || planName.includes('maintain') || planName.includes('fit') || planType.includes('balance');
        }
        return planName.includes(targetName);
    });

    return (
        <MainLayout>
            <div className="user-diet-page">
                <div className="page-header">
                    <h2>🥗 Diet Recommendation</h2>
                </div>

                <div className="diet-card">
                    <div className="diet-card-header">
                        <h5>Calculate Your BMI</h5>
                    </div>
                    <div className="diet-card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Height (cm)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter height"
                                        value={manualHeight}
                                        onChange={(e) => setManualHeight(e.target.value)}
                                    />
                                    {height && !manualHeight && <small className="text-muted">Profile Height: {height} cm</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Weight (kg)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter weight"
                                        value={manualWeight}
                                        onChange={(e) => setManualWeight(e.target.value)}
                                    />
                                    {weight && !manualWeight && <small className="text-muted">Profile Weight: {weight} kg</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bmi-result-card">
                    {currentHeight && currentWeight ? (
                        <span>
                            <h3>Your Body Mass Index is</h3>
                            <div className="bmi-value">{currentBMI}</div>
                            <h5>According To your BMI You are <b className={`bmi-status ${BMIPLAN === 'NORMAL' ? 'text-success' :
                                    BMIPLAN === 'OBESE' ? 'text-danger' : 'text-warning'
                                }`}> {BMIPLAN} </b></h5>
                            <h6 className="mt-3 text-muted">Recommended Goal: <strong>{dietname}</strong></h6>
                        </span>
                    ) : (
                        <span>Please enter your height and weight above to see recommendations.</span>
                    )}
                </div>

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Plan Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Day</th>
                                <th scope="col">Morning</th>
                                <th scope="col">Afternoon</th>
                                <th scope="col">Evening</th>
                                <th scope="col">Night</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlans.length > 0 ? (
                                filteredPlans.map((val) => (
                                    <tr key={val.id}>
                                        <td>{val.dietName}</td>
                                        <td>{val.dietType || '-'}</td>
                                        <td>{val.day}</td>
                                        <td>{val.morning}</td>
                                        <td>{val.afternoon}</td>
                                        <td>{val.evening}</td>
                                        <td>{val.night}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-4">
                                        {dietname ? (
                                            <div>
                                                <p className="mb-2">No specific plan found for <strong>{dietname}</strong>.</p>
                                                <p className="text-muted small">Try creating a plan with keywords like "{dietname}" in the name.</p>
                                            </div>
                                        ) : 'Enter details to find a plan.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}
export default UserDiet