import React, { FC, FormEvent, useState, useRef } from "react";
import Input from "../../UI/Input/Input";
import "./MealItemForm.css";

const MealItemForm: FC<{ onAddToCart: (x: number) => void; id: number }> = ({
  onAddToCart,
  id,
}) => {
  const [amountIsValid, setAmountIsValid] = useState<boolean>(true);
  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amountInputRef.current) {
      const enteredAmount = amountInputRef.current.value;
      if (enteredAmount) {
        const enteredAmountNumber = +enteredAmount;
        if (
          enteredAmount.trim().length === 0 ||
          enteredAmountNumber < 1 ||
          enteredAmountNumber > 5
        ) {
          setAmountIsValid(false);
          return;
        }

        onAddToCart(enteredAmountNumber);
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: id.toString(),
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
