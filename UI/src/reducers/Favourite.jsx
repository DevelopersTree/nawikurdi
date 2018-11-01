var cart = {
    cartTotal:0,
    numOfProducts:0,
    products:[],
    location:{lat:'',lng:''},
    payment:'Cash'
}

export function Favourite(state=cart, action){
    switch(action.type){
        case "ADD_PRODUCT_TO_CART":
            return addProductToCart(state={...state}, action); //If merchant already exist, only product will be added to the cart.

        case "ADD_MERCHANT_AND_PRODUCT_TO_CART":
            return addMerchantAndProductToCart(state={...state}, action); //If the cart is empty the merchant and prouct will be added to the cart.

        case "CLEAR_CART":
            return cart; // return an empty cart

        case "REMOVE_PRODUCT_FROM_CART":
            return removeProductFromCart(state={...state}, action.product);

        case "UPDATE_PRODUCT_IN_CART":
            return updateProductInCart(state={...state}, action.payload.productIndex, action.payload.product)
        case "UPDATE_LOCATION_CART":
          return updateLocationCart(state={...state}, action.payload.location)

        case "UPDATE_PAYMENT_CART":
          return updatePaymentCart(state={...state}, action.payload.payment)

        default:
            return state;
    }
}


const addProductToCart = (state, action) => {
    /* check if product is already in the cart with the same addons,
    if so just update the quantiy of the product. otherwise adds product to the product list */
    //

    if(isProductInCart(state, action.payload.product)){
        return{
            ...state,
            cartTotal: calculateCartTotalPrices(state,action.payload.product),
            numOfProducts: updateCartNumOfProducts(state,action.payload.product.quantity) ,
            products:[...state.products]
        }
    }else{
        return {
            ...state,
            cartTotal:calculateCartTotalPrices(state,action.payload.product),
            numOfProducts: updateCartNumOfProducts(state, action.payload.product.quantity) ,
            products:[...state.products, action.payload.product]
        };
    }
}

const addMerchantAndProductToCart = (state, action) => {
    return{
        ...action.payload.merchant,
        cartTotal:calculateCartTotalPrices(state,action.payload.product),
        numOfProducts: updateCartNumOfProducts(state, action.payload.product.quantity),
        products:[...state.products, action.payload.product]
    }
}

const updateProductInCart = (state, productIndex, product) => {
    state.products.map((cartProduct, index) => {
        if(index === productIndex){
            state.products[index] = product;
        }
    })

    return {
        ...state
    }
}

const removeProductFromCart = (state, product) => {
    state.products.map((cartProduct, index) => {
        if(cartProduct === product){
            state.products.splice(index,1);
        }
    })

    return {
        ...state,
        numOfProducts: updateCartNumOfProducts(state),
        cartTotal: calculateCartTotalPrices(state)
    };
}

const updateLocationCart = (state, location) => {

    state.location= location;

    return {
        ...state
    }
}

const updatePaymentCart = (state, payment) => {

    state.payment= payment;
    return {
        ...state
    }
}
function isProductInCart(cart, product){
    let isProductExist = false;

    cart.products.map((cartProduct) => {
      if(cartProduct.product_id === product.product_id){
        if(checkAddon(cartProduct.product_addons, product.product_addons)){
            cartProduct.quantity += product.quantity;
            isProductExist = true;
        }
      }
    })

    return isProductExist;
}

// function isAddonsEqual(addons1, addons2){
    // let flag = true;
    // for(key1 in addons1){
    //     for(key2 in addons2){
    //         if(addons1[key1].addon_id != addons2[key2].addon_id){
    //             flag = false;
    //         }
    //     }
    // }
    // return flag;
// }

function checkAddon(addons1,addons2){
    if(addons1.length != addons2.length){
      return false
    }
    var old=[],newadd=[];
    for (var i = 0; i < addons1.length; ++i) {
      old.push(addons1[i].value.id)
    }
    old=old.sort();
    for (var i = 0; i < addons2.length; ++i) {
      newadd.push(addons2[i].value.id)
    }
    newadd=newadd.sort();
    for (var i = 0; i < old.length; ++i) {
      if (old[i] !== newadd[i]) return false;
    }
    return true;
}
//calculates the price on a product plus its addon prices
function findProductTotalPrice(product){
    var productTotalPrice = (product.totalAddonPrice+product.product_price)*product.quantity;
    return productTotalPrice;
}

function updateCartNumOfProducts(state, quantity){
    let numOfProducts = quantity || 0;
    state.products.map(cartProduct => {
        numOfProducts += cartProduct.quantity;
    })

    return numOfProducts;
}

function calculateCartTotalPrices(state, currentProduct){
    let totalPrice = currentProduct ? findProductTotalPrice(currentProduct) : 0;
    state.products.map(cartProduct => {
        totalPrice += findProductTotalPrice(cartProduct);
    })
    return totalPrice;
}




// const cartReducer = (state=[], action) => {
//   switch(action.type){
//     case 'ADD':
//       return [...state, action.payload]
//
//     case 'REMOVE':
//     const firstMatchIndex = state.indexOf(action.payload)
//     return state.filter((item,index) => index !== firstMatchIndex)
//
//     default:
//       return state;
//
//   }
// }
// export default cartReducer
