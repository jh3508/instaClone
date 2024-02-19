import React, { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
  const [selectedImage, setSelectedImage] = useState(false);
  const showToast = useShowToast();
  const maxFileSize = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        showToast("Error", "File must be smaller than 2MB", "error");
        setSelectedImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("error", "Please select an image file!", "error");
      setSelectedImage(null);
    }
  };
  return { selectedImage, handleImageChange, setSelectedImage };
};

export default usePreviewImage;
