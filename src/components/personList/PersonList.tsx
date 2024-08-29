import Link from "next/link";
import { useStore } from "@deps/store/store";

const PersonList = () => {
  const { people } = useStore();
  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>
          <Link href={`/person/${person.id}`}>{person.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PersonList;
