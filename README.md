# FanLeague DAO

A decentralized sports platform that empowers fans to co-own, vote, and benefit from their favorite teams using on-chain governance, tokenized rewards, and verifiable engagement.

---

## Overview

FanLeague DAO consists of ten core Clarity smart contracts that create a full-stack governance and engagement model for clubs and their supporters:

1. **Club Registry Contract** – Registers and manages verified sports clubs.
2. **Fan Membership NFT Contract** – Issues soulbound or tradable NFTs for membership tiers.
3. **Governance DAO Contract** – Enables fans to vote on club matters using token-weighted proposals.
4. **Treasury Contract** – Holds and routes funds across the ecosystem.
5. **Ticketing Contract** – Mints tamper-proof ticket NFTs with secondary royalty logic.
6. **Fan Rewards Contract** – Distributes fan tokens based on verified engagement.
7. **Sponsorship Marketplace Contract** – Manages sponsor offers and fan-backed deals.
8. **Merch NFT Store Contract** – Lists and sells exclusive merch via NFT drops.
9. **Fantasy League Engine Contract** – Supports match prediction and fantasy games.
10. **KYC & Role Manager Contract** – Manages user eligibility for gated features.

---

## Features

- **Verified club onboarding** and management  
- **NFT-based fan identity and perks**  
- **DAO voting on club policies and community spending**  
- **Transparent fund flows for merch, events, and sponsorships**  
- **NFT tickets with resale royalties and fraud protection**  
- **Activity-based fan rewards with anti-cheating logic**  
- **Sponsorships backed by fans with return-sharing**  
- **On-chain merch drops and collectibles**  
- **Fantasy games tied to real match data**  
- **Role-based access via identity contracts**

---

## Smart Contracts

### Club Registry Contract
- Registers official sports clubs
- Links each club to a DAO, treasury, and metadata
- Admin-controlled onboarding

### Fan Membership NFT Contract
- Issues tiered NFTs (Basic, VIP, OG)
- NFTs can be non-transferable or tradable
- Used to unlock rewards and voting

### Governance DAO Contract
- On-chain voting with fan token or NFT weight
- Proposal creation, quorum enforcement, and result execution
- Used for event decisions, funding allocations, etc.

### Treasury Contract
- Receives club income (merch, tickets, donations)
- Distributes funds to DAO proposals, rewards, etc.
- Tracks transaction history

### Ticketing Contract
- Mints event tickets as NFTs
- Verifies venue entry via QR/Web3
- Enforces resale royalties and transfer rules

### Fan Rewards Contract
- Validates fan actions via oracle or check-in
- Mints fan tokens as engagement rewards
- Prevents multi-claiming and abuse

### Sponsorship Marketplace Contract
- Sponsors submit offers (e.g., fund jersey printing)
- Clubs accept/reject via DAO
- Fans receive share of returns if backed

### Merch NFT Store Contract
- Merch items represented as NFTs
- Unlockable content for NFT holders
- Enables digital/physical hybrid drops

### Fantasy League Engine Contract
- Users stake tokens on match or player outcomes
- Pool-based winnings distributed automatically
- Uses off-chain data via oracle

### KYC & Role Manager Contract
- Manages user roles and eligibility
- Optional KYC validation for certain perks
- Supports location- or age-based restrictions

---

## Installation

1. Install [Clarinet CLI](https://docs.hiro.so/clarinet/getting-started)
2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fanleague-dao.git
   ```
3. Run tests:
    ```bash
    npm test
    ```
4. Deploy contracts:
    ```bash
    clarinet deploy
    ```

---

## Usage

Each contract operates modularly but is designed to interconnect through shared principals and event flows. Clubs can customize setup (e.g., ticketing without fantasy, DAO without merch).

Check each contract's documentation for entry points, expected parameters, and return types.

## License

MIT License