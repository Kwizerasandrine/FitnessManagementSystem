import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import MainLayout from '../../components/common/MainLayout';
import ShowProfile from './ShowProfile';
import { history } from '../../helpers/history';

const Profile = () => {
    return (
        <MainLayout>
            <div className="container mt-4">
                <ShowProfile />
            </div>
        </MainLayout>
    )
}

export default Profile;