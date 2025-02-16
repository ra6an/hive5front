const handleSuccess = (success, dispatch, action) => {
  if (success) {
    dispatch(action({ value: success }));
  }
};

export default handleSuccess;
