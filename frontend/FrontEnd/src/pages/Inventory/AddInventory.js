import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import inventoryService from '../../services/inventory.service';
import AlertModal from '../../components/common/AlertModal';
import './AddInventory.css';

const AddInventory = () => {
    const history = useHistory();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        equipName: '',
        units: '',
        model: '',
        itemPrice: '',
        purchaseDate: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Alert Modal State
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success',
        onClose: () => { }
    });

    useEffect(() => {
        if (isEditMode) {
            loadInventoryItem();
        }
    }, [id]);

    const loadInventoryItem = async () => {
        try {
            setLoading(true);
            const response = await inventoryService.getAllInventory();
            const items = response.data || response || [];
            const item = items.find(i => i.id === parseInt(id));

            if (item) {
                setFormData({
                    equipName: item.equipName || '',
                    units: item.units || '',
                    model: item.model || '',
                    itemPrice: item.itemPrice || '',
                    purchaseDate: item.purchaseDate || ''
                });
            }
        } catch (error) {
            console.error('Error loading inventory item:', error);
            showAlert('Error', 'Failed to load inventory item details', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showAlert = (title, message, type, onClose = null) => {
        setAlertState({
            isOpen: true,
            title,
            message,
            type,
            onClose: onClose || (() => setAlertState(prev => ({ ...prev, isOpen: false })))
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.equipName.trim()) {
            newErrors.equipName = 'Equipment name is required';
        }

        if (!formData.units || formData.units <= 0) {
            newErrors.units = 'Units must be greater than 0';
        }

        if (!formData.model.trim()) {
            newErrors.model = 'Model is required';
        }

        if (!formData.itemPrice || formData.itemPrice <= 0) {
            newErrors.itemPrice = 'Price must be greater than 0';
        }

        if (!formData.purchaseDate) {
            newErrors.purchaseDate = 'Purchase date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const itemData = {
                ...formData,
                units: parseInt(formData.units),
                itemPrice: parseFloat(formData.itemPrice)
            };

            if (isEditMode) {
                itemData.id = parseInt(id);
                await inventoryService.updateInventory(itemData);
                showAlert('Success', 'Inventory item updated successfully', 'success', () => {
                    history.push('/inventory');
                });
            } else {
                await inventoryService.addInventoryItem(itemData);
                showAlert('Success', 'Inventory item added successfully', 'success', () => {
                    history.push('/inventory');
                });
            }
        } catch (error) {
            console.error('Error saving inventory item:', error);
            showAlert('Error', 'Failed to save inventory item', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-inventory-page">
                <div className="page-header">
                    <h1>{isEditMode ? '✏️ Edit Inventory Item' : '➕ Add New Inventory Item'}</h1>
                    <Button onClick={() => history.push('/inventory')} variant="secondary">
                        ← Back to Inventory
                    </Button>
                </div>

                <div className="page-content">
                    <form onSubmit={handleSubmit} className="inventory-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="equipName">
                                    Equipment Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="equipName"
                                    name="equipName"
                                    value={formData.equipName}
                                    onChange={handleChange}
                                    className={errors.equipName ? 'error' : ''}
                                    placeholder="e.g., Treadmill"
                                />
                                {errors.equipName && (
                                    <span className="error-message">{errors.equipName}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="units">
                                    Units <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="units"
                                    name="units"
                                    value={formData.units}
                                    onChange={handleChange}
                                    className={errors.units ? 'error' : ''}
                                    placeholder="e.g., 5"
                                    min="1"
                                />
                                {errors.units && (
                                    <span className="error-message">{errors.units}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="model">
                                    Model <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    className={errors.model ? 'error' : ''}
                                    placeholder="e.g., TX-500"
                                />
                                {errors.model && (
                                    <span className="error-message">{errors.model}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="itemPrice">
                                    Price ($) <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="itemPrice"
                                    name="itemPrice"
                                    value={formData.itemPrice}
                                    onChange={handleChange}
                                    className={errors.itemPrice ? 'error' : ''}
                                    placeholder="e.g., 1500.00"
                                    step="0.01"
                                    min="0"
                                />
                                {errors.itemPrice && (
                                    <span className="error-message">{errors.itemPrice}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="purchaseDate">
                                    Purchase Date <span className="required">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="purchaseDate"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    onChange={handleChange}
                                    className={errors.purchaseDate ? 'error' : ''}
                                />
                                {errors.purchaseDate && (
                                    <span className="error-message">{errors.purchaseDate}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => history.push('/inventory')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (isEditMode ? 'Update Item' : 'Add Item')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <AlertModal
                isOpen={alertState.isOpen}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
                onClose={alertState.onClose}
            />
        </MainLayout>
    );
};

export default AddInventory;
