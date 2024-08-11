import { Checkout } from "./classes/checkout.js";

document.addEventListener("DOMContentLoaded", init);

//---- Read pricing rules from text files and convert to object
export const convertTextToObj = async () => {
    let response = await fetch("catalogue.txt");
    return await response.json();
}

//------- INIT -reads pricing rule from text files and instantiates Checkout Object ----
async function init() {
  try {
   
    let configObj = await convertTextToObj();

    // ---- Instantiating checkout obj -----
    const co = new Checkout(configObj);

    // ---  Adding event listeners to buttons ---
    const gadgetScanBtns = document.querySelectorAll(".items-section button");
    gadgetScanBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e?.target?.id && co.scan(e.target.id);
      })
    );

    // ---  Adding event listeners to buttons ---
    const totalBtn = document.querySelector(".total-btn-wrapper button");
    totalBtn.addEventListener("click", () => {
      co.total();
    });
  } catch (e) {
    console.error("JSON FORMAT ERROR" + e);
  }
}


