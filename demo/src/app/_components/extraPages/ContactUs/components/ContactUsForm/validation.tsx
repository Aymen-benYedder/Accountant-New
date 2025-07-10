import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  website: Yup.string().required("Website is required"),
  helpOption: Yup.string().required("Required"),
});
