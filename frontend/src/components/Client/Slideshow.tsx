// components/Client/GameSlideshow.js
import { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";

import Image1 from "../../assets/background-image.jpg";
import Image2 from "../../assets/background-image2.jpg";
import Image3 from "../../assets/background-image3.jpg";
import Image4 from "../../assets/background-image4.jpg";
import Image5 from "../../assets/background-image5.jpg";
import Image7 from "../../assets/background-image7.jpg";
import Image9 from "../../assets/background-image9.jpg";
import Image10 from "../../assets/background-image10.jpg";
import Image11 from "../../assets/background-image11.jpg";
import Image12 from "../../assets/background-image12.jpg";
import Image13 from "../../assets/background-image13.jpg";
import Image14 from "../../assets/background-image14.jpg";
import Image16 from "../../assets/background-image16.jpg";
import Image18 from "../../assets/background-image18.jpg";
import Image20 from "../../assets/background-image20.jpg";
import Image22 from "../../assets/background-image22.jpg";
import Image23 from "../../assets/background-image23.jpg";
import Image24 from "../../assets/background-image24.jpg";
import Image25 from "../../assets/background-image25.jpg";

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image7,
  Image9,
  Image10,
  Image11,
  Image12,
  Image13,
  Image14,
  Image16,
  Image18,
  Image20,
  Image22,
  Image23,
  Image24,
  Image25,
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500); // Wait for the fade-out effect to complete
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="md"
      boxShadow="lg"
      my="25px"
    >
      <Image
        src={images[currentIndex]}
        alt={`Game Cover ${currentIndex + 1}`}
        objectFit="fill"
        width="100%"
        height="350px"
        transition="opacity 0.4s ease-in-out"
        opacity={fade ? 1 : 0}
      />
    </Box>
  );
};

export default Slideshow;
