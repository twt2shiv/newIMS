import { message } from "antd";
const getData = async (url) => {
  const res = await fetch("http://localhost:3001" + url, {
    headers: {
      "Company-Branch": "BRMSC012",
      "x-csrf-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm5fbW9iaWxlIjoiOTY1NDcwMjc4MSIsImNybl9lbWFpbCI6ImRldmVzaC5zaW5naEBtc2NvcnByZXMuaW4iLCJjcm5faWQiOiJDUk40NzAyNzgxIiwiY29tcGFueV9pZCI6IkNPTTAwMDEiLCJ1c2VyX25hbWUiOiJEZXZlc2ggU2luZ2giLCJpYXQiOjE2Nzk5MTAxNjcsImV4cCI6MTcxMTQ0NjE2N30.jVUmCv-cCSGqOTjFjEDnPbr11ynlHmJWsIjn21abKvc",
    },
  });
  if (!res.ok) {
    message.error(
      "Something happened wrong, Please contact your administrator"
    );

    return {
      error: true,
      message: {
        message: "Error!",
        description:
          "Something happened wrong, Please contact your administrator",
      },
    };
  }
  const data = await res.json();
  return data;
};

const postData = async (url, body) => {
  const res = await fetch("http://localhost:3001" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Company-Branch": "BRMSC012",
      "x-csrf-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcm5fbW9iaWxlIjoiOTY1NDcwMjc4MSIsImNybl9lbWFpbCI6ImRldmVzaC5zaW5naEBtc2NvcnByZXMuaW4iLCJjcm5faWQiOiJDUk40NzAyNzgxIiwiY29tcGFueV9pZCI6IkNPTTAwMDEiLCJ1c2VyX25hbWUiOiJEZXZlc2ggU2luZ2giLCJpYXQiOjE2Nzk5MTAxNjcsImV4cCI6MTcxMTQ0NjE2N30.jVUmCv-cCSGqOTjFjEDnPbr11ynlHmJWsIjn21abKvc",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    message.error(
      "Something happened wrong, Please contact your administrator"
    );
    // notification.error({
    //   message: "Error!",
    //   description:
    //     "Something happened wrong, Please contact your administrator",
    // });
    return {
      error: true,
      message: "Something happened wrong, Please contact your administrator",
    };
  }
  const response = await res.json();

  if (response.code === 200) {
    return response;
  } else {
    message.error(response.message.msg);
    // notification.error({
    //   message: "Error!",
    //   description: response.message.msg,
    // });
  }
};

export { getData, postData };
