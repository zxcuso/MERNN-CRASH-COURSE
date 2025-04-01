import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { Box, Button, Container, Heading, Input, VStack} from "@chakra-ui/react";
import { useState } from "react";
import { toaster, Toaster } from "@/components/ui/toaster";





const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });


    const {createProduct}=useProductStore()

    const handleAddProduct = async(e) => {
        e.preventDefault();
        const {success, message} = await createProduct(newProduct);
        
         if(!success){
            toaster.create({
                title: "Error",
                description: message,
                status: "error",
                isCloseable: true,
                duration: 2000,
    
             })
         }else {
         toaster.create({
         title: "Success",
         description: message,
         status: "success",
         duration: 2000,
         bg: "red.500",
         color: "white"
         });
        setNewProduct({name: "", image: "", price: ""});
    }
    };

  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW={"50%"}>
    <Toaster />
    <VStack
    spacing ={8}
    >
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} 
        mb={3} mt={2} color={"gray.500"}>
            Create New product
        </Heading>

        <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={6} rounded={"lg"} shadow={"md"}
        >
            <VStack spacing={4}>
                <Input 
                placeholder="Product Name"
                name = "name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                borderColor={borderColor}
                _hover={{borderColor: "gray.400"}}
                _focus={{borderColor: "gray.900"}}
                />
                 <Input 
                placeholder="Price"
                name = "price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                borderColor={borderColor}
                _hover={{borderColor: "gray.400"}}
                _focus={{borderColor: "gray.600"}}
                />
                <Input 
                placeholder="Image URL"
                name = "image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                borderColor={borderColor}
                _hover={{borderColor: "gray.400"}}
                _focus={{borderColor: "gray.600"}}
                />
                <Button colorScheme={"gray.500"} onClick={handleAddProduct} w={"full"}>
                    Add Product
                </Button>
            </VStack>
        </Box>
    </VStack>
    
    </Container>
  )
}

export default CreatePage
