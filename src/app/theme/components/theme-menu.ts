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
