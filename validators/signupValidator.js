const { z } =require('zod')

const authvalidation = z.object({
    firstName: z.string({ required_error: "FirstName must be required" }).trim().min(3, { message: "FirstName atleast 3 character" }),
    lastName: z.string({ required_error: "LastName must be required" }).trim().min(3, { message: "LastName atleast 3 character" }),
    email: z.string({ required_error: "Email must be required" }).email({ message: 'Enter proper email' }).trim().min(3, { message: "email atleast 3 character" }),
    password: z.string({ required_error: "Password must be required" }).trim().min(3, { message: "password atleast 3 character" }),
    phoneNumber: z.string({ required_error: "PhoneNumber must be required" }).trim().min(10, { message: "PhoneNumber only 10digit" }).max(10, { message: "PhoneNumber only 10digit" }),
    role: z.string({ required_error: "Role must be required" }).trim(),
});

module.exports = authvalidation