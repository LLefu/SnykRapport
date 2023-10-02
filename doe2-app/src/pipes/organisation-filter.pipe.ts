import {Pipe, PipeTransform} from '@angular/core';
import {OrganisationService} from "../app/services/organization/organisation.service";
import {OrganisationModel} from "../app/models/organisation.model";

@Pipe({
  name: 'orgFilter'
})
export class OrganisationFilterPipe implements PipeTransform {

  constructor(private organisationService: OrganisationService) {
  }


  transform(items: OrganisationModel[], searchText: string): OrganisationModel[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter(it => {
      let org = this.organisationService.findOrgById(it.orgId.toString());
      return org.orgName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    });
  }

}
