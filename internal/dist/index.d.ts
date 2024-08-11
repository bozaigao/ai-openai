import { LanguageModelV1, EmbeddingModelV1 } from '@ai-sdk/provider';

type OpenAIChatModelId = 'gpt-4o' | 'gpt-4o-2024-05-13' | 'gpt-4o-2024-08-06' | 'gpt-4o-mini' | 'gpt-4o-mini-2024-07-18' | 'gpt-4-turbo' | 'gpt-4-turbo-2024-04-09' | 'gpt-4-turbo-preview' | 'gpt-4-0125-preview' | 'gpt-4-1106-preview' | 'gpt-4' | 'gpt-4-0613' | 'gpt-3.5-turbo-0125' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-1106' | (string & {});
interface OpenAIChatSettings {
    /**
  Modify the likelihood of specified tokens appearing in the completion.
  
  Accepts a JSON object that maps tokens (specified by their token ID in
  the GPT tokenizer) to an associated bias value from -100 to 100. You
  can use this tokenizer tool to convert text to token IDs. Mathematically,
  the bias is added to the logits generated by the model prior to sampling.
  The exact effect will vary per model, but values between -1 and 1 should
  decrease or increase likelihood of selection; values like -100 or 100
  should result in a ban or exclusive selection of the relevant token.
  
  As an example, you can pass {"50256": -100} to prevent the <|endoftext|>
  token from being generated.
  */
    logitBias?: Record<number, number>;
    /**
  Return the log probabilities of the tokens. Including logprobs will increase
  the response size and can slow down response times. However, it can
  be useful to better understand how the model is behaving.
  
  Setting to true will return the log probabilities of the tokens that
  were generated.
  
  Setting to a number will return the log probabilities of the top n
  tokens that were generated.
  */
    logprobs?: boolean | number;
    /**
  Whether to enable parallel function calling during tool use. Default to true.
     */
    parallelToolCalls?: boolean;
    /**
  Whether to use structured outputs. Defaults to false.
  
  When enabled, tool calls and object generation will be strict and follow the provided schema.
   */
    structuredOutputs?: boolean;
    /**
  Whether to use legacy function calling. Defaults to false.
  
  Required by some open source inference engines which do not support the `tools` API. May also
  provide a workaround for `parallelToolCalls` resulting in the provider buffering tool calls,
  which causes `streamObject` to be non-streaming.
  
  Prefer setting `parallelToolCalls: false` over this option.
  
  @deprecated this API is supported but deprecated by OpenAI.
     */
    useLegacyFunctionCalling?: boolean;
    /**
  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. Learn more.
  */
    user?: string;
}

type OpenAIChatConfig = {
    provider: string;
    compatibility: 'strict' | 'compatible';
    headers: () => Record<string, string | undefined>;
    url: (options: {
        modelId: string;
        path: string;
    }) => string;
    fetch?: typeof fetch;
};
declare class OpenAIChatLanguageModel implements LanguageModelV1 {
    readonly specificationVersion = "v1";
    readonly modelId: OpenAIChatModelId;
    readonly settings: OpenAIChatSettings;
    private readonly config;
    constructor(modelId: OpenAIChatModelId, settings: OpenAIChatSettings, config: OpenAIChatConfig);
    get supportsStructuredOutputs(): boolean;
    get defaultObjectGenerationMode(): "tool" | "json";
    get provider(): string;
    private getArgs;
    doGenerate(options: Parameters<LanguageModelV1['doGenerate']>[0]): Promise<Awaited<ReturnType<LanguageModelV1['doGenerate']>>>;
    doStream(options: Parameters<LanguageModelV1['doStream']>[0]): Promise<Awaited<ReturnType<LanguageModelV1['doStream']>>>;
}

