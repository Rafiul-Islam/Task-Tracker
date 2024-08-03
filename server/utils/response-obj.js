export const successResponse = (data, message) => ({
  success: true,
  message,
  data,
});

export const failedResponse = (message = "Something went wrong.") => ({
  success: false,
  message,
  data,
});
