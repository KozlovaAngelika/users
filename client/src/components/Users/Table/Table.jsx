import style from "./Table.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { User } from "../User/User";
export const Table = (props) => {
  const userElements = props.users.map((user) => {
    return <User user={user} key={user._id}></User>;
  });

  const selectAllHandler = () => {
    props.users.forEach(elem => {
      props.setSelecterAll(!props.isSelectedAll)
      elem.checked = !props.isSelectedAll;
    });
  }
  return (
    <div className={style.container}>
      <Row>
        <Col>
          <Row className={style.tableHead}>
            <Col md={1}>
              <input type="checkbox" onChange={selectAllHandler} checked={props.isSelectedAll}></input>
            </Col>
            <Col md={2}>
              <span>Id</span>
            </Col>
            <Col md={2}>
              <span>Name</span>
            </Col>
            <Col md={2}>
              <span>Email</span>
            </Col>
            <Col md={2}>
              <span>Registration date</span>
            </Col>
            <Col md={2}>
              <span>Last login date</span>
            </Col>
            <Col md={1}>
              <span>Status</span>
            </Col>
          </Row>
          {userElements}
        </Col>
      </Row >
    </ div>
  );
};
