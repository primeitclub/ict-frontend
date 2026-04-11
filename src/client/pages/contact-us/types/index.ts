export interface IContact {
  name: string;
  phone: string;
}

export interface IDepartment {
  department: string;
  contacts: IContact[];
}

export interface IGeneralContact {
  email: string;
  phone: string;
}
