import { INSURANCES, INSURANCE_CARRIERS } from 'constants/insurances'
import {
  BIRTH_SEX,
  PATIENT_RACE,
  PATIENT_RELATIONS,
  US_STATES,
  PHONE_TYPES,
} from 'constants/patients'
import { TRUE_FALSE } from './patientItem.constants'

const schema = {
  patient: {
    details: {
      required: [
        'patientFirstName',
        'patientLastName',
        'patientDob',
        'locationId',
      ],
      title: 'Patient Details',
      properties: {
        patientFirstName: {
          title: 'First Name',
          type: 'text',
          placeholder: 'Your First Name',
        },
        patientMiddleName: {
          title: 'Middle Name',
          type: 'text',
          placeholder: 'Your Middle Name',
        },
        patientLastName: {
          title: 'Last Name',
          type: 'text',
          placeholder: 'Your Last Name',
        },
        patientDob: {
          title: 'Date of Birth',
          widget: 'date',
          format: 'yyyy-MM-dd',
        },
        id: {
          title: 'Patient ID',
          widget: 'text',
          placeholder: 'EXAMPLE1000',
          readOnly: true,
          disabled: true,
        },
        nullField: {
          widget: 'nullField',
        },
        patientEmail: {
          title: 'Email',
          type: 'text',
          format: 'email',
          placeholder: 'Email Address',
        },
        patientEmailAllowed: {
          title: 'Can Email Patient',
          widget: 'select',
          options: TRUE_FALSE,
        },
        patientRace: {
          title: 'Race',
          widget: 'select',
          options: PATIENT_RACE,
        },
        hispanicOrLatino: {
          title: 'Hispanic or Latino?',
          widget: 'select',
          options: TRUE_FALSE,
        },
        patientPhone1: {
          title: 'Phone Number',
          type: 'text',
          placeholder: 'Phone Number',
        },
        patientPhone1Type: {
          title: 'Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        patientPhone2: {
          title: 'Alternate Phone Number',
          type: 'text',
          placeholder: 'Alternate Phone Number',
        },
        patientPhone2Type: {
          title: 'Alternate Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        patientDlOrStateIdLocation: {
          title: 'State ID Location',
          widget: 'select',
          options: US_STATES,
        },
        patientAddress: {
          title: 'Street Address 1',
          type: 'text',
          placeholder: 'Street Address 1',
        },
        patientAddress2: {
          title: 'Street Address 2',
          type: 'text',
          placeholder: 'Street Address 2',
        },
        patientAddressCity: {
          title: 'City',
          type: 'text',
          placeholder: 'City',
        },
        patientAddressState: {
          title: 'State',
          widget: 'select',
          options: US_STATES,
        },
        patientAddressZip: {
          title: 'Zip Code',
          type: 'text',
          placeholder: 'Zip Code',
        },
        organizationId: {
          title: 'District',
          widget: 'select',
          disabled: true,
          options: [],
        },
        locationId: {
          title: 'School',
          widget: 'select',
          options: [],
        },
      },
    },
    primaryGuardian: {
      required: [],
      title: 'Primary Guardian',
      properties: {
        pgFirstName: {
          title: 'First Name',
          type: 'text',
          placeholder: 'Your First Name',
        },
        pgMiddleName: {
          title: 'Middle Name',
          type: 'text',
          placeholder: 'Your Middle Name',
        },
        pgLastName: {
          title: 'Last Name',
          type: 'text',
          placeholder: 'Your Last Name',
        },
        pgDob: {
          title: 'Date of Birth',
          widget: 'date',
          format: 'yyyy-MM-dd',
        },
        pgEmail: {
          title: 'Email',
          type: 'text',
          format: 'email',
          placeholder: 'Email Address',
        },
        pgEmailAllowed: {
          title: 'Can Email Guardian',
          widget: 'select',
          options: TRUE_FALSE,
        },
        pgPhone1: {
          title: 'Phone Number',
          type: 'text',
          placeholder: 'Phone Number',
        },
        pgPhone1Type: {
          title: 'Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        pgPhone2: {
          title: 'Alternate Phone Number',
          type: 'text',
          placeholder: 'Alternate Phone Number',
        },
        pgPhone2Type: {
          title: 'Alternate Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        pgRelationToPatient: {
          title: 'Relationship To Child',
          widget: 'select',
          options: PATIENT_RELATIONS,
        },
        pgDlOrStateIdLocation: {
          title: 'State ID Location',
          widget: 'select',
          options: US_STATES,
        },
        pgAddress: {
          title: 'Street Address 1',
          type: 'text',
          placeholder: 'Street Address 1',
        },
        pgAddress2: {
          title: 'Street Address 2',
          type: 'text',
          placeholder: 'Street Address 2',
        },
        pgAddressCity: {
          title: 'City',
          type: 'text',
          placeholder: 'City',
        },
        pgAddressState: {
          title: 'State',
          widget: 'select',
          options: US_STATES,
        },
        pgAddressZip: {
          title: 'Zip Code',
          type: 'text',
          placeholder: 'Zip Code',
        },
      },
    },
    healthInformation: {
      title: 'Health Information',
      properties: {
        patientKnownAllergies: {
          title: 'Known Allergies',
          widget: 'textarea',
          placeholder: 'Allergies',
        },
        patientCurrentMedications: {
          title: 'Current Medications',
          widget: 'textarea',
          placeholder: 'Medications',
        },
        patientKnownConditions: {
          title: 'Known Conditions',
          widget: 'textarea',
          placeholder: 'Conditions',
        },
        patientSurgicalHistory: {
          title: 'Surgical History',
          widget: 'textarea',
          placeholder: 'Surgical History',
        },
        patientMedicalHistory: {
          title: 'Patient Medical History',
          widget: 'textarea',
          placeholder: 'Patient Medical History',
        },
        patientFamilyMedicalHistory: {
          title: 'Family Medical History',
          widget: 'textarea',
          placeholder: 'Family Medical History',
        },
        patientIsPregnant: {
          title: 'Is the Patient Pregnant?',
          widget: 'select',
          options: TRUE_FALSE,
        },
      },
    },
    emergencyContact: {
      required: [],
      title: 'Emergency Contact',
      properties: {
        ecFirstName: {
          title: 'First Name',
          type: 'text',
          placeholder: 'Your First Name',
        },
        ecMiddleName: {
          title: 'Middle Name',
          type: 'text',
          placeholder: 'Your Middle Name',
        },
        ecLastName: {
          title: 'Last Name',
          type: 'text',
          placeholder: 'Your Last Name',
        },
        ecPhone1: {
          title: 'Phone Number',
          type: 'text',
          placeholder: 'Phone Number',
        },
        ecPhone1Type: {
          title: 'Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        ecPhone2: {
          title: 'Alternate Phone Number',
          type: 'text',
          placeholder: 'Alternate Phone Number',
        },
        ecPhone2Type: {
          title: 'Alternate Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        ecAddress: {
          title: 'Street Address 1',
          type: 'text',
          placeholder: 'Street Address 1',
        },
        ecAddress2: {
          title: 'Street Address 2',
          type: 'text',
          placeholder: 'Street Address 2',
        },
        ecAddressCity: {
          title: 'City',
          type: 'text',
          placeholder: 'City',
        },
        ecAddressState: {
          title: 'State',
          widget: 'select',
          options: US_STATES,
        },
        ecAddressZip: {
          title: 'Zip Code',
          type: 'text',
          placeholder: 'Zip Code',
        },
      },
    },
    primaryCareProvider: {
      title: 'Primary Care Provider',
      properties: {
        pcpProvName: {
          title: 'Full Name',
          type: 'text',
          placeholder: 'Primary Care Provider Full Name',
        },
        pcpConsent: {
          title: 'Share Consent',
          widget: 'select',
          options: TRUE_FALSE,
        },
      },
    },
    prefferedPharmacy: {
      required: [],
      title: 'Preferred Pharmacy',
      properties: {
        patientPrefPharmacy: {
          title: 'Pharmacy Name',
          type: 'text',
          placeholder: 'Pharmacy Name',
        },
        patientPrefPharmacyZip: {
          title: 'Zip Code',
          type: 'text',
          placeholder: 'Zip Code',
        },
        // crossStreet: {
        //   title: 'Cross Street',
        //   type: 'text',
        //   placeholder: 'Cross Street',
        // },
        // streetAddresss1: {
        //   title: 'Street Address 1',
        //   type: 'text',
        //   placeholder: 'Street Address 1',
        // },
        // streetAddresss2: {
        //   title: 'Street Address 2',
        //   type: 'text',
        //   placeholder: 'Street Address 2',
        // },
        // city: {
        //   title: 'City',
        //   type: 'text',
        //   placeholder: 'City',
        // },
        // state: {
        //   title: 'State',
        //   widget: 'select',
        //   options: US_STATES,
        // },
      },
    },
  },
  guarantor: {
    details: {
      required: [],
      title: 'Guarantor Details',
      properties: {
        guarantorFirstName: {
          title: 'First Name',
          type: 'text',
          placeholder: 'Your First Name',
        },
        guarantorMiddleName: {
          title: 'Middle Name',
          type: 'text',
          placeholder: 'Your Middle Name',
        },
        guarantorLastName: {
          title: 'Last Name',
          type: 'text',
          placeholder: 'Your Last Name',
        },
        guarantorDob: {
          title: 'Date of Birth',
          widget: 'date',
          format: 'yyyy-MM-dd',
        },
        guarantorEmail: {
          title: 'Email',
          type: 'text',
          format: 'email',
          placeholder: 'Email Address',
        },
        guarantorEmailAllowed: {
          title: 'Can Email Guarantor',
          widget: 'select',
          options: TRUE_FALSE,
        },
        guarantorPhone1: {
          title: 'Phone Number',
          type: 'text',
          placeholder: 'Phone Number',
        },
        guarantorPhone1Type: {
          title: 'Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        guarantorPhone2: {
          title: 'Alternate Phone Number',
          type: 'text',
          placeholder: 'Alternate Phone Number',
        },
        guarantorPhone2Type: {
          title: 'Alternative Phone Type',
          widget: 'select',
          options: PHONE_TYPES,
        },
        guarantorRelationToPatient: {
          title: 'Relationship To Child',
          widget: 'select',
          options: PATIENT_RELATIONS,
        },
        guarantorDlOrStateIdLocation: {
          title: 'State ID Location',
          widget: 'select',
          options: US_STATES,
        },
        guarantorAddress: {
          title: 'Street Address 1',
          type: 'text',
          placeholder: 'Street Address 1',
        },
        guarantorAddress2: {
          title: 'Street Address 2',
          type: 'text',
          placeholder: 'Street Address 2',
        },
        guarantorAddressCity: {
          title: 'City',
          type: 'text',
          placeholder: 'City',
        },
        guarantorAddressState: {
          title: 'State',
          widget: 'select',
          options: US_STATES,
        },
        guarantorAddressZip: {
          title: 'Zip Code',
          type: 'text',
          placeholder: 'Zip Code',
        },
      },
    },
  },
  insurance: {
    details: {
      required: [],
      title: 'Insurance Details',
      properties: {
        primaryInsCarrier: {
          title: 'Insurance Company',
          widget: 'select',
          options: INSURANCE_CARRIERS,
          disabled: true,
        },
        primaryInsId: {
          title: 'Insurance Plan',
          widget: 'select',
          options: INSURANCES,
        },
        primaryInsPolicyId: {
          title: 'Policy ID',
          type: 'text',
          placeholder: 'MXD12345',
        },
        primaryInsGroupId: {
          title: 'Group Number',
          type: 'text',
          placeholder: '1234ID',
        },
        primaryInsPhone: {
          title: 'Insurance Company Phone Number for Providers',
          widget: 'readOnly',
          placeholder: 'Phone Number',
        },
        primaryInsAddressPo: {
          title: 'Address/PO Box for Insurance',
          widget: 'readOnly',
          placeholder: 'Address',
        },
        // caresActQualification: {
        //   title: 'CARES Act Qualification',
        //   type: 'text',
        //   placeholder: 'CARES Act Qualification',
        // },
        // socialSecurityNumber: {
        //   title: 'Social Security Number',
        //   type: 'text',
        //   placeholder: 'Social Security Number',
        // },
      },
    },
    policyHolder: {
      required: [
        'primaryInsPhFirstName',
        'primaryInsPhLastName',
        'primaryInsPhDob',
      ],
      title: 'Policy Holder',
      properties: {
        primaryInsPhFirstName: {
          title: 'First Name',
          type: 'text',
          placeholder: 'Your First Name',
        },
        primaryInsPhMiddleName: {
          title: 'Middle Name',
          type: 'text',
          placeholder: 'Your Middle Name',
        },
        primaryInsPhLastName: {
          title: 'Last Name',
          type: 'text',
          placeholder: 'Your Last Name',
        },
        primaryInsPhSuffix: {
          title: 'Suffix',
          type: 'text',
          placeholder: 'Suffix',
        },
        primaryInsPhBirthSex: {
          title: 'Birth Sex',
          widget: 'select',
          options: BIRTH_SEX,
        },
        primaryInsPhDob: {
          title: 'Date of Birth',
          widget: 'date',
          format: 'yyyy-MM-dd',
        },
        primaryInsPhPatientRelation: {
          title: "Patient's Relationship to Policy Holder",
          widget: 'select',
          options: PATIENT_RELATIONS,
        },
        // isPatientPrimaryPolicyHolder: {
        //   title: 'Is patient primary insurance policy holder?',
        //   widget: 'select',
        //   options: TRUE_FALSE,
        // },
      },
    },
  },
}

export default schema
