import addProduct from "./addProduct"
import getProducts from "./getAllProducts"
import getSpecificUserProducts from "./getCurrentUserProducts"
import getSpecificProduct from "./getSpecificProduct"
import getAvailableProducts from "./getAvailableProducts"
import updateProduct from "./updateProduct"


export = ( dependencies: any) => {
    return {
        addProductController: addProduct(dependencies),
        getProductsController: getProducts(dependencies),
        getSpecificUserProductsController : getSpecificUserProducts(dependencies),
        getSpecificProductController: getSpecificProduct(dependencies),
        getAvailableProductsController: getAvailableProducts(dependencies),
        updateProductController: updateProduct(dependencies)
    }
}