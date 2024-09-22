import React, {Suspense} from 'react';
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import LoadingFallBack from "./LoadingFallBack";

interface IProps {
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

const Externals = ({fallback, children}: IProps) => {
    return (
        <Suspense fallback={fallback ?? LoadingFallBack}>
            <ErrorBoundary fallback={<ErrorFallback/>}>{children}</ErrorBoundary>
        </Suspense>
    );
};

export default Externals;
