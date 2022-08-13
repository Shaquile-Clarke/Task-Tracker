import { useRouter } from "next/router";
import EditForm from "../../../components/EditForm";

export default function Edit() {
  const router = useRouter();
  const todoId = router.query.todoId;

  return <EditForm todoId={todoId} />;
}
