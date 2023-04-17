import { Component } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent {
  btnText = 'Share!'

  constructor (
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  async creatHandler(moment: Moment) {
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if (moment.image) {
      formData.append("image", moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add('This moment has been successfully added')

    this.router.navigate(['/']);
  }

}
