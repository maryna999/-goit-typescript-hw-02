import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { Image } from "./types";

const ACCESS_KEY = "mMueF4vZES8_6_LOygFSEGCH1au8JLc8l-D6eG2gT1g";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query, page, per_page: 12 },
            headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
          }
        );
        if (response.status === 200) {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
          setError(response.data.results.length === 0 ? "No matches!" : null);
        } else {
          throw new Error("Error fetching images");
        }
      } catch (err) {
        setError("Failed to fetch images.");
        toast.error("Failed to fetch images. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
