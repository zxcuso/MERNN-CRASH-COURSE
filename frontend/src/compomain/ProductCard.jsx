
import { useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from "@/store/product";
import { Box, Heading, HStack, IconButton, Image, Text, Button, VStack, Input, DialogCloseTrigger} from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa";
import { RiChatDeleteFill } from "react-icons/ri";
import { toaster, Toaster } from "@/components/ui/toaster";

import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
    DialogBody, DialogFooter, DialogActionTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct} = useProductStore();

    const handleDeleteProduct = async (pid) => {
        
     const {success, message } = await deleteProduct(pid)
     if(!success){
        toaster.create({
            title: "Error",
            description: message,
            status: "error",
            isCloseable: true,
            duration: 2000,
    });
 }else {
         toaster.create({
         title: "Success",
         description: message,
         status: "success",
         duration: 2000,
         bg: "red.500",
         color: "white"
         });
        }

    };

    const handleEditchange = (e) => {
        const {name, value} = e.target;
        setUpdatedProduct({...updatedProduct, [name]: value});
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        
        const {success, message } = await updateProduct(pid, updatedProduct);
        if(!success){
            toaster.create({
                title: "Error",
                description: message,
                status: "error",
                isCloseable: true,
                duration: 2000,
        });
     }else {
             toaster.create({
             title: "Success",
             description: message,
             status: "success",
             duration: 2000,
             bg: "red.500",
             color: "white"
             });
            }
    }

  return (
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    _hover={{ transform: "translateY(-2px)", shadow: "xl"}}
    bg={bg}
    margin={1}
    // h={"fit"}
    h={"fit-content"}
   
    >
    <Toaster />
    <Image src={product.image} alt={product.name} h={"xs"} w={"full"} objectFit={"cover"} />

        <Box p={2} 
        display={"flex"}
        flexDirection={'row'}
        alignItems={"center"}
        justifyContent={"space-between"}
        >
         <Box
            display={"flex"}
            flexDirection={'row'}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <Heading as={"h4"} size={"sm"} mb={2}>
                {product.name}
            </Heading>
            <Text fontweight="md" fontSize="sm" 
                color={textColor} mb={4} marginLeft={5} 
                marginRight={2} marginTop={2.5} 
                borderRadius={"md"} bg={bg} objectFit={"cover"}
                paddingRight={1} paddingLeft={1}>
                ${product.price}
            </Text>
        </Box>
        
        <HStack spacing={1}>
            
            {/* /For editing the product/ */}

            <DialogRoot role="dialog" size={"xs"}>
                <DialogTrigger asChild>
                    <IconButton size={'xs'} colorScheme={"blue"}>
                         <FaEdit/>
                    </IconButton>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader >
                        <DialogTitle marginBottom={"-3"} fontSize={"larger"} fontWeight={"bold"}>Update product</DialogTitle>
                    </DialogHeader>

                    <DialogBody >
                        <VStack spacing={2}>
                            <Input h={"8"}
                                placeholder="Product name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={handleEditchange}
                            />

                            <Input h={"8"}
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={handleEditchange}
                            />

                            <Input marginBottom={"-4"} h={"8"}
                                placeholder="Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={handleEditchange}

                            />
                        </VStack>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant={"outline"} fontSize={"xs"} h={7}>Cancel</Button>
                        </DialogActionTrigger>
                        <DialogCloseTrigger asChild>
                        <Button colorScheme={"green"} fontSize={"xs"} h={7}
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >Save Change</Button>
                        </DialogCloseTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>

            <DialogRoot role="dialog" size={"sm"}>
                        <DialogTrigger asChild>
                            <IconButton size={'xs'} colorScheme={"red"}>
                                <RiChatDeleteFill color={'red.500'} />
                            </IconButton>
                        </DialogTrigger>
                        
                        <DialogContent>
                            <DialogHeader color={"red.600"}>
                                <DialogTitle>Notification!</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <p>
                                    You are about permanently deleting
                                    <strong> {product.name} </strong> from your inventory. This action cannot be undone once deleted.
                                </p>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline" fontSize={"xs"} h={7}>Cancel</Button>
                                </DialogActionTrigger>
                                <Button colorScheme="red" onClick={()=> handleDeleteProduct(product._id)} fontSize={"xs"} h={7}>Delete</Button>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>
        </HStack>
        </Box>

    </Box>
  );
};

export default ProductCard