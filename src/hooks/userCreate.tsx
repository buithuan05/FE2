import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useCreate = () => {
  const addProduct = async (values: any) => {
    return await axios.post("http://localhost:3001/products", values);
  };

  const {
    data,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation({
    mutationFn: (values: any) => addProduct(values),
    onSuccess: () => {
      message.success("Thanh cong");
    },
  });

  return {
    data,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  };
};