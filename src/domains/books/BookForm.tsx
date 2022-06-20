import { ChangeEventHandler, FormEventHandler } from "react";
import { FieldSet } from "../../ui/forms/FieldSet";
import { InputField } from "../../ui/forms/InputField";
import { PrimaryButton } from "../../ui/forms/NiceButton";
import { TextField } from "../../ui/forms/TextField";
import { VStack } from "../../ui/util/VStack";
import { Book, BookCallback } from "./Book";

export interface BookFormProps {
  book: Book;
  disabled: boolean;
  onChange: BookCallback;
  onSubmit: BookCallback;
}

export function BookForm({ book, disabled, onChange, onSubmit }: BookFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(book);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "title") {
      onChange({ ...book, title: value });
    } else if (name === "description") {
      onChange({ ...book, description: value });
    } else {
      throw new Error(`Unknown input name: ${name || "(empty)"}`);
    }
  };

  return (
    <form className="BookForm" onSubmit={onFormSubmit}>
      <FieldSet disabled={disabled}>
        <VStack>
          <InputField
            label="Title"
            name="title"
            onChange={onInputChange}
            required
            value={book.title}
          />
          <TextField
            label="Description"
            name="description"
            onChange={onInputChange}
            value={book.description}
          />
          <PrimaryButton>OK</PrimaryButton>
        </VStack>
      </FieldSet>
    </form>
  );
}
