import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './AddOption.module.scss';
import { ADD_OPTION_SCHEMA } from '../../utils/orderValidationSchema'

// options_id, product_code, price, quantity, is_default
function AddOption() {
  const initialValues = {
    options_id: '',
    product_code: '',
    price: '',
    quantity: '',
    is_default: false
  }

  const onSubmit = (values, formikBag) => {
    //console.log(values, 'values');

    const newOption = {
      options_id: values.options_id,
      product_code: values.product_code,
      price: values.price,
      quantity: values.quantity,
      is_default: values.is_default
    }


    formikBag.resetForm()
  }


  return (
    <div>
      <Header />
        <div className={styles.optionWrapper}>
            <h1>Add Option</h1>
            <div className={styles.optionForm}>
              <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={ADD_OPTION_SCHEMA}
                >
                  {(formikProps) => {
                    const optionIdClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.options_id &&
                        !formikProps.errors.options_id,
                      [styles.invalid]:
                        formikProps.touched.options_id &&
                        formikProps.errors.options_id,
                    })
                    const productCodeClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.product_code &&
                        !formikProps.errors.product_code,
                      [styles.invalid]:
                        formikProps.touched.product_code &&
                        formikProps.errors.product_code,
                    })
                    const optionPriceClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.price &&
                        !formikProps.errors.price,
                      [styles.invalid]:
                        formikProps.touched.price &&
                        formikProps.errors.price,
                    })
                    const optionQuantityClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.quantity &&
                        !formikProps.errors.quantity,
                      [styles.invalid]:
                        formikProps.touched.quantity &&
                        formikProps.errors.quantity,
                    })
                    const isOptionDefaultClassNames = classNames(
                      styles.input,
                      {
                        [styles.valid]:
                          formikProps.touched.is_default &&
                          !formikProps.errors.is_default,
                        [styles.invalid]:
                          formikProps.touched.is_default &&
                          formikProps.errors.is_default,
                      },
                    )
                    return (
                      <Form>
                        <div className={styles.fieldGroup}>
                          <Field
                            value={formikProps.values.options_id}
                            onChange={formikProps.handleChange}
                            type="text"
                            name="options_id"
                            id="options_id"
                            className={`form-control ${optionIdClassNames}`}
                            placeholder="Option Id"
                          />
                        </div>
                        <ErrorMessage
                          name="options_id"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.product_code}
                          onChange={formikProps.handleChange}
                          type="text"
                          name="product_code"
                          id="product_code"
                          className={`form-control ${productCodeClassNames}`}
                          placeholder="Product Code"
                        />
                        <ErrorMessage
                          name="product_code"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.price}
                          onChange={formikProps.handleChange}
                          type="text"
                          id="price"
                          name="productName"
                          className={`form-control ${optionPriceClassNames}`}
                          placeholder="Option Price"
                        />
                        <ErrorMessage
                          name="price"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.quantity}
                          onChange={formikProps.handleChange}
                          type="text"
                          name="quantity"
                          id="quantity"
                          className={`form-control ${optionQuantityClassNames}`}
                          placeholder="Quantity"
                        />
                        <ErrorMessage
                          name="quantity"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.is_default}
                          type="text"
                          name="is_default"
                          onChange={formikProps.handleChange}
                          id="is_default"
                          className={`form-control ${isOptionDefaultClassNames}`}
                          placeholder="Web Price"
                        />
                        <ErrorMessage
                          name="is_default"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Button type="submit" className="btn btn-success">
                          ADD
                        </Button>
                      </Form>
                    )
                  }}
              </Formik>
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default AddOption