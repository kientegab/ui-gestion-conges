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
  // {
  //   title: 'Décision',
  //   icon: 'list-outline',
  //   link: '/workspace',
  //   home: true,
  // },
  {
    title: 'Espace demandeur',
    icon: 'lock-outline',
    // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN','ROLE_RESP_STRUCT','ROLE_RESP_DGESS','ROLE_DIR_DGESS']),
    children: [
      {
        title: 'Dashboard',
        icon: 'list-outline',
        link: '/espacedemandeur',
        home: true,
      },
  {
    title: 'Autorisations',
    icon: 'list-outline',
    link: '/espacedemandeur/autorisation',
    home: true,
  },
  {
    title: 'Congés',
    icon: 'list-outline',
    link: '/espacedemandeur/autorisation',
    home: true,
  },
   ]
  },
  {
    title: 'Espace SHI',
    icon: 'lock-outline',
    // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN','ROLE_RESP_STRUCT','ROLE_RESP_DGESS','ROLE_DIR_DGESS']),
    children: [
      {
        title: 'Dashboard',
        icon: 'list-outline',
        link: '/espaceshi/dashboard',
        home: true,
      },
  {
    title: 'Autorisations',
    icon: 'list-outline',
    link: '/espaceshi/autorisation',
    home: true,
  },
  {
    title: 'Congés',
    icon: 'list-outline',
    link: '/workspace/autorisation',
    home: true,
  },
   ]
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
        link: '/workspace/visas',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
      {
        title: 'Ampliation',
        link: '/workspace/ampliation',
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
        link: '/workspace/modalite-paie',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
      {
        title: 'Article',
        link: '/workspace/article',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
      {
        title: 'Agent',
        link: '/workspace/agent',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
      {
        title: 'Corps',
        link: '/workspace/corps',
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
        title: 'Privileges',
        link: '/workspace/privilege',
        icon: 'list-outline',
        // hidden:!AuthenticationService.checkPermissionTest(perms!,['ROLE_ADMIN'])
      },
      {
        title: 'Utilisateurs',
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
