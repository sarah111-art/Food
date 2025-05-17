import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
const addProduct=async (req, res) => {
    try{
        console.log("req.body:",req.body)
        console.log("req.file:",req.file)

        const { name, prices, description,category, popular } = req.body;

        const image = req.file

        const imageUrl = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
        }).then(res=>res.secure_url)
        
        // const parsedPrices = JSON.parse(prices)

        // const price = parsedPrices.reduce((acc, curr) => {
        //     acc[curr.size] = Number(curr.price)
        // }, {})
        const parsedPrices = JSON.parse(prices);

            const price = parsedPrices.reduce((acc, curr) => {
            if (curr.size && curr.price) {
                acc[curr.size] = Number(curr.price);
            }
            return acc;
            }, {});

        
        const sizes = parsedPrices.map((item) => item.size)
        const productData  = {
            name,
            desc: description,
            category,
            popular: popular === 'true',
            image: imageUrl,
            sizes,
            price, 
            date: Date.now()
          }
          
        console.log("productData:",productData)
        const product = new productModel(productData)
        await product.save()

        res.json({success:true,message:"Food Added",product})
    }catch(error){
        console.log(error)
        res.status(500).json({error:error.message})

    }

}

// const removeProduct=async (req, res) => {
//     try{
//         await productModel.findByIdAndDelete(req.body.id)
//         res.json({success:true,message:"Product Deleted"})

//     }catch(error){
//         console.log(error)
//         res.status(500).json({error:error.message})
        
//     }

// }
const removeProduct = async (req, res) => {
    try {
        // Lấy id từ params, vì phương thức DELETE thường sử dụng URL để truyền ID
        const productId = req.params.id; 

        // Tìm và xóa sản phẩm theo ID
        const product = await productModel.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


const listProduct=async (req, res) => {
    try{
        const products = await productModel.find({})
        res.json({success:true,products})
    }catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
        
    }

}

const singleProduct=async (req, res) => {
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    }catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
        
    }

}

export {addProduct,removeProduct,listProduct,singleProduct}