import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { LogDto } from "../../log/dto/log.dto";

export class DashboardAnalyticsDto {
  @ApiProperty()
  @IsString()
  cost: string;

  @ApiProperty()
  @IsString()
  costChange: string;

  @ApiProperty()
  @IsString()
  averageLatency: string;

  @ApiProperty()
  @IsString()
  averageLatencyChange: string;

  @ApiProperty()
  @IsString()
  logCount: string;

  @ApiProperty()
  @IsString()
  logCountChange: string;

  @ApiProperty({ type: [LogDto] })
  logs: LogDto[];
}
