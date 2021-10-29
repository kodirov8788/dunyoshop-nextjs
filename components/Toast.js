import { useState, useEffect } from "react";

const Toast = ({ msg, handleShow, bgColor }) => {
  const [time, setTime] = useState(true);
  const title = msg.title;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    time && (
      <div
        className={`toast show position-fixed text-light ${bgColor}`}
        style={{ top: "5px", right: "5px", zIndex: 100, minWidth: "280px" }}
      >
        <div className={`toast-header ${bgColor} text-light`}>
          <strong className="mr-auto text-light">{title}</strong>
          <p>{time}</p>

          <button
            type="button"
            className="ml-2 mb-1 close text-light"
            data-dismiss="toast"
            style={{ outline: "none" }}
            onClick={handleShow}
          >
            x
          </button>
        </div>

        <div className="toast-body">{msg.msg}</div>
      </div>
    )
  );
};

export default Toast;
