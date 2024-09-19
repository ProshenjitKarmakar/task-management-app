const emailPattern = /^\w+([\\.-\\+]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+]).{8,}$/;
export const UserPatternValidator = {
    email: {
        required: 'Email should not be empty!',
        pattern: {
            value: emailPattern,
            message: 'Invalid Email format!',
        },
    },
    password: {
        required: 'Email should not be empty!',
        pattern: {
            value: password,
            message: 'Invalid password! Ex. Pa$$w0rd!',
        },
        minLength: {
            value: 6,
            message: 'Password should be 6 characters',
        },
        maxLength: {
            value: 20,
            message: 'Password shouldn\'t be more than 20 characters!',
        },
    },
};
