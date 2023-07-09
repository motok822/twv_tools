import React, { useContext } from 'react'
import { UserContext } from '../../App'
import { Navigate, useNavigate } from 'react-router-dom';

function AuthGuard(props) {
    const UserInfo = useContext(UserContext);
    const navigate = useNavigate()
    if (UserInfo.user_auth) {
        return <>{props.component}</>;
    } else {
        return <Navigate to={"/Login"} replace={false} />
    }
}

export default AuthGuard