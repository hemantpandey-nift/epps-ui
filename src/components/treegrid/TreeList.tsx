import React, { useEffect, useState } from "react";
import Tree from "./Tree";
import { useAppDispatch, userState } from "../../store";
import { useSelector } from "react-redux";
import { UserType } from "../../constants/types";
import { fetchAllUserList } from "../../store/userSlice";
import SearchBox from "../searchBox/SearchBox";
import styles from "../userGrid/UserGrid.module.css";
import AddchartIcon from "@mui/icons-material/Addchart";
import AvailibilityModal from "../userGrid/AvailibilityModal";

const TreeList = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [addDialog, setAddDialog] = useState<boolean>(false);

  const userData: any = useSelector(userState);
  const userList: UserType[] = userData?.allUserData?.userList;

  const userTreeData = userList.map((data, index) => {
    return {
      key: `parent-${index + 1}`,
      name: data.name,
      age: data.age,
      weight: data.weight,
      membershipType: data.userMembership.membershipType,
      children: data.userMembership.availibilityDays.map((el, i) => ({
        id: `child-${i + 1}`,
        name: el,
      })),
    };
  });

  useEffect(() => {
    dispatch(fetchAllUserList({ search }));
  }, [search]);

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <h2 className="text-2xl text-blue-400">User Availibility tree</h2>
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
          <p className="mt-3">
            <div className="row mt-3 d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark">
                <Tree data={userTreeData} />
              </div>
            </div>
          </p>
        </div>
        <AvailibilityModal addDialog={addDialog} setAddDialog={setAddDialog} />
      </div>
    </>
  );
};

export default TreeList;
