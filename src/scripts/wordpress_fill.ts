// This injected script is used to autofill new post fields
// Inputmap is used to map selectors with pet object attributes or static values
const inputMap: any = {
  status: { selector: "#_pet_status", key: null, value: "Available" },
  gender: { selector: "#_pet_gender", key: "gender", value: null },
  dateOfBirth: { selector: "#_pet_birthday", key: "dateOfBirth", value: null },
};

function fillFields(petData: PetData) {
  for (let input in inputMap) {
    let { selector, key, value } = inputMap[input];
    const element = document.querySelector(selector);
    if (value) {
      element.value = value;
    } else {
      if (key == "gender" && petData.gender) {
        let gender = petData.gender.split("_")[0].toLowerCase();
        gender = gender.charAt(0).toUpperCase() + gender.slice(1);
        element.value = gender;
      } else if (key == "dateOfBirth" && petData.dateOfBirth) {
        let dobArray = petData.dateOfBirth.split("T")[0].split("-");
        let formattedDate = [dobArray[1], dobArray[2], dobArray[0]].join("/");
        element.value = formattedDate;
      } else {
        element.value = petData[key as keyof typeof petData];
      }
    }
  }
}

(function () {
  console.log("wp script injected");
  document.addEventListener("AUTOFILL_PET_DETAILS", (e) => {
    const customEvent = e as CustomEvent;
    let data = customEvent.detail.data;
    fillFields(data);
  });
})();
