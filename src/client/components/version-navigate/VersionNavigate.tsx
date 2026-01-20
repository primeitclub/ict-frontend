import { OLD_VERSIONS } from "../../../routes/utils/route-type";
import { useVersion } from "../../../routes/VersionContext";

export default function VersionNavigate() {
  const { navigateToVersion } = useVersion();

  return (
    <div className="fixed top-[50%] right-5">
      <div className="flex flex-col gap-2">
        {!!OLD_VERSIONS &&
          OLD_VERSIONS.map((item) => (
            <button onClick={() => navigateToVersion(item)}>{item}</button>
          ))}
      </div>
    </div>
  );
}
