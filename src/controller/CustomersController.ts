import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';

export class CustomersController {
  constructor(private service: CustomersService) {}

  //

  async findByFilter(event: APIGatewayProxyEvent) {
    if (!event.queryStringParameters?.name) {
      return this.apiResponseBadRequestError();
    }
    const { name, lastName = '' } = event.queryStringParameters;

    try {
      return this.apiResponseOk(
        await this.service.findByFilter(new Customer({ name, lastName }))
      );
    } catch (error) {
      return this.apiResponseBadRequestError();
    }
  }

  apiResponseBadRequestError() {
    return {
      statusCode: 400,
      isBase64Encoded: false,
    };
  }

  apiResponseOk(customers: Customer[]) {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(customers),
    };
  }
}
