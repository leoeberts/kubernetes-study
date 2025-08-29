const diagramCode = `graph TB
    subgraph "Internet"
        U[Users<br/>External Access]
    end
    
    subgraph "AWS EKS Cluster - example-voting-app"
        subgraph "LoadBalancer Layer"
            VLB[Vote LoadBalancer<br/>AWS ELB<br/>Port 80]
            RLB[Result LoadBalancer<br/>AWS ELB<br/>Port 80]
        end
        
        subgraph "Application Layer"
            subgraph "Vote Deployment"
                VP1[Vote Pod 1<br/>Python Flask]
                VP2[Vote Pod 2<br/>Python Flask]
            end
            
            subgraph "Result Deployment"
                RP1[Result Pod 1<br/>Node.js Express]
                RP2[Result Pod 2<br/>Node.js Express]
            end
            
            subgraph "Worker Deployment"
                WP[Worker Pod<br/>.NET Core<br/>Vote Processor]
            end
        end
        
        subgraph "Data Layer"
            REDIS[Redis Service<br/>ClusterIP: 6379]
            REDISPOD[Redis Pod<br/>In-memory Cache]
            
            POSTGRES[PostgreSQL Service<br/>ClusterIP: 5432]
            PGPOD[PostgreSQL Pod<br/>Persistent Storage]
        end
        
        subgraph "AWS Infrastructure"
            VPC[VPC<br/>Multi-AZ Setup]
            NODES[EKS Node Group<br/>2 Worker Nodes<br/>Private Subnets]
        end
    end
    
    U -->|Vote & View Results| VLB
    U --> RLB
    VLB -.-> VP1
    VLB -.-> VP2
    RLB -.-> RP1
    RLB -.-> RP2
    
    VP1 -->|Store Votes| REDIS
    VP2 -->|Store Votes| REDIS
    REDIS -.-> REDISPOD
    
    WP -->|Read Votes| REDIS
    WP -->|Write Results| POSTGRES
    POSTGRES -.-> PGPOD
    
    RP1 -->|Query Results| POSTGRES
    RP2 -->|Query Results| POSTGRES
    
    VP1 -.-> NODES
    VP2 -.-> NODES
    RP1 -.-> NODES
    RP2 -.-> NODES
    WP -.-> NODES
    REDISPOD -.-> NODES
    PGPOD -.-> NODES
    
    NODES -.-> VPC
    
    style U fill:#fff3e0
    style VLB fill:#ffecb3
    style RLB fill:#ffecb3
    style VP1 fill:#e1f5fe
    style VP2 fill:#e1f5fe
    style RP1 fill:#e1f5fe
    style RP2 fill:#e1f5fe
    style WP fill:#e1f5fe
    style REDIS fill:#e8f5e8
    style POSTGRES fill:#e8f5e8
    style REDISPOD fill:#fff9c4
    style PGPOD fill:#fff9c4
    style VPC fill:#f3e5f5
    style NODES fill:#f3e5f5`;

// Make the diagram code available globally
if (typeof window !== 'undefined') {
    window.diagramCode = diagramCode;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { diagramCode };
}