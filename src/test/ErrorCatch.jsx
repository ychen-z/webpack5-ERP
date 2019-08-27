import React, { lazy, Suspense } from 'react';
import MyErrorBoundary from './ErrorBoundary';

const OtherComponent = lazy(() => import('./Effect'));

export default class ErrorCatch extends React.Component {
    render() {
        return (
            <div>
                <MyErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                        <section>
                            <OtherComponent />
                        </section>
                    </Suspense>
                </MyErrorBoundary>
            </div>
        );
    }
}
