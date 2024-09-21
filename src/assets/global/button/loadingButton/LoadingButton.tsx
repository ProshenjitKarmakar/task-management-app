import React, {ChangeEvent, MouseEventHandler} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import CoreButton from "./CoreButton";

interface LoadingButton {
    variant: "contained" | "text" | "outlined" | undefined,
    size: "large" | "small" | "medium" | undefined,
    isLoading: boolean,
    loadingText: string,
    disabled?: boolean,
    children: React.ReactNode,
    startIcon?: string,
}

const LoadingButton = ({
                           variant = "contained",
                           size = "large",
                           isLoading = false,
                           loadingText = "",
                           disabled = false,
                           children = "",
                           startIcon,
                           ...rest
                       }: LoadingButton) => {

    return (
        <>
            <CoreButton
                variant={variant}
                size={size}
                type={'submit'}
                disabled={isLoading || disabled}
                startIcon={
                    isLoading && startIcon ? (
                        <CircularProgress size={16} color={"inherit"}/>
                    ) : isLoading ? (
                        <CircularProgress size={16} color={"inherit"}/>
                    ) : (
                        startIcon
                    )
                }
                {...rest}
            >
                {isLoading && loadingText ? loadingText : children}
            </CoreButton>

            <Backdrop
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isLoading}
                invisible={true}
            >
            </Backdrop>
        </>
    );
};

export default LoadingButton;
