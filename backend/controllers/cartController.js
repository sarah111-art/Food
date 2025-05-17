import  userModel  from '../models/userModel.js';  // Adjust the import according to your project structure


// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;  // Extract itemId and size from request body
        const { userId } = req;  // The userId is set by the authUser middleware
        
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};  // If cartData doesn't exist, initialize it as an empty object

        // If item already exists in cart, increase the quantity for the selected size
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            // If item doesn't exist in cart, create new entry
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Save updated cart data in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Respond with success message
        res.json({ success: true, message: "Item Added to Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while adding item to cart' });
    }
};

// Update item quantity in the cart
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;  // Extract itemId, size, and quantity from the request body
        const { userId } = req;  // The userId is set by the authUser middleware
        
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};  // If cartData doesn't exist, initialize it as an empty object

        // Check if the item and size exist in the cart
        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            cartData[itemId][size] = quantity;  // Update the item quantity for the selected size
            await userModel.findByIdAndUpdate(userId, { cartData });

            // Respond with success message
            res.json({ success: true, message: "Item Updated in Cart" });
        } else {
            res.status(400).json({ error: "Item or size not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while updating item in cart' });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req;  // The userId is set by the authUser middleware
        
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};  // If cartData doesn't exist, return an empty object

        // Respond with the cart data
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while fetching user cart data' });
    }
};

export { addToCart, updateCart, getUserCart };
