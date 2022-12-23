const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  // Promt values
  const beforeP1 = `Develop a strategy for what steps to take next in order to achieve a goal. \n What do you want to do?`;
  const beforeP2 = `What is your intended goal/result?`;
  const afterP = `Expand into a detailed sequential numbered list of what steps to take to achieve that goal:`;
  const breakPoint = `\n\n'''\n\n`;

  // Construct the prompt
  let prompt = `${beforeP1} ${breakPoint} ${req.body.name} ${breakPoint} ${beforeP2} ${breakPoint} ${req.body.name2} ${breakPoint} ${afterP}`;

  // Log promt
  console.log(prompt);

  // Call OpenAI API
  const gptResponse = await openai.complete({
    engine: "text-curie-001",
    prompt: `${prompt}`,
    maxTokens: 256,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0.5,
    bestOf: 1,
    n: 1,
  });

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
};
// model: "text-davinci-003",
// prompt: "Write a long form social media post based on this Content that will engage a reader into conversation, include a summary of the Content",
