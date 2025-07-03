import { ChangeEvent } from "react";

export const handleChangeImage = (
  e: ChangeEvent<HTMLInputElement>,
  name: string,
  setImageData: (value: string) => void,
  setFieldValue: (name: string, value: any) => void
) => {
  if (e.currentTarget.files && e.currentTarget.files[0]) {
    const file = e.currentTarget.files[0];
    setFieldValue(name, file);
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageData(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }
};
