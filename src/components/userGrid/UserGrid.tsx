import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import MUIDataTable from "mui-datatables";
import styles from "./UserGrid.module.css";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { useAppDispatch, userState } from "../../store";
import { fetchAllUserList } from "../../store/userSlice";
import SearchBox from "../searchBox/SearchBox";
import UserAvailibilityAccordian from "./UserAvailibilityAccordian";
import AddchartIcon from "@mui/icons-material/Addchart";
import AvailibilityModal from "./AvailibilityModal";
import { UserType } from "../../constants/types";

const UserGrid = () => {
  const [rows, setRows] = useState<any>([]);
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [page, setpage] = useState<number>(0);
  const [limit, setlimit] = useState<number>(15);
  const [sortBy, setsortBy] = useState<string>("name");
  const [order, setorder] = useState<string>("asc");
  const [search, setSearch] = useState<string>("");

  const dispatch = useAppDispatch();

  const userData: any = useSelector(userState);
  const loading = userData?.loading ?? false;
  const userList: UserType[] = userData?.allUserData?.userList;
  const totalRecords: number = userData?.allUserData?.totalRecords;

  useEffect(() => {
    dispatch(
      fetchAllUserList({
        page,
        limit,
        sortBy,
        order,
        search,
      })
    );
  }, [page, limit, sortBy, order, search]);

  const columns = useMemo(
    () => [
      {
        label: "S No.",
        name: "serialNo",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        label: "Name",
        name: "name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: "Age",
        name: "age",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        label: "Weight",
        name: "weight",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: "Membership Type",
        name: "membershipType",
        options: {
          filter: true,
          sort: true,
        },
      },
    ],
    [userList]
  );

  const options: any = {
    filter: false,
    selectToolbarPlacement: "none",
    selectableRows: "none",
    filterType: "dropdown",
    responsive: "standard",
    count: totalRecords,
    rowsPerPage: limit,
    page: page,
    search: false,
    download: false,
    print: false,
    serverSide: true,
    viewColumns: false,
    onChangePage: (currentPage: number) => {
      setpage(currentPage);
    },
    onChangeRowsPerPage: (numberOfRows: number) => {
      setlimit(numberOfRows);
    },
    onColumnSortChange: (changedColumn: string, direction: string) => {
      setsortBy(changedColumn);
      setorder(direction);
    },

    expandableRows: true,
    renderExpandableRow: (rowData: any, rowMeta: any) => {
      return (
        <React.Fragment>
          <tr>
            <td colSpan={12}>
              <UserAvailibilityAccordian
                userData={userList?.[rowMeta?.dataIndex]}
              />
            </td>
          </tr>
        </React.Fragment>
      );
    },
  };

  useEffect(() => {
    setRows(
      userList?.map((data, index) => ({
        id: data._id,
        serialNo: index + 1,
        membershipType: data.userMembership.membershipType,
        ...data,
      }))
    );
  }, [userList]);

  return (
    <>
      {" "}
      {loading && <Loader />}
      <div>
        <div className={styles.actionsDiv}>
          <div
            style={{
              marginLeft: "450px",
              marginTop: "2px",
            }}
          >
            <div className={styles.filterSearchBtn}>
              <div className="me-3">
                <SearchBox setSearch={setSearch} />
              </div>
            </div>
          </div>
          <div>
            <button
              className={`${styles.btn} ${styles.primaryBtnOutline}`}
              onClick={() => {
                setAddDialog(true);
              }}
            >
              <span>
                <AddchartIcon className={styles.calendarIcon} />
              </span>
              <span>Check Availibility</span>
            </button>
          </div>
        </div>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: "400px",
            backgroundColor: "rgba(247,247,247)",
          }}
        >
          <div>
            <MUIDataTable
              data={rows}
              columns={columns}
              options={options}
              title={"aa"}
            />
          </div>
          <AvailibilityModal
            addDialog={addDialog}
            setAddDialog={setAddDialog}
          />
        </Box>
      </div>
    </>
  );
};

export default UserGrid;
