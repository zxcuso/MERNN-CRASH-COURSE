import ProductCard from "@/compomain/ProductCard";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { Container, VStack, Text, SimpleGrid} from "@chakra-ui/react"
import { useEffect } from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
   fetchProducts();
  }, [fetchProducts]);
  

   const textColor = useColorModeValue("cyan.600", "gray.400");
  return (
    <Container maxW={"container.x1"} py={12}>
       <VStack spacing={8}>
        <Text
        fontSize={"30"}
        fontWeight={"bold"}
        textAlign={"center"}
        color={textColor}
        >
          Current Product 🚀
        </Text>

        <SimpleGrid 
        columns={{
          base: 1,
          md: 2,
          lg: 4
        }}
        spacing={10}
        w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>


       {products.length === 0 && (
         <Text fontSize={"sm"} textAlign={"center"} fontWeight={"bold"}
         color={textColor}
         fontStyle={"normal"} 
        
         >
           No products found 😫 {" "} {" "}
           <Link to={"/create"}>
           <Text as={"span"} color={textColor} _hover={{textDecoration: "underline"}} fontStyle={"oblique"} >
             Creat a product
           </Text>
           </Link>
         </Text>
       )}
       </VStack>
    </Container>
  )
}

export default HomePage
