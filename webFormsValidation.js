function validateAllFormGroups() {
    // Run all validation on all ASP.NET validators
    Page_ClientValidate();

    // Remove all validation classes. This is necessary because if any validator sets has-error,
    // it cannot be unset in this call. Otherwise if one validator is valid and the other is isn't the
    // has-error class could be removed even though the input is not valid.
    $('.form-group').removeClass('has-error has-success');

    // Loop through the validators and set the appropriate bootstrap classes
    var i;
    for (i = 0; i < Page_Validators.length; i++) {
        var closestFormGroup = $('#' + Page_Validators[i].controltovalidate).closest('form-group');
        if (closestFormGroup != null && (Page_Validators[i].enabled == 'undefined' || Page_Validators[i].enabled != false)) {
            // If the parent class is valid and does not have an error from a previous validator
            if (Page_Validators[i].isvalid && !closestFormGroup.hasClass('has-error')) {
                closestFormGroup.removeClass('has-error').addClass('has-success');
            }
            else {
                closestFormGroup.addClass('has-error').removeClass('has-success');
            }
        }
    }
}

function validateFormGroup() {
    var closestFormGroup = $(this).closest('.form-group');
    if (closestFormGroup != null) {
        var i;
        closestFormGroup.removeClass('has-error has-success');
        for (i = 0; i < this.Validators.length; i++) {
            // Check if input is valid but dont run other valdiator actions
            ValidatorValidate(this.Validators[i], null, null);
            var isValid = this.Validators[i].isvalid;
            // If the parent class is valid and does not have an error from a previous validator
            // For whatever reason enabled only exists when it is set to false
            if (this.Validators[i].enabled == 'undefined' || this.Validators[i].enabled != false) {
                if (this.Validators[i].isvalid && !closestFormGroup.hasClass('has-error')) {
                    closestFormGroup.removeClass('has-error').addClass('has-success');
                }
                else {
                    closestFormGroup.addClass('has-error').removeClass('has-success');
                }
            }
        }
    }
    // If you want to display the validation summary dynamically you can call this function
    // it will NOT update the isvalid field in each validator object.
    //ValidationSummaryOnSubmit();
}
