import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode} from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4} bg={useColorModeValue("gray.100", "gray.900")}>
        <Flex
        h={"16"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{
            base: "column",
            sm: "row"
        }}
        >
        <Text
        color={"pink.500"}
        bgGradient="linear(to-l, teal.500, green.500)"
        // bgClip="text"
        fontSize={{
            base: "22", // Default for all screens (smallest)
            sm: "28",   // Applies to screens 480px and up
            md: "32",   // Applies to screens 768px and up
            lg: "3xl",   // Applies to screens 992px and up
           // Applies to screens 1280px and up
          }}
          
        fontWeight={"bold"}
        textAlign={"center"}
        
        >
            <Link to={"/"}>PRODUCT STORE 🛒</Link>
        </Text>
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
            <Tooltip 
            content={"create product"} 
            showArrow

            >
            <Button>
            <FaRegPlusSquare />
            </Button>
            </Tooltip>
            </Link>
        
            <Button onClick={toggleColorMode}>
            {colorMode === "light" ? 
             <Tooltip content="switch to dark mode"
              showArrow
              offset={[0, 8]}
             >
              <MdLightMode /> 
             </Tooltip>
           
            : 
            <Tooltip content={"switch to light mode"}  offset={[0, 20]}
            showArrow
           >
              <MdDarkMode /> 
             </Tooltip>
            }
            </Button>
        

          </HStack>
        </Flex>
    </Container>
  );
};

export default Navbar
