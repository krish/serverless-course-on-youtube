export const successResponse = (response: Record<string, unknown> | {}) => {
  return {
    statusCode: 200,
    isBase64Encoded: false,
    body: JSON.stringify(response),
  };
};
export const clientErrorResponse = (response: Record<string, unknown> | {}) => {
  return {
    statusCode: 400,
    isBase64Encoded: false,
    body: JSON.stringify(response),
  };
};
