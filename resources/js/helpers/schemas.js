import * as Yup from "yup";

export const loginPasswordSchema = Yup.object({
  login: Yup.string()
    .min(4, 'Too Short!')
    .max(35, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(35, 'Too Long!')
    .required('Required'),
});
