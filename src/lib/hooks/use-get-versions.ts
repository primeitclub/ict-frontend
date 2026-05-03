import { useApiQuery } from "../use-api-query"

interface VersionItem {
  createdAt: string;
  createdById: string;
  end_date: string;
  id: string;
  is_current: boolean;
  logo: null;
  modifiedById: string;
  slug: string;
  start_date: string;
  status: string;
  updatedAt: string;
  version_name: string;
  version_number: string;
}

export default function useGetVersions(){

    const data = useApiQuery("versions")<{
        data:{
            items:VersionItem[]
        }
    }>();

    return {...data}

}