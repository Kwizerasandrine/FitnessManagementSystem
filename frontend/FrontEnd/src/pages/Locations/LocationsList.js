import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import locationService from '../../services/location.service';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import './LocationsList.css';

const LocationsList = () => {
    const history = useHistory();
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'code', label: 'Code' },
        { key: 'locationType', label: 'Type' }
    ];

    useEffect(() => {
        loadLocations();
    }, [currentPage, pageSize]);

    const loadLocations = async () => {
        try {
            setLoading(true);
            const response = await locationService.getAllLocations(currentPage - 1, pageSize);
            const data = response.data?.content || response.content || [];
            setLocations(data);
            setFilteredLocations(data);
            setTotalPages(response.data?.totalPages || response.totalPages || 1);
            setTotalItems(response.data?.totalElements || response.totalElements || 0);
        } catch (error) {
            console.error('Error loading locations:', error);
            // alert('Failed to load'); // Removed annoying popup
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (column, value) => {
        const filtered = locations.filter(location => {
            const fieldValue = location[column];
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredLocations(filtered);
    };

    const handleClearSearch = () => {
        setFilteredLocations(locations);
    };

    const handleDeleteClick = (id) => {
        setSelectedLocationId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedLocationId) {
            try {
                await locationService.deleteLocation(selectedLocationId);
                // alert('Location deleted successfully');
                loadLocations();
            } catch (error) {
                console.error('Error deleting location:', error);
                alert('Failed to delete location');
            } finally {
                setIsModalOpen(false);
                setSelectedLocationId(null);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLocationId(null);
    };

    const getTypeColor = (type) => {
        const colors = {
            'PROVINCE': '#ff7300',
            'DISTRICT': '#28a745',
            'SECTOR': '#007bff',
            'CELL': '#6f42c1',
            'VILLAGE': '#fd7e14'
        };
        return colors[type] || '#6c757d';
    };

    return (
        <MainLayout>
            <div className="locations-list-page">
                <div className="page-header">
                    <h1>📍 Locations Management</h1>
                    <Button onClick={() => history.push('/locations/add')} variant="primary">
                        ➕ Add New Location
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading locations...</div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Code</th>
                                            <th>Type</th>
                                            <th>Parent</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLocations.length > 0 ? (
                                            filteredLocations.map(location => (
                                                <tr key={location.id}>
                                                    <td>{location.id}</td>
                                                    <td>{location.name}</td>
                                                    <td><code>{location.code}</code></td>
                                                    <td>
                                                        <span
                                                            className="type-badge"
                                                            style={{ backgroundColor: getTypeColor(location.locationType) }}
                                                        >
                                                            {location.locationType}
                                                        </span>
                                                    </td>
                                                    <td>{location.parentName || '-'}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Button
                                                                size="small"
                                                                variant="primary"
                                                                onClick={() => history.push(`/locations/edit/${location.id}`)}
                                                            >
                                                                ✏️ Edit
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="danger"
                                                                onClick={() => handleDeleteClick(location.id)}
                                                            >
                                                                🗑️ Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="no-data">
                                                    No locations found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                pageSize={pageSize}
                                onPageSizeChange={setPageSize}
                                totalItems={totalItems}
                            />
                        </>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Delete Location"
                message="Are you sure you want to delete this location? This action cannot be undone."
                confirmText="Delete"
                confirmVariant="danger"
            />
        </MainLayout>
    );
};

export default LocationsList;
