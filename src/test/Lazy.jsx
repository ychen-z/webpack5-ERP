import React, { lazy, Suspense } from 'react';
const OtherComponent = lazy(() => import('./Effect'));
const AtherComponent = lazy(() => import('./Effect'));

export default function Lazy() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>new</div>
            <AtherComponent />
            <OtherComponent />
        </Suspense>
    );
}
