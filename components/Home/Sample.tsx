import styles from "./Sample.module.css";
import Container from "../UI/Container";

export default function Sample() {
  return (
    <div>
      <Container>
        <div className="rounded-xl bg-dark-gray bg-opacity-80 p-10 space-y-4">
          Sample
        </div>
      </Container>
    </div>
  );
}
