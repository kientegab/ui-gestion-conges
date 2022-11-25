import { NbMenuItem } from '@nebular/theme';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
let perms = AuthenticationService.getPrivilegeTest();
if(perms == null){
  perms = ['ROLE_FOCAL_STRUCT','ROLE_USER'];
}
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'home-outline',
    link: '/workspace',
    home: true,
  },
  {
    title: 'Paramétrage',
    icon: 'lock-outline',
    // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN','ROLE_RESP_STRUCT','ROLE_RESP_DGESS','ROLE_DIR_DGESS']),
    children: [

      {
        title: 'TypeDemande',
        link: '/workspace/typeDemande',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN','ROLE_RESP_STRUCT','ROLE_RESP_DGESS','ROLE_DIR_DGESS'])
      },
      {
        title: 'TypeStructure',
        link: '/workspace/typeStructure',
        icon: 'list-outline'

      },
      {
        title: 'Structure',
        link: '/workspace/structure',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
      {
        title: 'Ministere',
        link: '/workspace/ministere',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },


      {
        title: 'Visa',
        link: '/workspace/visa',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },


      {
        title: 'Avis',
        link: '/workspace/avis',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },


      {
        title: 'Motif absence',
        link: '/workspace/motifAbsence',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },


      {
        title: 'Modalité de paie',
        link: '/workspace/modalPaiement',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
    ],
  }

  ,
  {
    title: 'Utilisateurs',
    icon: 'lock-outline',
    // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN','ROLE_RESP_STRUCT','ROLE_RESP_DGESS','ROLE_DIR_DGESS']),
    children: [

      {
        title: 'Compte',
        link: '/workspace/compte',
        icon: 'person-add-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN','ROLE_RESP_STRUCT','ROLE_RESP_DGESS','ROLE_DIR_DGESS'])
      },
      {
        title: 'Agents',
        link: '/workspace/agent',
        icon: 'people-outline'

      },
      {
        title: 'Profils',
        link: '/workspace/profil',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
    ],
  }
];
