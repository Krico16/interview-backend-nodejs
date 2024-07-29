export class Customer {
  id: string;

  name: string;

  lastName: string;

  email: string;

  fullName: string;

  constructor(data?: Partial<Customer>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
