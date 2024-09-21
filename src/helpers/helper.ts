const getCurrentDateTimeMilliSeconds = (): string => {
    const myDate = new Date();
    return myDate.getTime().toString();
};

export {
    getCurrentDateTimeMilliSeconds
}