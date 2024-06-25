"use server";

import { createPullRequest } from "@/app/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitProposal(formData: FormData) {
  try {
    await createPullRequest({
      newFileContent: formData.get("description") as string,
      pullRequestDescription: formData.get("mri") as string,
      pullRequestTitle: formData.get("title") as string,
    });

    revalidatePath("/");
  } catch (e) {
    console.log(e);
  } finally {
    redirect("/");
  }
}
