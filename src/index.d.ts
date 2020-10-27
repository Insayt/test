interface IUserGeo {
  lat: string;
  lng: string;
}

interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: IUserGeo;
}

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: IUserAddress;
  phone?: string;
  website?: string;
  company?: object;
}

interface IToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}