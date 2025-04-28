import { redirect } from "next/navigation";

export default function BlogPage() {
  // Immediately redirect to the external blog URL
  redirect("https://world.hey.com/echi/");

  // // Return null or a simple loading message, as the redirect happens server-side
  // // This part might not even be rendered depending on how Next.js handles the redirect.
  // return null;
}
