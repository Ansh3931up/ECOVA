import {
  CameraIcon,
  ChevronLeft,
  ChevronRight,
  TrashIcon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../Helpers/ThemeToggle";
import {
  deletePhoto,
  fetchGalleries,
  uploadPhoto,
} from "../Redux/galleryRedux";

// Custom Components
const Dialog = ({ isOpen, onClose, children }) =>
  isOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;

const ScrollArea = ({ children }) => (
  <div className="overflow-y-auto h-[80vh]">{children}</div>
);

const Button = ({ onClick, variant = "default", children, ...props }) => {
  const baseStyle = "py-2 px-4 rounded-md transition";
  const variants = {
    default: "bg-green-500 text-white hover:bg-green-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    icon: "p-2 bg-gray-200 hover:bg-gray-300 rounded-full",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Main Component
const GalleryPage = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const { galleries } = useSelector((state) => state.gallery);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [visibleItems, setVisibleItems] = useState(15);
  const [userInput, setUserInput] = useState({
    title: "",
    photos: [],
    previewImages: [],
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoom, setZoom] = useState(1);

  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewImages = files.map((file) =>
      URL.createObjectURL(file)
    );
    setUserInput((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
      previewImages: [
        ...prev.previewImages,
        ...newPreviewImages,
      ],
    }));
  };

  const saveImages = async () => {
    if (!userInput.photos.length) {
      toast.error("Please select at least one image");
      return null;
    }

    try {
      const uploadedUrls = await Promise.all(
        userInput.photos.map(async (photo) => {
          const data = new FormData();
          data.append("file", photo);
          data.append("upload_preset", "photogallery");
          data.append("cloud_name", "dxueqphl3");

          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dxueqphl3/image/upload",
            { method: "POST", body: data }
          );
          if (!res.ok) throw new Error("Error uploading image");
          const cloudData = await res.json();
          return cloudData.secure_url;
        })
      );
      toast.success("Images uploaded successfully");
      return uploadedUrls;
    } catch (error) {
      toast.error(`Error uploading images: ${error.message}`);
      return null;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (!userInput.title || !userInput.photos.length) {
      toast.error("Title and images are required");
      setIsUploading(false);
      return;
    }

    const imageUrls = await saveImages();
    if (!imageUrls) {
      setIsUploading(false);
      return;
    }

    dispatch(
      uploadPhoto({ title: userInput.title, photos: imageUrls })
    )
      .unwrap()
      .then(() => {
        toast.success("Photos uploaded successfully!");
        setUserInput({
          title: "",
          photos: [],
          previewImages: [],
        });
        setIsUploadModalOpen(false);
      })
      .catch(() => toast.error("Failed to upload photos"))
      .finally(() => setIsUploading(false));
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id))
      .unwrap()
      .then(() => toast.success("Photo deleted successfully!"))
      .catch(() => toast.error("Failed to delete photo"));
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : galleries.length - 1
    );
    setZoom(1);
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev < galleries.length - 1 ? prev + 1 : 0
    );
    setZoom(1);
  };

  const handleZoomIn = () =>
    setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () =>
    setZoom((prev) => Math.max(prev - 0.1, 0.5));

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6); // Load 6 more items
  };

  return (
    <div
      className={`min-h-screen pt-32 font-poppins transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-blue-50"
      } overflow-hidden`}
    >
      <ThemeToggle />
      <main className="relative z-10 mx-auto px-6 py-12">
        <section className="mb-20">
          <h2
            className={`text-6xl font-bold mb-8 text-center ${
              isDark ? "text-blue-300" : "text-green-700"
            }`}
          >
            Our Gallery
          </h2>
          {isLoggedIn && (
            <div className="mb-8 flex justify-center">
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className={`bg-green-500 text-white font-bold py-2 px-6 rounded-full transition`}
              >
                Upload Images
              </Button>
            </div>
          )}

          <ScrollArea>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {galleries?.slice(0, visibleItems).map((item, index) => (
                <div key={item._id} className="relative">
                  <button
                    className="rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="max-h-48 object-cover"
                    />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>

          {visibleItems < galleries.length && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                className="bg-green-500 text-white font-bold py-2 px-6 rounded-full transition"
              >
                Load More
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Image Modal */}
      <Dialog
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
      >
        <div className="relative flex-grow flex justify-center items-center p-4">
          {/* Large, Fixed Arrow Buttons */}
          <Button
            variant="icon"
            className="fixed left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold z-50"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-16 w-16 text-white drop-shadow-lg" />
          </Button>
          <Button
            variant="icon"
            className="fixed right-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold z-50"
            onClick={handleNext}
          >
            <ChevronRight className="h-16 w-16 text-white drop-shadow-lg" />
          </Button>

          {/* Image Display */}
          <img
            src={galleries[selectedIndex]?.photo}
            alt={galleries[selectedIndex]?.title}
            className="max-w-[80vw] max-h-[80vh] object-contain transition-transform drop-shadow-lg"
            style={{ transform: `scale(${zoom})` }}
          />

          {/* Zoom Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-50">
            <Button variant="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
            </Button>
            <Button variant="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-8 w-8 text-white drop-shadow-lg" />
            </Button>
          </div>
        </div>

        {/* Title and Delete Button */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
            {galleries[selectedIndex]?.title}
          </h2>
          {isLoggedIn && (
            <Button
              onClick={() => handleDelete(galleries[selectedIndex]._id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-8 w-8" />
            </Button>
          )}
        </div>
      </Dialog>

      {/* Upload Image Modal */}
      <Dialog
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      >
        <h2 className="text-xl font-bold text-center text-green-700">
          Upload New Images
        </h2>
        <form onSubmit={handleUpload} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={userInput.title}
              onChange={(e) =>
                setUserInput({
                  ...userInput,
                  title: e.target.value,
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="photos"
              className="block text-sm font-medium text-gray-700"
            >
              Photos
            </label>
            <div
              className="mt-1 flex items-center justify-center border-2 border-dashed rounded-md h-40 bg-gray-100"
              onClick={() => fileInputRef.current.click()}
            >
              {userInput.previewImages.length ? (
                <div className="grid grid-cols-3 gap-2">
                  {userInput.previewImages.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Preview ${idx}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
                </div>
              ) : (
                <CameraIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              id="photos"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>
          <div className="flex justify-between">
            <Button
              type="submit"
              disabled={
                isUploading ||
                !userInput.photos.length ||
                !userInput.title
              }
              className="bg-green-500 text-white font-bold py-2 px-6 rounded-full"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
            <Button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
