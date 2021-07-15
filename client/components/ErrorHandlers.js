export function registerErrorHandler(error) {
    let errorMessage='';
    if (
      error?.message.includes('Validation') &&
      error.message.includes('firstName')
    ) {
      errorMessage = 'First Name cannot be blank';
    } else if (
      error?.message.includes('Validation') &&
      error.message.includes('lastName')
    ) {
      errorMessage = 'Last Name cannot be blank';
    } else if (
      error?.message.includes('Validation') &&
      error.message.includes('email')
    ) {
      errorMessage = 'Not a valid Email';
    } else if (
      error?.message.includes('Validation') &&
      error.message.includes('password')
    ) {
      errorMessage = 'Password cannot be blank';
    } else if (
      error?.message.includes('email') &&
      error.message.includes('unique')
    ) {
      errorMessage = 'Email already being used';
    }
    return errorMessage
  }

