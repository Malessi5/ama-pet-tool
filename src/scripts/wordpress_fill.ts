// This injected script is used to autofill new post fields
// Inputmap is used to map selectors with pet object attributes or static values
const inputMap: Record<string, InputMapping> = {
  status: { selector: "#_pet_status", key: null, value: "Available" },
  gender: { selector: "#_pet_gender", key: "gender", value: null },
  dateOfBirth: { selector: "#_pet_birthday", key: "dateOfBirth", value: null },
};

function fillFields(petData: PetData) {
  for (let input in inputMap) {
    const mapping = inputMap[input];
    if (!mapping) continue;
    
    const { selector, key, value } = mapping;
    const element = document.querySelector(selector) as HTMLInputElement | HTMLSelectElement;
    
    if (!element) continue;
    
    if (value) {
      element.value = value;
    } else {
      if (key === "gender" && petData.gender) {
        const genderParts = petData.gender.split("_");
        if (genderParts.length > 0 && genderParts[0]) {
          let gender = genderParts[0].toLowerCase();
          gender = gender.charAt(0).toUpperCase() + gender.slice(1);
          element.value = gender;
        }
      } else if (key === "dateOfBirth" && petData.dateOfBirth) {
        const dobParts = petData.dateOfBirth.split("T");
        if (dobParts.length > 0 && dobParts[0]) {
          const dobArray = dobParts[0].split("-");
          if (dobArray.length >= 3 && dobArray[0] && dobArray[1] && dobArray[2]) {
            let formattedDate = [dobArray[1], dobArray[2], dobArray[0]].join("/");
            element.value = formattedDate;
          }
        }
      } else if (key) {
        const petValue = petData[key as keyof PetData];
        if (petValue) {
          element.value = String(petValue);
        }
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
