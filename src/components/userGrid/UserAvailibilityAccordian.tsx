import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
} from "@mui/material";
import CONSTANTS from "../../constants/constants";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./UserGrid.module.css";
import { UserType } from "../../constants/types";

export default function UserAvailibilityAccordian({
  userData,
}: {
  userData: UserType;
}) {
  const availibilityDays = CONSTANTS.WeekDays.map((day: string) =>
    userData.userMembership.availibilityDays.includes(day) ? true : false
  );

  return (
    <div>
      <Paper>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Membership type</TableCell>
              {CONSTANTS.WeekDays.map((day: string) => (
                <TableCell align="left">{day.toUpperCase()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={userData._id}>
              <TableCell>{userData.name}</TableCell>
              <TableCell>{userData.userMembership.membershipType}</TableCell>
              {availibilityDays.map((status: boolean) => (
                <TableCell>
                  {status ? (
                    <CheckIcon className={styles.available} />
                  ) : (
                    <CloseIcon className={styles.unavailable} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
