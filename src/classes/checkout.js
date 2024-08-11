import {
  updateTotalDisplay,
  updateProductDisplay,
} from "../services/util.js";
import { Product } from "./product.js";

export class Checkout {
  constructor(catalogue) {
    this.catalogue = catalogue;
    this.productList = new Map();
  }

  // --- CREATE PRODUCT --- :
  // If new product in the product list, create a new instance of product
  createProduct(productId, isFree) {
    const productInfo = this.catalogue[productId];

    // To Avoid creating new instance of a product if it already exists
    if (!this.productList.has(productId)) {
      this.productList.set(productId, new Product(productId, productInfo));
    }

    // Check if its a free product, update the free counter
    if (isFree) this.productList.get(productId).incrementFreeQuantity(1);
    else this.productList.get(productId).incrementQuantity(1);

    //Display the count on UI
    updateProductDisplay(
      productId,
      this.productList.get(productId).getQuantity()
    );

    //Search Free Items available for this product
    if (productInfo?.strategyInfo?.freeProductId) {
      const freeProductId = productInfo?.strategyInfo?.freeProductId;
      this.createProduct(freeProductId, true);
    }
  }

  // --- SCAN PRODUCT ---
  scan(productId) {
    if (!productId) return;
    this.createProduct(productId);
  }

  // --- TOTAL ---
  total() {
    let totalAmt = 0;
    for (let [productId, product] of this.productList) {
      totalAmt += product.total();
    }

    totalAmt = parseFloat(totalAmt.toFixed(2));
    updateTotalDisplay(totalAmt);
    return totalAmt;
  }
}
