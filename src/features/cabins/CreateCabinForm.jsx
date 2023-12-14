import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "../../hooks/hooksCabin/useCreateCabin";
import useUpdateCabin from "../../hooks/hooksCabin/useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isEditing } = useUpdateCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const isProcessing = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      return updateCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "model" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isProcessing}
          {...register("name", { required: "Name is Required" })}
        />
      </FormRow>
      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isProcessing}
          {...register("maxCapacity", {
            required: "Please provide capacity of cabin",
            min: { value: 1, message: "Capacity Should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isProcessing}
          {...register("regularPrice", {
            required: "Need Cabin price",
            min: { value: 1, message: "price Should be greater the 1" },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isProcessing}
          defaultValue={0}
          {...register("discount", {
            validate: (curr) =>
              +curr <= +getValues().regularPrice ||
              "Discount should be less the regular price",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isProcessing}
          {...register("description", {
            required: "Please write description of the cabin",
          })}
        />
      </FormRow>
      <FormRow label="Image">
        <FileInput
          disabled={isProcessing}
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required!",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isProcessing}
          variation="secondary"
          type="reset"
          onClick={() => {
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isProcessing}>
          {isEditSession ? "Update Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
