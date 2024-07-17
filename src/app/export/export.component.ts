import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  @Input() columns: string[] = [];
  @Input() importedData: any[][] = [];

  selectedColumns: string[] = [];

  exportData() {
    let exportData: any[][] = [...this.importedData];

    let columnsToExport = this.selectedColumns.length > 0 ? this.selectedColumns : this.columns;
    const columnIndices = columnsToExport.map(col => this.columns.indexOf(col));
    exportData = exportData.map(row => columnIndices.map(index => row[index]));
    exportData.unshift(columnsToExport);

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'export.xlsx');
  }

  isSelectedColumn(column: string): boolean {
    return this.selectedColumns.includes(column);
  }

  toggleColumnSelection(column: string) {
    if (this.isSelectedColumn(column)) {
      this.selectedColumns = this.selectedColumns.filter(col => col !== column);
    } else {
      this.selectedColumns.push(column);
    }
  }
}
