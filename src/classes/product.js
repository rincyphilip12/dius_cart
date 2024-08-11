import { priceCalculator } from "../services/price-calculator.js";

//-------------- PRODUCT -------------------
export class Product {
  constructor(itemId, catalogueInfo) {
    this.itemId = itemId;
    this.quantity = 0;
    this.pricingMixin = priceCalculator?.[catalogueInfo?.type] || null;
    this.totalPrice = 0;
    this.catalogueInfo = catalogueInfo;
    this.freePdtQuantity = 0;
  }

  total() {
    try {
      // Receives an updated price or Pdt id of the Pdt to be added
      if (this.pricingMixin === undefined || this.pricingMixin === null) {
        alert("Pricing Rule not found");
      }

      // Verify if free product is scanned
      const originalQuantity = this.quantity - this.freePdtQuantity;
      if (originalQuantity < 0) {
        alert("Scan the free item " + this.itemId);
        return false;
      }

      //Get total price of this product,
      this.totalPrice = this.pricingMixin()(
        this.itemId,
        originalQuantity,
        this.catalogueInfo
      );
      return isNaN(this.totalPrice) ? 0 : Number(this.totalPrice);
    } catch (e) {
      alert(e.message);
      return 0;
    }
  }

  incrementQuantity(incVal) {
    this.quantity += incVal;
  }

  incrementFreeQuantity(incVal) {
    this.freePdtQuantity += incVal;
  }

  getQuantity() {
    return this.quantity;
  }
}
