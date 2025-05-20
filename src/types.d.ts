interface PetData {
  animalId: string;
  availability: string;
  breed: string;
  breed2: string;
  coat: string;
  color: string;
  dateOfBirth: string;
  expense: string;
  gender: string;
  health: string;
  id: string;
  imageUrl: string;
  income: string;
  intakeDate: string;
  intakeMode: string;
  intakeName: string;
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
}
