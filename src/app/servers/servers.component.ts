import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowedServer: boolean = true;
  serverCreated: boolean = false;
  statusServer: string = 'Server not created';
  serverName: string = '';
  servers: string[] = ['First Server', 'Second Server'];

  constructor() {
    setTimeout(() => {
      this.allowedServer = false;
    }, 5000);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.statusServer = 'Server Created! And there name is ' + this.serverName;
    this.servers.push(this.serverName);
  }
}
