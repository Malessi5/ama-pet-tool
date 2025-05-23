interface PetData {
  adoptedName: string;
  animalId: string;
  availability: string;
  breed: string;
  breed2: string;
  coat: string;
  color: string;
  color2: string;
  currentGuardian: {
    availability: string;
    status: string;
  };
  dateOfBirth: string;
  expense: string;
  gender: string;
  guardians: [{ availability: string; status: string }];
  health: string;
  id: string;
  imageUrl: string;
  income: string;
  intake: {
    agency: string;
    date: string;
    mode: string;
    person: string;
  };
  intakeDate: string;
  labels: string;
  lastUpdated: string;
  medicalStatus: string;
  microchipCompany: string;
  microchipNumber: string;
  name: string;
  photos: [
    {
      description: string;
      filename: string;
      mediumThumbnailUrl: string;
      smallThumbnailUrl: string;
      title: string;
      url: string;
    }
  ];
  size: string;
  sparkieURL: string;
  species: string;
  status: string;
  timeInCare: string;
  total: string;
  transferAgency: string;
  uploadRegistry: string;
  uploadStatus: string;
  _id: string;
}
interface AllPetData {
  [index: string]: PetData;
}
