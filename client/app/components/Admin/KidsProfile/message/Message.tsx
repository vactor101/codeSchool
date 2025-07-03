import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Alert,
  Typography,
  Switch,
} from "@material-tailwind/react";
import React, { useEffect, useCallback } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Inputs from "../form inputs/Inputs";
import Textarea from "../form inputs/Textarea";
import CustomSelect from "../form inputs/Select";
import CoursesSelect from "../form inputs/SelectCourses";
import { useEditKidProfileMutation } from "@/redux/features/kids/kidApi";
const validationSchema = yup.object().shape({
  kidName: yup.string(),
  age: yup
    .number()
    .required("Age is required")
    .min(1, "Age must be at least 1"),
  tag: yup.string(),
  mobile: yup
    .string()
    .matches(/^[0-9]{11}$/, "Mobile number must be 11 digits"),
  followUp1: yup.boolean(),
  followUp2: yup.boolean(),
  followUp3: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  customerFeedback: yup.string(),
  faceBookLink: yup.string().url("Must be a valid URL"),
  instagramLink: yup.string().url("Must be a valid URL"),
  whatsAppLink: yup.string().url("Must be a valid URL"),
  note1: yup.string(),
  note2: yup.string(),
  note3: yup.string(),
  suggestedCourses: yup.string(),
});

interface KidData {
  id: string;
  data: {
    customerFeedback?: string;
    faceBookLink?: string;
    followUp1?: boolean;
    followUp2?: boolean;
    followUp3?: boolean;
    instagramLink?: string;
    tag?: string;
    note1?: string;
    note2?: string;
    note3?: string;
    suggestedCourse?: string;
    whatsAppLink?: string;
  };
}

interface Kid {
  _id: string;
  age: number;
  createdAt: string; // يمكن استخدام Date بدلاً من string إذا كنت تستخدم كائنات تاريخ
  customerFeedback: string;
  faceBookLink: string;
  followUp1: boolean;
  followUp2: boolean;
  followUp3: boolean;
  instagramLink: string;
  kidName: string;
  mobile: string;
  mobileNumber: string;
  note1: string;
  note2: string;
  note3: string;
  suggestedCourses: SuggestedCourse[]; // تحتاج إلى تعريف واجهة suggestedCourses بناءً على هيكلها
  tag: string;
  updatedAt: string; // يمكن أن تكون Date بدلاً من string
  whatsAppLink: string;
  __v: number;
}

interface SuggestedCourse {
  // بناءً على هيكل الكائن الموجود في suggestedCourses، قم بتعريف الحقول هنا
  courseName: string;
  courseLink: string;
}

