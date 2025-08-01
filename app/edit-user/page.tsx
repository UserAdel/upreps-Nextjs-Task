import { Suspense } from "react";
import EditUserForm from "./_components/editUserForm";
import skeleton from "./_components/skeleton";

export default function Page() {
  return (
    <Suspense fallback={skeleton()}>
      <EditUserForm />
    </Suspense>
  );
}
