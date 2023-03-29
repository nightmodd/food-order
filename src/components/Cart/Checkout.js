import useInput from "../../hooks/use-input";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  let formIsValid = false;

  //for inputs validation
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredPostal,
    valueIsValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostalInput,
  } = useInput((value) => value.trim().length === 5);

  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    //send data to server
    props.onOrder({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });

    //reset inputs
    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  };

  //for inputs styling depending on validation
  const nameInputClasses = nameHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  const streetInputClasses = streetHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  const postalInputClasses = postalHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  const cityInputClasses = cityHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  return (
    <form className={styles.form} onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
      </div>

      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
      </div>

      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          id="postal"
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
          value={enteredPostal}
        />
      </div>

      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={formIsValid ? false : true}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
