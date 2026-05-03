import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import FormInput from "../../components/form-field/input-field/InputController";
import FormSelect from "../../components/form-field/input-select/SelectController";
import Textarea from "../../components/form-field/Textarea";
import useGetVersions from "../../../lib/hooks/use-get-versions";
import useCreateHeroSection from "../../../lib/hooks/use-create-hero-section";
import { EventVersionStatus } from "../../types/version";
import { useApiQuery } from "../../../lib";
import { useApiMutation } from "../../../lib/use-api-mutation";
import type { HeroSection } from "../../types/hero";
import toast from "react-hot-toast";

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
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: versionsData, isLoading: versionsLoading } = useGetVersions();
  const { execute: createHeroSection, isLoading: isCreating } = useCreateHeroSection();
  const { execute: updateHeroSection, isLoading: isUpdating } = useApiMutation("heroSectionDetail")<
    { data: HeroSection },
    Omit<HeroSection, "id" | "createdAt" | "updatedAt" | "createdById" | "modifiedById" | "flagshipEventVersion">
  >({ method: "PUT", invalidateRoutes: ["heroSections"] });

  const { data: editData } = useApiQuery("heroSectionDetail")<{ data: HeroSection }>({
    pathParams: { id: id! },
    enabled: isEditMode,
  });

  const versionOptions = versionsData?.data.items
    .filter((item) => item.status === EventVersionStatus.DRAFT)
    .map((item) => ({ label: item.version_name, value: item.id }));

  const methods = useForm<HeroFormValues>({
    defaultValues: {
      title: "",
      description: "",
      flagship_versions: "",
      add_cta: [{ cta_title: "", cta_url: "" }],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({ name: "add_cta", control });

  useEffect(() => {
    if (editData?.data) {
      const section = editData.data;
      reset({
        title: section.heading,
        description: section.paragraph,
        flagship_versions: section.flagshipEventVersionId,
        add_cta: section.extraOptions.add_cta,
      });
    }
  }, [editData, reset]);

  const isSubmitting = isCreating || isUpdating;

  const onSubmit = async (formData: HeroFormValues) => {
    const payload = {
      heading: formData.title,
      paragraph: formData.description,
      flagshipEventVersionId: formData.flagship_versions,
      extraOptions: { add_cta: formData.add_cta },
    };

    try {
      if (isEditMode) {
        await updateHeroSection(payload , { pathParams: { id: id! } });
        toast.success("Hero section updated successfully");
      } else {
        await createHeroSection(payload);
        toast.success("Hero section created successfully");
      }
      navigate(-1);
    } catch {
      toast.error(isEditMode ? "Failed to update hero section" : "Failed to create hero section");
    }
  };

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
        <h2 className="text-2xl font-bold">{isEditMode ? "Edit Hero Section" : "Fill below fields"}</h2>
        <p className="text-gray-400 mt-1">
          Provide the details below to {isEditMode ? "update the" : "add new"} hero content. Please ensure all
          information is accurate before submitting the form.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <FormInput
                name="title"
                label="Title"
                placeholder="Enter hero title"
                rules={{ required: "Title is required" }}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Textarea
                label="Description"
                placeholder="Enter hero description"
                {...register("description", { required: "Description is required" })}
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
                    <FormInput
                      name={`add_cta.${index}.cta_title`}
                      label="CTA Title"
                      placeholder="e.g. Learn More"
                      rules={{ required: "CTA Title is required" }}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <FormInput
                      name={`add_cta.${index}.cta_url`}
                      label="CTA URL"
                      placeholder="e.g. /about"
                      rules={{ required: "CTA URL is required" }}
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

          <div className="col-span-1">
            <FormSelect
              name="flagship_versions"
              label="Flagship Version"
              options={versionOptions ?? []}
              rules={{ required: "Please select a flagship version" }}
              isLoading={versionsLoading}
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
              disabled={isSubmitting}
              className="px-6 py-2 rounded-md bg-admin-secondary text-white hover:bg-admin-secondary/80 focus:ring-2 focus:ring-offset-2 focus:ring-offset-admin-primary focus:ring-admin-secondary transition-colors font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Save Default"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
