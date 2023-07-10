function Cnicvalidation(cnic) {
    // Regular expression pattern for a 10-digit phone number
    var cnicNumberPattern = /^\d{5}-\d{7}-\d$/;

    // Validate the contact number
    if (!cnicNumberPattern.test(cnic)) {
        return false;
    }
    return true;
}

module.exports = Cnicvalidation;