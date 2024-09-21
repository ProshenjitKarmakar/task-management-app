export const TaskPatternValidator = {
    title: {
        required: 'Title should not be empty!',
        minLength: {
            value: 1,
            message: ''
        },
        maxLength: {
            value: 50,
            message: 'Title shouldn\'t be more than 20 characters!',
        },
    },
    description: {
        minLength: {
            value: 1,
            message: '',
        },
        maxLength: {
            value: 1000,
            message: 'Description shouldn\'t be more than 1000 characters!',
        },
    }
}