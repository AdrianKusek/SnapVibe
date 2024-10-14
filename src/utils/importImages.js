// src/utils/importImages.js
export const importAllImages = (r) => {
    return r.keys().map(r);
  };
  
  // Import all images from the 'cars' folder
  const images = importAllImages(require.context('../assets/Photos/Cars', false, /\.(png|jpe?g|svg)$/));
  
  export default images;