import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, Upload, X } from "lucide-react";
import { useApiMutation } from "../../../lib/use-api-mutation";
import { useApiQuery } from "../../../lib/use-api-query";
import {
  EventVersionStatus,
  type FlagshipEventVersion,
} from "../../types/version";
import toast from "react-hot-toast";

// Import your custom input components
import Input from "../../components/input/Input";
import Select from "../../components/input/Select";
import FormDatePicker from "../../../shared/design-components/DatePicker/FormDatePicker";

interface VersionFormValues {
  version_name: string;
  slug: string;
  version_number: string;
  start_date: string;
  end_date: string;
  status: EventVersionStatus;
  is_current: boolean;
  tagline?: string;
}

export default function VersionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // usefull for edit mode and populate the form value with it
  const { data: existingData, isLoading: isFetching } = useApiQuery(
    "versionDetail",
  )<{ data: FlagshipEventVersion }>({
    pathParams: { id: id as string },
    config: { enabled: isEdit },
  } as any);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<VersionFormValues>({
    defaultValues: {
      status: EventVersionStatus.DRAFT,
      is_current: false,
    },
  });

  useEffect(() => {
    if (existingData?.data) {
      const version = existingData.data;
      reset({
        version_name: version.version_name,
        slug: version.slug,
        version_number: String(version.version_number),
        start_date: version.start_date.split("T")[0],
        end_date: version.end_date.split("T")[0],
        status: version.status,
        is_current: version.is_current,
      });
      if (version.logo) {
        setLogoPreview(version.logo);
      }
    }
  }, [existingData, reset]);

  // create a new version
  const { execute: createVersion, isLoading: isCreating } = useApiMutation(
    "versions",
  )<FlagshipEventVersion, FormData>({
    method: "POST",
    onSuccess: () => {
      toast.success("Version created successfully");
      navigate("/admin/home/versions");
    },
    onError: (err) => toast.error(err.message || "Failed to create version"),
  });

  // update the existing version
  const { execute: updateVersion, isLoading: isUpdating } = useApiMutation(
    "versionDetail",
  )<FlagshipEventVersion, FormData>({
    method: "PATCH",
    onSuccess: () => {
      toast.success("Version updated successfully");
      navigate("/admin/versions");
    },
    onError: (err) => toast.error(err.message || "Failed to update version"),
  });

  const onSubmit = async (data: VersionFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    if (isEdit) {
      await updateVersion(formData, {
        pathParams: { id: id as string },
      } as any);
    } else {
      await createVersion(formData);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const statusOptions = [
    { label: "Draft", value: EventVersionStatus.DRAFT },
    { label: "Active", value: EventVersionStatus.ACTIVE },
    { label: "Archived", value: EventVersionStatus.ARCHIVED },
  ];

  const isLoading = isCreating || isUpdating || isFetching;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          &larr; Back
        </button>
        <h1 className="text-xl font-bold text-white">
          {isEdit ? "Edit Version" : "Create New Version"}
        </h1>
      </div>

      <div className="bg-admin-primary border border-gray-800 rounded-lg p-6 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Version Name"
              placeholder="ICT Meetup 2026"
              error={errors.version_name?.message}
              {...register("version_name", {
                required: "Version name is required",
              })}
            />

            <Input
              label="Slug"
              placeholder="ict-meetup-2026"
              error={errors.slug?.message}
              {...register("slug", { required: "Slug is required" })}
            />

            <Input
              label="Version Number"
              type="number"
              step="0.1"
              placeholder="1.0"
              error={errors.version_number?.message}
              {...register("version_number", {
                required: "Version number is required",
              })}
            />

            <Select
              label="Status"
              options={statusOptions}
              error={errors.status?.message}
              {...register("status")}
            />

            <FormDatePicker
              control={control}
              name="start_date"
              label="Start Date"
              rules={{ required: "Start date is required" }}
              error={errors.start_date?.message}
            />

            <FormDatePicker
              control={control}
              name="end_date"
              label="End Date"
              rules={{ required: "End date is required" }}
              error={errors.end_date?.message}
            />
          </div>

          {/* Logo Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Event Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 bg-[#02111F] border border-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Upload className="text-gray-600" size={24} />
                )}
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview(null);
                      setLogoFile(null);
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              <label className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
                Choose Logo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_current"
              {...register("is_current")}
              className="w-4 h-4 rounded border-gray-800 bg-[#02111F] text-admin-secondary focus:ring-admin-secondary"
            />
            <label
              htmlFor="is_current"
              className="text-sm text-gray-300 cursor-pointer"
            >
              Mark as the current version
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-admin-secondary hover:bg-admin-secondary/80 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span>{isEdit ? "Update Version" : "Create Version"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
