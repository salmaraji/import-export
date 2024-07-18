import { Component, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent {
  @Output() dataImported = new EventEmitter<{ columns: string[],importedData: any[][]}>();

  selectedFile: File | null = null;
  importedData: any[][] = [];
  columns: string[] = [];
  filteredData: any[][] = [];
  searchTerm: string = '';

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (extension === 'xls' || extension === 'xlsx') {
        this.selectedFile = file;
      } else {
        alert(
          `Le fichier ${file.name} a une extension invalide. Seuls les fichiers .xlsx sont acceptés.`
        );
        input.value = '';
      }
    }
  }

  importData() {
    if (!this.selectedFile) {
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const tabstr: string | ArrayBuffer = e.target?.result as
        | string
        | ArrayBuffer;
      const wb: XLSX.WorkBook = XLSX.read(tabstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.importedData = XLSX.utils.sheet_to_json(ws, {
        header: 1,
      }) as any[][];

      if (this.importedData.length > 0) {
        this.columns = this.importedData[0] as string[];
        this.importedData = this.importedData.slice(1);
        this.filteredData = this.importedData; // Initialize filteredData with importedData

        // Émettre les données importées vers le parent (ou vers ExportComponent directement si elles sont imbriquées)
        this.dataImported.emit({
          columns: this.columns,
          importedData: this.importedData
        });
      }
    };
    reader.readAsBinaryString(this.selectedFile);
    
  }
  deleteRow(index: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ligne ?')) {
      this.importedData.splice(index, 1);
    }
  }
  filterData() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredData = this.importedData.filter(row => 
      row.some(cell => cell.toString().toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
}
