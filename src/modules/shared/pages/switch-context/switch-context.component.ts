import { Component, OnInit } from '@angular/core';
import { CoreComponent } from '@app/base';
import { InnovatorOrganisationRoleEnum, AccessorOrganisationRoleEnum } from '@app/base/enums';
import { AuthenticationStore } from '@modules/stores';
@Component({
  selector: 'shared-pages-switch-context',
  templateUrl: './switch-context.component.html'
})
export class PageSwitchContextComponent  extends CoreComponent implements OnInit {
  organisations: {
    id: string,
    name: string,
    role: InnovatorOrganisationRoleEnum | AccessorOrganisationRoleEnum,
    profile: string,
    organisationUnits: { id: string; name: string; acronym: string; }
  }[] = []
  initialSelection = false
  currentUserProfile = ''

  constructor(private authenticationStore: AuthenticationStore) { 
    super();
  }

  ngOnInit(): void {
    const userInfo = this.authenticationStore.getUserInfo();
    const userContext = this.authenticationStore.getUserContextInfo();

    this.initialSelection = userContext.type === '';

    if(!this.initialSelection) {
      this.currentUserProfile = `${this.authenticationStore.getRoleDescription(userContext.organisation?.role.toString() ?? '').trimEnd()} (${userContext.organisation?.organisationUnit.name.trimEnd()})`


      this.currentUserProfile = userContext.organisation?.role === AccessorOrganisationRoleEnum.ACCESSOR ? `an ${this.currentUserProfile }` : `a ${this.currentUserProfile }`;

    }

    userInfo.organisations.forEach(org => {
      org.organisationUnits.forEach((unit) => {
        let profile = `${this.authenticationStore.getRoleDescription(org.role).trimEnd()} (${unit.name.trimEnd()})`;
        
        if (!this.initialSelection) {
          profile = this.currentUserProfile === profile ? `Continue as a ${profile}` : `Switch to my ${profile} profile`;
        }      
        
        this.organisations.push({
          id: org.id,
          name: org.name,
          role: org.role,
          profile: profile,
          organisationUnits: {
            ...unit
          }
        })
      })
    });

    const title = this.initialSelection ? 'Choose your profile' : 'Switch profile';
    this.setPageTitle(title);
    this.setPageStatus('READY');
  }

  redirectToHomepage(organisation: {
    id: string,
    name: string,
    role: InnovatorOrganisationRoleEnum | AccessorOrganisationRoleEnum,
    profile: string,
    organisationUnits: { id: string; name: string; acronym: string; }
  }): void {

    if(this.currentUserProfile !== organisation.profile) {
      const userInfo = this.authenticationStore.getUserInfo();
      const roleName = `${this.authenticationStore.getRoleDescription(organisation.role).trimEnd().toLowerCase()} (${organisation.organisationUnits.name.trimEnd()})`;

      this.authenticationStore.updateSelectedUserContext({
        type: userInfo.type,
        organisation: {
          id: organisation.id,
          name: organisation.name,
          role: organisation.role,
          organisationUnit: { 
            id: organisation.organisationUnits.id,
            name: organisation.organisationUnits.name, 
            acronym: organisation.organisationUnits.acronym,
          }
        }
      })
  
      if (!this.initialSelection) {
        this.setRedirectAlertSuccess(`Switch successful: you are now logged in with your ${roleName} profile.`);
      }
    }   

    this.redirectTo('accessor/dashboard');
  }
}
