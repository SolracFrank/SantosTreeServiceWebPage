import type { ReviewSubmission } from "@/types/review-submission";

import {
  hasSupabaseConfig,
  supabase,
} from "../supabase/client";

export interface SubmitTestimonialResponse {
  ok: boolean;
  message: string;

  fields?: Record<string, string>;
}

type FunctionError = {
  message?: string;
  context?: unknown;
};

async function getFunctionErrorMessage(
  error: unknown,
): Promise<string> {
  const functionError = error as FunctionError;

  if (functionError.context instanceof Response) {
    const responseBody = (await functionError.context
      .clone()
      .json()
      .catch(() => null)) as SubmitTestimonialResponse | null;

    if (responseBody?.message) {
      const fieldMessages = responseBody.fields
        ? Object.entries(responseBody.fields).map(
            ([field, message]) => `${field}: ${message}`,
          )
        : [];

      return [responseBody.message, ...fieldMessages].join(" ");
    }
  }

  return functionError.message ?? "The review service could not be reached.";
}

export async function submitTestimonial(
  submission: ReviewSubmission,
): Promise<SubmitTestimonialResponse> {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error(
      "Supabase is not configured.",
    );
  }

  const { data, error } =
    await supabase.functions.invoke<SubmitTestimonialResponse>(
      "submit-review",
      {
        body: submission,
      },
    );

  if (error) {
    console.error(
      "submit-review invocation failed:",
      error,
    );

    throw new Error(await getFunctionErrorMessage(error));
  }

  if (!data?.ok) {
    throw new Error(
      data?.message ??
        "The review was rejected.",
    );
  }

  return data;
}
