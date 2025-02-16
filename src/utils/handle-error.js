const handleError = (err, dispatch, action) => {
  console.log(err);
  if (err.response?.data && err.response?.data?.message) {
    dispatch(action({ value: err.response.data.message }));
  }
};

export default handleError;
