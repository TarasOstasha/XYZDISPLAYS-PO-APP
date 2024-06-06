import classNames from 'classnames'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import styles from './AddProductPopUp.module.scss'
import { ADD_CUSTOM_PRODUCT } from '../../utils/orderValidationSchema'

function AddProductPopUp({ rerenderOrderList, onFormValuesChange }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const initialValues = {
    productCode: '',
    vendorCode: '',
    productName: '',
    quantity: '',
    webPrice: '',
    Vendor_Price: '',
    discount: '',
  }

  const onSubmit = (values, formikBag) => {
    console.log(values, 'values');
    const newProduct = {
      ProductCode: new Array(values.productCode),
      Vendor_PartNo: new Array(values.vendorCode),
      ProductName: new Array(values.productName),
      Quantity: new Array(values.quantity),
      ProductPrice: new Array(values.webPrice),
      Vendor_Price: new Array(values.Vendor_Price),
      discount: new Array(values.discount),
    }
    onFormValuesChange(newProduct)
    setShow(false)
  }
  return (
    <div>
      <>
        {rerenderOrderList.length !== 0 && (
          <Button variant="btn btn-success" onClick={handleShow}>
            Add Product
          </Button>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="popup">
              <div className="popup-inner">
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={ADD_CUSTOM_PRODUCT}
                >
                  {(formikProps) => {
                    // console.log(formikProps);
                    const productCodeClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.productCode &&
                        !formikProps.errors.productCode,
                      [styles.invalid]:
                        formikProps.touched.productCode &&
                        formikProps.errors.productCode,
                    })
                    const vendorCodeClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.vendorCode &&
                        !formikProps.errors.vendorCode,
                      [styles.invalid]:
                        formikProps.touched.vendorCode &&
                        formikProps.errors.vendorCode,
                    })
                    const productNameClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.productName &&
                        !formikProps.errors.productName,
                      [styles.invalid]:
                        formikProps.touched.productName &&
                        formikProps.errors.productName,
                    })
                    const productQuantityClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.quantity &&
                        !formikProps.errors.quantity,
                      [styles.invalid]:
                        formikProps.touched.quantity &&
                        formikProps.errors.quantity,
                    })
                    const productWeb_PriceClassNames = classNames(
                      styles.input,
                      {
                        [styles.valid]:
                          formikProps.touched.webPrice &&
                          !formikProps.errors.webPrice,
                        [styles.invalid]:
                          formikProps.touched.webPrice &&
                          formikProps.errors.webPrice,
                      },
                    )
                    const productVendor_PriceClassNames = classNames(
                      styles.input,
                      {
                        [styles.valid]:
                          formikProps.touched.Vendor_Price &&
                          !formikProps.errors.Vendor_Price,
                        [styles.invalid]:
                          formikProps.touched.Vendor_Price &&
                          formikProps.errors.Vendor_Price,
                      },
                    )
                    const productDiscountClassNames = classNames(styles.input, {
                      [styles.valid]:
                        formikProps.touched.discount &&
                        !formikProps.errors.discount,
                      [styles.invalid]:
                        formikProps.touched.discount &&
                        formikProps.errors.discount,
                    })
                    return (
                      <Form>
                        {/* <label htmlFor="productCode">Product Name:</label> */}
                        <Field
                          value={formikProps.values.productCode}
                          onChange={formikProps.handleChange}
                          type="text"
                          name="productCode"
                          id="productCode"
                          className={`form-control ${productCodeClassNames}`}
                          placeholder="Stock #"
                        />
                        <ErrorMessage
                          name="productCode"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.vendorCode}
                          onChange={formikProps.handleChange}
                          type="text"
                          name="vendorCode"
                          id="vendorCode"
                          className={`form-control ${vendorCodeClassNames}`}
                          placeholder="Vendor Code"
                        />
                        <ErrorMessage
                          name="vendorCode"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.productName}
                          onChange={formikProps.handleChange}
                          type="text"
                          id="productName"
                          name="productName"
                          className={`form-control ${productNameClassNames}`}
                          placeholder="Product Name"
                        />
                        <ErrorMessage
                          name="Product Name"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.quantity}
                          onChange={formikProps.handleChange}
                          type="text"
                          name="quantity"
                          id="quantity"
                          className={`form-control ${productQuantityClassNames}`}
                          placeholder="Quantity"
                        />
                        <ErrorMessage
                          name="quantity"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          type="text"
                          name="webPrice"
                          onChange={formikProps.handleChange}
                          id="webPrice"
                          className={`form-control ${productWeb_PriceClassNames}`}
                          placeholder="Web Price"
                        />
                        <ErrorMessage
                          name="webPrice"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          type="text"
                          name="Vendor_Price"
                          onChange={formikProps.handleChange}
                          id="Vendor_Price"
                          className={`form-control ${productVendor_PriceClassNames}`}
                          placeholder="Vendor Price"
                        />
                        <ErrorMessage
                          name="Vendor_Price"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Field
                          value={formikProps.values.discount}
                          onChange={formikProps.handleChange}
                          type="text"
                          id="discount"
                          name="discount"
                          className={`form-control ${productDiscountClassNames}`}
                          placeholder="Discount %"
                        />
                        <ErrorMessage
                          name="discount"
                          className={styles.errorDiv}
                          component="div"
                        />
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button type="submit" className="btn btn-success">
                            ADD
                          </Button>
                        </Modal.Footer>
                      </Form>
                    )
                  }}
                </Formik>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  )
}

export default AddProductPopUp
