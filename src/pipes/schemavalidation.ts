import { number } from 'yup';

export const idSchema = number().min(0).defined();

export const turbineIdSchema = number().min(0).defined();
