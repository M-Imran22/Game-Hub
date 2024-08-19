import { ReactNode } from "react";
import { Box, keyframes } from "@chakra-ui/react";
import Navbar3 from "./Navbar3";
import backgroundImage1 from "../../assets/background-image.jpg";
import backgroundImage2 from "../../assets/background-image2.jpg";
import backgroundImage3 from "../../assets/background-image3.jpg";
import backgroundImage4 from "../../assets/background-image4.jpg";
import backgroundImage6 from "../../assets/background-image6.jpg";
import backgroundImage7 from "../../assets/background-image7.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}

const slideShow = keyframes`
  0% { background-image: url(${backgroundImage1}); }
  20% { background-image: url(${backgroundImage2}); }
  40% { background-image: url(${backgroundImage3}); }
  60% { background-image: url(${backgroundImage4}); }
  80% { background-image: url(${backgroundImage6}); }
  100% { background-image: url(${backgroundImage7}); }
`;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box height="100vh" overflow="hidden">
      <Box
        animation={`${slideShow} 30s infinite`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="blur(1px)"
        height="100%"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex="0"
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex="1"
      />

      <Box position="relative" zIndex="2" height="100vh">
        <Navbar3 />
        <Box mt={5}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
