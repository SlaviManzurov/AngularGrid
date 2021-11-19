import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grid';
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  public gridView!: GridDataResult;
  public pageSize = 10;
  public skip = 0;

  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [
    {
      field: "ProductName",
      dir: "asc",
    },
  ];

  public items: any[] = [];

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe((res) => (this.items = Object.values(res)))
  }

  ngAfterViewChecked() {
    this.loadItems();
  }

  

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length,
    };
  }



  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: orderBy(this.items, this.sort),
      total: this.items.length,
    };
  }


  public gridData: any[] = this.items;
  public columns: string[] = ["postId", "id", "email", "body"];
  public hiddenColumns: string[] = [];

  public restoreColumns(): void {
    this.hiddenColumns = [];
  }

  public hideColumn(field: string): void {
    this.hiddenColumns.push(field);
  }

}
