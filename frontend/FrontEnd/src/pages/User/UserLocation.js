import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import LocationSelector from '../../components/common/LocationSelector';
import './UserLocation.css';

const UserLocation = () => {
    const history = useHistory();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLocationChange = (locationId) => {
        setSelectedLocation(locationId);
    };

    const handleSaveLocation = async () => {
        if (!selectedLocation) {
            alert('Please select a location');
            return;
        }

        try {
            setLoading(true);
            // const userId = localStorage.getItem('id');
            // TODO: API call to update user location
            // await userService.updateLocation(userId, selectedLocation);
            alert('Location preference saved successfully!');
            history.push('/user-dashboard');
        } catch (error) {
            console.error('Error saving location:', error);
            alert('Failed to save location preference');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="user-location-page">
                <div className="page-header">
                    <div>
                        <h1>📍 Gym Location Preference</h1>
                        <p>Choose your preferred gym location</p>
                    </div>
                    <Button onClick={() => history.push('/user-dashboard')} variant="secondary">
                        ← Back to Dashboard
                    </Button>
                </div>

                <div className="location-content">
                    <div className="location-card">
                        <div className="location-icon">📍</div>
                        <h2>Select Your Location</h2>
                        <p className="location-description">
                            Choose the gym location closest to you. Select from Province down to Village level
                            for the most accurate location.
                        </p>

                        <div className="location-selector-container">
                            <LocationSelector
                                value={selectedLocation}
                                onChange={handleLocationChange}
                                required={true}
                                label="Select Location (Province → District → Sector → Cell → Village)"
                            />
                        </div>

                        <div className="location-info">
                            <div className="info-item">
                                <span className="info-icon">ℹ️</span>
                                <span>Select all levels from Province to Village for best results</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🏢</span>
                                <span>This helps us recommend the nearest gym facility</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🔄</span>
                                <span>You can change your location preference anytime</span>
                            </div>
                        </div>

                        <div className="location-actions">
                            <Button
                                variant="secondary"
                                onClick={() => history.push('/user-dashboard')}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveLocation}
                                disabled={!selectedLocation || loading}
                            >
                                {loading ? 'Saving...' : 'Save Location'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default UserLocation;
