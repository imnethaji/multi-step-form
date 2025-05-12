let currentStep = 1;
let formData = {
  currentStep: 1,
  name: null,
  email: null,
  phoneNumber: null,
  planName: null,
  planTenure: "monthly",
  planAddOns: [],
  total: 0,
};

localStorage.setItem("localFormData", JSON.stringify(formData));

//  Toggle between Monthly and Annual prices
const prices = {
  plans: { arcade: 9, advanced: 12, pro: 15 },
  addOnPrices: {
    onlineService: { title: "Online Service", price: 1 },
    largerStorage: { title: "Larger Storage", price: 2 },
    customProfile: { title: "Customizable Profile", price: 2 },
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("price-toggle");
  const toggleDiv = document.querySelector(".toggle");

  function toggle() {
    const arcadePrice = document.getElementById("arcadePlanPrice");
    const advancedPrice = document.getElementById("advancedPlanPrice");
    const proPrice = document.getElementById("proPlanPrice");
    const onlineServicePrice = document.getElementById("onlineServicePrice");
    const largerStoragePrice = document.getElementById("largerStoragePrice");
    const customProfilePrice = document.getElementById("customProfilePrice");
    toggleDiv.classList.toggle("right");

    if (formData.planTenure === "monthly") {
      const term = "yr";
      // Switch to annual prices
      arcadePrice.innerHTML = `$${prices.plans.arcade * 10}/+${term}`;
      advancedPrice.innerHTML = `$${prices.plans.advanced * 10}/+${term}`;
      proPrice.innerHTML = `$${prices.plans.pro * 10}/+${term}`;
      onlineServicePrice.innerHTML = `$${
        prices.addOnPrices.onlineService.price * 10
      }/+${term}`;
      largerStoragePrice.innerHTML = `$${
        prices.addOnPrices.largerStorage.price * 10
      }/+${term}`;
      customProfilePrice.innerHTML = `$${
        prices.addOnPrices.customProfile.price * 10
      }/+${term}`;
      formData.planTenure = "annually";
    } else {
      const term = "mo";
      // Switch to monthly prices
      arcadePrice.innerHTML = `$${prices.plans.arcade}/+${term}`;
      advancedPrice.innerHTML = `$${prices.plans.advanced}/+${term}`;
      proPrice.innerHTML = `$${prices.plans.pro}/+${term}`;
      onlineServicePrice.innerHTML = `$${prices.addOnPrices.onlineService.price}/+${term}`;
      largerStoragePrice.innerHTML = `$${prices.addOnPrices.largerStorage.price}/+${term}`;
      customProfilePrice.innerHTML = `$${prices.addOnPrices.customProfile.price}/+${term}`;
      formData.planTenure = "monthly";
    }
  }

  toggleButton.addEventListener("click", toggle);
});

function nextStep() {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const nextStepElement = document.getElementById(`step${currentStep + 1}`);

  if (currentStepElement && nextStepElement) {
    currentStepElement.classList.remove("active");
    nextStepElement.classList.add("active");
    currentStep++;
    formData.currentStep = currentStep;
    localStorage.setItem("localFormData", JSON.stringify(formData));
  }
}

function prevStep() {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const prevStepElement = document.getElementById(`step${currentStep - 1}`);

  if (currentStepElement && prevStepElement) {
    currentStepElement.classList.remove("active");
    prevStepElement.classList.add("active");
    currentStep--;
  }
}

function confirmSubscription() {
  // Collect and display summary
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Extract plan information from the selected plan-info element
  const selectedPlanElement = document.querySelector(
    ".plan-info.plan-selected"
  );
  const planName = selectedPlanElement.querySelector(".plan-name").innerText;
  const planPrice = selectedPlanElement.querySelector(".plan-price").innerText;

  // Extract billing information
  const billing = document.querySelector('input[name="billing"]:checked').value;

  // Extract selected addons
  const addons = [];
  const addonsElements = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  addonsElements.forEach((addon) => addons.push(addon.value));

  // Calculate total
  let total = parseInt(planPrice);
  addons.forEach((addon) => (total += parseInt(addon)));

  // Display summary
  document.getElementById("summaryName").innerText = name;
  document.getElementById("summaryEmail").innerText = email;
  document.getElementById("summaryPhone").innerText = phone;
  document.getElementById(
    "summaryPlan"
  ).innerText = `${planName} - $${planPrice}/${billing}`;
  document.getElementById(
    "summaryBilling"
  ).innerText = `Billing Cycle: ${billing}`;

  const summaryAddons = document.getElementById("summaryAddons");
  summaryAddons.innerHTML = "";
  addons.forEach((addon) => {
    const li = document.createElement("li");
    li.innerText = `+ $${addon}/mo`;
    summaryAddons.appendChild(li);
  });

  document.getElementById("summaryTotal").innerText = total;

  // Move to the summary step
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const summaryStepElement = document.getElementById("step4");

  if (currentStepElement && summaryStepElement) {
    currentStepElement.classList.remove("active");
    summaryStepElement.classList.add("active");
    currentStep = 4;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const planInfoElements = document.querySelectorAll(".plan-info");
  let totalPriceDisplay = document.getElementById("final-plan-price");
  let planPrice = "90/yr";
  totalPriceDisplay.innerHTML = planPrice;

  planInfoElements.forEach(function (planInfoElement) {
    planInfoElement.addEventListener("click", function () {
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
      formData.planName = planName;
      planPrice = prices.plans[planName];
      totalPriceDisplay.innerHTML = planPrice;
      console.log(planName);
    });
  });
});

//Checkbox toggling logic

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

  console.log("Current Add-ons:", formData.planAddOns);
}

function tenureChange() {
  formData.planTenure = "monthly" ? "monthly" : "yearly";
}
