import { validator } from "./util.js";

export const infoMissingMessage =
  "Certain Information regarding pricing strategy is missing in ";

export const priceCalculator = {
  bulkDiscount: () => {
    return (productId, quantity, catalogueInfo) => {
      const { mrp, strategyInfo } = catalogueInfo;
      const { discountPrice, discountThreshold } = strategyInfo;

      if (validator(productId, quantity, mrp, discountPrice, discountThreshold))
        throw new Error(infoMissingMessage + productId);

      let productPrice;
      if (quantity > discountThreshold) {
        productPrice =
          BigInt(quantity) * BigInt(Math.round(discountPrice * 100));
      } else {
        productPrice = BigInt(quantity) * BigInt(Math.round(mrp * 100));
      }
      return Number(productPrice) / 100;
    };
  },

  normalPrice: () => {
    return (productId, quantity, catalogueInfo) => {
      const { mrp, strategyInfo } = catalogueInfo;
      if (validator(mrp, productId, quantity))
        throw new Error(infoMissingMessage + productId);
      const productPrice = BigInt(quantity) * BigInt(Math.round(mrp * 100));
      return Number(productPrice) / 100;
    };
  },

  getNforM: () => {
    return (productId, quantity, catalogueInfo) => {
      const { mrp, strategyInfo } = catalogueInfo;
      const { N, M } = strategyInfo;
      if (validator(productId, mrp, N, M))
        throw new Error(infoMissingMessage + productId);
      const productPriceCents =
        BigInt(Math.round(mrp * 100)) *
        (BigInt(Math.floor(quantity / N) * M) + BigInt(quantity % N));
      return Number(productPriceCents) / 100;
    };
  },
};
