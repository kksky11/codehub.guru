import { ENV } from 'coreApp/constants/apiConstants';

export const log = function (msg = "") {
  if (ENV === "development") {
    return console.log(`${ENV}:${msg}`);
  }
};

