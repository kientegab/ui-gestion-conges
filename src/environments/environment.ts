// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const commonAppURI: string = 'http://localhost:8080/conges/api/';


export const environment = {
  production: false,
  recordsPerPage: 100,
  exempleResource: commonAppURI + 'exemples',
  visatypedemandeesource: commonAppURI + 'visa',
  privilegeResource: commonAppURI + 'privileges',
  profilResource: commonAppURI + 'profiles',
  authenticationRessource: commonAppURI + 'authenticate',
  compteRessource: commonAppURI  ,
  agentResource: commonAppURI +'utilisateurs',
  activateResource:commonAppURI+'activate',
  structureRessource:commonAppURI + 'structure',
  ministereRessource:commonAppURI + 'ministere', 
  typeDemandeRessource:commonAppURI + 'typeDemande',
  typeStructureRessource: commonAppURI + 'typeStructure',
  avisRessource: commonAppURI + 'avis',
  visaRessource: commonAppURI + 'visa',
  motifAbsenceRessource: commonAppURI + 'motifAbsence',
  modalPaiementRessource: commonAppURI + 'modalpaiement', 
  articleRessource:commonAppURI+'article',





};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
