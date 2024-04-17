"use server";

export async function create() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "done create action";
}
