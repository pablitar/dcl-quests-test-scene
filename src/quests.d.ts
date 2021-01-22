declare module DCLQuests {
  type ArbitraryProgressData = {
    type: ArbitraryProgressMode["type"];
    current: number;
  } & BaseProgress;

  type ArbitraryProgressMode = {
    type: "arbitrary";
    direction: ProgressDirection;
    min: number;
    max: number;
    unit: string;
  };

  type AuthChain = AuthLink[];

  type AuthLink = {
    type: AuthLinkType;
    payload: string;
    signature: Signature;
  };

  enum AuthLinkType {
    SIGNER = "SIGNER",
    ECDSA_PERSONAL_EPHEMERAL = "ECDSA_EPHEMERAL",
    ECDSA_PERSONAL_SIGNED_ENTITY = "ECDSA_SIGNED_ENTITY",
    ECDSA_EIP_1654_EPHEMERAL = "ECDSA_EIP_1654_EPHEMERAL",
    ECDSA_EIP_1654_SIGNED_ENTITY = "ECDSA_EIP_1654_SIGNED_ENTITY",
  }

  type BaseProgress = {
    current?: number;
    challenge?: any;
  };

  type BodyType = "json" | "text";

  type ClientResponse<T> = OkClientResponse<T> | FailedClientResponse;

  type CompletedPreviousRequirement = {
    type: "completedPrevious";
  };

  type CompletedQuestRequirement = {
    type: "completedQuest";
    questId: string;
  };

  type CountProgressData = {
    type: CountProgressMode["type"];
    amount: number;
  } & BaseProgress;

  type CountProgressMode = {
    type: "count";
    direction: ProgressDirection;
    repetitions: number;
    unit: string;
  };

  type DateRequirement = {
    type: "date";
    fromDate: Date;
    toDate: Date;
  };

  type ErrorResponse = {
    status: string;
    message: string;
    errorData?: any;
  };

  type FailedClientResponse = {
    ok: false;
    status: number;
    body?: ErrorResponse;
  };

  type FlatFetchFn = (
    url: string,
    init: FlatFetchInit
  ) => Promise<FlatFetchResponse>;

  type FlatFetchInit = RequestInit & {
    responseBodyType?: BodyType;
  };

  type FlatFetchResponse = {
    ok: boolean;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    json?: any;
    text?: string;
  };

  type OkClientResponse<T> = {
    ok: true;
    status: number;
    body: T;
  };

  type PlayerQuestDetails = {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
    active: boolean;
    visibility: Visibility;
    progressStatus: ProgressStatus;
    tasks: PlayerTaskDetails[];
    requirements: Requirement[];
  };

  type PlayerStep = {
    id: string;
  };

  type PlayerTaskDetails = {
    id: string;
    description: string;
    progressMode: ProgressMode;
    coordinates?: string;
    progressStatus: ProgressStatus;
    required: boolean;
    section?: string;
    progressSummary?: ProgressSummary;
    lastProgress?: PlayerTaskProgress;
    steps: {
      id: string;
    }[];
    requirements: Requirement[];
  };

  type PlayerTaskProgress = {
    id: string;
    step?: any;
    progressData: ProgressData;
    status: ProgressStatus;
    date: Date;
  };

  type ProgressData =
    | SingleProgressData
    | CountProgressData
    | ArbitraryProgressData
    | StepBasedProgressData;

  type ProgressDirection = "up" | "down";

  type ProgressMode =
    | SingleProgressMode
    | CountProgressMode
    | ArbitraryProgressMode
    | (StepBasedProgressMode & {
        direction?: ProgressDirection;
        unit?: string;
      });

  enum ProgressStatus {
    NOT_STARTED = "not_started",
    ON_GOING = "on_going",
    COMPLETED = "completed",
    FAILED = "failed",
  }

  type ProgressSummary = {
    current: number;
    target: number;
    start: number;
    direction: ProgressDirection;
    unit: string;
  };

  class QuestsClient {
    private options;
    private obf;
    private fetchFn;
    constructor(options: QuestsClientOptions);
    private urlFor;
    private fetch;
    getQuests(): Promise<ClientResponse<PlayerQuestDetails[]>>;
    getQuestDetails(
      questId: string
    ): Promise<ClientResponse<PlayerQuestDetails>>;
    startQuest(questId: string): Promise<ClientResponse<PlayerQuestDetails>>;
    makeProgress(
      questId: string,
      taskId: string,
      progressData: ProgressData
    ): Promise<ClientResponse<PlayerQuestDetails>>;
  }

  type QuestsClientOptions = {
    metadata?: Record<string, string>;
    authChainProvider?: (payload: string) => AuthChain;
    baseUrl: string;
    fetchFn?: FlatFetchFn;
  };

  type Requirement =
    | DateRequirement
    | CompletedQuestRequirement
    | CompletedPreviousRequirement;

  type Signature = string;

  type SingleProgressData = {
    type: SingleProgressMode["type"];
    status: ProgressStatus;
  } & BaseProgress;

  type SingleProgressMode = {
    type: "single";
  };

  type StepBasedProgressData = {
    type: StepBasedProgressMode["type"];
    stepStatus: ProgressStatus;
    stepId: string;
  } & BaseProgress;

  type StepBasedProgressMode = {
    type: "step-based";
    unit: string;
  };

  enum Visibility {
    VISIBLE = "visible",
    VISIBLE_IF_CAN_START = "visible_if_can_start",
    SECRET = "secret",
  }
}
