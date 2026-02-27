interface SimulationState {
  pollution: Map<string, number>
  traffic: Map<string, number>
  energy: number
  water: number
  population: number
  citizens: Citizen[]
  time: number
}

interface Citizen {
  id: string
  x: number
  y: number
  targetX: number
  targetY: number
  speed: number
  type: "worker" | "resident"
  buildingId?: string
}

interface Building {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  pollution: number
  energy: number
  population?: number
}

class SimulationEngine {
  private state: SimulationState
  private buildings: Building[] = []
  private gridSize = 50
  private maxPollution = 100
  private diffusionRate = 0.95

  constructor(buildings: Building[]) {
    this.buildings = buildings
    this.state = {
      pollution: new Map(),
      traffic: new Map(),
      energy: 0,
      water: 0,
      population: 0,
      citizens: [],
      time: 0,
    }
    this.initializeSimulation()
  }

  private initializeSimulation() {
    // Initialize pollution and traffic maps
    const gridKeys = this.getGridKeys()
    gridKeys.forEach((key) => {
      this.state.pollution.set(key, 0)
      this.state.traffic.set(key, 0)
    })

    // Initialize citizens
    const residentialBuildings = this.buildings.filter((b) => b.type === "building")
    residentialBuildings.forEach((building, index) => {
      const citizenCount = Math.floor((building.population || 100) / 50)
      for (let i = 0; i < citizenCount; i++) {
        this.state.citizens.push({
          id: `citizen-${index}-${i}`,
          x: building.x + Math.random() * building.width,
          y: building.y + Math.random() * building.height,
          targetX: building.x + Math.random() * building.width,
          targetY: building.y + Math.random() * building.height,
          speed: 1 + Math.random() * 0.5,
          type: Math.random() > 0.5 ? "worker" : "resident",
          buildingId: building.id,
        })
      }
    })

    // Calculate initial energy
    this.calculateEnergy()
  }

  private getGridKeys(): string[] {
    const keys: string[] = []
    const width = 800
    const height = 600
    for (let x = 0; x < width; x += this.gridSize) {
      for (let y = 0; y < height; y += this.gridSize) {
        keys.push(`${x},${y}`)
      }
    }
    return keys
  }

  private calculateEnergy() {
    let totalEnergy = 0
    let renewableEnergy = 0

    this.buildings.forEach((building) => {
      totalEnergy += building.energy
      if (building.type === "energy") {
        renewableEnergy += building.energy * 0.7 // 70% renewable
      }
    })

    this.state.energy = totalEnergy
  }

  private spreadPollution() {
    const newPollution = new Map(this.state.pollution)
    const pollutionSources: Map<string, number> = new Map()

    // Add pollution from industrial buildings
    this.buildings.forEach((building) => {
      if (building.type === "industrial" || building.type === "building") {
        const gridKey = this.getGridKey(building.x, building.y)
        const currentPollution = pollutionSources.get(gridKey) || 0
        pollutionSources.set(gridKey, currentPollution + building.pollution)
      }
    })

    // Diffuse pollution to neighboring cells
    pollutionSources.forEach((pollution, gridKey) => {
      const neighbors = this.getNeighbors(gridKey)
      neighbors.forEach((neighbor) => {
        const currentPollution = newPollution.get(neighbor) || 0
        newPollution.set(
          neighbor,
          Math.min(this.maxPollution, currentPollution + (pollution * (1 - this.diffusionRate)) / neighbors.length),
        )
      })

      // Decrease pollution over time
      const currentPollution = newPollution.get(gridKey) || 0
      newPollution.set(gridKey, Math.max(0, currentPollution * this.diffusionRate))
    })

    this.state.pollution = newPollution
  }

  private getGridKey(x: number, y: number): string {
    const gridX = Math.floor(x / this.gridSize) * this.gridSize
    const gridY = Math.floor(y / this.gridSize) * this.gridSize
    return `${gridX},${gridY}`
  }

  private getNeighbors(gridKey: string): string[] {
    const [x, y] = gridKey.split(",").map(Number)
    return [
      `${x - this.gridSize},${y}`,
      `${x + this.gridSize},${y}`,
      `${x},${y - this.gridSize}`,
      `${x},${y + this.gridSize}`,
    ]
  }

  private simulateTraffic() {
    // Update traffic based on citizen movement
    this.state.citizens.forEach((citizen) => {
      const gridKey = this.getGridKey(citizen.x, citizen.y)
      const currentTraffic = this.state.traffic.get(gridKey) || 0
      this.state.traffic.set(gridKey, Math.min(100, currentTraffic + 5))
    })

    // Decay traffic
    this.state.traffic.forEach((traffic, key) => {
      this.state.traffic.set(key, Math.max(0, traffic * 0.9))
    })
  }

  private updateCitizens() {
    this.state.citizens.forEach((citizen) => {
      const dx = citizen.targetX - citizen.x
      const dy = citizen.targetY - citizen.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < citizen.speed) {
        // Reached target, pick new random target
        const targetBuilding = this.buildings[Math.floor(Math.random() * this.buildings.length)]
        citizen.targetX = targetBuilding.x + Math.random() * targetBuilding.width
        citizen.targetY = targetBuilding.y + Math.random() * targetBuilding.height
      } else {
        // Move towards target
        const moveX = (dx / distance) * citizen.speed
        const moveY = (dy / distance) * citizen.speed
        citizen.x += moveX
        citizen.y += moveY
      }
    })
  }

  step() {
    this.state.time++
    this.spreadPollution()
    this.simulateTraffic()
    this.updateCitizens()
    this.calculateEnergy()
  }

  getState(): SimulationState {
    return this.state
  }

  getPollutionAt(x: number, y: number): number {
    const gridKey = this.getGridKey(x, y)
    return this.state.pollution.get(gridKey) || 0
  }

  getTrafficAt(x: number, y: number): number {
    const gridKey = this.getGridKey(x, y)
    return this.state.traffic.get(gridKey) || 0
  }

  reset() {
    this.state.time = 0
    this.initializeSimulation()
  }
}

export { SimulationEngine, type SimulationState, type Citizen }
