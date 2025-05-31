let initialFormData = {
  currentStep: 1,
  name: null,
  email: null,
  phoneNumber: null,
  planName: "arcade",
  planTenure: "monthly",
  planAddOns: [],
  total: "$9/mo",
};

let formData = { ...initialFormData };

//  Toggle between Monthly and Annual prices
const prices = {
  plans: { arcade: 9, advanced: 12, pro: 15 },
  addOnPrices: {
    onlineService: { title: "Online Service", price: 1 },
    largerStorage: { title: "Larger Storage", price: 2 },
    customProfile: { title: "Customizable Profile", price: 2 },
  },
};

window.addEventListener("load", function () {
  // Reset checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Reset the planAddOns array
  formData.planAddOns = [];

  // Update the summary
  updateSummary();
});

const updatePrice = (tenure) => {
  // Selecting DOM Elements
  const arcadePrice = document.getElementById("arcadePlanPrice");
  const advancedPrice = document.getElementById("advancedPlanPrice");
  const proPrice = document.getElementById("proPlanPrice");
  const onlineServicePrice = document.getElementById("onlineServicePrice");
  const largerStoragePrice = document.getElementById("largerStoragePrice");
  const customProfilePrice = document.getElementById("customProfilePrice");
  let term = null;
  if (tenure != "monthly") {
    term = "yr";
    // Switch to annual prices
    arcadePrice.innerHTML = `$${prices.plans.arcade * 10}/${term}`;
    advancedPrice.innerHTML = `$${prices.plans.advanced * 10}/${term}`;
    proPrice.innerHTML = `$${prices.plans.pro * 10}/${term}`;
    onlineServicePrice.innerHTML = `$${
      prices.addOnPrices.onlineService.price * 10
    }/${term}`;
    largerStoragePrice.innerHTML = `$${
      prices.addOnPrices.largerStorage.price * 10
    }/${term}`;
    customProfilePrice.innerHTML = `$${
      prices.addOnPrices.customProfile.price * 10
    }/${term}`;
  } else {
    term = "mo";
    // Switch to monthly prices
    arcadePrice.innerHTML = `$${prices.plans.arcade}/${term}`;
    advancedPrice.innerHTML = `$${prices.plans.advanced}/${term}`;
    proPrice.innerHTML = `$${prices.plans.pro}/${term}`;
    onlineServicePrice.innerHTML = `$${prices.addOnPrices.onlineService.price}/${term}`;
    largerStoragePrice.innerHTML = `$${prices.addOnPrices.largerStorage.price}/${term}`;
    customProfilePrice.innerHTML = `$${prices.addOnPrices.customProfile.price}/${term}`;
  }
  updateSummary();
};
console.log("Worker");
function tenureToggle() {
  const toggleDiv = document.querySelector(".toggle");
  toggleDiv.classList.toggle("right");
  formData.planTenure =
    formData.planTenure == "monthly" ? "annually" : "monthly";
  updatePrice(formData.planTenure);
  updateSummary();
}
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("price-toggle");

  toggleButton.addEventListener("click", tenureToggle);
});

function nextStep(step) {
  console.log("working");
  if (formData.currentStep == 1) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    if (name == "" || email == "" || phone == "") {
      alert("Please enter all the required fields");
      return;
    }
    formData.name = name;
    formData.email = email;
    formData.phone = phone;
  }

  // Update current Step style
  const currentStepCount = document.querySelector(
    `.step-${formData.currentStep}`
  );

  const nextStepCount = document.querySelector(
    `.step-${formData.currentStep + 1}`
  );
  if (nextStepCount && currentStepCount) {
    currentStepCount
      .querySelector(".step-count-info-current")
      .classList.replace("step-count-info-current", "step-count-info");

    nextStepCount
      .querySelector(".step-count-info")
      .classList.replace("step-count-info", "step-count-info-current");
  } else if (!nextStepCount) {
    currentStepCount
      .querySelector(".step-count-info-current")
      .classList.replace("step-count-info-current", "step-count-info");
  }

  const currentStepElement = document.getElementById(
    `step${formData.currentStep}`
  );
  const nextStepElement = document.getElementById(
    `step${formData.currentStep + 1}`
  );

  if (currentStepElement && nextStepElement) {
    currentStepElement.classList.remove("active");
    nextStepElement.classList.add("active");
    formData.currentStep++;
  }

  if (step == "final") {
    console.log("Trying to hide mobile-step-info");
    document.querySelector(".mobile-step-info").style.display = "none";
  }
  updateSummary();
}

