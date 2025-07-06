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
  microchip: {
    company: string;
    number: string;
  };
  microchipCompany?: string;
  microchipNumber?: string;
  name: string;
  photos: Array<{
    description: string;
    filename: string;
    mediumThumbnailUrl: string;
    smallThumbnailUrl: string;
    title: string;
    url: string;
  }>;
  rescueLink?: string;
  rescueLinkExpirationDate?: Date;
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

// New type definitions for better type safety
interface PetAttribute {
  label: string;
  value: string | number | boolean;
}

interface InputMapping {
  selector: string;
  key: keyof PetData | null;
  value: string | null;
}

interface ChromeMessage {
  type: string;
  petData?: PetData | PetData[];
  data?: PetData;
  url?: string;
  petId?: string;
}

interface CustomEventDetail<T = any> {
  detail: T;
}

// Environment variables
interface ProcessEnv {
  SPARKIE_LINK_PREFIX: string;
  SPARKIE_IMG_PREFIX: string;
  RESCUE_POST_URL_PREFIX: string;
  RESCUE_NEW_POST_LINK: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ProcessEnv {}
  }
}