const Message = ({
  children,
  data,
  courses,
  refresh,
}: {
  children: React.ReactNode;
  data: Kid;
  refresh: () => void;
  courses: { _id: string; name: string; thumbnail: { url: string } }[];
}) => {
  const [open, setOpen] = React.useState(false);

  const [editKidProfile, { isLoading, isSuccess, isError, error }] =
    useEditKidProfileMutation();
  const formik = useFormik({
    initialValues: {
      id: data._id,
      kidName: data.kidName,
      age: data.age,
      tag: data.tag,
      mobileNumber: data.mobile || data.mobileNumber,
      followUp1: data.followUp1,
      followUp2: data.followUp2,
      followUp3: data.followUp3,
      createdAt: data.createdAt,
      customerFeedback: data.customerFeedback,
      faceBookLink: data.faceBookLink,
      instagramLink: data.instagramLink,
      whatsAppLink: data.whatsAppLink,
      note1: data.note1,
      note2: data.note2,
      note3: data.note3,
      suggestedCourses: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let kidData: KidData = {
        id: values.id,
        data: {},
      };

      // التحقق من وجود القيم قبل إضافتها إلى kidData.data
      if (values.customerFeedback)
        kidData.data.customerFeedback = values.customerFeedback;
      if (values.faceBookLink) kidData.data.faceBookLink = values.faceBookLink;
      if (values.followUp1) kidData.data.followUp1 = values.followUp1;
      if (values.followUp2) kidData.data.followUp2 = values.followUp2;
      if (values.followUp3) kidData.data.followUp3 = values.followUp3;
      if (values.instagramLink)
        kidData.data.instagramLink = values.instagramLink;
      if (values.note1) kidData.data.note1 = values.note1;
      if (values.note2) kidData.data.note2 = values.note2;
      if (values.note3) kidData.data.note3 = values.note3;
      if (values.suggestedCourses)
        kidData.data.suggestedCourse = values.suggestedCourses;
      if (values.whatsAppLink) kidData.data.whatsAppLink = values.whatsAppLink;
      if (values.tag) kidData.data.tag = values.tag;

      const res = await editKidProfile(kidData).unwrap();
      await refresh();
      setOpen(false);
    },
  });

  const handleOpen = () => setOpen(!open);

  const labelClass = " mb-2 block text-white capitalize ";
  const inputClass =
    "placeholder:text-xl bg-[#010820] text-white py-3 px-2 focus:ring-[#0d288d] ring-2 ring-black rounded-lg placeholder:capitalize w-full outline-none duration-300";

  // Memoize the field update functions to prevent unnecessary re-renders
  const updateFollowUpFields = useCallback(() => {
    if (!formik.values.followUp1) {
      formik.setFieldValue("note1", "");
      formik.setFieldValue("note2", "");
      formik.setFieldValue("note3", "");
      formik.setFieldValue("followUp2", false);
      formik.setFieldValue("followUp3", false);
    }
    if (!formik.values.followUp2) {
      formik.setFieldValue("note2", "");
      formik.setFieldValue("note3", "");
      formik.setFieldValue("followUp3", false);
    }
    if (!formik.values.followUp3) {
      formik.setFieldValue("note3", "");
    }
  }, [formik]);

  useEffect(() => {
    updateFollowUpFields();
  }, [updateFollowUpFields]);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-[#111C43] !max-w-[700px] !w-[min(700px,80vw)] !min-w-24 z-50"
      >
        <DialogHeader className="capitalize text-white sm:!text-2xl !text-lg">
          more details about {data.kidName}
        </DialogHeader>
        <DialogBody className="h-[400px] overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            <Inputs
              type="text"
              name="kidNames"
              label="Kid Name"
              handlerChange={formik.handleChange}
              value={formik.values.kidName}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="kid Name"
            />
            <Inputs
              type="text"
              name="mobileNumbers"
              label="Mobile Number"
              max={11}
              handlerChange={formik.handleChange}
              value={formik.values.mobileNumber}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="Phone Number"
            />
            <Inputs
              type="text"
              name="ages"
              max={2}
              label="age"
              handlerChange={formik.handleChange}
              value={formik.values.age}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="age"
            />

            <div className="flex items-center gap-10 mb-5">
              <label htmlFor="followUp1" className="text-gray-100">
                Follow Up 1 :
              </label>
              <Switch
                id="followUp1"
                checked={formik.values.followUp1} // القيمة الافتراضية هنا من initialValues
                onChange={() =>
                  formik.setFieldValue("followUp1", !formik.values.followUp1)
                }
                color="blue"
                className="bg-[#060c22]"
                // ripple={true} // Add ripple effect if desired
              />
            </div>
            {formik.values.followUp1 && (
              <Textarea
                name="note1"
                label="note 1"
                handlerChange={formik.handleChange}
                value={formik.values.note1}
                InputClassName={inputClass}
                labelClass={labelClass}
                placeholder="note 1"
              />
            )}

            {formik.values.followUp1 && (
              <div className="flex items-center gap-10 mb-5">
                <label htmlFor="followUp2" className="text-gray-100">
                  Follow Up 2 :
                </label>
                <Switch
                  id="followUp2"
                  checked={formik.values.followUp2} // القيمة الافتراضية هنا من initialValues
                  onChange={() =>
                    formik.setFieldValue("followUp2", !formik.values.followUp2)
                  }
                  color="blue"
                  className="bg-[#060c22]"
                />
              </div>
            )}
            {formik.values.followUp2 && (
              <Textarea
                name="note2"
                label="note 2"
                handlerChange={formik.handleChange}
                value={formik.values.note2}
                InputClassName={inputClass}
                labelClass={labelClass}
                placeholder="note 2"
              />
            )}

            {formik.values.followUp2 && (
              <div className="flex items-center gap-10 mb-5">
                <label htmlFor="followUp3" className="text-gray-100">
                  Follow Up 3 :
                </label>
                <Switch
                  id="followUp3"
                  checked={formik.values.followUp3} // القيمة الافتراضية هنا من initialValues
                  onChange={() =>
                    formik.setFieldValue("followUp3", !formik.values.followUp3)
                  }
                  color="blue"
                  className="bg-[#060c22]"
                />
              </div>
            )}

            {formik.values.followUp3 && (
              <Textarea
                name="note3"
                label="note 3"
                handlerChange={formik.handleChange}
                value={formik.values.note3}
                InputClassName={inputClass}
                labelClass={labelClass}
                placeholder="note 3"
              />
            )}

            <CustomSelect
              name="tag"
              options={["lead", "wine", "froze", "lost"]}
              onChange={(e) => formik.setFieldValue("tag", e)}
              value={formik.values.tag}
            />
            <CoursesSelect
              name="suggested Courses"
              options={courses}
              onChange={(e) => formik.setFieldValue("suggestedCourses", e)}
              value={formik.values.suggestedCourses}
            />
            <Inputs
              type="text"
              name="customerFeedback"
              label="customerFeedback"
              handlerChange={formik.handleChange}
              value={formik.values.customerFeedback}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="customerFeedback"
            />
            <Inputs
              type="text"
              name="whatsAppLink"
              label="whatsAppLink"
              handlerChange={formik.handleChange}
              value={formik.values.whatsAppLink}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="whatsAppLink"
            />
            <Inputs
              type="text"
              name="instagramLink"
              label="instagramLink"
              handlerChange={formik.handleChange}
              value={formik.values.instagramLink}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="instagramLink"
            />
            <Inputs
              type="text"
              name="faceBookLink"
              label="faceBookLink"
              handlerChange={formik.handleChange}
              value={formik.values.faceBookLink}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="faceBookLink"
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => formik.handleSubmit()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Message;
