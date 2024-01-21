import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Dialog,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  IconButton,
} from "@mui/material";

import styles from "./UserGrid.module.css";
import { useSelector } from "react-redux";
import CONSTANTS from "../../constants/constants";
import { useAppDispatch, userState } from "../../store";
import { fetchUserAvailibility } from "../../store/userSlice";
import Loader from "../loader/Loader";
import CloseIcon from "@mui/icons-material/Close";

type UserAvailibility = {
  totalUsers: number;
  user: string[];
  availibilityDay: string;
};

export default function AvailibilityModal({
  addDialog,
  setAddDialog,
}: {
  addDialog: boolean;
  setAddDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const userData: any = useSelector(userState);
  const loading: boolean = userData?.loading ?? false;
  const availibilityData: UserAvailibility[] =
    userData?.availibilityData?.availibilityList;
  console.log("availibilityData:", availibilityData);
  const weekDays: string[] = CONSTANTS.WeekDays;

  useEffect(() => {
    dispatch(
      fetchUserAvailibility({
        weekDays,
      })
    );
  }, []);

  const handleClose = () => {
    setAddDialog(false);
  };
  return (
    <div>
      {loading && <Loader />}
      <Dialog
        open={addDialog}
        className={styles.modalsContainer}
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          User Availibility
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <div>
          <div className={styles.availibilityMainDiv}>
            <Paper>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Day</TableCell>
                    <TableCell align="left">Total Users</TableCell>
                    <TableCell align="left">Users</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weekDays.map((day, index) => {
                    const usersData = availibilityData.filter(
                      (data) => data?.availibilityDay === day
                    )[0];
                    return (
                      <TableRow key={index}>
                        <TableCell align="left">{day?.toUpperCase()}</TableCell>
                        <TableCell>{usersData?.totalUsers}</TableCell>
                        <TableCell>{usersData?.user?.join(", ")}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
