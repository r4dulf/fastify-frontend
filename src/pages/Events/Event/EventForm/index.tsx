import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./index.scss";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
});

export type EventFormValues = z.infer<typeof eventSchema>;

type Props = {
  defaultValues?: Partial<EventFormValues>;
  onSubmit: (data: EventFormValues) => void;
  onCancel: () => void;
  isEditing?: boolean;
};

export const EventForm = ({
  defaultValues,
  isEditing = false,
  onSubmit,
  onCancel,
}: Props) => {
  const formattedDate = new Date(defaultValues?.date || Date.now())
    .toISOString()
    .slice(0, 16);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ...defaultValues,
      date: formattedDate,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>

        <Input type="text" {...register("title")} />

        {errors.title && (
          <span style={{ color: "red" }}>{errors.title.message}</span>
        )}
      </div>

      <div>
        <label>Description</label>

        <textarea {...register("description")} />

        {errors.description && (
          <span style={{ color: "red" }}>{errors.description.message}</span>
        )}
      </div>

      <div>
        <label>Date</label>

        <Input type="datetime-local" {...register("date")} />

        {errors.date && (
          <span style={{ color: "red" }}>{errors.date.message}</span>
        )}
      </div>

      <div>
        <label>Location</label>

        <Input type="text" {...register("location")} />

        {errors.location && (
          <span style={{ color: "red" }}>{errors.location.message}</span>
        )}
      </div>

      <Button type="submit">
        {isEditing ? "Update Event" : "Create Event"}
      </Button>

      <Button type="button" kind="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
};
