import { useEffect } from "react";
import { useDispatch } from "react-redux";

const usePopulateUserSlice = (reducerFunction, userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(reducerFunction(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { usePopulateUserSlice };
