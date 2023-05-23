"use client";
import "./globals.css";
import { LayoutProviders } from "./LayoutProviders";
import InternalNav from "./components/InternalNav/InternalNav";
import store from "/app/store";
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>IMS</title>
      </head>
      <body>
        <Provider store={store}>
          <LayoutProviders>
            <InternalNav />
            {children}
          </LayoutProviders>
        </Provider>
      </body>
    </html>
  );
}
// import { setLoading } from "/app/store";
// import { tableRows, getSelectOptions } from "/app/utils/tableRows.js";
// import TableActions from "/app/components/TableActions/TableActions";
// const { loading } = useSelector((state) => state.imsData);
// import DownloadButton from "/app/components/FloatingButtons/DownloadButton";
