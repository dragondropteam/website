import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {UserService} from '../user.service';

// TODO: Replace this with your own data model type
export class AdminUserTableItem {
  name: string;
  email: string;
  lastLogin: number;


  constructor(name: string, email: string, lastLogin: number) {
    this.name = name;
    this.email = email;
    this.lastLogin = lastLogin;
  }

  get formattedLogin(): string {
    return new Intl.DateTimeFormat('en-US').format(this.lastLogin);
  }
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AdminUserTableItem[] = [
  new AdminUserTableItem('Carrie	Howell', 'Carrie	Howell'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Jack	Kelley', 'Jack	Kelley'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Jenna	Elliott', 'Jenna	Elliott'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Israel	Fernandez', 'Israel	Fernandez'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Myrtle	Norman', 'Myrtle	Norman'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Alexandra	Pittman', 'Alexandra	Pittman'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Kelley	Rivera', 'Kelley	Rivera'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Leland	Mack', 'Leland	Mack'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Tiffany	Hogan', 'Tiffany	Hogan'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Stacey	Mitchell', 'Stacey	Mitchell'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Ed	Douglas', 'Ed	Douglas'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Anna	Gray', 'Anna	Gray'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Kevin	Aguilar', 'Kevin	Aguilar'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Lora	Mendez', 'Lora	Mendez'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Eunice	Vargas', 'Eunice	Vargas'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Marcus	Mclaughlin', 'Marcus	Mclaughlin'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Carla	Riley', 'Carla	Riley'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Peter	Brewer', 'Peter	Brewer'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Bethany	Morris', 'Bethany	Morris'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Johnnie	Wagner', 'Johnnie	Wagner'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Ernesto	Meyer', 'Ernesto	Meyer'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Jennifer	Evans', 'Jennifer	Evans'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Delores	Pierce', 'Delores	Pierce'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Lula	Hart', 'Lula	Hart'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Hope	Burton', 'Hope	Burton'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Camille	Warren', 'Camille	Warren'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Lloyd	Underwood', 'Lloyd	Underwood'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Antonio	Woods', 'Antonio	Woods'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Esther	Frazier', 'Esther	Frazier'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Willie	Tucker', 'Willie	Tucker'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Lucia	Hunt', 'Lucia	Hunt'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Gail	Stevens', 'Gail	Stevens'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Aaron	Herrera', 'Aaron	Herrera'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Alonzo	Silva', 'Alonzo	Silva'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Santos	Gutierrez', 'Santos	Gutierrez'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Amelia	Davidson', 'Amelia	Davidson'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Terrell	Banks', 'Terrell	Banks'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Terence	Snyder', 'Terence	Snyder'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Abel	Holloway', 'Abel	Holloway'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Corey	Terry', 'Corey	Terry'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Angelo	Ruiz', 'Angelo	Ruiz'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Clint	Perez', 'Clint	Perez'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Charlotte	Sharp', 'Charlotte	Sharp'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Shelley	Ortega', 'Shelley	Ortega'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Manuel	Peters', 'Manuel	Peters'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Herman	Sanders', 'Herman	Sanders'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('William	Buchanan', 'William	Buchanan'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Blanche	Yates', 'Blanche	Yates'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Flora	Carpenter', 'Flora	Carpenter'.replace('\t', '.') + '@example.com', Date.now()),
  new AdminUserTableItem('Darlene	Mann', 'Darlene	Mann'.replace('\t', '.') + '@example.com', Date.now())
];

/**
 * Data source for the AdminUserTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminUserTableDataSource extends DataSource<AdminUserTableItem> {
  data: AdminUserTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort, private userService: UserService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AdminUserTableItem[]> {
    return this.userService.getUsers();
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //   this.userService.getUsers().map(user => {
    //     return new AdminUserTableItem(user.email, user.email, Date.now());
    //   }),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];
    //
    // // Set the paginators length
    // this.paginator.length = this.data.length;
    //
    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AdminUserTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AdminUserTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'date':
          return compare(+a.lastLogin, +b.lastLogin, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
