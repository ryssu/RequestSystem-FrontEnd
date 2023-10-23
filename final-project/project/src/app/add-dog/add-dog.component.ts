import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DogService } from '../service/dogservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrls: ['./add-dog.component.css']
})
export class AddDogComponent {
  newDog: FormGroup;

  constructor(private dogService: DogService, private fb: FormBuilder, private router: Router) {
    this.newDog = this.fb.group({
      name:  ' ',
      photo: new Uint8Array(0),
      breed: ' ',
      age: 0,
      doa: new Date(),
      personality: ' ',
      status: ' '
    });
  }
  

  addDog() {
    if (this.newDog.valid) {
      this.dogService.addDog(this.newDog.value)
        .subscribe(
          (response) => {
            console.log('Dog added:', response);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error adding dog:', error);
          }
        );
    }
  }  

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];

        // Read the selected file as an ArrayBuffer
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                const arrayBuffer = e.target.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);

                // Now you have the file data in Uint8Array format, which can be sent to the server as needed (e.g., for saving as a LongBlob).
                
                // Example: Send the uint8Array to your server-side code to save it as a LongBlob.
                // You can use a service or API call to send the data to your backend.
            }
        };
        reader.readAsArrayBuffer(file);
    }
}

}


