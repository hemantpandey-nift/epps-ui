// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import "./TreeList.css";

const Tree = ({ data = [] }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree) => (
          <TreeNode node={tree} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children ? true : false;

  return (
    <li className="d-tree-node border-0">
      <div className="treeList" onClick={(e) => setChildVisiblity((v) => !v)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            {/* <FontAwesomeIcon icon="caret-right" /> */}
            <ArrowRightIcon />
          </div>
        )}

        <div className="col d-tree-head text-xl text-blue-700">{node.name}</div>
        {node?.membershipType && (
          <div className={`treeCol ${node?.membershipType.toLowerCase()}`}>
            <span>{node?.membershipType?.toUpperCase()}</span>
            <span> Member </span>
          </div>
        )}
        {node?.age && (
          <div className="treeCol">
            <span>Age : </span>
            <span>{node?.age} years</span>
          </div>
        )}
        {node?.weight && (
          <div className="treeCol">
            <span>Weight : </span>
            <span>{node?.weight} Kg</span>
          </div>
        )}
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;
