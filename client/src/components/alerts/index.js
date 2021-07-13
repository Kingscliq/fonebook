import React, { useContext } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertContext from "../../context/alerts/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  console.log(alertContext);
  const { alerts, removeAlert } = alertContext;
  return (
    <TransitionGroup className="todo-list">
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <CSSTransition classNames="item" timeout={1000} key={alerts.id}>
              <div className={`alert-box ${alert.type}`}>
                <div>
                  {alert.type === "alert-success" ? (
                    <FaCheckCircle size={25} />
                  ) : (
                    <RiErrorWarningFill size={25} />
                  )}
                </div>
                <p>{alert.msg}</p>
                <div
                  className="toast-close"
                  onClick={() => {
                    removeAlert();
                    console.log("alert Removed");
                  }}
                >
                  <FaTimes />
                </div>
              </div>
            </CSSTransition>
          );
        })}
    </TransitionGroup>
  );
};

export default Alert;
