import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss']
})
export class EditMomentComponent {

  moment!: Moment;
  btnText: any = 'Editar';

  constructor (
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData : Moment) {
    const id = this.moment.id
    const formData = new FormData()

    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if (momentData.image) formData.append('image', momentData.image);

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messagesService.add(`Moment ${id} was updated with success!`);

    this.router.navigate(['/']);
  }

}
