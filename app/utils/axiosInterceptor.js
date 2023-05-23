"use client";
import axios from "axios";
import { message } from "antd";

// const imsLink = "http://localhost:3001/";
// const socketLink = "http://localhost:3005";
// const clientLink = "http://localhost:3002/";

// to build uncomment https links and comment localhost links

const clientLink = "https://invoice.mscorpres.net:3002/";
let socketLink = "https://socket.mscorpres.net:3005";
const imsLink = "https://api.mscorpres.net:3001/";

const clientAxios = axios.create({
  baseURL: clientLink,
  // headers: {
  //   "x-csrf-token": JSON.parse(localStorage?.getItem("loggedInUser"))?.token,
  // },
});
const imsAxios = axios.create({
  baseURL: imsLink,
  headers: {
    "x-csrf-token":
      typeof window !== "undefined" &&
      JSON.parse(localStorage?.getItem("loggedInUser"))?.token,
  },
});

let branch =
  typeof window !== "undefined" &&
  JSON.parse(localStorage?.getItem("otherData"))?.companyBranch;
let session =
  typeof window !== "undefined" &&
  JSON.parse(localStorage?.getItem("otherData"))?.currentSession;

imsAxios.defaults.headers["Company-Branch"] = branch;
imsAxios.defaults.headers["Session"] = session;

clientAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    message.error("Some error occured while connecting to the backend");
    console.log("Can not connect to backend", error);
  }
);

imsAxios.interceptors.response.use(
  (response) => {
    const { data } = response;
    // if (!data.code) {
    //   return message.error("the response was not in the correct format");
    // }
    // showing error message when status code is 500
    if (data.code === 500) {
      let messagesArr = [];
      for (const key in data.message) {
        if (data.message.hasOwnProperty(key)) {
          messagesArr.push(data.message[key]);
        }
      }
      message.error(messagesArr[0]);
    } else {
      // showing success message when code is not 500
      if (data.message && data.message.length > 0) {
        message.success(data.message);
      }
    }
    return data;
  },
  (error) => {
    message.error(
      "Some error occured while connecting to the backend, Please refresh the page and try again"
    );
    console.log("Can not connect to backend", error);
  }
);

export { clientAxios, imsAxios, socketLink };
