const cloudinary = require('cloudinary').v2
// Configuration
cloudinary.config({
    cloud_name: process.env.IMAGE_CLOUD_NAME,
    api_key: process.env.IMAGE_CLOUD_API_KEY,
    api_secret: process.env.IMAGE_CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadFile = async (filePath) => {
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filePath)
        console.log(uploadResult);
        return uploadResult

    } catch (error) {
        console.log(error);

    }
}
// (async function () {





//     console.log(uploadResult);

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();
module.exports = {
    uploadFile
}