import { useEditPortfolioMutation } from "@/redux/features/portfolio/portfolioApi";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DescEdit = ({
  data,
  name,
  className,
  divClassName,
  refetch,
}: {
  name: string;
  data: string;
  className: string;
  divClassName?: string;
  refetch: () => Promise<any>;
}) => {
  const [desc, setDesc] = useState(data);
  const handleDescChange = (value: string) => {
    setDesc(value);
  };
  const [editPortfolio] = useEditPortfolioMutation();

  const handleEdit = async () => {
    const toastId = toast.loading("Desc Is Updating...");
    try {
      await editPortfolio({ [name]: desc });
      await refetch();
      toast.dismiss(toastId);
      toast.success("Desc updated successfully");
    } catch (error: any) {
      toast.dismiss(toastId);
      if (error.data) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };
  return (
    <div className={`${divClassName}`}>
      <textarea
        onChange={(e) => handleDescChange(e.target.value)}
        className={`${className} bg-transparent`}
        value={desc}
      />
      {data !== desc && (
        <Button onClick={handleEdit} className="block mx-auto">
          edit
        </Button>
      )}
    </div>
  );
};

export default DescEdit;
