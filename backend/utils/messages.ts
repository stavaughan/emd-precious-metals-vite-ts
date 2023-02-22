import htmlTemplate from './htmlTemplate';

const { noAccessWrapper } = htmlTemplate;

const messages = {
  noAccess: () =>
    noAccessWrapper(
      'Access Denied',
      'You dont have permission to view this information.',
      '403 Forbidden'
    ),

  notFoundJSON: "The JSON file you're looking for cannot be located.",

  notFoundText: "The text file you're looking for cannot be located.",

  serverError:
    'Server Error. The server has encountered a situation it does not know how to handle.',

  noContent:
    'No Content. The server has successfully processed the request and is not returning any content.',

  unauthorized:
    'Unauthorized. The request has not been applied because it lacks valid authentication credentials for the target resource.',
};

export default messages;
