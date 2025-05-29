import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const CheckoutContainer = styled.div`
  background-color: var(--color-very-light-gray);
  padding: var(--spacing-4) 0 var(--spacing-7);
  
  @media (max-width: 768px) {
    padding: var(--spacing-3) 0 var(--spacing-5);
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 0.9375rem;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  margin-bottom: var(--spacing-4);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-3);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 8px;
  padding: var(--spacing-4);
`;

const FormTitle = styled.h3`
  margin-bottom: var(--spacing-4);
`;

const FormSubtitle = styled.h6`
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  font-size: 0.8125rem;
`;

const FormSection = styled.div`
  margin-bottom: var(--spacing-4);
`;

const FormFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-3);
  grid-column: ${props => props.$fullWidth ? '1 / -1' : 'auto'};
`;

const FormLabel = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FormInput = styled(Field)`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.$error ? 'var(--color-primary)' : 'var(--color-light-gray)'};
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-black);
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const FormError = styled.div`
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 500;
`;

const RadioGroup = styled.div`
  margin-top: var(--spacing-2);
`;

const RadioOption = styled.div`
  border: 1px solid ${props => props.$isSelected ? 'var(--color-primary)' : 'var(--color-light-gray)'};
  border-radius: 8px;
  padding: var(--spacing-2);
  margin-bottom: var(--spacing-2);
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    border-color: var(--color-primary);
  }
`;

const RadioInput = styled.input`
  margin-right: var(--spacing-2);
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1px solid var(--color-light-gray);
  border-radius: 50%;
  position: relative;
  
  &:checked {
    border-color: var(--color-primary);
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color-primary);
    }
  }
`;

const RadioLabel = styled.label`
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
`;

const SummaryContainer = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 8px;
  padding: var(--spacing-4);
  align-self: start;
`;

const SummaryTitle = styled.h6`
  margin-bottom: var(--spacing-3);
`;

const SummaryItems = styled.ul`
  margin-bottom: var(--spacing-4);
`;

const SummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3);
`;

const SummaryItemImage = styled.div`
  width: 64px;
  height: 64px;
  background-color: var(--color-light-gray);
  border-radius: 8px;
  overflow: hidden;
  margin-right: var(--spacing-2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SummaryItemInfo = styled.div`
  flex: 1;
`;

const SummaryItemName = styled.h6`
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
`;

const SummaryItemPrice = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
`;

const SummaryItemQuantity = styled.p`
  font-size: 0.9375rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-1);
`;

const SummaryLabel = styled.p`
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
`;

const SummaryValue = styled.p`
  font-weight: 700;
  
  &.total {
    color: var(--color-primary);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: var(--spacing-2);
  margin-top: var(--spacing-4);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
  
  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2);
`;

const ModalContainer = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 8px;
  padding: var(--spacing-4);
  max-width: 540px;
  width: 100%;
  
  @media (max-width: 640px) {
    padding: var(--spacing-3);
  }
`;

const ConfirmationIcon = styled.div`
  margin-bottom: var(--spacing-3);
`;

const ConfirmationTitle = styled.h3`
  margin-bottom: var(--spacing-3);
`;

const ConfirmationMessage = styled.p`
  margin-bottom: var(--spacing-4);
