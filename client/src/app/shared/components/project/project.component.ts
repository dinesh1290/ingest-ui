import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Contact, Project} from "../../models/project";
import {IngestService} from "../../services/ingest.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects$ : Observable<Project[]>;
  projects: Project[];
  project: Object;

  projectForm: FormGroup;

  placeholder: any = {

    projectId:  'A project id for your research project',
                // 'e.g. HCA-DEMO-PROJECT_ID',

    name:       'A title for your research project e.g. reflecting your project grant' ,
                // 'e.g. "Testing ischaemic sensitivity of human tissue at different time points, ' +
                // 'using single cell RNA sequencing."',

    description: 'A description of your research experiment'
                 // 'e.g. "Assessment of ischaemic sensitivity of three human tissues using 10x 3 single cell RNA sequencing ' +
                 // 'We aim to collect data from three tissues expected to have different sensitivity to ischaemia: ' +
                 // 'spleen(expected least sensitive), oesophagus (in the middle) and liver (expected most sensitive).'
  };

  editMode: boolean;

  projectId: any;

  profile: any;

  @Input() inSubmissionMode:boolean;
  @Input() submissionProjectId:string;
  @Input() submissionEnvelopeId:string;

  @Output() onProjectSelect = new EventEmitter();

  constructor(private ingestService: IngestService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public auth: AuthService,
              private alertService: AlertService
              ) {
  }

  ngOnInit() {
    this.projects$ = this.ingestService.getProjects();
    this.projectId = this.route.snapshot.paramMap.get('id');

    if(this.projectId){
      this.editMode = false;
      this.getProject(this.projectId);

    } else {
      this.setToEditMode();
    }
  }

  setToEditMode(){
    this.editMode = true;
    this.createProjectForm();
    this.auth.getProfile((err, profile) => {
      this.profile = profile;
      console.log('user profile', profile);
    })
  }

  createProjectForm() {
    this.projectForm = this.fb.group({
      name: [ {value:'', disabled: !this.editMode}, Validators.required],
      description: [{value:'', disabled: !this.editMode}, Validators.required],
      projectId: [{value:'', disabled: !this.editMode},  Validators.required],
      contributors: this.fb.array([])
    });

    if(this.projectId){
      this.initProjectForm();
    }
  }

  getProject(id){
    this.ingestService.getProject(id).subscribe(data => {
      this.project = data;
    });
  }

  updateProject(id, projectData){
    let content = this.project['content'];

    let patch = Object.assign(content, projectData);

    this.ingestService.putProject(id, patch).subscribe(
      data => {
        this.project = data;
        console.log(data);
        this.projectId = this.getProjectId(this.project);
        this.editMode = false;
        this.alertService.success("","Project was successfully updated.");
      },
      err => {
        this.alertService.error("","An error has occurred while saving your updates to this project.");
      });
  }

  createProject(projectData){
    this.ingestService.postProject(projectData)
      .subscribe(data => {
        this.project = data;
        let projectId = this.getProjectId(data);
        this.router.navigate(['/projects/list']);
        this.alertService.success("","Project was successfully created.");
      },

      err => {
        this.alertService.error("", "An error has occurred while creating the project.");
        console.log(err);
      });
  }


  createOrUpdateProject(formValue) {
    if(formValue['name'] && formValue['description'] && formValue['projectId']){
      let projectData = this.extractProject(formValue);

      if(this.projectId){
        console.log('patch');
        this.updateProject(this.projectId, projectData);
      }else{
        console.log('create')
        this.createProject(projectData);
      }
    } else {

      this.alertService.error("","All fields are required!");

    }


  }

  extractProject(formValue){
    return {
      core : {
        type: "project",
          schema_url: "https://raw.githubusercontent.com/HumanCellAtlas/metadata-schema/4.6.1/json_schema/project.json"
      },

      name: formValue['name'],
      description: formValue['description'],
      project_id: formValue['projectId'],
      contributors: [{
        email:this.profile.email,
        name: this.profile.name
      }]
    };
  }

  save(formValue){
    console.log('save');
    this.createOrUpdateProject(formValue)
  }

  cancel(){
    console.log('saveAndExit');
    this.router.navigate(['/projects/list']);
  }

  edit(){
    this.setToEditMode();
  }

  newSubmission(){
    this.router.navigate(['submissions/new/metadata']);
  }

  newProject(){
    this.router.navigate([`/projects/new`]);
  }

  getProjectId(project){
    let links = project['_links'];
    return links && links['self'] && links['self']['href'] ? links['self']['href'].split('/').pop() : '';
  }

  initProjectForm(){
    this.ingestService.getProject(this.projectId)
      .subscribe(data => {
        this.project = data;
        this.projectForm.patchValue(this.project['content']);
        this.projectForm.patchValue({projectId: this.project['content']['project_id']});
      });
  }

}
