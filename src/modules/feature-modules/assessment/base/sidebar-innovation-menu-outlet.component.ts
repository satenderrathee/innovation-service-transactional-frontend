import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ContextStore, InnovationStore } from '@modules/stores';
import { InnovationStatusEnum } from '@modules/stores/innovation/innovation.enums';


@Component({
  selector: 'app-base-sidebar-innovation-menu-outlet',
  templateUrl: './sidebar-innovation-menu-outlet.component.html'
})
export class SidebarInnovationMenuOutletComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  sidebarItems: { label: string, url: string, children?: { label: string, url: string }[] }[]= [];
  navHeading: string = 'Innovation Record sections';
  showHeading: boolean = false;

  private sectionsSidebar: { label: string, url: string, children?: { label: string, url: string }[] }[] = [];
  private _sidebarItems: { label: string, url: string; }[] = [];

  constructor(
    private router: Router,
    private contextStore: ContextStore,
    private innovationStore: InnovationStore
  ) {
    this.subscriptions.add(
      this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(e => {
        this.onRouteChange()
      })
    );

    this.onRouteChange();
  } 
  
  ngOnInit(): void {
    this.generateSidebar();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private generateSidebar(): void {    
    if (this.sidebarItems.length === 0) {
      const innovation = this.contextStore.getInnovation();

      this.sectionsSidebar = this.innovationStore.getInnovationRecordSectionsTree('assessment', innovation.id);
      this._sidebarItems = [
        { label: 'Overview', url: `/assessment/innovations/${innovation.id}/overview` },
        { label: 'Innovation record', url: `/assessment/innovations/${innovation.id}/record` },
        // TODO: DOCUMENTS: Unccomment this!
        // { label: 'Documents', url: `/assessment/innovations/${innovation.id}/documents` },
        { label: 'Action tracker', url: `/assessment/innovations/${innovation.id}/action-tracker` },
        { label: 'Messages', url: `/assessment/innovations/${innovation.id}/threads` },
        { label: 'Data sharing and support', url: `/assessment/innovations/${innovation.id}/support` }
      ];
  
      if (innovation.status === InnovationStatusEnum.IN_PROGRESS) {
        this._sidebarItems.push(
          { label: 'Needs assessment', url: `/assessment/innovations/${innovation.id}/assessments/${innovation.assessment?.id}` }
        );
      }
  
      this._sidebarItems.push({ label: 'Activity log', url: `/assessment/innovations/${innovation.id}/activity-log` });
    }
  }

  private onRouteChange(): void {
    this.generateSidebar();
    
    if (this.router.url.includes('sections')) {
      this.showHeading = true;
      this.sidebarItems = this.sectionsSidebar;        
    } else {
      this.showHeading = false;
      this.sidebarItems = this._sidebarItems;
    }
  }
}
