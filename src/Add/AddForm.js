import styles from "./Add.css";
import useAddFormValidator from "./components/useAddValidator";
import UploadFiles from '../UploadFiles/UploadFiles';
import Locality from '../components/locality'

import React, { useState, useEffect } from 'react'
import axios from "axios";
import clsx from "clsx";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function AddForm() {
  const [l, setL] = useState(0);
  const [phone, setPhone] = useState();
  const [categoryDropdown, setCategoryDropdown] = useState();
  const [fileList, setFileList] = useState();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: 0,
    localityId: 0
  });

  useEffect(() => {
    axios.get('http://localhost:5110/ad/data')
    .then(resp => {
      //console.log(resp);
      const categories = resp.data.category.map((c) => ({'value': c.id, label: c.name}) );
      setCategoryDropdown(categories);
    })
    .catch((error) => {
      //console.log(error)
    });
  }, []);

  const { errors, validateForm, onBlurField } = useAddFormValidator(form);

  const onDropdownSelect = (option) => {
    const nextFormState = {
      ...form,
      ['category']: option.value
    };
    setForm(nextFormState);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    //const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
   // console.log(fileList);
    if (fileList) {
      // var reader = new FileReader();
	    // reader.onload = function(e) {
      //   console.log(e.target.result);
      // };
      // reader.onerror = function(e) {
      //   // error occurred
      //   console.log('Error : ' + e.type);
      // };
	    
       const formData = new FormData();
       formData.append("name", form.name);
       formData.append("description", form.description);
       formData.append("price", form.price);
       formData.append("frontFile", fileList[0]);
       formData.append("categoryId", form.category);
       formData.append("phone", form.phone);
       formData.append("localityId", 1);
      //reader.readAsBinaryString(fileList[0]);
      //formData.append("name", "sadasdasd");

    // console.log(reader.readAsBinaryString(fileList[0]));
      axios.post('http://localhost:5110/ad', formData) // {name: form.name, description: form.description, price: form.price, frontFile: fileList[0], categoryId: form.category, phone: form.phone, localityId: 1})
      .then(resp => {
       // console.log(resp);
      })
      .catch((error) => {
       // console.log(error)
      });
    }
  };

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  const  validatePhone = (str) => {
    if (phone === undefined) {
      return true;
    }
    if (str.length !== 12 && phone !== undefined) {
      return 'Некоректно введений номер (приклад: +380984455666)';
    }
    return true;
  }

  const localityChanged = (value) => {
    setL(value);
  }

  return (
    <div>
      <form className={styles.form} onSubmit={onSubmitForm}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Название</label>
        <input
          className={clsx(
            styles.formField,
            errors.name.dirty && errors.name.error && styles.formFieldError
          )}
          type="text"
          aria-label="Name field"
          name="name"
          value={form.name}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.name.dirty && errors.name.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.name.message}</p>
        ) : null}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Описание</label>
        <input
          className={clsx(
            styles.formField,
            errors.description.dirty &&
              errors.description.error &&
              styles.formFieldError
          )}
          type="text"
          aria-label="Description field"
          name="description"
          value={form.description}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.description.dirty && errors.description.error ? (
          <p className={styles.formFieldErrorMessage}>
            {errors.description.message}
          </p>
        ) : null}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Цена</label>
        <input
          className={clsx(
            styles.formField,
            errors.price.dirty &&
              errors.price.error &&
              styles.formFieldError
          )}
          type="number"
          aria-label="price field"
          name="price"
          value={form.price}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.price.dirty && errors.price.error ? (
          <p className={styles.formFieldErrorMessage}>
            {errors.price.message}
          </p>
        ) : null}
      </div>
      <Dropdown options={categoryDropdown} onChange={onDropdownSelect} placeholder="Выберите категорию" />
      <PhoneInput
        country={'ua'}
        onlyCountries={['ua']}
        value={phone}
        onChange={i => {
          if (i.length === 12) {
            const nextFormState = {
              ...form,
              ['phone']: i
            };
            setForm(nextFormState);
          }
          setPhone(i);
        }}
        isValid={validatePhone}
      />
      <Locality localityChanged={localityChanged}/>
      <UploadFiles onFilesChange={(files) => setFileList(files)}/>
      <div className={styles.formActions}>
        <button className={styles.formSubmitBtn} type="submit">
          Создать обьявление
        </button>
      </div>
    </form>
    </div>
  )
}
