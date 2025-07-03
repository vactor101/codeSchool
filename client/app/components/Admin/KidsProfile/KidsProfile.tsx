import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader"; // قم بإنشاء مكون لودير خاص بك
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useGetAllKidsQuery } from "@/redux/features/kids/kidApi";
import { Button, Option, Select } from "@material-tailwind/react";
import Message from "./message/Message";
import {
  useGetAllCoursesQuery,
  useGetCourseContentQuery,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";

type Props = {};

const CustomDataGrid: FC<Props> = () => {
  const { theme } = useTheme();
  const [group, setGroup] = useState<String | undefined>(undefined);

  const { isLoading, data, refetch } = useGetAllKidsQuery({
    group,
  });
  const { isLoading: loadingCourses, data: courses } = useGetAllCoursesQuery(
    {}
  );

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
    { field: "kidName", headerName: "Kid Name", flex: 0.5 },
    { field: "age", headerName: "Age", flex: 0.3 },
    { field: "tag", headerName: "Tag", flex: 0.3 },
    { field: "mobileNumber", headerName: "Phone Number", flex: 0.5 },
    { field: "followUp1", headerName: "Follow Up 1", flex: 0.5 },
    { field: "followUp2", headerName: "Follow Up 2", flex: 0.5 },
    { field: "followUp3", headerName: "Follow Up 3", flex: 0.5 },
    {
      field: " ",
      headerName: "Edit",
      flex: 1,
      headerAlign: "center",
      renderCell: (params: any) => {
        const dataIndex = data.data.findIndex(
          (kid: any) => kid._id === params.row.id
        );
        const kid = data.data[dataIndex];
        return (
          <Message
            data={kid}
            courses={!loadingCourses && courses.courses}
            refresh={refetch}
          >
            <Button className="bg-[#12235f]">details and edit</Button>
          </Message>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.data.forEach((item: any) => {
        const formattedDate = format(new Date(item.createdAt), "dd MMM, yyyy");
        rows.push({
          id: item._id,
          kidName: item.kidName,
          age: item.age,
          tag: item.tag,
          mobileNumber: item.mobileNumber,
          followUp1: item.followUp1,
          followUp2: item.followUp2,
          followUp3: item.followUp3,
          createdAt: formattedDate,
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-96">
            <Select
              label="select age"
              onChange={(e) => setGroup(e)}
              color="blue"
            >
              <Option>all</Option>
              <Option value="ageGroup1">0-6</Option>
              <Option value="ageGroup2">7-10</Option>
              <Option value="ageGroup3">11-15</Option>
            </Select>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default CustomDataGrid;
