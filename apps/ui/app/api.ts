import {
  AnalyticsApi,
  ApiKeyApi,
  AuthApi,
  Configuration,
  EnvironmentApi,
  LogApi,
  MembershipApi,
  ProjectApi,
  TeamApi,
  TraceApi,
} from "@montelo/browser-client";

export class Api {
  private readonly configuration: Configuration;

  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  public analytics(): AnalyticsApi {
    return new AnalyticsApi(this.configuration);
  }

  public apiKey(): ApiKeyApi {
    return new ApiKeyApi(this.configuration);
  }

  public auth(): AuthApi {
    return new AuthApi(this.configuration);
  }

  public environment(): EnvironmentApi {
    return new EnvironmentApi(this.configuration);
  }

  public log(): LogApi {
    return new LogApi(this.configuration);
  }

  public membership(): MembershipApi {
    return new MembershipApi(this.configuration);
  }

  public project(): ProjectApi {
    return new ProjectApi(this.configuration);
  }

  public team(): TeamApi {
    return new TeamApi(this.configuration);
  }

  public trace(): TraceApi {
    return new TraceApi(this.configuration);
  }
}
