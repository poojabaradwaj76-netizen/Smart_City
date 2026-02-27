interface GreenScoreFactors {
  treeCoverage: number // 0-100
  pollutionLevel: number // 0-100 (lower is better)
  renewableEnergy: number // 0-100
  trafficCongestion: number // 0-100 (lower is better)
  waterEfficiency: number // 0-100
  populationDensity: number // 0-100 (optimal 40-60)
  publicTransport: number // 0-100
  greenSpaces: number // 0-100
}

interface ScoreBreakdown {
  totalScore: number
  factors: GreenScoreFactors
  history: { timestamp: number; score: number }[]
  recommendations: string[]
}

class GreenScoreCalculator {
  private weights = {
    treeCoverage: 0.15,
    pollutionLevel: 0.2,
    renewableEnergy: 0.18,
    trafficCongestion: 0.15,
    waterEfficiency: 0.12,
    populationDensity: 0.08,
    publicTransport: 0.1,
    greenSpaces: 0.02,
  }

  calculateFromBuildings(buildings: any[]): ScoreBreakdown {
    const factors = this.extractFactors(buildings)
    const totalScore = this.calculateWeightedScore(factors)
    const recommendations = this.generateRecommendations(factors, buildings)

    return {
      totalScore: Math.round(totalScore),
      factors,
      history: [{ timestamp: Date.now(), score: totalScore }],
      recommendations,
    }
  }

  private extractFactors(buildings: any[]): GreenScoreFactors {
    let totalArea = 0
    let greenArea = 0
    let totalPollution = 0
    let totalEnergy = 0
    let renewableEnergy = 0
    let totalPopulation = 0
    let transportCount = 0

    buildings.forEach((building) => {
      const area = building.width * building.height
      totalArea += area

      if (building.type === "park") {
        greenArea += area
      }

      totalPollution += building.pollution
      totalEnergy += building.energy

      if (building.type === "energy") {
        renewableEnergy += building.energy * 0.7
      }

      if (building.type === "building") {
        totalPopulation += building.population || 100
      }

      if (building.type === "transport") {
        transportCount += 1
      }
    })

    const avgPollution = buildings.length > 0 ? totalPollution / buildings.length : 50
    const avgEnergy = totalEnergy > 0 ? (renewableEnergy / totalEnergy) * 100 : 0

    return {
      treeCoverage: Math.min(100, (greenArea / totalArea) * 200),
      pollutionLevel: Math.max(0, 100 - avgPollution),
      renewableEnergy: Math.min(100, avgEnergy),
      trafficCongestion: Math.max(0, 100 - buildings.filter((b) => b.type === "transport").length * 5),
      waterEfficiency: 75,
      populationDensity: Math.min(100, Math.abs(50 - totalPopulation / buildings.length) / 0.5),
      publicTransport: Math.min(100, transportCount * 10),
      greenSpaces: Math.min(100, (greenArea / totalArea) * 200),
    }
  }

  private calculateWeightedScore(factors: GreenScoreFactors): number {
    return (
      factors.treeCoverage * this.weights.treeCoverage +
      factors.pollutionLevel * this.weights.pollutionLevel +
      factors.renewableEnergy * this.weights.renewableEnergy +
      factors.trafficCongestion * this.weights.trafficCongestion +
      factors.waterEfficiency * this.weights.waterEfficiency +
      factors.populationDensity * this.weights.populationDensity +
      factors.publicTransport * this.weights.publicTransport +
      factors.greenSpaces * this.weights.greenSpaces
    )
  }

  private generateRecommendations(factors: GreenScoreFactors, buildings: any[]): string[] {
    const recommendations: string[] = []

    if (factors.pollutionLevel < 40) {
      recommendations.push("Add more parks in high-pollution zones to reduce air pollution")
    }

    if (factors.renewableEnergy < 30) {
      recommendations.push("Increase solar plants and wind turbines to reach 50% renewable energy")
    }

    if (factors.trafficCongestion < 50) {
      recommendations.push("Expand metro stations and bus routes to reduce traffic congestion")
    }

    if (factors.treeCoverage < 20) {
      recommendations.push("Increase green coverage - aim for at least 25% tree coverage")
    }

    if (factors.publicTransport < 40) {
      recommendations.push("Add more public transportation hubs for better accessibility")
    }

    const industrialCount = buildings.filter((b) => b.type === "industrial").length
    const residentialCount = buildings.filter((b) => b.type === "building").length
    if (industrialCount > residentialCount / 2) {
      recommendations.push("Move some industrial zones away from residential areas")
    }

    return recommendations.slice(0, 4)
  }

  getScoreColor(score: number): string {
    if (score >= 80) return "#22c55e" // Green
    if (score >= 60) return "#3b82f6" // Blue
    if (score >= 40) return "#f59e0b" // Amber
    return "#ef4444" // Red
  }

  getScoreGrade(score: number): string {
    if (score >= 90) return "A+"
    if (score >= 80) return "A"
    if (score >= 70) return "B+"
    if (score >= 60) return "B"
    if (score >= 50) return "C+"
    if (score >= 40) return "C"
    if (score >= 30) return "D"
    return "F"
  }
}

export { GreenScoreCalculator, type GreenScoreFactors, type ScoreBreakdown }
