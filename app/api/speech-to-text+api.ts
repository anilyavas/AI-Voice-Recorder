import OpenAI from 'openai';

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error(
    'Missing OpenAI API Key. Please set OPENAI_API_KEY in your .env file'
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    const openai = new OpenAI({ apiKey: API_KEY });

    const response = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    });
    return Response.json(response.text);
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to transcript' });
  }
}
