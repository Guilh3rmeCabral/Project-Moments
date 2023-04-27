import { Component } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent {

  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor (
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe((item => this.moment = item.data))
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Moment remove successful");
    this.router.navigate(['/']);
  }
}

