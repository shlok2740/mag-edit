export default async function StatusService(url, apiToken) {
  const pollInterval = 2000; // 2 seconds
  const maxAttempts = 30; // 60 seconds timeout

  for (let i = 0; i < maxAttempts; i++) {
    const resp = await fetch(url, {
      method: "GET",
      headers: { api_token: apiToken },
    });

    if (!resp.ok) {
      throw new Error(`Status Check Failed: ${resp.statusText}`);
    }

    const data = await resp.json();

    if (data.status === "COMPLETED") {
      return data.result.image_url;
    } else if (data.status === "FAILED") {
      throw new Error("Image generation failed.");
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error("Image generation timed out.");
}
