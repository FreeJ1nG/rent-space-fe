interface TypeBadgeProps {
  type: "OPEN_SPACE" | "CLOSED_SPACE";
}

const spaceTypeMap: Map<String, String> = new Map();
spaceTypeMap.set("OPEN_SPACE", "Open Space");
spaceTypeMap.set("CLOSED_SPACE", "Closed Space");

export default function TypeBadge(props: TypeBadgeProps) {
  const isOpenSpace = props.type === "OPEN_SPACE";
  return (
    <>
      {isOpenSpace ? (
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-1 px-1 py-1 rounded dark:bg-green-900 dark:text-green-300">
          Open Space
        </span>
      ) : (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-1 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
          Closed Space
        </span>
      )}
    </>
  );
}
