import { Indicator } from '../entities/indicator.entity';

export class IndicatorMock {
  generateIndicatorSample(id: number, indicatorId: number): Indicator {
    const indicator = new Indicator();
    indicator.id = id;
    indicator.indicator = indicatorId;
    indicator.turbineId = 50;
    indicator.variable = 13.5;
    indicator.timestamp = new Date();
    return indicator;
  }
  getListOfIndicators(): Indicator[] {
    const firstIndicator = this.generateIndicatorSample(1, 12);
    const secondIndicator = this.generateIndicatorSample(2, 50);
    return [firstIndicator, secondIndicator];
  }
}
