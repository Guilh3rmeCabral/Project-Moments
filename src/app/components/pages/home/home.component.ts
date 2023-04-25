import { Component } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/app/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor (
    private momentService: MomentService,

  ) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items)=> {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      });
      this.allMoments = items.data;
      this.moments = items.data;
    });
  }

  search(event: Event) {
    const data = event.target as HTMLInputElement;
    const valueData = data.value.toLowerCase();

    this.moments = this.allMoments.filter(moment => {
      return moment.title?.toLowerCase().includes(valueData);
    });
  }
}
