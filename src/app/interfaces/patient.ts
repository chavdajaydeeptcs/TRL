export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    patientLocation:string;
    zipCode: string;
    mobileNumber: string;
    emailId: string;
    age: number;
    sex: string;
    password: string;
    fullName: string;
    relation:string;
    familyMobileNumber:string;
    // familyMemberAge:string;
    
    surveyData?: any;
    userType : string;
    category?: "Pending" | "Healthy" | "Virtual Ward" | "ICU";
    healthPercent ?: number;
    location?: any;
}
