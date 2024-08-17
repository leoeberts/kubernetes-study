const diagramCode = `graph TB
    subgraph "Kubernetes Cluster"
        D[Deployment<br/>Strategy: Recreate<br/>History: 10]
        
        subgraph "Update Process"
            RS1[ReplicaSet v1<br/>Replicas: 0<br/>Previous Version]
            RS2[ReplicaSet v2<br/>Replicas: 3<br/>Current Version]
        end
        
        subgraph "Node 1"
            subgraph "Pod 1"
                C1[nginx Container<br/>v2.0]
            end
        end
        
        subgraph "Node 2"
            subgraph "Pod 2"
                C2[nginx Container<br/>v2.0]
            end
        end
        
        subgraph "Node 3"
            subgraph "Pod 3"
                C3[nginx Container<br/>v2.0]
            end
        end
        
        D -->|manages| RS1
        D -->|manages| RS2
        RS2 -.->|active| Pod1
        RS2 -.->|active| Pod2
        RS2 -.->|active| Pod3
    end
    
    style D fill:#e8f5e8
    style RS1 fill:#fff3e0
    style RS2 fill:#e8f5e8
    style Pod1 fill:#e1f5fe
    style Pod2 fill:#e1f5fe
    style Pod3 fill:#e1f5fe
    style C1 fill:#e1f5fe
    style C2 fill:#e1f5fe
    style C3 fill:#e1f5fe`;