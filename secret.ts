// require("dotenv").config({ path: ".env" });

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL || "";

export {
    serverUrl,
    cloudinaryUrl
}