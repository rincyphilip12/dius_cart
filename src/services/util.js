// ---- CHECKS FOR UNDEFINED or NULL --- 
export function validator(...validateKeyes) {
  return validateKeyes.some((value) => value === undefined || value === null);
}

// ---- Updates Total Amount on WebPage ---
export function updateTotalDisplay(totalAmt) {
  document.querySelector(".total-section #total-displayer").innerHTML =
    "$" + totalAmt;
}

// ---- Updates Product Quantity on WebPage ---
export function updateProductDisplay(productId, quantity) {
  document.querySelector(".total-section #" + productId).innerHTML = quantity;
}
