# Montelo

Turn your API calls from

```typescript
const message = "Hey!";

await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "You are a pirate. Respond as a pirate would. Be creative, yet brief.",
    },
    {
      role: "user",
      content: message,
    },
  ],
  tools: [
    {
      type: "function",
      function: {
        name: "get_current_weather",
        description: "Get the current weather in a given location.",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city, e.g San Francisco.",
            },
            unit: {
              type: "string",
              enum: ["Celsius", "Fahrenheit"],
              description: "The unit of temperature.",
            },
          },
          required: ["location", "unit"],
        },
      },
    },
  ],
});
```

To

```javascript
// prompts/pirate.prompt
<System>
You are a pirate. Respond as a pirate would. Be creative, yet brief.
</System>

<User>
{{message}}
</User>
```

```typescript
// functions/get_current_weather.ts
import { AIFunction } from "montelo";
import { z } from "zod";

const FunctionInputSchema = z.object({
  location: z.string().describe("The city, e.g San Francisco."),
  unit: z.enum(["Celsius", "Fahrenheit"]).describe("The unit of temperature."),
});
type FunctionInput = z.infer<typeof FunctionInputSchema>;

const getCurrentWeather = async (params: FunctionInput): Promise<string> => {
  return `The weather in ${params.location} is currently 22 degrees ${params.unit}.`;
};

export default AIFunction({
  function: getCurrentWeather,
  description: "Get the current weather in a given location.",
  schema: FunctionInputSchema,
});
```

Then run `npx montelo generate` to generate the client, and then just use them!

```typescript
import { functions, prompts } from "montelo";

const message = "Hey!";

await openai.chat.completions.create({
  model: "gpt-4",
  // these are type-safe and autocomplete in your IDE!
  messages: prompts.pirate({ message }),
  tools: [functions.get_current_weather.schema],
});
```

It'll generate a type-safe client for you to use anywhere in your codebase to reference your prompts and functions!
