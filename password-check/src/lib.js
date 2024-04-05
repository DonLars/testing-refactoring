// Pure functions

/*    FUNCTIONS - for further tests
========================================================================== */

export function checkUppercase(string) {
  return /[A-Z]/.test(string);
}

export function checklowercase(string) {
  return /[a-z]/.test(string);
}

export function checkNumber(string) {
  return /[0-9]/.test(string);
}

export function checkLength(string) {
  return string.length >= 10;
}
