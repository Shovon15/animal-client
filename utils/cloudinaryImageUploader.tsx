import { cloudinaryUrl } from "@/secret";

const cloudinaryImageUploader = async (image: any) => {
	try {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", "react_upload");
		formData.append("cloud_name", "dreeqkcfb");


		const response = await fetch(cloudinaryUrl, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to upload image");
		}

		const data = await response.json();
		return data;
	} catch (error: any) {
		console.error("Error uploading image:", error);
		throw new Error("Failed to upload image.", error);
	}
};

export default cloudinaryImageUploader;
