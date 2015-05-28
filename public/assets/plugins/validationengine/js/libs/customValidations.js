

 
 $.validator.addMethod("loginRegex", function(value, element) {
        return this.optional(element) || /^[a-z0-9\-]+$/i.test(value);
    }, "Username must contain only letters, numbers, or dashes.");

$.validator.addMethod("formatedNames", function(value, element) {
        return this.optional(element) || /^[a-z0-9\-\s\.]+$/i.test(value);
    }, "Formated Names must contain only letters, numbers, dashes, dots [.] or spaces.");

$.validator.addMethod("string", function (value, element, min, max) {
    if (value) {
        /*if (value.length < min || value.length > max) {
            return false;
        }*/
    }
    return true;
});