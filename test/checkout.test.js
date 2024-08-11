import { Checkout } from "../src/classes/checkout.js";
import {
  mockPricingRules,
  missingATV,
  missingIPD,
  missingMBP,
  incorrectPricingType
} from "./mock-pricing-rules.js";
import { infoMissingMessage } from "../src/services/price-calculator";


describe("Testing DiUS Checkout System with Error Scenarios", () => {
  global.alert = jest.fn();
  beforeEach(async () => {
    global.document = {
      querySelector: jest.fn(() => ({})),
      querySelectorAll: jest.fn(() => ({})),
      getElementById: jest.fn(() => ({})),
    };
  });

  test("Scenario 1: ipd", () => {
    let co = new Checkout(missingIPD);
    co.scan("ipd");
    co.total();
    expect(global.alert).toBeCalledWith(infoMissingMessage + "ipd");
  });

  test("Scenario 2: mbp", () => {
    let co = new Checkout(missingMBP);
    co.scan("mbp");
    co.total();

    expect(global.alert).toBeCalledWith(infoMissingMessage + "mbp");
  });

  test("Scenario 3: atv", () => {
    let co = new Checkout(missingATV);
    co.scan("atv");
    co.total();
    expect(global.alert).toBeCalledWith(infoMissingMessage + "atv");
  });

  test("Scenario 4: Pricing Type provided is incorrect", () => {
    let co = new Checkout(incorrectPricingType);
    co.scan("atv");
    co.total();
    expect(global.alert).toBeCalled();
  });

  test("No Free item (VGA) scanned : mbp", () => {
    let co = new Checkout(mockPricingRules);
    co.scan("mbp");
    co.total();
    expect(global.alert).toHaveBeenCalled();
  });

  test("No Items scanned", () => {
    let co = new Checkout(mockPricingRules);
    co.scan();
    expect(global.alert).toHaveBeenCalled();
  });
});



describe("Testing DiUS Checkout System with correct pricing rules", () => {
  let co;
  global.alert = jest.fn();
  beforeEach(async () => {
    global.document = {
      querySelector: jest.fn(() => ({})),
      querySelectorAll: jest.fn(() => ({})),
      getElementById: jest.fn(() => ({})),
    };
    co = new Checkout(mockPricingRules);
  });

  test("Scenario 1: atv, atv, atv, vga", () => {
    co.scan("atv");
    co.scan("atv");
    co.scan("atv");
    co.scan("vga");
    expect(co.total()).toBe(249.0);
  });

  test("Scenario 2: atv, ipd, ipd, atv, ipd, ipd, ipd", () => {
    co.scan("atv");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("atv");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    expect(co.total()).toBe(2718.95);
  });

  test("Scenario 3: mbp, vga, ipd", () => {
    co.scan("mbp");
    co.scan("vga");
    co.scan("ipd");
    expect(co.total()).toBe(1949.98);
  });

  test("Scenario 4: ipd, ipd, ipd, ipd, ipd", () => {
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    expect(co.total()).toBe(2499.95); // Bulk discount applied
  });

  test("Scenario 5: mbp, mbp, vga, vga", () => {
    co.scan("mbp");
    co.scan("mbp");
    co.scan("vga");
    co.scan("vga");
    expect(co.total()).toBe(2799.98); // Two free VGA adapters with MacBook Pros
  });

  test("Scenario 6: atv, atv, atv, atv, atv, atv", () => {
    co.scan("atv");
    co.scan("atv");
    co.scan("atv");
    co.scan("atv");
    co.scan("atv");
    co.scan("atv");
    expect(co.total()).toBe(438.0); // Two 3-for-2 deals applied
  });

  test("Scenario 7: ipd, ipd, ipd, ipd", () => {
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    expect(co.total()).toBe(2199.96); // no bulk discount applied
  });

  test("Scenario 8: mbp, atv, vga, ipd, ipd", () => {
    co.scan("mbp");
    co.scan("atv");
    co.scan("vga");
    co.scan("ipd");
    co.scan("ipd");
    expect(co.total()).toBe(2609.47); // Free VGA adapter with MacBook Pro
  });

  test("Scenario 9: mbp, mbp, atv, vga, vga, vga, ipd, ipd", () => {
    co.scan("mbp");
    co.scan("atv");
    co.scan("vga");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("vga");
    co.scan("vga");
    co.scan("mbp");
    expect(co.total()).toBe(4039.46);
  });
});

