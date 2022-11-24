// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const commonAppURI: string = 'http://localhost:8080/api/';
const commonAppURIN: string = 'http://localhost:8080/nomination/api/';
const commonAppURIA: string = 'http://localhost:8080/nomination/api/';


export const environment = {
  production: false,
  recordsPerPage: 100,
  exempleResource: commonAppURI + 'exemples',
  structureRessource:commonAppURI + 'structure',
  ministereRessource:commonAppURI + 'ministere',
  typeDemandeRessource:commonAppURI + 'typeDemande',
  typeStructureRessource: commonAppURI + 'typeStructure',
  avisRessource: commonAppURI + 'avis',
  visaRessource: commonAppURI + 'visa',
  motifAbsenceRessource: commonAppURI + 'motifAbsence',
  modalPaiementRessource: commonAppURI + 'modalpaiement',
  
  

  
  privilegeResource: commonAppURI + 'privileges',
  profilResource: commonAppURI + 'profils',
  authenticationRessource: commonAppURIA + 'authenticate',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
