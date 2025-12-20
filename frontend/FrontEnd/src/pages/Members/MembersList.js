import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import memberService from '../../services/member.service';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import './MembersList.css';

const MembersList = () => {
    const history = useHistory();
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const columns = [
        { key: 'completeName', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'contact', label: 'Contact' },
        { key: 'role', label: 'Role' },
        { key: 'age', label: 'Age' }
    ];

    const loadMembers = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await memberService.getAllMembers(currentPage - 1, pageSize);
            setMembers(response.content || response.data || response || []);
            setFilteredMembers(response.content || response.data || response || []);
            setTotalPages(response.totalPages || 1);
            setTotalItems(response.totalElements || 0);
        } catch (error) {
            console.error('Error loading members:', error);
            // Show alert for debugging
            const status = error.response?.status ? ` (Status: ${error.response.status})` : '';
            alert('Failed to load members: ' + (error.response?.data?.message || error.message || 'No message available') + status);
            setMembers([]);
            setFilteredMembers([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        loadMembers();
    }, [loadMembers]);

    const handleSearch = (column, value) => {
        const filtered = members.filter(member => {
            const fieldValue = column.split('.').reduce((obj, key) => obj?.[key], member);
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredMembers(filtered);
    };

    const handleClearSearch = () => {
        setFilteredMembers(members);
    };

    const handleDeleteClick = (id) => {
        setSelectedMemberId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedMemberId) {
            try {
                await memberService.deleteMember(selectedMemberId);
                // alert('Member deleted successfully');
                loadMembers();
            } catch (error) {
                console.error('Error deleting member:', error);
                alert('Failed to delete member');
            } finally {
                setIsModalOpen(false);
                setSelectedMemberId(null);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMemberId(null);
    };

    const handleEdit = (id) => {
        history.push(`/members/edit/${id}`);
    };

    const handleView = (id) => {
        history.push(`/members/view/${id}`);
    };

    return (
        <MainLayout>
            <div className="members-list-page">
                <div className="page-header">
                    <h1>👥 Members Management</h1>
                    <Button onClick={() => history.push('/members/add')} variant="primary">
                        ➕ Add New Member
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading members...</div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Role</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMembers.length > 0 ? (
                                            filteredMembers.map((member, index) => (
                                                <tr key={member.id}>
                                                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                                    <td>{member.completeName}</td>
                                                    <td>{member.email}</td>
                                                    <td>{member.contact}</td>
                                                    <td>
                                                        <span className={`role-badge role-${member.role}`}>
                                                            {member.role}
                                                        </span>
                                                    </td>
                                                    <td>{member.age}</td>
                                                    <td>{member.gender === 1 ? 'Male' : 'Female'}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Button
                                                                size="small"
                                                                variant="secondary"
                                                                onClick={() => handleView(member.id)}
                                                            >
                                                                👁️ View
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="primary"
                                                                onClick={() => handleEdit(member.id)}
                                                            >
                                                                ✏️ Edit
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="danger"
                                                                onClick={() => handleDeleteClick(member.id)}
                                                            >
                                                                🗑️ Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="no-data">
                                                    No members found
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
                title="Delete Member"
                message="Are you sure you want to delete this member? This action cannot be undone."
                confirmText="Delete"
                confirmVariant="danger"
            />
        </MainLayout>
    );
};

export default MembersList;
