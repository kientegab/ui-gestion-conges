// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const commonAppURI: string = 'http://localhost:8080/api/';
const commonAppURIA: string = 'http://localhost:8080/conges/api/activate-agent';
const commonAppURIB: string = 'http://localhost:8080/conges/api/validate-compte';



export const environment = {
  production: false,
  exempleResource: commonAppURI + 'exemples',
  visatypedemandeesource: commonAppURI + 'visa',

  visaTypeDemandeResource: commonAppURI + 'visa',

  privilegeResource: commonAppURIA + 'privileges',
  profilResource: commonAppURIA + 'profiles',
  authenticationRessource: commonAppURIA + 'authenticate',


 // compteRessource: commonAppURIA  ,

  compteRessource: commonAppURIA ,
  compteSaveRessource: commonAppURIB ,


  agentResource: commonAppURI +'utilisateurs',

  activateResource:commonAppURI+'activate',
  recordsPerPage: 100,

  structureRessource:commonAppURI + 'structure',
  ministereRessource:commonAppURI + 'ministere',
  typeDemandeRessource:commonAppURI + 'typeDemande',
  typeStructureRessource: commonAppURI + 'typeStructure',
  avisRessource: commonAppURI + 'avis',
  visaRessource: commonAppURI + 'visa',
  motifAbsenceRessource: commonAppURI + 'motifAbsence',
  modalPaiementRessource: commonAppURI + 'modalpaiement',

  typeVisaRessource: commonAppURI + 'typeVisas',




};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
