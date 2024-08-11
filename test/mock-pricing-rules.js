export const mockPricingRules = {
  ipd: {
    name: "Super iPad",
    mrp: 549.99,
    type: "bulkDiscount",
    strategyInfo: {
      discountThreshold: 4,
      discountPrice: 499.99,
    },
  },
  mbp: {
    name: "MacBook Pro",
    mrp: 1399.99,
    type: "normalPrice",
    strategyInfo: {
      freeProductId: "vga",
    },
  },
  atv: {
    name: "Apple TV",
    mrp: 109.5,
    type: "getNforM",
    strategyInfo: {
      N: 3,
      M: 2,
    },
  },
  vga: {
    name: "VGA adapter",
    mrp: 30.0,
    type: "normalPrice",
    strategyInfo: {},
  },
};

export const missingIPD = {
  ipd: {
    name: "Super iPad",
    mrp: 549.99,
    type: "bulkDiscount",
    strategyInfo: {
      discountPrice: 499.99,
    },
  },
};

export const missingMBP = {
  ipd: {
    name: "Super iPad",
    mrp: 549.99,
    type: "bulkDiscount",
    strategyInfo: {
      discountThreshold: 4,
      discountPrice: 499.99,
    },
  },

  mbp: {
    name: "MacBook Pro",
    type: "normalPrice",
    strategyInfo: {},
  },
};

export const missingATV = {
  ipd: {
    name: "Super iPad",
    mrp: 549.99,
    type: "bulkDiscount",
    strategyInfo: {
      discountThreshold: 4,
      discountPrice: 499.99,
    },
  },
  mbp: {
    name: "MacBook Pro",
    mrp: 1399.99,
    type: "normalPrice",
    strategyInfo: {
      freeProductId: "vga",
    },
  },
  atv: {
    name: "Apple TV",
    mrp: 109.5,
    type: "getNforM",
    strategyInfo: {
      M: 2,
    },
  },
  vga: {
    name: "VGA adapter",
    mrp: 30.0,
    type: "normalPrice",
    strategyInfo: {},
  },
};


export const incorrectPricingType = {
  ipd: {
    name: "Super iPad",
    mrp: 549.99,
    type: "bulkDiscountWrong",
    strategyInfo: {
      discountThreshold: 4,
      discountPrice: 499.99,
    },
  }
}