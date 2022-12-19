import { Router } from '@angular/router';
import { Component, ViewChild, Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CarService } from 'src/app/services/car.service';
import { UserService } from '../../services/user.service';
import { Booking } from '../../models/booking.model';
import { DialogComponent } from '../dialog/dialog.component';
import { Car } from '../../models/car.model';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CarModel} from '../../models/car.model';
import { AddEditDialogDataModel} from '../../models/add-edit-dialog-data.model';
import { AddEditDialogComponent } from '../dialog/add-edit-dialog.component';
@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  displayedColumns: string[];
  dataSource;
  userType: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  pageSize = 10;

  constructor(private userService: UserService, private router: Router, private carService: CarService, private dialog: MatDialog) {
        if (this.userService.isLoggedIn) {
            this.userType = this.userService.userType;
            this.carService.getMyBookings(this.userService.userName).subscribe(data => {
                const bookings: Booking[] = data;
                console.log(data);
                this.displayedColumns = ['bookingId', 'carId', 'customerId', 'dealerId', 'startDate', 'endDate'];
                this.dataSource = new MatTableDataSource(bookings);

                setTimeout(() => {
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                });
            });
        } else {
            this.router.navigateByUrl('/');
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
    onDelete(row: Car) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '300px',
          height: '250px',
          data: row
        });
        dialogRef.afterClosed().subscribe(data => {
            if (data) {
              console.log('The dialog was closed: ' + JSON.stringify(data));
              this.carService.deleteCar(data.registrationNo).subscribe(res => {
                console.log('delete resp: ' + JSON.stringify(res));
                this.carService.getAllCars().subscribe(resp => {
                  console.log('latest resp after delete: ' + JSON.stringify(resp));
                  const cars: Car[] = resp;
                  this.dataSource.data = cars;
                });
              });
            }
     });
   }
 }
    

