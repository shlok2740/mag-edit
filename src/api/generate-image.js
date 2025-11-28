export default async function GenerateImage(prompt, images, apiToken) {
  const resp = await fetch(
    `https://engine.prod.bria-api.com/v2/image/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_token: apiToken,
      },
      body: JSON.stringify({
        prompt: prompt,
        images: images,
        sync: false, // Ensure async mode
      }),
    }
  );

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${resp.statusText}`);
  }

  const data = await resp.json();
  return data;
}
