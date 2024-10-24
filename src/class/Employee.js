import {z} from 'zod';

export class Employee {
  constructor(
    firstName = '',
    lastName = '',
    dateOfEmployment = '',
    birth = '',
    phone = '',
    email = '',
    department = '',
    position = ''
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfEmployment = dateOfEmployment;
    this.birth = birth;
    this.phone = phone;
    this.email = email;
    this.department = department;
    this.position = position;
  }
}

const employee = new Employee();
employee.firstName = z.string().min(2);
employee.lastName = z.string().min(2);
employee.dateOfEmployment = z.string().date();
employee.birth = z.string().date();
employee.phone = z.string().min(2);
employee.email = z.string().email();
employee.department = z.string().min(2);
employee.position = z.string().min(2);

export const validationSchemaEmployee = z.object(employee);
