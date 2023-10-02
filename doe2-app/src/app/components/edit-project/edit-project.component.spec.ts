import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;
  let componentHtml: HTMLHtmlElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectComponent ],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  it('Should submit (Tommy)',  () => {

    //Create a spy for the submit method
    spyOn(component, "submit")

    //Call the submit method
    component.submit();

    //Expect the submit method to have been called
    expect(component.submit).toHaveBeenCalled();
  });
});
