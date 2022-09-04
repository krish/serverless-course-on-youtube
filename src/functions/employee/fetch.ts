import {successResponse} from '@libs/response';
import {Employee} from 'src/entities/employee.entity';
import {fetch} from './employee-service';

const fetchEmployee = async (event) => {
  const employee: Employee = await fetch(event.pathParameters.empid);
  return successResponse({employee});
};

export const main = fetchEmployee;