function prevStep() {
  // Update current Step style
  const currentStepCount = document.querySelector(
    `.step-${formData.currentStep}`
  );

  const prevStepCount = document.querySelector(
    `.step-${formData.currentStep - 1}`
  );

  prevStepCount
    .querySelector(".step-count-info")
    .classList.replace("step-count-info", "step-count-info-current");

  currentStepCount
    .querySelector(".step-count-info-current")
    .classList.replace("step-count-info-current", "step-count-info");

  const currentStepElement = document.getElementById(
    `step${formData.currentStep}`
  );
  const prevStepElement = document.getElementById(
    `step${formData.currentStep - 1}`
  );

  if (currentStepElement && prevStepElement) {
    currentStepElement.classList.remove("active");
    prevStepElement.classList.add("active");
    formData.currentStep--;
  }
  updateSummary();
}

function updateSummary() {
  const finalPlanName = document.getElementById("final-plan-name");
  finalPlanName.textContent = `  
    ${formData.planName[0].toUpperCase() + formData.planName.substring(1)}(${
    formData.planTenure[0].toUpperCase() + formData.planTenure.substring(1)
  })`;

  const currentPlanPrice =
    formData.planTenure == "monthly"
      ? `$${prices.plans[formData.planName]}/mo`
      : `$${prices.plans[formData.planName] * 10}/yr`;
  const addOnTotal = formData.planAddOns.reduce((total, addon) => {
    return total + (prices.addOnPrices[addon]?.price || 0);
  }, 0);
  // Updating summary page plan price
  document.getElementById("final-plan-price").innerHTML = currentPlanPrice;

  let totalPrice =
    formData.planTenure == "monthly"
      ? `$${prices.plans[formData.planName] + addOnTotal}/mo`
      : `$${prices.plans[formData.planName] * 10 + addOnTotal * 10}/yr`;
  document.getElementById("plan-total-price").innerHTML = totalPrice;

  const addOnList = document.getElementById("add-ons-list");
  addOnList.innerHTML = "";
  if (formData.planAddOns.length > 0) {
    formData.planAddOns.forEach((item) => {
      const list = document.createElement("li");
      list.innerHTML =
        formData.planTenure == "monthly"
          ? `<p class="add-on-title">${prices.addOnPrices[item].title}</p>
                         <p class="add-on-price">+$${prices.addOnPrices[item].price}/mo</p>`
          : `<p class="add-on-title">${prices.addOnPrices[item].title}</p>
                         <p class="add-on-price">+$${
                           prices.addOnPrices[item].price * 10
                         }/yr</p>`;
      addOnList.append(list);
    });
    if (formData.currentStep == 3) {
      const finalSummaryText = document.getElementById("finalSummary");
      finalSummaryText.textContent = `Thanks for confirming your subscription ${formData.name}! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@lermgaing.com. We have sent the confirmation email to ${formData.email}.`;
    }
  }
}

updateSummary();

// Plan change logic

document.addEventListener("DOMContentLoaded", function () {
  const planInfoElements = document.querySelectorAll(".plan-info");
  let planPrice = "90/yr";
  planInfoElements.forEach(function (planInfoElement) {
    planInfoElement.addEventListener("click", function () {
      let currentPlanTenure = formData.planTenure;
      // Remove 'plan-selected' class from all plan info elements
      planInfoElements.forEach((element) => {
        element.classList.remove("plan-selected");
      });
      // Add 'plan-selected' class to the clicked plan info element
      this.classList.add("plan-selected");
      // Add your logic for handling the click event here
      let planName = planInfoElement
        .querySelector("h4")
        .textContent.toLowerCase();
      // Update the selected plan name to state
      formData.planName = planName;
      planPrice = prices.plans[planName];
      updatePrice(currentPlanTenure);
    });
  });
});

//Adding the selected addons to an Array for calculation

function addonToggleCheckbox(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  if (!checkbox) return;
  checkbox.checked = !checkbox.checked;
  const index = formData.planAddOns.indexOf(checkboxId);
  if (checkbox.checked && index === -1) {
    formData.planAddOns.push(checkboxId);
  } else if (!checkbox.checked && index !== -1) {
    formData.planAddOns.splice(index, 1);
  }
  updateSummary();
}
