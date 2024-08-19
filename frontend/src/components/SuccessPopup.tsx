import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

interface SuccessPopupProps {
  message: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message }) => {
  const toast = useToast();

  useEffect(() => {
    const toastId = toast({
      title: message,
      status: "success",
      duration: 5000, // 5 seconds
      isClosable: true,
      position: "top",
    });

    return () => {
      toast.close(toastId);
    };
  }, [message, toast]);

  return null;
};

export default SuccessPopup;
