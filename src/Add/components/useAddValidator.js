import { useState } from "react";
import { requiredValidator, lengthValidator } from "./validator";
export default function useAddFormValidator(form, files) {
    function touchErrors(errors) {
        return Object.entries(errors).reduce((acc, [field, fieldError]) => {
          acc[field] = {
            ...fieldError,
            dirty: true,
          };
          return acc;
        }, {});
      };

    const [errors, setErrors] = useState({
      name: {
        dirty: false,
        error: false,
        message: "",
      },
      description: {
        dirty: false,
        error: false,
        message: "",
      },
      price: {
        dirty: false,
        error: false,
        message: "",
      },
    //   email: {
    //     dirty: false,
    //     error: false,
    //     message: "",
    //   },
      files: {
        dirty: false,
        error: false,
        message: "",
      },
    });

    const validateForm = ({
        form,
        field,
        errors,
        forceTouchErrors = false,
      }) => {
        let isValid = true;
    
        // Create a deep copy of the errors
        var nextErrors = JSON.parse(JSON.stringify(errors));
    
        // Force validate all the fields
        if (forceTouchErrors) {
          nextErrors = touchErrors(errors);
        }
    
        const { name, description, price } = form;
    
        if (nextErrors.name.dirty && (field ? field === "name" : true)) {
          let nameMessage = requiredValidator(name, "Название");
          nextErrors.name.error = !!nameMessage;
          nextErrors.name.message = nameMessage;

          if (!!nameMessage) isValid = false;

          nameMessage = lengthValidator(name, "Название");
          nextErrors.name.error = !!nameMessage;
          nextErrors.name.message = nameMessage;

          if (!!nameMessage) isValid = false;
        }
    
        if (nextErrors.price.dirty && (field ? field === "price" : true)) {
          const priceMessage = requiredValidator(price, "Цену");
          nextErrors.price.error = !!priceMessage;
          nextErrors.price.message = priceMessage;
          if (!!priceMessage) isValid = false;
        }
    
        if (
          nextErrors.description.dirty &&
          (field ? field === "description" : true)
        ) {
          const descriptionMessage = requiredValidator(
            description,
            "Описание"
          );
          nextErrors.description.error = !!descriptionMessage;
          nextErrors.description.message = descriptionMessage;
          if (!!descriptionMessage) isValid = false;
        }

        // if (
        //     nextErrors.files.dirty &&
        //     (field ? field === "files" : true)
        //   ) {
        //     //const filesMessage = requiredValidator(
        //      //   files,
        //       form
        //     );
            //nextErrors.files.error = !!filesMessage;
            //nextErrors.files.message = filesMessage;
           // if (!!filesMessage) isValid = true;
         // }
    
        setErrors(nextErrors);
    
        return {
          isValid,
          errors: nextErrors,
        };
      };
    
      const onBlurField = (e) => {
        const field = e.target.name;
        const fieldError = errors[field];
        if (fieldError.dirty) return;
    
        const updatedErrors = {
          ...errors,
          [field]: {
            ...errors[field],
            dirty: true,
          },
        };
    
        validateForm({ form, field, errors: updatedErrors });
      };
    
      return {
        validateForm,
        onBlurField,
        errors,
      };
}

