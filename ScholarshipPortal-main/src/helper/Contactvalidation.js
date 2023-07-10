function validateContactNumber(contact) {
    // Regular expression pattern for a 10-digit phone number
    var phoneNumberPattern = /^\d{11}$/;

    // Validate the contact number
    if (!phoneNumberPattern.test(contact)) {
        return false;
    }
    return true;
}

module.exports = validateContactNumber;