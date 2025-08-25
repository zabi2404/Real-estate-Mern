export const errorHnadle = (statusCode, message)=>{
    const error = new Error(); //JavaScript’s built-in Error object is created.
    error.statusCode = statusCode; //Normally Error just has a message property, but here we will add a custom statusCode.
    error.message = message;
    return error
}