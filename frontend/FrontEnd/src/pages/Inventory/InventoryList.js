import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import inventoryService from '../../services/inventory.service';
import './InventoryList.css';

const InventoryList = () => {
    const history = useHistory();
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        { key: 'equipName', label: 'Equipment Name' },
        { key: 'units', label: 'Units' },
        { key: 'model', label: 'Model' },
        { key: 'itemPrice', label: 'Price' },
        { key: 'purchaseDate', label: 'Purchase Date' }
    ];

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        try {
            setLoading(true);
            const response = await inventoryService.getAllInventoryItems();
            const inventoryData = response.data || response || [];
            setInventory(inventoryData);
            setFilteredInventory(inventoryData);
        } catch (error) {
            console.error('Error loading inventory:', error);
            // alert('Failed to load'); // Removed annoying popup
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (column, value) => {
        const filtered = inventory.filter(item => {
            const fieldValue = column.split('.').reduce((obj, key) => obj?.[key], item);
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredInventory(filtered);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setFilteredInventory(inventory);
        setCurrentPage(1);
    };

    // Client-side pagination
    const totalPages = Math.ceil(filteredInventory.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentInventory = filteredInventory.slice(startIndex, endIndex);

    return (
        <MainLayout>
            <div className="inventory-list-page">
                <div className="page-header">
                    <h1>📦 Inventory Management</h1>
                    <Button onClick={() => history.push('/inventory/add')} variant="primary">
                        ➕ Add New Item
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading inventory...</div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Equipment Name</th>
                                            <th>Units</th>
                                            <th>Model</th>
                                            <th>Price ($)</th>
                                            <th>Purchase Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentInventory.length > 0 ? (
                                            currentInventory.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.equipName}</td>
                                                    <td>{item.units}</td>
                                                    <td>{item.model}</td>
                                                    <td>${item.itemPrice?.toFixed(2)}</td>
                                                    <td>{item.purchaseDate}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="no-data">
                                                    No inventory items found
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
                                totalItems={filteredInventory.length}
                            />
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default InventoryList;
