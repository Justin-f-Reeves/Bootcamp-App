// const inputs = document.querySelectorAll('.registration');

// const patterns = {
//     username: /[a-zA-Z0-9-_]{4, 24}/,
//     password: /^[\d\w@-]{8,20}$/i,
//     email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
// };

// inputs.forEach((input) => {
//     input.addEventListener('keyup', (e) => {
//         validate(e.target, patterns[e.target.attributes.id.value]);
//     });
// });

// function validate(field, regex) {
//     if (regex.test(field.value)) {
//         field.className = 'form-control valid';
//     } else {
//         field.className = 'form-control invalid has-error';
//     }
// }

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

