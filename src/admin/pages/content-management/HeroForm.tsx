import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import Input from "../../components/input/Input";
import Textarea from "../../components/input/Textarea";
import Select from "../../components/input/Select";
import { Plus, Trash2 } from "lucide-react";

type HeroFormValues = {
  title: string;
  description: string;
  flagship_versions: string;
  add_cta: {
    cta_title: string;
    cta_url: string;
  }[];
};

export default function HeroForm() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroFormValues>({
    defaultValues: {
      title: "",
      description: "",
      flagship_versions: "",
      add_cta: [{ cta_title: "", cta_url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "add_cta",
    control,
  });

  const onSubmit = (data: HeroFormValues) => {
    console.log("Submitted Hero Data:", data);
    // Proceed to save data (e.g. via an API call)
  };

  const flagshipOptions = [
    { label: "Edition 2024", value: "2024" },
    { label: "Edition 2025", value: "2025" },
    { label: "Edition 2026", value: "2026" },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          &larr; Back
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold">Fill below fields</h2>
        <p className="text-gray-400 mt-1">
          Provide the details below to add new hero content. Please ensure all
          information is accurate before submitting the form.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-1 md:col-span-2">
            <Input
              label="Title"
              placeholder="Enter hero title"
              {...register("title", { required: "Title is required" })}
              error={errors.title?.message}
            />
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <Textarea
              label="Description"
              placeholder="Enter hero description"
              {...register("description", {
                required: "Description is required",
              })}
              error={errors.description?.message}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Call to Action Buttons (CTA)
            </label>
            <button
              type="button"
              onClick={() => append({ cta_title: "", cta_url: "" })}
              className="flex items-center space-x-1 text-sm text-admin-secondary hover:text-white transition-colors"
            >
              <Plus size={16} />
              <span>Add CTA</span>
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start md:items-center gap-4 flex-col md:flex-row bg-[#02111F]/30 p-4 rounded-lg border border-gray-800"
              >
                <div className="flex-1 w-full">
                  <Input
                    label="CTA Title"
                    placeholder="e.g. Learn More"
                    {...register(`add_cta.${index}.cta_title` as const, {
                      required: "CTA Title is required",
                    })}
                    error={errors.add_cta?.[index]?.cta_title?.message}
                  />
                </div>
                <div className="flex-1 w-full">
                  <Input
                    label="CTA URL"
                    placeholder="e.g. /about"
                    {...register(`add_cta.${index}.cta_url` as const, {
                      required: "CTA URL is required",
                    })}
                    error={errors.add_cta?.[index]?.cta_url?.message}
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-6 p-2.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors self-end"
                    aria-label="Remove CTA"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Flagship Version */}
        <div className="col-span-1">
          <Select
            label="Flagship Version"
            options={flagshipOptions}
            {...register("flagship_versions", {
              required: "Please select a flagship version",
            })}
            error={errors.flagship_versions?.message}
          />
        </div>

        <div className="pt-6 flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-md border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-admin-secondary text-white hover:bg-admin-secondary/80 focus:ring-2 focus:ring-offset-2 focus:ring-offset-admin-primary focus:ring-admin-secondary transition-colors font-medium"
          >
            Save Default
          </button>
        </div>
      </form>
    </div>
  );
}
