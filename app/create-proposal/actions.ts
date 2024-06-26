"use server";

import { createPullRequest } from "@/app/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitProposal(formData: FormData) {
  try {
    // Get all deliverables and append them to commit md file with description
    let content = formData.get("description") as string;
    let deliverableNumber = 0;
    while (formData.has(`deliverable-${deliverableNumber}`)) {
      content += `\n\n### Deliverable ${
        deliverableNumber + 1
      }\n\n${formData.get(`deliverable-${deliverableNumber}`)}`;
      deliverableNumber++;
    }

    // Create a pull request
    await createPullRequest({
      newFileContent: content,
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
