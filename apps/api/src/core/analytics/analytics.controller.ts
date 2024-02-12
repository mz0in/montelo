import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { DateSelection } from "./analytics.enum";
import { AnalyticsService } from "./analytics.service";
import { DashboardAnalyticsDto } from "./dto/dashboard-analytics.dto";
import { CostHistoryDto } from "./dto/cost-history.dto";


@ApiTags("Analytics")
@ApiBearerAuth()
@Controller("env/:envId/analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @ApiQuery({ name: "dateSelection", enum: DateSelection })
  @UseGuards(JwtAuthGuard)
  @Get("dashboard")
  async getForDashboard(
    @Param("envId") envId: string,
    @Query("dateSelection") dateSelection: DateSelection,
  ): Promise<DashboardAnalyticsDto> {
    return await this.analyticsService.getDashboardAnalytics({
      envId,
      dateSelection,
    });
  }

  @ApiQuery({ name: "dateSelection", enum: DateSelection })
  @UseGuards(JwtAuthGuard)
  @Get("cost-history")
  async getCostHistory(
    @Param("envId") envId: string,
    @Query("dateSelection") dateSelection: DateSelection,
  ): Promise<CostHistoryDto> {
    const costHistory = await this.analyticsService.getCostHistory({
      envId,
      dateSelection,
    });
    return { costHistory };
  }
}