type OpenAICompletionModelId = 'gpt-3.5-turbo-instruct' | (string & {});
interface OpenAICompletionSettings {
    /**
  Echo back the prompt in addition to the completion.
     */
    echo?: boolean;
    /**
  Modify the likelihood of specified tokens appearing in the completion.
  
  Accepts a JSON object that maps tokens (specified by their token ID in
  the GPT tokenizer) to an associated bias value from -100 to 100. You
  can use this tokenizer tool to convert text to token IDs. Mathematically,
  the bias is added to the logits generated by the model prior to sampling.
  The exact effect will vary per model, but values between -1 and 1 should
  decrease or increase likelihood of selection; values like -100 or 100
  should result in a ban or exclusive selection of the relevant token.
  
  As an example, you can pass {"50256": -100} to prevent the <|endoftext|>
  token from being generated.
     */
    logitBias?: Record<number, number>;
    /**
  Return the log probabilities of the tokens. Including logprobs will increase
  the response size and can slow down response times. However, it can
  be useful to better understand how the model is behaving.
  
  Setting to true will return the log probabilities of the tokens that
  were generated.
  
  Setting to a number will return the log probabilities of the top n
  tokens that were generated.
     */
    logprobs?: boolean | number;
    /**
  The suffix that comes after a completion of inserted text.
     */
    suffix?: string;
    /**
  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. Learn more.
     */
    user?: string;
}

type OpenAICompletionConfig = {
    provider: string;
    compatibility: 'strict' | 'compatible';
    headers: () => Record<string, string | undefined>;
    url: (options: {
        modelId: string;
        path: string;
    }) => string;
    fetch?: typeof fetch;
};
declare class OpenAICompletionLanguageModel implements LanguageModelV1 {
    readonly specificationVersion = "v1";
    readonly defaultObjectGenerationMode: undefined;
    readonly modelId: OpenAICompletionModelId;
    readonly settings: OpenAICompletionSettings;
    private readonly config;
    constructor(modelId: OpenAICompletionModelId, settings: OpenAICompletionSettings, config: OpenAICompletionConfig);
    get provider(): string;
    private getArgs;
    doGenerate(options: Parameters<LanguageModelV1['doGenerate']>[0]): Promise<Awaited<ReturnType<LanguageModelV1['doGenerate']>>>;
    doStream(options: Parameters<LanguageModelV1['doStream']>[0]): Promise<Awaited<ReturnType<LanguageModelV1['doStream']>>>;
}

type OpenAIEmbeddingModelId = 'text-embedding-3-small' | 'text-embedding-3-large' | 'text-embedding-ada-002' | (string & {});
interface OpenAIEmbeddingSettings {
    /**
  Override the maximum number of embeddings per call.
     */
    maxEmbeddingsPerCall?: number;
    /**
  Override the parallelism of embedding calls.
      */
    supportsParallelCalls?: boolean;
    /**
  The number of dimensions the resulting output embeddings should have.
  Only supported in text-embedding-3 and later models.
     */
    dimensions?: number;
    /**
  A unique identifier representing your end-user, which can help OpenAI to
  monitor and detect abuse. Learn more.
  */
    user?: string;
}

type OpenAIEmbeddingConfig = {
    provider: string;
    url: (options: {
        modelId: string;
        path: string;
    }) => string;
    headers: () => Record<string, string | undefined>;
    fetch?: typeof fetch;
};
declare class OpenAIEmbeddingModel implements EmbeddingModelV1<string> {
    readonly specificationVersion = "v1";
    readonly modelId: OpenAIEmbeddingModelId;
    private readonly config;
    private readonly settings;
    get provider(): string;
    get maxEmbeddingsPerCall(): number;
    get supportsParallelCalls(): boolean;
    constructor(modelId: OpenAIEmbeddingModelId, settings: OpenAIEmbeddingSettings, config: OpenAIEmbeddingConfig);
    doEmbed({ values, headers, abortSignal, }: Parameters<EmbeddingModelV1<string>['doEmbed']>[0]): Promise<Awaited<ReturnType<EmbeddingModelV1<string>['doEmbed']>>>;
}

export { OpenAIChatLanguageModel, type OpenAIChatModelId, type OpenAIChatSettings, OpenAICompletionLanguageModel, type OpenAICompletionModelId, type OpenAICompletionSettings, OpenAIEmbeddingModel, type OpenAIEmbeddingModelId, type OpenAIEmbeddingSettings };
