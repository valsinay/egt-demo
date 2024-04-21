export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserFormValues {
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  suite: string;
  street: string;
}
