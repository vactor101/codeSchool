import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import React, { ReactNode, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DeleteBtn = ({
  id,
  refetch,
  deleteEl,
  loading,
  title,
  name,
  className,
}: {
  id: string;
  refetch: () => Promise<any>;
  deleteEl?: (value: string) => Promise<any>;
  loading: boolean;
  title: string | ReactNode;
  name?: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleDelete = async () => {
    if (deleteEl) {
      const toastId = toast.loading("Item is Deleting...");
      try {
        await deleteEl(id);
        await refetch();
        toast.dismiss(toastId);
        toast.success("Item Deleted successfully");
      } catch (error: any) {
        toast.dismiss(toastId);
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
    }
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="red"
        className={`flex justify-center items-center ${className} px-1`}
      >
        {loading ? <Spinner color="red" className="w-4 h-4" /> : title}
      </Button>
      <Dialog open={open} handler={handleOpen} className="!max-w-96 !min-w-10">
        <DialogHeader>Delete Confirmation</DialogHeader>
        <DialogBody>Are you sure you want to delete this item?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
        <Toaster />
      </Dialog>
    </>
  );
};

export default DeleteBtn;
