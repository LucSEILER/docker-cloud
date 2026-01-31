import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'Docker Cloud Frontend';
  backendMessage = '';
  configData: any = null;
  statusData: any = null;
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Appel au backend (via le proxy Nginx)
    this.http.get<any>('/api/hello').subscribe({
      next: (data) => {
        this.backendMessage = data.message;
      },
      error: (err) => {
        this.error = 'Erreur lors de la communication avec le backend';
        console.error(err);
      },
    });

    // Récupération de la config depuis le web-server (via le backend)
    this.http.get<any>('/api/config').subscribe({
      next: (data) => {
        this.configData = data.config;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération de la configuration';
        console.error(err);
        this.loading = false;
      },
    });

    // Récupération du status de l'architecture
    // this.http.get<any>('/api/status').subscribe({
    //   next: (data) => {
    //     this.statusData = data;
    //   },
    //   error: (err) => {
    //     console.error('Erreur status:', err);
    //   }
    // });
  }
}
