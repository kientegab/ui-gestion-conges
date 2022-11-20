
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuService, NbSidebarService} from '@nebular/theme';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProfilUserComponent } from '../profil-user/profil-user.component';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  nonLu:any;
  showDialog:boolean=false;
  isLoading!: boolean;
  totalRecords!: number;
  message: any;
  timeoutHandle: any;
  dialogErrorMessage: any;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  user: any;
  username:any;
  showProfil:boolean=false;
  userMenu = [

    {
      title: 'Profil',
      icon: 'person-outline',
      action: 'onInfoProfil()'
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      action: 'changePassword()'
    },
    {
      title: 'Déconnexion',
      icon: 'unlock-outline',
      action: 'disconnect()'
    }
  ];




  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private nbDialogService: NbDialogService,
    private authService: AuthenticationService,
 ) {
    this.user = this.authService.tokenDecode();
    this.username = this.authService.getUsername(); 
  }

  ngOnInit(): void {
    this.selectClick();
  
  }

  selectClick() {
    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Déconnexion') {
        this.disconnect();
      } 
      if (event.item.title === 'Change Password') {
        this.changePassword();
      } 
      if (event.item.title === 'Profil') {
  
        // this.nbDialogService.open(ProfilUserComponent,{
        //   context: {compte:s}, // here i have got typescript error 
        //   hasBackdrop: true,
        //   closeOnBackdropClick: false,
        // });
      }
    })
  }
 
  disconnect() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  changePassword() {
    this.router.navigate(['/workspace/changer-mot-de-passe']);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

 



  


   // Errors

   handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
  }

  // Messages

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
}
