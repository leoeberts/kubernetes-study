const diagramCode = `graph TB
    subgraph "External Users"
        U1[Voters<br/>:30080]
        U2[Results Viewers<br/>:30081]
    end
    
    subgraph "Kubernetes Cluster"
        subgraph "Frontend Layer"
            subgraph "Vote Application"
                VS[Vote Service<br/>NodePort: 30080]
                subgraph "Vote Deployment"
                    subgraph "Vote ReplicaSet"
                        VPods[Vote Pods<br/>× 2 replicas<br/>dockersamples/examplevotingapp_vote]
                    end
                end
            end
            
            subgraph "Result Application"
                RS[Result Service<br/>NodePort: 30081]
                subgraph "Result Deployment"
                    subgraph "Result ReplicaSet"
                        RPods[Result Pods<br/>× 2 replicas<br/>dockersamples/examplevotingapp_result]
                    end
                end
            end
        end
        
        subgraph "Worker Layer"
            subgraph "Worker Deployment"
                subgraph "Worker ReplicaSet"
                    WPods[Worker Pods<br/>× 2 replicas<br/>dockersamples/examplevotingapp_worker]
                end
            end
        end
        
        subgraph "Data Layer"
            subgraph "Redis Cache"
                RedisS[Redis Service<br/>ClusterIP: 6379]
                subgraph "Redis Deployment"
                    subgraph "Redis ReplicaSet"
                        RedisP[Redis Pod<br/>× 1 replica<br/>redis:alpine]
                    end
                end
            end
            
            subgraph "PostgreSQL Database"
                DBS[PostgreSQL Service<br/>ClusterIP: 5432]
                subgraph "PostgreSQL Deployment"
                    subgraph "PostgreSQL ReplicaSet"
                        DBP[PostgreSQL Pod<br/>× 1 replica<br/>postgres:15-alpine]
                    end
                end
            end
        end
    end
    
    U1 -->|Submit Votes| VS
    U2 -->|View Results| RS
    
    VS -.->|load balances| VPods
    RS -.->|load balances| RPods
    RedisS -.->|connects to| RedisP
    DBS -.->|connects to| DBP
    
    VPods -->|stores votes| RedisS
    WPods -->|reads votes| RedisS
    WPods -->|writes results| DBS
    RPods -->|queries results| DBS
    
    style U1 fill:#fff3e0
    style U2 fill:#fff3e0
    style VS fill:#e8f5e8
    style RS fill:#e8f5e8
    style RedisS fill:#fff9c4
    style DBS fill:#fff9c4
    style VPods fill:#e1f5fe
    style RPods fill:#e1f5fe
    style WPods fill:#e1f5fe
    style RedisP fill:#e1f5fe
    style DBP fill:#e1f5fe`;