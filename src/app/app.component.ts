import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proj1';
  exportColumns: string[] = [];
exportData: any[][] = [];
  
importedData(data: { columns: string[], importedData: any[][] }) {
  this.exportColumns = data.columns;
  this.exportData = data.importedData;
}
 
}
