import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import sprite from '../../assets/images/symbol-defs.svg';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../redux/auth/authOperations';
import s from './FormAuth.module.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('невалідний email')
    .min(3, 'мінімальна кількість символів 3')
    .max(254, 'максимальна кількість символів 254')
    .required("це обов'язкове поле"),
  password: Yup.string()
    .min(8, 'пароль повинен мати мінімум 8 символів')
    .max(100, 'пароль повинен мати максимум 100 символів')
    .required("це обов'язкове поле"),
});

const FormAuth = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState('login');

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={s.wrapper}
    >
      <p className={s.text}>
        Ви можете авторизуватися за допомогою Google Account:
      </p>
      <a
        className={`${s.button} ${s.google}`}
        href="https://kapusta-backend.goit.global/auth/google"
      >
        <svg className={s.icon}>
          <use href={`${sprite + '#icon-google'}`}></use>
        </svg>
        Google
      </a>
      <p className={s.text}>
        Або зайти за допомогою e-mail і пароля, попередньо зареєструвавшись:
      </p>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (type === 'login') {
            dispatch(loginUser(values));
            resetForm();
          }
          if (type === 'register') {
            dispatch(registerUser(values));
            resetForm();
          }
        }}
      >
        {formik => (
          <Form className={s.form}>
            <label className={s.field}>
              {formik.touched.email && formik.errors.email && (
                <span className={s.requiredStar}>*</span>
              )}
              Електронна пошта:
              <Field
                className={s.input}
                name="email"
                placeholder="your@email.com"
              />
              {formik.touched.email && formik.errors.email && (
                <span className={s.error}>{formik.errors.email}</span>
              )}
            </label>

            <label className={s.field}>
              {formik.touched.password && formik.errors.password && (
                <span className={s.requiredStar}>*</span>
              )}
              Пароль:
              <Field
                className={`${s.input} ${s.password}`}
                name="password"
                type="password"
              />
              {formik.touched.password && formik.errors.password && (
                <span className={s.error}>{formik.errors.password}</span>
              )}
            </label>

            <div className={s['wrapper-buttons']}>
              <button
                className={`${s.button} ${s.primary}`}
                type="button"
                onClick={() => {
                  setType('login');
                  formik.handleSubmit();
                }}
              >
                УВІЙТИ
              </button>
              <button
                type="button"
                className={`${s.button} ${s.secondary}`}
                onClick={() => {
                  setType('register');
                  formik.handleSubmit();
                }}
              >
                РЕЄСТРАЦІЯ
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default FormAuth;
