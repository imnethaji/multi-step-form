let currentStep = 1;
let formData = {
  currentStep: 1,
  name: null,
  email: null,
  phoneNumber: null,
  planName: null,
  planTenure: null,
  planAddOns: [],
  total: 0,
};

//  Toggle between Monthly and Annual prices
const prices = {
  monthly: { arcade: 9, advanced: 12, pro: 15 },
  annually: { arcade: 90, advanced: 120, pro: 150 },
};

let pricing = "monthly";

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("price-toggle");
  const toggleDiv = document.querySelector(".toggle");

  function toggle() {
    let arcadePrice = document.getElementById("arcadePlanPrice");
    let advancedPrice = document.getElementById("advancedPlanPrice");
    let proPrice = document.getElementById("proPlanPrice");
    toggleDiv.classList.toggle("right");

    if (pricing === "monthly") {
      arcadePrice.innerHTML = prices.annually.arcade;
      advancedPrice.innerHTML = prices.annually.advanced;
      proPrice.innerHTML = prices.annually.pro;
      pricing = "annually";
    } else {
      arcadePrice.innerHTML = prices.monthly.arcade;
      advancedPrice.innerHTML = prices.monthly.advanced;
      proPrice.innerHTML = prices.monthly.pro;
      pricing = "monthly";
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

  planInfoElements.forEach(function (planInfoElement) {
    planInfoElement.addEventListener("click", function () {
      // Remove 'plan-selected' class from all plan info elements
      planInfoElements.forEach(function (element) {
        element.classList.remove("plan-selected");
      });

      // Add 'plan-selected' class to the clicked plan info element
      this.classList.add("plan-selected");

      // Add your logic for handling the click event here
      formData.planName = "arcade";
      console.log(formData.planName);
    });
  });
});

//Checkbox toggling logic

function toggleCheckbox(checkboxId) {
  const checkbox = document.getElementById(checkboxId);

  if (checkbox) {
    checkbox.checked = !checkbox.checked;
  }
}
