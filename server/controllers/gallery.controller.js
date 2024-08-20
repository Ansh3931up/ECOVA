// src/controllers/gallery.controller.js
import { Gallery } from "../module/gallery.model.js";
import ApiError from "../utilities/ApiError.js";
import ApiResponse from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

// Fetch all galleries
const getgalleries = asyncHandler(async (req, res) => {
  const galleries = await Gallery.find({});
  return res.status(200).json(new ApiResponse(200, galleries, "Galleries fetched successfully"));
});

// Upload an image
const uploadImage = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title,photo} = req.body;
  if (!photo) {
    throw new ApiError(400, "No image file uploaded");
  }

   // Assuming you're using multer and storing the path

  const newGallery = await Gallery.create({
    photo: photo,
    title,
  });

  if (!newGallery) {
    throw new ApiError(400, "Photo not uploaded");
  }

  return res.status(200).json(new ApiResponse(200, newGallery, "Photo uploaded successfully"));
});

// Delete a gallery photo
const deleteGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const gallery = await Gallery.findByIdAndDelete(id);

  if (!gallery) {
    throw new ApiError(404, "Photo not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Photo deleted successfully"));
});

export { getgalleries, uploadImage, deleteGallery };
