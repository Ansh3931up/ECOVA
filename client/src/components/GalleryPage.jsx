import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GalleryCard from '../components/GalleryCard';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../Helpers/ThemeToggle';
import { fetchGalleries, uploadPhoto, deletePhoto } from '../Redux/galleryRedux';
import { toast } from 'react-hot-toast';
import { CameraIcon } from 'lucide-react';

const GalleryPage = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const { galleries, loading } = useSelector((state) => state.gallery);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [visibleItems, setVisibleItems] = useState(6);
  const [userInput, setUserInput] = useState({
    title: "",
    photo: null,
    previewImage: "",
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInput({
        ...userInput,
        photo: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInput((prevInput) => ({
          ...prevInput,
          previewImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImage = async () => {
    if (!userInput.photo) {
      toast.error('Please select an image');
      return null;
    }

    const data = new FormData();
    data.append('file', userInput.photo);
    data.append('upload_preset', 'photogallery');
    data.append('cloud_name', 'dxueqphl3');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dxueqphl3/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || 'Error uploading image');
      }

      const cloudData = await res.json();
      toast.success('Image uploaded successfully');
      return cloudData.secure_url;
    } catch (error) {
      toast.error(`Error uploading image: ${error.message}`);
      return null;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (!userInput.title || !userInput.photo) {
      toast.error('Title and image are required');
      setIsUploading(false);
      return;
    }

    const imageUrl = await saveImage();

    if (!imageUrl) {
      setIsUploading(false);
      return;
    }

    dispatch(uploadPhoto({ title: userInput.title, photo: imageUrl }))
      .unwrap()
      .then(() => {
        toast.success('Photo uploaded successfully!');
        setUserInput({
          title: "",
          photo: null,
          previewImage: "",
        });
        setIsUploadModalOpen(false);
      })
      .catch((error) => toast.error('Failed to upload photo'))
      .finally(() => setIsUploading(false));
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id))
      .unwrap()
      .then(() => toast.success('Photo deleted successfully!'))
      .catch((error) => toast.error('Failed to delete photo'));
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`min-h-screen pt-32 font-poppins transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-blue-50'} overflow-hidden`}>
      <ThemeToggle className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300" />
      
      <main className="relative z-10 mx-auto px-6 py-12">
        <section className="mb-20">
          <h2 className={`text-6xl font-bold mb-8 text-center ${isDark ? 'text-blue-300 shadow-md' : 'text-green-700 shadow-md'}`}>
            Our Gallery
          </h2>

          {isLoggedIn && (
            <div className="mb-8 flex justify-center">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className={`${
                  isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                } text-white font-bold py-2 px-6 rounded-full transition duration-300`}
              >
                Upload Image
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleries?.slice().reverse().slice(0, visibleItems).map((item) => (
              <GalleryCard
                key={item._id}
                title={item.title}
                imageSrc={item.photo}
                isDark={isDark}
                onDelete={() => handleDelete(item._id)}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>

          {visibleItems < galleries?.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreItems}
                className={`${
                  isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                } text-white font-bold py-3 px-6 rounded-full transition duration-300`}
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Upload Image Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-bold text-center ${isDark ? 'text-green-300' : 'text-green-700'}`}>
              Upload New Image
            </h2>
            <form onSubmit={handleUpload} className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={userInput.title}
                  onChange={(e) => setUserInput({ ...userInput, title: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div
                  className={`mt-1 flex items-center justify-center border-2 border-dashed rounded-md h-40 ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'}`}
                  onClick={openFileSelector}
                >
                  {userInput.previewImage ? (
                    <img src={userInput.previewImage} alt="Preview" className="h-full object-cover rounded-md" />
                  ) : (
                    <CameraIcon className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  id="photo"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className={`${
                    isUploading ? 'cursor-wait' : ''
                  } ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-6 rounded-full transition duration-300`}
                  disabled={isUploading || !userInput.photo || !userInput.title}
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
