import { useState } from "react";

const useForm = (initialState: any) => {
  const [data, setData] = useState<any>(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((oldData: any) => ({
      ...oldData,
      [name]: value,
    }));
  };

  return [data, handleInputChange];
};

export default useForm;
