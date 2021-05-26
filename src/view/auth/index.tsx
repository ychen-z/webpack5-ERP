import React from 'react';
import { Routes } from '@/routes/tools';
import './index.less';

function AuthIndex(props: any) {
    return (
        <div className="m-auth-index">
            <Routes {...props} />
        </div>
    );
}

export default AuthIndex;
