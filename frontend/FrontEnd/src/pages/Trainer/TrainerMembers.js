import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../../components/common/MainLayout';
import trainerDashboardService from '../../services/trainer-dashboard.service';
import '../Dashboard/Dashboard.css';

const TrainerMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const trainerName = user?.completeName || user?.complete_name || '';

    const loadMembers = useCallback(() => {
        setLoading(true);
        trainerDashboardService.getTrainerMembers(trainerName)
            .then(response => {
                if (response.data && response.data.data) {
                    setMembers(response.data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading members:', error);
                setLoading(false);
            });
    }, [trainerName]);

    useEffect(() => {
        if (trainerName) {
            loadMembers();
        }
    }, [trainerName, loadMembers]);

    const filteredMembers = members.filter(member =>
        member.completeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="dashboard-page">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">My Members</h1>
                    <p className="text-gray-600 mt-2">Members enrolled in your classes</p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search members by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Members List */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No members found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchTerm ? 'Try adjusting your search' : 'No members enrolled in your classes yet'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMembers.map((member, index) => (
                            <div key={member.id || index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                <div className="p-6">
                                    {/* Member Avatar */}
                                    <div className="flex items-center mb-4">
                                        <div className="flex-shrink-0">
                                            {member.avatar ? (
                                                <img
                                                    src={member.avatar}
                                                    alt={member.completeName}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                                    <span className="text-white font-semibold text-lg">
                                                        {member.completeName?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {member.completeName}
                                            </h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </div>
                                    </div>

                                    {/* Member Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="truncate">{member.email}</span>
                                        </div>

                                        {member.contact && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>{member.contact}</span>
                                            </div>
                                        )}

                                        {member.joiningDate && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Joined: {new Date(member.joiningDate).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Enrolled Plans Count */}
                                    {member.planList && member.planList.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Enrolled Plans:</span>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {member.planList.length} {member.planList.length === 1 ? 'plan' : 'plans'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Results Count */}
                {!loading && filteredMembers.length > 0 && (
                    <div className="mt-6 text-sm text-gray-600">
                        Showing {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrainerMembers;
