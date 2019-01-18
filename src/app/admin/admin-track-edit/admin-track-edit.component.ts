import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';
@Component({
  selector: 'ag-admin-track-edit',
  templateUrl: './admin-track-edit.component.html',
  styleUrls: ['./admin-track-edit.component.css']
})
export class AdminTrackEditComponent implements OnInit {

  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any; 


  track = new Track('id', 'track', 'description', 'user_id', 'image', 'status_id', 'field_id', 'level_id');

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private router: Router
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.trackService.getTrack(this.id).subscribe(
      data => {
        this.track = data; 
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateTrack(track) { 
    this.trackService.updateTrack(track)
      .subscribe(
        track => {
          this.status = 'success';
          this.message = track['message'];
          this.trackService.updateStatus = this.message = track['message'];
          setTimeout(() => this.trackService.updateStatus = '', 2000);
          this.router.navigate(['/admin/tracks']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          console.error(<any>error);
          this.status = 'success';
          this.message = error['message'];
        }
      );
  } 
}
