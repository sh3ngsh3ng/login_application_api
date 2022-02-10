const forms = require("forms");
const fields = forms.fields;
const widgets = forms.widgets
const validators = forms.validators;

const createRegistrationForm = () => {
    return forms.create({
        'username': fields.string({
            required: true,
            // validators: [validators.min(10, "Username should be at least 10 characters long.")]
        }),
        'email': fields.email({
            required: true,
            // validators: [validators.email("Please key in a valid email.")]
        }),
        'password': fields.password({
            required: true,
            // validators: [validators.alphanumeric("Password should be alphanumeric."), validators.min(10, "Password should be at least 10 characters long.")]
        }),
        'confirm_password': fields.password({
            required: true,
            // validators: [validators.matchField('password', "Incorrect match of password.")]
        }),
        'role': fields.string({
            required: false
        })
    })
}


module.exports = {
    createRegistrationForm
}