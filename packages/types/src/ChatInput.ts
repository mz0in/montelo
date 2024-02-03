export type ChatInput = {
  messages?: Message[];
  model?: string;

  response_format?: { type: "text" | "json_object" }; // OpenAI only

  seed?: number; // OpenAI only
  stop?: string | string[];
  stream?: boolean; // Enable streaming

  // LLM Parameters
  max_tokens?: number; // Range: [1, context_length)
  temperature?: number; // Range: [0, 2]
  top_p?: number; // Range: (0, 1]
  top_k?: number; // Range: [1, Infinity) Not available for OpenAI models
  frequency_penalty?: number; // Range: [-2, 2]
  presence_penalty?: number; // Range: [-2, 2]
  repetition_penalty?: number; // Range: (0, 2]

  // Function-calling
  // Only natively suported by OpenAI models. For others, we submit
  // a YAML-formatted string with these tools at the end of the prompt.
  tools?: Tool[];
  tool_choice?: ToolChoice;

  // Additional optional parameters
  logit_bias?: { [key: number]: number }; // OpenAI only
};

type TextContent = {
  type: "text";
  text: string;
};

type ImageContentPart = {
  type: "image_url";
  image_url: {
    url: string; // URL or base64 encoded image data
    detail?: string; // Optional, defaults to 'auto'
  };
};

type ContentPart = TextContent | ImageContentPart;

type Message = {
  role: "user" | "assistant" | "system" | "tool";
  content: string | ContentPart[]; // Only for the 'user' role
  name?: string;
};

type FunctionDescription = {
  description?: string;
  name: string;
  parameters: object; // JSON Schema object
};

type Tool = {
  type: "function";
  function: FunctionDescription;
};

type ToolChoice =
  | "none"
  | "auto"
  | {
      type: "function";
      function: {
        name: string;
      };
    };
