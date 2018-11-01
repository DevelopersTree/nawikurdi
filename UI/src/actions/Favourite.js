import Axios from "axios";

export function addProductToCart(product){
    var payload = {product: product}
    return {type: "ADD_PRODUCT_TO_CART", payload}
}

export function addMerchantAndProductToCart(merchant, product){
    var payload = {merchant:merchant, product:product}
    return {type: "ADD_MERCHANT_AND_PRODUCT_TO_CART", payload}
}

export function updateProductInCart(productIndex, product){
    var payload = {productIndex:productIndex, product: product}
    console.warn(JSON.stringify(payload))
    return {type: "UPDATE_PRODUCT_IN_CART", payload}
}

export function removeProductFromCart(product){
    return {type: "REMOVE_PRODUCT_FROM_CART", product: product}
}

export function addToCart(merchant,product){
    return (dispatch, getState) => {
        const currentCart = getState().Cart;
        if(currentCart.merchant_id){
            return dispatch(addProductToCart(product));
        }else{
            dispatch(addMerchantAndProductToCart(merchant, product));
        }

    }
}

export function clearCart(){
    return {type: "CLEAR_CART"}
}

export function updateLocationCart(location){
    var payload = {location:location}
    console.warn(JSON.stringify(payload))
    return {type: "UPDATE_LOCATION_CART", payload}
}

export function updatePaymentCart(payment){
    var payload = {payment:payment}
    console.warn(JSON.stringify(payload))
    return {type: "UPDATE_PAYMENT_CART", payload}
}
