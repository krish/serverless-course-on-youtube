import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {successResponse} from '@libs/response';
import {Employee} from 'src/entities/employee.entity';
import {create} from './employee-service';

import schema from './schema';

const createEmployee: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const employee: Employee = event.body as any as Employee;
  const emp = await create(employee);
  return successResponse({employee});
};

export const main = middyfy(createEmployee);
