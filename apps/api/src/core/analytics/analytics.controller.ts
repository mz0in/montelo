import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LogDto } from "../log/dto/log.dto";
import { LogService } from "../log/log.service";
import { DateSelection } from "./analytics.enum";
import { AnalyticsService } from "./analytics.service";
import { DashboardAnalyticsDto } from "./dto/dashboard-analytics.dto";

@ApiTags("Analytics")
@ApiBearerAuth()
@Controller("env/:envId/analytics")
export class AnalyticsController {
  constructor(
    private analyticsService: AnalyticsService,
    private logService: LogService,
  ) {}

  @ApiQuery({ name: "dateSelection", enum: DateSelection })
  @UseGuards(JwtAuthGuard)
  @Get("dashboard")
  async getForDashboard(
    @Param("envId") envId: string,
    @Query("dateSelection") dateSelection: DateSelection,
  ): Promise<DashboardAnalyticsDto> {
    const dashboardAnalyticsPromise = this.analyticsService.getDashboardAnalytics({
      envId,
      dateSelection,
    });
    const recentLogsPromise = this.logService.findAllTopLevel(envId, { take: 50 });

    const [analytics, logs] = await Promise.all([dashboardAnalyticsPromise, recentLogsPromise]);
    const logsDto = logs.map(LogDto.fromLog);
    return {
      ...analytics,
      logs: logsDto,
    };
  }
}
