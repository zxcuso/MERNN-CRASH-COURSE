
import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProduct: (products) => set({products}),

    //function to create a product
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success: false, message:"Please fill all input field"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}));
        return {success: true, message:"Product created successful"}
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data})

    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return {success: true, message: data.message}
    },

    updateProduct: async (pid, updateProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProduct),
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};
        set(state => ({
            products: state.products.map(product => 
                product._id === pid ? data.data : product)
        }));

        return {success: true, message: "Product update successfully"}
    }
}))
