

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message // Specific error message for a specific data
    : error.message; // General error message
};

export default getError;
