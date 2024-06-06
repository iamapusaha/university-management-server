import {
  TAcademicCode,
  TAcademicName,
  TAcademicSemesterNameCodeMapper,
  TMonth,
} from "./academicSemesterInterface";

export const Months: TMonth[] = [
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

export const AcademicSemesterName: TAcademicName[] = [
  "Autumn",
  "Summar",
  "Fall",
];
export const AcademicSemesterCode: TAcademicCode[] = ["01", "02", "03"];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summar: "02",
  Fall: "03",
};
