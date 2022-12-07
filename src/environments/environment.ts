// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const commonAppURIA: string = 'http://localhost:8080/conges/api/activate-agent';
const commonAppURIB: string = 'http://localhost:8080/conges/api/validate-compte';


const commonAppURI: string = 'http://localhost:8080/conges/api/';


export const environment = {
  production: false,
  recordsPerPage: 100,
  agentImportRessource:commonAppURI+'import-data/agents',
  agentRessource:commonAppURI+'agents',
  corpRessource:commonAppURI+'corps',
  corpImportRessource:commonAppURI+'import-data/corps',
  exempleResource: commonAppURI + 'exemples',
  visatypedemandeesource: commonAppURI + 'visa',

  visaTypeDemandeResource: commonAppURI + 'visa',

  privilegeResource: commonAppURI + 'privileges',
  profilResource: commonAppURI + 'profiles',
  authenticationRessource: commonAppURI + 'authenticate',


 // compteRessource: commonAppURIA  ,

  compteRessource: commonAppURI + 'activate-agent' ,
  compteSaveRessource: commonAppURIB ,


  agentResource: commonAppURI +'utilisateurs',

  activateResource:commonAppURI+'activate',
  structureRessource:commonAppURI + 'structures',
  ministereRessource:commonAppURI + 'ministeres',
  demandeResource: commonAppURI + 'demandes',
  utilisateurRessource: commonAppURI + 'utilisateur',
  typeDemandeRessource:commonAppURI + 'typeDemandes',
  typeStructureRessource: commonAppURI + 'type-structure',
  avisRessource: commonAppURI + 'avis',
  visaRessource: commonAppURI + 'visas',
  motifAbsenceRessource: commonAppURI + 'motifAbsence',
  modalPaiementRessource: commonAppURI + 'modalpaiement',
  articleRessource: commonAppURI + 'article',
  ampliationRessource: commonAppURI + 'ampliation',



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
