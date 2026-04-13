import { FormControl, FormGroup } from "@angular/forms";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type ToFormControls<T> = {
  [K in keyof T]: T[K] extends object ? FormGroup<ToFormControls<T[K]>> : FormControl<T[K]>;
};