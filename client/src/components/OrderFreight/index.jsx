import axios from 'axios'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './OrderFreight.module.scss'
// import * as API from '../../api'

// import { ORDER_VALIDATION_SCHEMA } from '../../utils/orderValidationSchema'
import { useEffect, useState } from 'react'

import { VENDOR_LIST } from '../../utils/vendorsData'
// import { yellow, descriptionWidth, attension } from '../../stylesConstants'
import OrderFreightForm from '../OrderFreightForm'
import AddProductPopUp from '../AddProductPopUp'

function OrderFreight() {
  let discountRenderFlag = false
  const [orderId, setOrderId] = useState('')

  // *** order Detail ***
  const [rerenderOrderList, setRerenderOrderList] = useState([]) // rerender when inserting discount value to our object

  // *** order ship to ***
  // const [shippingAddress1, setShippingAddress1] = useState('')
  // const [shipCity, setShipCity] = useState('')
  // const [shipCompanyName, setShipCompanyName] = useState('')
  // const [shipState, setShipState] = useState('')
  // const [shipCountry, setShipCountry] = useState('')
  // const [shipPostalCode, setShipPostalCode] = useState('')
  // const [shipName, setShipName] = useState('')
  // const [shipLastName, setShipLastName] = useState('')
  // const [shipPhoneNumber, setShipPhoneNumber] = useState('')
  // const [shipToAddress, setShipToAddress] = useState('')
  const [orderClientAddress, setOrderClientAddress] = useState(null)

  const [removeOnclick, setRremoveOnclick] = useState(0)
  const [isEditing, setIsEditing] = useState(null)
  const [isEditingTop, setIsEditingTop] = useState(false)
  const [inputIndex, setInputIndex] = useState(0)
  const [vendorAddress, setVendorAddress] = useState('')
  const [shipInfo, setShipInfoDescription] = useState()

  const [customFieldInHand, setCustomFieldInHand] = useState()
  const [orderComments,setOrderComments] = useState()

  const handleToRemove = (index, array) => {
    if (index >= 0 && index < array.length) {
      setRremoveOnclick(array.splice(index, 1))
      console.log(array);
    }
    //console.log(array, '<< array');
  }

  const handleToEdit = (index, formikProps) => {
    setIsEditing(index === isEditing ? null : index)
    if (rerenderOrderList[index].hasOwnProperty('Vendor_Price')) {
      formikProps.values.productPrice = rerenderOrderList[index].Vendor_Price[0]
    }
    formikProps.values.productCode = rerenderOrderList[index].ProductCode[0]
    formikProps.values.productName = rerenderOrderList[index].ProductName[0]
    formikProps.values.productQuantity = rerenderOrderList[index].Quantity[0]
  }

  const handleChangeInput = (e, i, formikProps) => {
    setInputIndex(i)
    console.log(i)
  }

  // const handleToEditTop = (formikProps) => {
  //   setIsEditingTop(true)
  //   const productCodes = rerenderOrderList.map((p) => p.ProductCode?.[0])
  //   const vendorCodes = rerenderOrderList.map(p => p.Vendor_PartNo?.[0])
  //   const productNames = rerenderOrderList.map((p) => p.ProductName?.[0])
  //   const quantities = rerenderOrderList.map((p) => p.Quantity?.[0])
  //   const vendorPrices = rerenderOrderList.map((p) => p.Vendor_Price?.[0])
  //   const discounts = rerenderOrderList.map((p) => p.discount?.[0])
  //   const productPrices = rerenderOrderList.map((p) => p.ProductPrice?.[0])
  //   formikProps.setValues({
  //     ...formikProps.values,
  //     productCode: productCodes,
  //     vendorCode: vendorCodes,
  //     productName: productNames,
  //     productQuantity: quantities,
  //     vendorPrice: vendorPrices,
  //     productPrice: productPrices,
  //     productDiscount: discounts,
  //   })
  // }
  // refactor handleToEditTop
  const handleToEditTop = (formikProps) => {
    setIsEditingTop(true);
    const mapProperty = (property) => rerenderOrderList.map((p) => p[property]?.[0] || '');
    const valuesToUpdate = {
        productCode: mapProperty('ProductCode'),
        vendorCode: mapProperty('Vendor_PartNo'),
        productName: mapProperty('ProductName'),
        productQuantity: mapProperty('Quantity'),
        vendorPrice: mapProperty('Vendor_Price'),
        productPrice: mapProperty('ProductPrice'),
        productDiscount: mapProperty('discount'),
    }; 
    formikProps.setValues({
        ...formikProps.values,
        ...valuesToUpdate,
    });
};


  const handleFormValuesChange = (newValues) => {
    
    const newProduct = [newValues]
    setRerenderOrderList((rerenderOrderList) => [
      ...rerenderOrderList,
      ...newProduct,
    ])
  }

  const handleToSave = (index, formikProps) => {
    if (rerenderOrderList[index].hasOwnProperty('Vendor_Price')) {
      rerenderOrderList[index].ProductCode[0] = formikProps.values.productCode
      rerenderOrderList[index].Vendor_PartNo[0] = formikProps.values.vendorCode
      rerenderOrderList[index].ProductName[0] = formikProps.values.productName
      rerenderOrderList[index].Quantity[0] = formikProps.values.productQuantity
      rerenderOrderList[index].Vendor_Price[0] = formikProps.values.vendorPrice
      rerenderOrderList[index].ProductPrice[0] = formikProps.values.productPrice
      rerenderOrderList[index].TotalPrice[0] = formikProps.values.totalAmount
      setIsEditing(null)

    } else {
      alert(
        `Vendor Price is missing! or ${rerenderOrderList[index].ProductCode[0]} is Website order item`,
      )
      rerenderOrderList[index].ProductCode[0] = formikProps.values.productCode
      rerenderOrderList[index].ProductName[0] = formikProps.values.productName
      setIsEditing(null)
      return
    }
  }
  const handleToSaveTop = (formikProps) => {
    setIsEditingTop(false)
    // HERE WE SHOULD WHICH ITEMS HAVE hasOwnProperty('Vendor_Price') AND USE KIST THESE
    let foundMissingVendorPrice = false
    rerenderOrderList.forEach((item, index) => {
      if (!item || !item.hasOwnProperty('Vendor_Price')) {
        if (!foundMissingVendorPrice) {
          alert(
            'Vendor_Price is missing for an item!\n Please remove Website order Items from PO!',
          )
          foundMissingVendorPrice = true
        }
        return
      } else {
        if (!Array.isArray(item.ProductCode)) item.ProductCode = []
        if (!Array.isArray(item.ProductName)) item.ProductName = []
        if (!Array.isArray(item.Quantity)) item.Quantity = []
        if (!Array.isArray(item.discount)) item.discount = []

        item.ProductCode[0] = formikProps.values.productCode[index]
        item.Vendor_PartNo[0] = formikProps.values.vendorCode[index]
        item.ProductName[0] = formikProps.values.productName[index]
        item.Quantity[0] = formikProps.values.productQuantity[index]
        item.Vendor_Price[0] = formikProps?.values.vendorPrice[index]
        item.ProductPrice[0] = formikProps.values.productPrice[index]
        item.discount[0] = formikProps?.values.productDiscount[index]
        //console.log( formikProps.values.productPrice[index], '<<  formikProps.values.productPrice[index]');
      }
    })
  }

  const handleVendorAddressChange = (address) => {
    setVendorAddress(address)
  }
  const handleVendorShipInfoDescription = (vendor) => {
    setShipInfoDescription(vendor)
  }

  const [vendor, setVendor] = useState([])


  useEffect(() => {}, [removeOnclick])
  useEffect(() => {
    if (orderId.length < 5) {
      return;
    }
    
    const orderUrl = `http://localhost:5000/api/orders/${orderId}`;
    // const orderUrl = `https://xyzdisplays-po-app.onrender.com/api/orders/${orderId}`;
    
    axios
      .get(orderUrl)
      .then((orderResponse) => {
        //console.log(orderResponse, '<< orderResponse');
        const {
          xmldata: { Orders },
        } = orderResponse.data;
        console.log(Orders[0], '<< Orders');
        setOrderClientAddress(Orders[0])
        console.log(Orders[0].ShipAddress1[0],) //Orders[0].ShipCity[0], Orders[0].ShipCompanyName[0], Orders[0].ShipState[0], Orders[0].ShipPostalCode[0], Orders[0].ShipFirstName[0], Orders[0].ShipLastName[0], Orders[0].ShipPhoneNumber[0]);
        console.log(orderClientAddress);
        // Extracting Product Codes from Order Details
        const productCodes = Orders[0].OrderDetails.map((item) => item.ProductCode[0]);
        //console.log(productCodes, '<< productCodes');
        // Generating URLs for product requests
        const productUrls = productCodes.map((code) => `http://localhost:5000/api/products/${code}`);
        // const productUrls = productCodes.map((code) => `https://xyzdisplays-po-app.onrender.com/api/products/${code}`);

        //console.log(productUrls);
        // Fetching product data for all product codes in parallel
        Promise.all(productUrls.map((url) => axios.get(url)))
          .then((productResponses) => {
            //console.log(productResponses, '<< productResponses');
            // Extracting Vendor_PartNo and ProductCode from product responses
            const vendors = productResponses.map((response) => {
              //console.log(response);
              const {
                xmldata: { Products },
              } = response.data;
              
              return Products && Products.length > 0
                ? {
                    Vendor_PartNo: [Products[0].Vendor_PartNo[0]],
                    ProductCode: [Products[0].ProductCode[0]],
                  }
                : null;
            });

            // Filtering out null values from vendors
            const validVendors = vendors.filter((vendor) => vendor !== null);
  
            // Update the vendor state with valid vendor data
            setVendor((prevVendor) => {
              const updatedVendor = [...prevVendor, ...validVendors];
              return updatedVendor;
            });
  
            // Update order details with vendor codes
            const updatedOrderListWithVendorCodes = Orders[0].OrderDetails.map((order, index) => {
              const matchingVendor = validVendors.find((vendor) => vendor.ProductCode[0] === order.ProductCode[0]);
              return matchingVendor ? { ...order, ...matchingVendor } : order;
            });
            //console.log(updatedOrderListWithVendorCodes, 'updatedOrderListWithVendorCodes');
            setRerenderOrderList(updatedOrderListWithVendorCodes);
            // add discount
            updatedOrderListWithVendorCodes.map((order, index) => {
              VENDOR_LIST.map((vendor, index) => {
                const code = order.ProductCode.toString();
                if (code.toLowerCase().startsWith(vendor.code)) {
                  order.discount = [vendor.discount]
                  discountRenderFlag = true
                }
              })
            })
            // Set the updated order list state
            //setRerenderOrderList(updatedOrderListWithVendorCodes);
            //console.log(Orders[0], '>> Orders[0]');
            // Process further if needed
            // const shippingAddress1 = Orders[0].ShipAddress1[0];
            // const shipCity = Orders[0].ShipCity[0];
            // const shipCompanyName = Orders[0]?.ShipCompanyName[0];
            // const shipState = Orders[0].ShipState[0];
            // const shipCountry = Orders[0].ShipCountry[0]
            // const shipPostalCode = Orders[0].ShipPostalCode[0];
            // const shipName = Orders[0].ShipFirstName[0];
            // const shipLastName = Orders[0].ShipLastName[0];
            // const shipPhoneNumber = Orders[0].ShipPhoneNumber[0];
            const customFieldInHandDate = Orders[0].Custom_Field_InHand[0];
            const orderComments = Orders[0].Order_Comments[0];
            // console.log(shippingAddress1);
            // setShipCompanyName(shipCompanyName)
            // setShippingAddress1(shippingAddress1)
            // setShipCity(shipCity)
            // setShipState(shipState)
            // setShipCountry(shipCountry)
            // setShipPostalCode(shipPostalCode)
            // setShipName(shipName)
            // setShipLastName(shipLastName)
            // setShipPhoneNumber(shipPhoneNumber)
            setCustomFieldInHand(customFieldInHandDate)
            setOrderComments(orderComments)
          })
          .catch((productError) => {
            console.error('Error fetching product data:', productError);
          });
      })
      .catch((orderError) => {
        console.error('Error fetching order data:', orderError);
      });
  }, [orderId, discountRenderFlag]);
      // Log updated orderClientAddress
      useEffect(() => {
        console.log(orderClientAddress);
    }, [orderClientAddress]);
  return (
    <div className={styles.orderWrapper}>
      <OrderFreightForm
        handleToRemove={handleToRemove}
        handleToEdit={handleToEdit}
        handleToEditTop={handleToEditTop}
        isEditing={isEditing}
        isEditingTop={isEditingTop}
        handleToSave={handleToSave}
        handleToSaveTop={handleToSaveTop}
        setOrderId={setOrderId}
        // shipCompanyName={shipCompanyName}
        // shippingAddress1={shippingAddress1}
        // shipCity={shipCity}
        // shipCountry={shipCountry}
        // shipState={shipState}
        // shipPostalCode={shipPostalCode}
        // shipName={shipName}
        // shipLastName={shipLastName}
        // shipPhoneNumber={shipPhoneNumber}
        rerenderOrderList={rerenderOrderList}
        handleChangeInput={handleChangeInput}
        setVendorAddress={handleVendorAddressChange}
        setShipInfoDescription={handleVendorShipInfoDescription}
        setCustomFieldInHand={customFieldInHand}
        setOrderComments={orderComments}
        handleFormValuesChange={handleFormValuesChange}
        orderClientAddress={orderClientAddress}
      />
      {/* <AddProductPopUp
        rerenderOrderList={rerenderOrderList}
        onFormValuesChange={handleFormValuesChange}
      /> */}
    </div>
  )
}

export default OrderFreight
