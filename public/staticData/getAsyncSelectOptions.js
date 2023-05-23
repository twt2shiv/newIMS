import { imsAxios } from "app/utils/axiosInterceptor";

const getAsyncSelectOptions = async (url, search) => {
  const data = await imsAxios.post(url, { search: search });
  if (data[0]) {
    let arr = data.map((row) => ({
      text: row.text,
      value: row.id,
    }));
    return arr;
  }
};
export default getAsyncSelectOptions;
