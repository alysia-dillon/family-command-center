import { DEFAULT_ERROR_STRING } from "@deps/constants/formats";

export const isNullEmptyOrUndefined = (value?: any) => {
  return value === null || value === undefined || value === "";
};

export const cleanCurrency = (value: string) => {
  if (!value) return value;

  return value.replaceAll(",", "").replaceAll("$", "");
};

export const nameToTwoLetters = (name?: string | null) => {
  if (!name) return name;

  const names = name.split(" ");

  if (names.length < 2) return names[0][0];

  return `${names[0][0]}${names[1][0]}`;
};

export const firstNameAndLastInitial = (name?: string | null) => {
  if (!name) return name;

  const names = name.split(" ");

  if (names.length < 2) return names[0][0];

  return `${names[0]} ${names[1][0]}.`;
};

export const buildFullName = (
  firstName?: string,
  middleName?: string,
  lastName?: string,
  suffix?: string
) => {
  const first = firstName || "";
  const middle = middleName ? `${middleName.charAt(0)}.` : "";
  const last = lastName || "";
  const suffixString = suffix || "";
  const space = first && middleName ? " " : "";

  return `${first}${space}${middle} ${last} ${suffixString}`;
};

export const toTitleCase = (value?: string): string => {
  if (!value) return "";

  return value.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

export const formatDialNumber = (value: string | undefined) => {
  if (!value || value.length <= 4) return value;

  let newValue = value;

  const cleanedValue = value.replace(/\D[^.]/g, "");
  newValue = cleanedValue.slice(0, 3) + "-" + cleanedValue.slice(3);

  return newValue;
};

// export const formatPhone = (phone: Phone) => {
//   if (!phone) return ""; // TODO: should this return a default error string or null instead of empty string?

//   let phoneNumber = "";
//   if (!isNullEmptyOrUndefined(phone.countryCode)) {
//     phoneNumber += `+${phone.countryCode} `;
//   }

//   if (!isNullEmptyOrUndefined(phone.areaCode)) {
//     phoneNumber += `(${phone.areaCode}) `;
//   }

//   if (!isNullEmptyOrUndefined(phone.dialNumber)) {
//     phoneNumber += `${formatDialNumber(phone?.dialNumber?.toString())}`;
//   }

//   return phoneNumber;
// };

export const formatDate = (date: string | undefined) => {
  if (date === "" || date == null) return DEFAULT_ERROR_STRING;
  const dt = new Date(date + " ");
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
};

// export const parseAndFormatDate = (
//   inputFormat: string,
//   outputFormat: string,
//   date?: string
// ) => {
//   if (dayjs(date, inputFormat).isValid())
//     return dayjs(date, inputFormat).format(outputFormat);
//   return date;
// };

export const hasDigitsRegex = new RegExp(/\d+/);

// Converts yyyy-mm-dd strings into m/d/yyyy
// export const convertKebabedDateString = (date: string | undefined): string => {
//   if (date === "" || typeof date !== "string") return DEFAULT_ERROR_STRING;

//   const [year, month, day] = date.split("-");
//   if (!year || !month || !day) {
//     return date;
//   }
//   const formattedDate = dayjs(date, ZAHARA_API_DATE_FORMAT).format(
//     DEFAULT_DATE_FORMAT
//   );
//   if (!hasDigitsRegex.test(formattedDate)) {
//     const error = new Error(`Invalid Date. Tried to parse ${date}`);
//     datadogRum.addError(error);
//     return DEFAULT_ERROR_STRING;
//   }

//   return formattedDate;
// };

// Format date for createdAt and updatedAt
export const formatDateDescriptionList = (date: Date): string => {
  if (isNaN(date.getTime())) return DEFAULT_ERROR_STRING;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
};

export const formatDateForAriaLabel = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
};

// Format SSN return ****-**-1234
export const formatSSN = (ssn?: string): string => {
  if (!ssn) return DEFAULT_ERROR_STRING;

  // Remove any non-numeric characters
  const cleanedSSN = ssn.replace(/\D/g, "");

  // Get the last 4 digits
  const last4Digits = cleanedSSN.slice(-4);

  // Append the last 4 digits to the static string
  return `***-**-${last4Digits}`;
};

export const formatSSNFull = (value = ""): string => {
  if (isNullEmptyOrUndefined(value) || value.length <= 3) return value;

  const numbers = value.replace(/\D/g, ""); // Remove any non-numeric characters
  const groups = [];

  // add first three numbers
  groups.push(numbers.substring(0, 3));

  // add next two numbers
  if (numbers.length > 3) {
    groups.push(numbers.substring(3, 5));
  }

  // add last four numbers
  if (numbers.length > 5) {
    groups.push(numbers.substring(5));
  }

  // Join the numbers with hyphens
  const ssn = groups.join("-");

  return ssn;
};

// Function to convert text to sentence case
export const toSentenceCase = (text: string | undefined): string => {
  if (text === "" || text == null) return "";

  return text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase();
};

export const trimStringByCharacterCount = (
  input?: string,
  maxCharacterCount = 150,
  suffix = "..."
): string => {
  if (!input) return "";

  if (input.length <= maxCharacterCount) {
    return input;
  } else {
    return input.substring(0, maxCharacterCount) + suffix;
  }
};

// export const calculateAge = (
//   birthday: string | undefined,
//   yearString: string
// ): string => {
//   if (
//     isNullEmptyOrUndefined(birthday) ||
//     !dayjs(birthday, ZAHARA_API_DATE_FORMAT).isValid()
//   )
//     return DEFAULT_ERROR_STRING;
//   const age = calculateAgeNumber(birthday);
//   if (age === undefined) {
//     return DEFAULT_ERROR_STRING;
//   }
//   return age + ` ${yearString}`;
// };

// Format bank account number
export const formatAccountNumber = (value = "", trimOnly = false): string => {
  if (isNullEmptyOrUndefined(value) || value.length <= 4) return value;

  if (trimOnly === true) {
    return value.substring(value.length - 4);
  }

  const cleanedAccount = value.replace(/\D/g, ""); // Remove any non-numeric characters

  // Mask the start of the string with asterisks, leaving the last 4 characters visible
  const maskedAccount =
    cleanedAccount.substring(0, cleanedAccount.length - 4).replace(/./g, "*") +
    cleanedAccount.substring(cleanedAccount.length - 4);

  return maskedAccount;
};

// Format bank card expiration date
export const formatCardExpirationDate = (
  expirationDate: string | undefined
) => {
  if (expirationDate) {
    const date = new Date(expirationDate);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  }
  return null;
};

// export const translateYearOrYears = (
//   age: number | undefined,
//   t: TFunction
// ): string => {
//   if (isNullEmptyOrUndefined(age as number)) {
//     return DEFAULT_ERROR_STRING;
//   }
//   if (age === 1) {
//     return t("temporal.oneYear");
//   }

//   return t("temporal.nYears", { n: age });
// };

export const escapeRegExp = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const safeString = (value?: string | null): string => {
  return !isNullEmptyOrUndefined(value)
    ? (value as string)
    : DEFAULT_ERROR_STRING;
};

// otp withdrawals boolean to string
export const stringifyTrueFalseNull = (
  val?: string | boolean | null
): string => {
  return val?.toString ? val.toString() : "null";
};

export const deStringifyTrueFalseNull = (
  val: string | null
): string | boolean | null => {
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  if (val === "null") {
    return null;
  }
  return val;
};

export const getSlug = (val: string): string => {
  return val.replace(/ /g, "_").toLowerCase();
};
