const diagramCode = `graph TB
    subgraph "External Users"
        V[Voters<br/>Port 30004]
        R[Results Viewers<br/>Port 30005]
    end
    
    subgraph "Kubernetes Cluster"
        subgraph "Frontend Layer"
            VS[Voting Service<br/>NodePort: 30004]
            VP[Voting App Pod<br/>Python Flask]
            
            RS[Result Service<br/>NodePort: 30005]
            RP[Result App Pod<br/>Node.js Express]
        end
        
        subgraph "Processing Layer"
            WP[Worker Pod<br/>.NET Core<br/>Vote Processor]
        end
        
        subgraph "Data Layer"
            RDS[Redis Service<br/>ClusterIP: 6379]
            RDP[Redis Pod<br/>In-memory Cache]
            
            PGS[PostgreSQL Service<br/>ClusterIP: 5432]
            PGP[PostgreSQL Pod<br/>Persistent Database]
        end
    end
    
    V -->|Submit Votes| VS
    VS -.-> VP
    VP -->|Store Votes| RDS
    RDS -.-> RDP
    
    WP -->|Read Votes| RDS
    WP -->|Write Results| PGS
    PGS -.-> PGP
    
    R -->|View Results| RS
    RS -.-> RP
    RP -->|Query Results| PGS
    
    style V fill:#fff3e0
    style R fill:#fff3e0
    style VS fill:#e8f5e8
    style RS fill:#e8f5e8
    style VP fill:#e1f5fe
    style RP fill:#e1f5fe
    style WP fill:#e1f5fe
    style RDS fill:#fff9c4
    style RDP fill:#e1f5fe
    style PGS fill:#fff9c4
    style PGP fill:#e1f5fe`;