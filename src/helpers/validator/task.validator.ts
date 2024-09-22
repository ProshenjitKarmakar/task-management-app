export const TaskPatternValidator = {
    title: {
        required: 'Title should not be empty!',
        minLength: {
            value: 1,
            message: ''
        },
        maxLength: {
            value: 50,
            message: 'Title shouldn\'t be more than 50 characters!',
        },
    },
    description: {
        required: 'Description should not be empty!',
        minLength: {
            value: 1,
            message: '',
        },
        maxLength: {
            value: 300,
            message: 'Description shouldn\'t be more than 300 characters!',
        },
    }
}