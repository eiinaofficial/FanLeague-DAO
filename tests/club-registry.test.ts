import { describe, it, expect, beforeEach } from "vitest"

type Club = {
  clubAdmin: string
  clubName: string
  metadataUri: string
  isActive: boolean
}

const ZERO_ADDRESS = "SP000000000000000000002Q6VF78"

let mockState: {
  contractAdmin: string
  clubs: Map<number, Club>
  clubOwners: Map<string, number>
  clubCount: number
}

beforeEach(() => {
  mockState = {
    contractAdmin: "STADMIN",
    clubs: new Map(),
    clubOwners: new Map(),
    clubCount: 0
  }
})

function registerClub(caller: string, clubName: string, metadataUri: string) {
  if (metadataUri.length <= 4) return { error: 103 }
  const newId = mockState.clubCount + 1
  mockState.clubs.set(newId, {
    clubAdmin: caller,
    clubName,
    metadataUri,
    isActive: true
  })
  mockState.clubOwners.set(caller, newId)
  mockState.clubCount = newId
  return { value: newId }
}

function deactivateClub(caller: string, clubId: number) {
  const club = mockState.clubs.get(clubId)
  if (!club) return { error: 102 }
  if (club.clubAdmin !== caller) return { error: 104 }
  mockState.clubs.set(clubId, { ...club, isActive: false })
  return { value: true }
}

function updateMetadata(caller: string, clubId: number, uri: string) {
  if (uri.length <= 4) return { error: 103 }
  const club = mockState.clubs.get(clubId)
  if (!club) return { error: 102 }
  if (club.clubAdmin !== caller) return { error: 104 }
  mockState.clubs.set(clubId, { ...club, metadataUri: uri })
  return { value: true }
}

function transferAdmin(caller: string, newAdmin: string) {
  if (caller !== mockState.contractAdmin) return { error: 100 }
  if (newAdmin === ZERO_ADDRESS) return { error: 105 }
  mockState.contractAdmin = newAdmin
  return { value: true }
}

describe("ClubRegistry", () => {
  it("should register a new club", () => {
    const result = registerClub("STCLUB1", "Lagos United", "ipfs://xyz123")
    expect(result.value).toBe(1)
    const club = mockState.clubs.get(1)
    expect(club?.clubName).toBe("Lagos United")
    expect(club?.metadataUri).toBe("ipfs://xyz123")
    expect(club?.isActive).toBe(true)
  })

  it("should prevent invalid metadata", () => {
    const result = registerClub("STCLUB2", "ShortMeta", "bad")
    expect(result).toEqual({ error: 103 })
  })

  it("should deactivate a club by admin", () => {
    registerClub("STCLUB1", "Lagos United", "ipfs://xyz123")
    const result = deactivateClub("STCLUB1", 1)
    expect(result).toEqual({ value: true })
    expect(mockState.clubs.get(1)?.isActive).toBe(false)
  })

  it("should not deactivate club by non-admin", () => {
    registerClub("STCLUB1", "Lagos United", "ipfs://xyz123")
    const result = deactivateClub("STINTRUDER", 1)
    expect(result).toEqual({ error: 104 })
  })

  it("should update metadata by admin", () => {
    registerClub("STCLUB1", "Lagos United", "ipfs://xyz123")
    const result = updateMetadata("STCLUB1", 1, "ipfs://new456")
    expect(result).toEqual({ value: true })
    expect(mockState.clubs.get(1)?.metadataUri).toBe("ipfs://new456")
  })

  it("should transfer admin rights", () => {
    const result = transferAdmin("STADMIN", "STNEWADMIN")
    expect(result).toEqual({ value: true })
    expect(mockState.contractAdmin).toBe("STNEWADMIN")
  })

  it("should prevent zero address as new admin", () => {
    const result = transferAdmin("STADMIN", ZERO_ADDRESS)
    expect(result).toEqual({ error: 105 })
  })

  it("should reject transfer from non-admin", () => {
    const result = transferAdmin("STFAKE", "STNEWADMIN")
    expect(result).toEqual({ error: 100 })
  })
})