`;

const OrderSummary = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  margin-bottom: var(--spacing-4);
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const OrderItems = styled.div`
  background-color: var(--color-light-gray);
  padding: var(--spacing-3);
  
  h6 {
    margin-bottom: var(--spacing-2);
  }
  
  hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    margin: var(--spacing-2) 0;
  }
  
  p {
    text-align: center;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const OrderTotal = styled.div`
  background-color: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  p {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-bottom: var(--spacing-1);
  }
  
  h6 {
    color: var(--color-white);
  }
`;

const BackHomeButton = styled.button`
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: var(--spacing-2);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),
  eMoneyNumber: Yup.string().when('paymentMethod', {
    is: 'e-money',
    then: schema => schema.required('Required')
  }),
  eMoneyPin: Yup.string().when('paymentMethod', {
    is: 'e-money',
    then: schema => schema.required('Required')
  })
});

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const shipping = 50;
  const vat = Math.round(cartTotal * 0.2);
  const grandTotal = cartTotal + shipping;
  
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
    eMoneyNumber: '',
    eMoneyPin: ''
  };
  
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setOrderDetails({
        ...values,
        items: cart,
        total: cartTotal,
        shipping,
        vat,
        grandTotal
      });
      setOrderComplete(true);
      clearCart();
      setSubmitting(false);
    }, 1500);
  };
  
  const handleBackToHome = () => {
    setOrderComplete(false);
    navigate('/');
  };
  
  if (cart.length === 0 && !orderComplete) {
    navigate('/');
    return null;
  }
  
  return (
    <CheckoutContainer>
      <div className="container">
        <BackButton onClick={handleGoBack}>Go Back</BackButton>
        
        <CheckoutGrid>
          <CheckoutForm
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormTitle>Checkout</FormTitle>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form>
                  <FormSection>
                    <FormSubtitle>Billing Details</FormSubtitle>
                    <FormFields>
                      <FormGroup>
                        <FormLabel htmlFor="name">
                          Name
                          {errors.name && touched.name && (
                            <FormError>{errors.name}</FormError>
                          )}
                        </FormLabel>
                        <FormInput 
                          type="text" 
                          id="name" 
                          name="name" 
                          placeholder="Alexei Ward" 
                          $error={errors.name && touched.name}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel htmlFor="email">
                          Email Address
                          {errors.email && touched.email && (
                            <FormError>{errors.email}</FormError>
                          )}
                        </FormLabel>
                        <FormInput 
                          type="email" 
                          id="email" 
                          name="email" 
                          placeholder="alexei@mail.com" 
                          $error={errors.email && touched.email}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel htmlFor="phone">
                          Phone Number
                          {errors.phone && touched.phone && (
                            <FormError>{errors.phone}</FormError>
                          )}
                        </FormLabel>
                        <FormInput 
                          type="text" 
                          id="phone" 
                          name="phone" 
                          placeholder="+1 202-555-0136" 
                          $error={errors.phone && touched.phone}
                        />
                      </FormGroup>
                    </FormFields>
                  </FormSection>
                  
                  <FormSection>
                    <FormSubtitle>Shipping Info</FormSubtitle>
                    <FormFields>
                      <FormGroup $fullWidth>
                        <FormLabel htmlFor="address">
                          Address
                          {errors.address && touched.address && (
                            <FormError>{errors.address}</FormError>
                          )}
                        </FormLabel>
                        <FormInput 
                          type="text" 
                          id="address" 
                          name="address" 
                          placeholder="1137 Williams Avenue" 
                          $error={errors.address && touched.address}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel htmlFor="zipCode">
                          ZIP Code
                          {errors.zipCode && touched.zipCode && (
                            <FormError>{errors.zipCode}</FormError>
                          )}
                        </FormLabel>
                        <FormInput 
                          type="text" 
                          id="zipCode" 
                          name="zipCode" 
                          placeholder="10001" 
                          $error={errors.zipCode && touched.zipCode}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel htmlFor="city">
                          City
                          {errors.city && touched.city && (
                            <FormError>{errors.city}</FormError>
                          )}
                        </FormLabel>
                        <FormInput 
                          type="text" 
                          id="city" 
                          name="city" 
                          placeholder="New York" 
                          $error={errors.city && touched.city}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel htmlFor="country">
                          Country
                          {errors.country && touched.country && (
                            <FormError>{errors.country}</FormError>
                          )}
                        </FormLabel>
                        <FormInput 
                          type="text" 
                          id="country" 
                          name="country" 
                          placeholder="United States" 
                          $error={errors.country && touched.country}
                        />
                      </FormGroup>
                    </FormFields>
                  </FormSection>
                  
                  <FormSection>
                    <FormSubtitle>Payment Details</FormSubtitle>
                    <FormFields>
                      <FormGroup>
                        <FormLabel>Payment Method</FormLabel>
                      </FormGroup>
                      
                      <FormGroup>
                        <RadioGroup>
                          <RadioOption 
                            $isSelected={values.paymentMethod === 'e-money'}
                            onClick={() => {
                              const field = document.querySelector('input[name="paymentMethod"][value="e-money"]');
                              field.checked = true;
                              field.dispatchEvent(new Event('change', { bubbles: true }));
                            }}
                          >
                            <RadioInput 
                              type="radio" 
                              id="e-money" 
                              name="paymentMethod" 
                              value="e-money" 
                            />
                            <RadioLabel htmlFor="e-money">e-Money</RadioLabel>
                          </RadioOption>
                          
                          <RadioOption 
                            $isSelected={values.paymentMethod === 'cash'}
                            onClick={() => {
                              const field = document.querySelector('input[name="paymentMethod"][value="cash"]');
                              field.checked = true;
                              field.dispatchEvent(new Event('change', { bubbles: true }));
                            }}
                          >
                            <RadioInput 
                              type="radio" 
                              id="cash" 
                              name="paymentMethod" 
                              value="cash" 
                            />
                            <RadioLabel htmlFor="cash">Cash on Delivery</RadioLabel>
                          </RadioOption>
                        </RadioGroup>
                      </FormGroup>
                      
                      {values.paymentMethod === 'e-money' && (
                        <>
                          <FormGroup>
                            <FormLabel htmlFor="eMoneyNumber">
                              e-Money Number
                              {errors.eMoneyNumber && touched.eMoneyNumber && (
                                <FormError>{errors.eMoneyNumber}</FormError>
                              )}
                            </FormLabel>
                            <FormInput 
                              type="text" 
                              id="eMoneyNumber" 
                              name="eMoneyNumber" 
                              placeholder="238521993" 
                              $error={errors.eMoneyNumber && touched.eMoneyNumber}
                            />
                          </FormGroup>
                          
                          <FormGroup>
                            <FormLabel htmlFor="eMoneyPin">
                              e-Money PIN
                              {errors.eMoneyPin && touched.eMoneyPin && (
                                <FormError>{errors.eMoneyPin}</FormError>
                              )}
                            </FormLabel>
                            <FormInput 
                              type="text" 
                              id="eMoneyPin" 
                              name="eMoneyPin" 
                              placeholder="6891" 
                              $error={errors.eMoneyPin && touched.eMoneyPin}
                            />
                          </FormGroup>
                        </>
                      )}
                      
                      {values.paymentMethod === 'cash' && (
                        <FormGroup $fullWidth>
                          <p style={{ color: 'rgba(0, 0, 0, 0.5)', margin: '1rem 0' }}>
                            The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                          </p>
                        </FormGroup>
                      )}
                    </FormFields>
                  </FormSection>
                  
                </Form>
              )}
            </Formik>
          </CheckoutForm>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isValid, isSubmitting }) => (
              <SummaryContainer
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SummaryTitle>Summary</SummaryTitle>
                
                <SummaryItems>
                  {cart.map(item => {
                    const shortName = item.name?.split(' ').slice(0, 2).join(' ');
                    
                    return (
                      <SummaryItem key={item.id}>
                        <SummaryItemImage>
                          <img src={item.image} alt={item.name} />
                        </SummaryItemImage>
                        
                        <SummaryItemInfo>
                          <SummaryItemName>{shortName}</SummaryItemName>
                          <SummaryItemPrice>{formatPrice(item.price)}</SummaryItemPrice>
                        </SummaryItemInfo>
                        
                        <SummaryItemQuantity>x{item.quantity}</SummaryItemQuantity>
                      </SummaryItem>
                    );
                  })}
                </SummaryItems>
                
                <SummaryRow>
                  <SummaryLabel>Total</SummaryLabel>
                  <SummaryValue>{formatPrice(cartTotal)}</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>Shipping</SummaryLabel>
                  <SummaryValue>{formatPrice(shipping)}</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>VAT (Included)</SummaryLabel>
                  <SummaryValue>{formatPrice(vat)}</SummaryValue>
                </SummaryRow>
                
                <SummaryRow style={{ marginTop: 'var(--spacing-3)' }}>
                  <SummaryLabel>Grand Total</SummaryLabel>
                  <SummaryValue className="total">{formatPrice(grandTotal)}</SummaryValue>
                </SummaryRow>
                
                <SubmitButton
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Processing...' : 'Continue & Pay'}
                </SubmitButton>
              </SummaryContainer>
            )}
          </Formik>
        </CheckoutGrid>
        
        <AnimatePresence>
          {orderComplete && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContainer
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
              >
                <ConfirmationIcon>
                  <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">
                      <circle fill="#D87D4A" cx="32" cy="32" r="32"/>
                      <path stroke="#FFF" strokeWidth="4" d="m20.754 33.333 6.751 6.751 15.804-15.803"/>
                    </g>
                  </svg>
                </ConfirmationIcon>
                
                <ConfirmationTitle>Woohoo! Purchase Complete 🎉</ConfirmationTitle>
                <ConfirmationMessage>Thanks for shopping with us. Enjoy your new stuff! (This is just a mock checkout.)</ConfirmationMessage>
                
                <OrderSummary>
                  <OrderItems>
                    <SummaryItem>
                      <SummaryItemImage>
                        <img src={orderDetails.items[0].image} alt={orderDetails.items[0].name} />
                      </SummaryItemImage>
                      
                      <SummaryItemInfo>
                        <SummaryItemName>{orderDetails.items[0].name.split(' ').slice(0, 2).join(' ')}</SummaryItemName>
                        <SummaryItemPrice>{formatPrice(orderDetails.items[0].price)}</SummaryItemPrice>
                      </SummaryItemInfo>
                      
                      <SummaryItemQuantity>x{orderDetails.items[0].quantity}</SummaryItemQuantity>
                    </SummaryItem>
                    
                    {orderDetails.items.length > 1 && (
                      <>
                        <hr />
                        <p>and {orderDetails.items.length - 1} other item(s)</p>
                      </>
                    )}
                  </OrderItems>
                  
                  <OrderTotal>
                    <p>Grand Total</p>
                    <h6>{formatPrice(orderDetails.grandTotal)}</h6>
                  </OrderTotal>
                </OrderSummary>
                
                <BackHomeButton onClick={handleBackToHome}>
                  Back to Home
                </BackHomeButton>
              </ModalContainer>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </div>
    </CheckoutContainer>
  );
}

export default Checkout;