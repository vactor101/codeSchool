import {
  faAdd,
  faArrowDown,
  faCalendar,
  faCaretDown,
  faDeleteLeft,
  faEdit,
  faGear,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from "next/image";
import { format } from "date-fns";
import React from "react";

interface Props {
  open: number;
  handleOpen: (index: number) => void;
  message: any;
  index: number;
}

const MessageCard = ({ handleOpen, open, message, index }: Props) => {
  return (
    <Accordion
      open={open === index}
      className="border-white border rounded-lg px-5 py-0 dark:text-black text-white mb-1 dark:bg-white bg-[#0d288d]"
    >
      <AccordionHeader
        onClick={() => handleOpen(index)}
        className="border-0 dark:text-black text-white hover:text-white dark:hover:text-black"
      >
        <div className="w-full text-lg flex justify-between">
          <div>
            <p className="font-normal">
              <span className="font-bold">Name : </span> {message.firstName}{" "}
              {message.lastName}
            </p>
            <a href={`mailto:${message.email}`} className="block font-normal">
              <span className="font-bold">Email : </span> {message.email}
            </a>
            <a
              href={`tel:+2${message.phoneNumber}`}
              className="block font-normal"
            >
              <span className="font-bold">phone Number : </span>{" "}
              {message.phoneNumber}
            </a>
          </div>
          <p className="italic text-normal font-normal">
            {format(message.createdAt, "do MMM, yyyy h:mm aa")}
          </p>
        </div>
      </AccordionHeader>
      <AccordionBody>
        <p className="dark:text-black text-white text-base font-medium">
          {message.message}
        </p>
      </AccordionBody>
    </Accordion>
  );
};

export default MessageCard;
