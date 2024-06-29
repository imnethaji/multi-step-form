let currentStep = 1;

function nextStep() {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const nextStepElement = document.getElementById(`step${currentStep + 1}`);

  if (currentStepElement && nextStepElement) {
    currentStepElement.classList.remove("active");
    nextStepElement.classList.add("active");
    currentStep++;
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
      console.log("working");
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
