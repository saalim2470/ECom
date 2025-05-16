const { z } =require('zod')

const categoryvalidation = z.object({
    name: z.string({ required_error: "Name must be required" }).trim().min(3, { message: "Name atleast 3 character" }),
    // isActive: z.boolean({ required_error: "IsActive must be boolen" }),
});

module.exports = categoryvalidation