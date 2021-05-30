import { useState, useEffect, useCallback } from 'react'
import { ValidationError } from "yup";

interface Errors {
	name: "";
	lastName: "";
	email: "";
}

const useValidation = (values: any, schema: any) => {
   const [errors, setErrors] = useState({} as Errors);
   const [hasErrors, setHasErrors] = useState(true);

   const validate =  useCallback(async () => {
      try {
         await schema.validate(values, { abortEarly: false })
         setErrors({} as Errors)
      } catch (e) {
         if (e instanceof ValidationError) {
            const errors = {} as any;
            e.inner.forEach((key) => {
               if (key?.path) errors[key.path] = key.message
            })
            setErrors(errors)
         }
      }
   }, [schema, values])

   useEffect(() =>
   		setHasErrors(!!errors.email || !!errors.lastName || !!errors.lastName),
   [errors.email, errors.lastName])

   useEffect(() => { validate() },[validate, values])

   return { errors, hasErrors }
}

export default useValidation
